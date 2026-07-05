import { client } from './client.js';
import { Logger } from './logger.js';
import { isSeraError } from '@sera-protocol/sdk';

async function main(): Promise<void> {
  Logger.step('Starting Sera Protocol Example Application');

  try {
    // 1. Authenticate and verify credential state
    Logger.step('1. Resolving Wallet Signer Credentials');
    const signer = client.auth.getSigner();
    const address = await signer.getAddress();
    Logger.info(`API Key Configured: ${client.auth.hasApiKey() ? 'Yes' : 'No'}`);
    Logger.success(`Wallet address resolved: ${address}`);

    // 2. Fetch balance indicators
    Logger.step('2. Inspecting Account Balances');
    Logger.info(`Retrieving wallet and vault balances for: ${address}...`);
    try {
      const balances = await client.balances.get(address);
      Logger.success(`Successfully fetched balances for: ${balances.address}`);
      Logger.info(`Wallet Assets: ${JSON.stringify(balances.wallet)}`);
    } catch (err: any) {
      if (isSeraError(err)) {
        Logger.info(`Balance fetch resolved with API status: [${err.code}] ${err.message}`);
      } else {
        Logger.info(`Could not connect to API to fetch balances. (Reason: ${err.message})`);
      }
    }

    // 3. Query system parameters
    Logger.step('3. Fetching Protocol System Configuration');
    try {
      const health = await client.system.health();
      Logger.success(`Protocol state: ${health.status} (Version: ${health.version})`);
      
      const tokens = await client.system.tokens();
      Logger.success(`Retrieved ${tokens.length} supported tokens from registry.`);
    } catch (err: any) {
      if (isSeraError(err)) {
        Logger.info(`System parameters check resolved with API status: [${err.code}] ${err.message}`);
      } else {
        Logger.info(`Could not connect to API to fetch system config. (Reason: ${err.message})`);
      }
    }

    // 4. Retrieve swap quote estimate
    Logger.step('4. Fetching FX Swap Quote Estimate');
    Logger.info('Requesting quote: 1000.00 USDC -> EURC');
    try {
      const quote = await client.swap.quote({
        inputToken: 'USDC',
        outputToken: 'EURC',
        amount: '1000.00',
      });
      Logger.success(`Quote fetched: ${quote.uuid}`);
      Logger.info(`Expected output: ${quote.expectedOutputAmount} EURC (Expires: ${new Date(quote.expiresAt).toISOString()})`);
    } catch (err: any) {
      if (isSeraError(err)) {
        Logger.info(`Swap quote request resolved with API status: [${err.code}] ${err.message}`);
      } else {
        Logger.info(`Could not connect to API to fetch swap quote. (Reason: ${err.message})`);
      }
    }

    Logger.step('Workflow Execution Completed Cleanly');
    process.exit(0);
  } catch (error) {
    Logger.error('Fatal execution error occurred in workflow', error);
    process.exit(1);
  }
}

// Start execution
main();
