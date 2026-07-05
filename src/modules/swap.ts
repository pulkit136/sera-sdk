import { BaseModule } from './base.js';
import { SwapQuote, SwapResult } from '../types/domain/index.js';
import { RawQuoteResponse, RawExecuteSwapResponse } from '../types/api/index.js';
import { Address, QuoteId, TransactionHash } from '../types/shared/branded.js';
import { TransactionStatus } from '../types/enums/index.js';
import { SwapSimulation } from '../events/types.js';
import { SigningPipeline } from '../auth/pipeline.js';

/**
 * Flagship module for executing stablecoin swaps on the Sera Protocol.
 * Provides both high-level all-in-one executions and fine-grained low-level steps.
 */
export class SwapModule extends BaseModule {

  /**
   * The flagship all-in-one method to execute a swap.
   * Automatically requests a quote, prompts signature execution, submits, and returns results.
   */
  public async execute(params: {
    from: string;
    to: string;
    amount: string;
    slippageToleranceBps?: number;
    recipient?: string;
  }): Promise<SwapResult> {
    const { hooks, events, config } = this.context;

    // 1. Trigger Hook before swap starts
    await hooks.emit('beforeSwap', params);
    
    config.logger.debug(`[Swap Module] Starting swap execution pipeline: ${params.amount} ${params.from} -> ${params.to}`);

    try {
      // 2. Fetch swap quote
      const quoteResult = await this.quote({
        inputToken: params.from,
        outputToken: params.to,
        amount: params.amount,
        slippageToleranceBps: params.slippageToleranceBps,
      });

      // 3. Build Intent message payload
      const intent = this.buildIntent(quoteResult);

      // 4. Sign typed data intent
      const signature = await this.sign(intent);

      // 5. Submit signature and quote to executor
      const swapResult = await this.submit(quoteResult.uuid, signature, intent);

      // 6. Trigger Hook after successful swap
      await hooks.emit('afterSwap', {
        txHash: swapResult.txHash,
        status: swapResult.status,
      });

      // 7. Emit completed event
      events.emit('swap:completed', { result: swapResult });

      return swapResult;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('swap:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /**
   * Fetch a quote for an instant stablecoin swap.
   */
  public async quote(params: {
    inputToken: string;
    outputToken: string;
    amount: string;
    slippageToleranceBps?: number;
  }): Promise<SwapQuote> {
    const { hooks, events, httpClient, config } = this.context;

    // 1. Emit beforeQuote hook
    await hooks.emit('beforeQuote', params);

    config.logger.debug(`[Swap Module] Fetching quote for swap: ${params.amount} ${params.inputToken} -> ${params.outputToken}`);

    const rawResponse = await httpClient.post<RawQuoteResponse>('/swap/quote', {
      input_token: params.inputToken,
      output_token: params.outputToken,
      amount: params.amount,
      slippage_tolerance_bps: params.slippageToleranceBps ?? 50, // 0.5% default
    });

    // 2. Convert raw response into camelCase SDK model
    const quote = this.mapRawQuote(rawResponse);

    // 3. Emit afterQuote hook and quote event
    await hooks.emit('afterQuote', { quote });
    events.emit('swap:quote', { quote });

    return quote;
  }

  /**
   * Simulate a swap transaction to estimate output, fees, and path legs without signing.
   */
  public async simulate(params: {
    from: string;
    to: string;
    amount: string;
    slippageToleranceBps?: number;
  }): Promise<SwapSimulation> {
    const { events } = this.context;

    const quote = await this.quote({
      inputToken: params.from,
      outputToken: params.to,
      amount: params.amount,
      slippageToleranceBps: params.slippageToleranceBps,
    });

    const simulation: SwapSimulation = {
      expectedOutputAmount: quote.expectedOutputAmount,
      protocolFee: quote.protocolFee,
      priceImpactBps: 10, // Simulated static price impact of 0.10% (10 bps) for stubs
      route: quote.route,
      warnings: [],
    };

    events.emit('swap:simulation', { simulation });

    return simulation;
  }

  /**
   * Format the intent value extracted from a quote.
   */
  public buildIntent(quote: SwapQuote) {
    return quote.routeParams;
  }

  /**
   * Trigger EIP-712 signature over an intent payload.
   */
  public async sign(intent: any): Promise<string> {
    const pipeline = new SigningPipeline(this.context);

    // Swap Intent Schema Types
    const intentTypes = {
      Intent: [
        { name: 'taker', type: 'address' },
        { name: 'inputToken', type: 'address' },
        { name: 'outputToken', type: 'address' },
        { name: 'maxInputAmount', type: 'uint256' },
        { name: 'minOutputAmount', type: 'uint256' },
        { name: 'recipient', type: 'address' },
        { name: 'initialDepositAmount', type: 'uint256' },
        { name: 'uuid', type: 'uint256' },
        { name: 'deadline', type: 'uint48' },
      ],
    };

    const domain = {
      name: 'Sera',
      version: '1',
      chainId: intent.chainId,
      verifyingContract: intent.verifyingContract,
    };

    return pipeline.sign(domain, intentTypes, intent);
  }

  /**
   * Submit the signature and the quote parameters to execute the transaction.
   */
  public async submit(quoteId: string, signature: string, routeParams: any): Promise<SwapResult> {
    const { httpClient, events, config } = this.context;

    config.logger.debug(`[Swap Module] Submitting signed swap execution: ${quoteId}`);
    
    events.emit('swap:submitted', { quoteId });

    // Map intent parameters back into raw snake_case format
    const rawParams = {
      taker: routeParams.taker,
      input_token: routeParams.inputToken,
      output_token: routeParams.outputToken,
      max_input_amount: routeParams.maxInputAmount,
      min_output_amount: routeParams.minOutputAmount,
      recipient: routeParams.recipient,
      initial_deposit_amount: routeParams.initialDepositAmount,
      uuid: routeParams.uuid,
      deadline: routeParams.deadline,
      chain_id: routeParams.chainId,
      verifying_contract: routeParams.verifyingContract,
    };

    const rawResponse = await httpClient.post<RawExecuteSwapResponse>('/swap', {
      quote_id: quoteId,
      signature: signature,
      route_params: rawParams,
    });

    const result = this.mapRawResult(rawResponse);
    events.emit('swap:executed', {
      amount: result.inputAmountConsumed,
      inputToken: routeParams.inputToken,
      outputToken: routeParams.outputToken,
      txHash: result.txHash,
    });

    return result;
  }

  /* UTILITY DATA MAPPERS */

  private mapRawQuote(raw: RawQuoteResponse): SwapQuote {
    return {
      uuid: raw.uuid as QuoteId,
      inputToken: raw.input_token,
      outputToken: raw.output_token,
      inputAmount: raw.input_amount,
      expectedOutputAmount: raw.expected_output_amount,
      minOutputAmount: raw.min_output_amount,
      route: raw.route.map((leg) => ({
        inputToken: leg.input_token as Address,
        outputToken: leg.output_token as Address,
        poolAddress: leg.pool_address as Address,
        poolFeeBps: leg.pool_fee_bps,
      })),
      protocolFee: raw.protocol_fee,
      expiresAt: raw.expires_at,
      routeParams: {
        taker: raw.route_params.taker as Address,
        inputToken: raw.route_params.input_token as Address,
        outputToken: raw.route_params.output_token as Address,
        maxInputAmount: raw.route_params.max_input_amount,
        minOutputAmount: raw.route_params.min_output_amount,
        recipient: raw.route_params.recipient as Address,
        initialDepositAmount: raw.route_params.initial_deposit_amount,
        uuid: raw.route_params.uuid,
        deadline: raw.route_params.deadline,
        chainId: raw.route_params.chain_id,
        verifyingContract: raw.route_params.verifying_contract as Address,
      },
    };
  }

  private mapRawResult(raw: RawExecuteSwapResponse): SwapResult {
    return {
      txHash: raw.tx_hash as TransactionHash,
      inputAmountConsumed: raw.input_amount_consumed,
      outputAmountReceived: raw.output_amount_received,
      status: raw.status.toUpperCase() as TransactionStatus,
    };
  }
}
