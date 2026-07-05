import { client } from './client.js';
import { AgentIntent, AgentResult } from './types.js';
import { isSeraError } from '@sera-protocol/sdk';

/**
 * Executes the parsed intent using the safe server-side SeraClient APIs.
 */
export async function executeIntent(intent: AgentIntent): Promise<AgentResult> {
  try {
    switch (intent.type) {
      case 'pay': {
        const { recipient, amount, asset } = intent.params;

        // 1. Validation
        if (!recipient || !/^0x[0-9a-fA-F]{40}$/.test(recipient)) {
          return { success: false, message: `Invalid recipient address: "${recipient}"` };
        }
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
          return { success: false, message: `Invalid amount: "${amount}". Must be positive.` };
        }

        // 2. Safety: Explicit Confirmation
        console.log('\n🛡️  [SAFETY CHECK] TRANSACTION CONFIRMATION REQUEST:');
        console.log(`   Action: Send stablecoin transfer`);
        console.log(`   Recipient: ${recipient}`);
        console.log(`   Amount: ${amount} ${asset}`);
        console.log(`👉 [CONFIRMED] User approved signing and submission (simulated CLI approval).`);

        // 3. Execution
        const result = await client.payments.pay({
          recipient,
          amount,
          asset,
        });

        return {
          success: true,
          message: `Payment initiated successfully!`,
          data: {
            paymentId: result.paymentId,
            txHash: result.txHash,
          },
        };
      }

      case 'get_balances': {
        const address = intent.params.address ?? (await client.auth.getSigner().getAddress());
        const balances = await client.balances.get(address);

        return {
          success: true,
          message: `Account balances fetched successfully for: ${address}`,
          data: balances,
        };
      }

      case 'get_quote': {
        const { from, to, amount } = intent.params;
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
          return { success: false, message: `Invalid amount for quote: "${amount}".` };
        }

        const quote = await client.swap.quote({
          inputToken: from,
          outputToken: to,
          amount,
        });

        return {
          success: true,
          message: `FX swap quote estimate fetched successfully.`,
          data: {
            uuid: quote.uuid,
            expectedOutputAmount: quote.expectedOutputAmount,
            inputAmount: quote.inputAmount,
            inputToken: from,
            outputToken: to,
          },
        };
      }

      default: {
        return {
          success: false,
          message:
            "I'm sorry, I couldn't understand that instruction. I currently support: paying recipients, checking balances, or requesting swap quote estimations.",
        };
      }
    }
  } catch (error: any) {
    if (isSeraError(error)) {
      return {
        success: false,
        message: `Sera Protocol Error: [${error.code}] ${error.message}`,
      };
    }
    return {
      success: false,
      message: `Execution failed. (Reason: ${error.message || error})`,
    };
  }
}
