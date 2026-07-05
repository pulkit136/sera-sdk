import dotenv from 'dotenv';

dotenv.config();

export interface AgentConfig {
  readonly apiKey: string;
  readonly privateKey: string;
  readonly environment: 'mainnet' | 'testnet' | 'development';
  readonly openaiApiKey?: string;
}

export function loadConfig(): AgentConfig {
  const apiKey = process.env.SERA_API_KEY;
  const privateKey = process.env.SERA_PRIVATE_KEY;
  const environment = process.env.SERA_ENVIRONMENT ?? 'testnet';
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === 'your_sera_api_key_here') {
    throw new Error('Config Error: SERA_API_KEY is not defined in your environment.');
  }

  if (!privateKey || privateKey.startsWith('0x0000000')) {
    throw new Error('Config Error: SERA_PRIVATE_KEY is not defined or uses a zero stub.');
  }

  return {
    apiKey,
    privateKey,
    environment: environment as 'mainnet' | 'testnet' | 'development',
    openaiApiKey: openaiApiKey && openaiApiKey.trim().length > 0 ? openaiApiKey : undefined,
  };
}
