import { AgentIntent } from './types.js';
import { loadConfig } from './config.js';

/**
 * Extracts the user intent from natural language using either OpenAI or a local deterministic NLP parser.
 */
export async function extractIntent(query: string): Promise<AgentIntent> {
  const config = loadConfig();

  if (config.openaiApiKey) {
    try {
      return await queryOpenAI(query, config.openaiApiKey);
    } catch {
      // Fallback to local parser if OpenAI API fails or is rate-limited
    }
  }

  // Local Regex-based NLP Parser
  return parseLocally(query);
}

/**
 * Deterministic local NLP parser using regex patterns.
 */
function parseLocally(query: string): AgentIntent {
  const normalized = query.toLowerCase().trim();

  // 1. Match Pay / Send
  // Example: "Send 25 USDC to 0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A"
  const payRegex = /(?:send|pay|transfer)\s+([\d\.]+)\s+(\w+)\s+(?:to)\s+(0x[0-9a-f]{40})/i;
  const payMatch = normalized.match(payRegex);
  if (payMatch) {
    return {
      type: 'pay',
      params: {
        recipient: payMatch[3],
        amount: payMatch[1],
        asset: payMatch[2].toUpperCase(),
      },
    };
  }

  // 2. Match Swap / Quote
  // Example: "Swap 100 USDC to EURC" or "Get a quote for 100 USDC to EURC"
  const quoteRegex = /(?:swap|quote|rate)\s+([\d\.]+)\s+(\w+)\s+(?:to|for)\s+(\w+)/i;
  const quoteMatch = normalized.match(quoteRegex);
  if (quoteMatch) {
    return {
      type: 'get_quote',
      params: {
        amount: quoteMatch[1],
        from: quoteMatch[2].toUpperCase(),
        to: quoteMatch[3].toUpperCase(),
      },
    };
  }

  // 3. Match Balances
  // Example: "Get my wallet balances" or "check balance of 0x..."
  if (normalized.includes('balance') || normalized.includes('wallet') || normalized.includes('vault')) {
    const addressRegex = /(0x[0-9a-f]{40})/i;
    const addressMatch = normalized.match(addressRegex);
    return {
      type: 'get_balances',
      params: {
        address: addressMatch ? addressMatch[1] : undefined,
      },
    };
  }

  return {
    type: 'unknown',
    params: { query },
  };
}

/**
 * Requests GPT completions structured as JSON.
 */
async function queryOpenAI(query: string, apiKey: string): Promise<AgentIntent> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are an AI Agent translating natural language queries to JSON intents for the Sera Protocol CLOB stablecoin FX SDK.
          You must return a JSON object matching the AgentIntent type structure:
          - Type 'pay': { "type": "pay", "params": { "recipient": "0x...", "amount": "number string", "asset": "USDC" } }
          - Type 'get_quote': { "type": "get_quote", "params": { "amount": "number string", "from": "USDC", "to": "EURC" } }
          - Type 'get_balances': { "type": "get_balances", "params": { "address": "optional 0x..." } }
          - Type 'unknown': { "type": "unknown", "params": { "query": "original input" } }`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('OpenAI request failed');
  }

  const result = await response.json();
  const rawJson = result.choices[0]?.message?.content;
  if (!rawJson) throw new Error('Empty response');

  return JSON.parse(rawJson) as AgentIntent;
}
