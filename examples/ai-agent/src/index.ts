import { runAgent } from './agent.js';
import { Logger } from './logger.js';

async function main(): Promise<void> {
  Logger.step('Sera Protocol AI Agent Simulator Initiated');

  // Test Prompt 1: Balance checks
  await runAgent('Get my wallet balances');

  // Test Prompt 2: Swap Quote Estimations
  await runAgent('Swap 500 USDC to EURC');

  // Test Prompt 3: Secure Payments
  await runAgent('Send 25 USDC to 0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A');

  // Test Prompt 4: Unsupported Action
  await runAgent('Tell me a joke about blockchain gas fees');

  Logger.step('AI Agent Simulation Completed Cleanly');
  process.exit(0);
}

// Start simulation
main();
