import { extractIntent } from './intent.js';
import { executeIntent } from './executor.js';
import { Logger } from './logger.js';
import { AgentResult } from './types.js';

/**
 * The main AI Agent runner. Parses natural language and executes the parsed instructions.
 */
export async function runAgent(prompt: string): Promise<AgentResult> {
  Logger.step(`Prompt: "${prompt}"`);

  // 1. Extract Intent
  Logger.info('Extracting semantic intent...');
  const intent = await extractIntent(prompt);
  Logger.success(`Extracted Intent Type: ${intent.type.toUpperCase()}`);
  Logger.info(`Parsed Parameters: ${JSON.stringify(intent.params)}`);

  // 2. Execute Intent
  Logger.info('Executing SDK transaction parameters...');
  const result = await executeIntent(intent);

  // 3. Format result
  if (result.success) {
    Logger.success(result.message);
    if (result.data) {
      console.log('📊 Result Data:', JSON.stringify(result.data, null, 2));
    }
  } else {
    Logger.warn(result.message);
  }

  return result;
}
