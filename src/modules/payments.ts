import { BaseModule } from './base.js';
import { PaymentIntent, PaymentResult, PaymentStatusInfo, PaymentEstimation } from '../types/domain/index.js';
import { RawPaymentIntent, RawPaymentResult, RawPaymentStatusInfo, RawPaymentEstimation } from '../types/api/index.js';
import { Address, TransactionHash } from '../types/shared/branded.js';
import { normalizeAddress } from '../utils/signature.js';
import { SigningPipeline } from '../auth/pipeline.js';

/**
 * Module responsible for creating, signing, executing, and tracking payments.
 */
export class PaymentsModule extends BaseModule {

  /**
   * High-level flagship method to execute a complete payment.
   * Automatically prepares the transfer details, requests EIP-712 signature from the wallet, submits, and returns execution.
   */
  public async pay(params: {
    recipient: string;
    amount: string;
    asset: string;
    memo?: string;
  }): Promise<PaymentResult> {
    const { hooks, events, config } = this.context;

    // 1. Emit beforePayment hook
    await hooks.emit('beforePayment', params);

    config.logger.debug(`[Payments Module] Starting payment: ${params.amount} ${params.asset} -> ${params.recipient}`);

    try {
      // 2. Resolve prepare parameters
      const intent = await this.prepare(params);

      // 3. Prompt local adapter signatures
      const signature = await this.sign(intent);

      // 4. Submit executed signature payload
      const result = await this.submit(intent, signature);

      // 5. Emit afterPayment hook
      await hooks.emit('afterPayment', {
        paymentId: result.paymentId,
        status: result.status,
      });

      return result;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('payment:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /**
   * Prepares a payment by creating a transfer intent on the backend.
   */
  public async prepare(params: {
    recipient: string;
    amount: string;
    asset: string;
    memo?: string;
  }): Promise<PaymentIntent> {
    const { events, httpClient, config } = this.context;
    
    config.logger.debug(`[Payments Module] Preparing transfer intent to recipient: ${params.recipient}`);

    const normalizedRecipient = normalizeAddress(params.recipient);

    const rawResponse = await httpClient.post<RawPaymentIntent>('/payments/prepare', {
      recipient: normalizedRecipient,
      amount: params.amount,
      asset: params.asset,
      memo: params.memo,
    });

    const intent = this.mapRawIntent(rawResponse);
    events.emit('payment:prepared', { intent });

    return intent;
  }

  /**
   * Invokes EIP-712 message signing over prepared payment parameters.
   */
  public async sign(intent: PaymentIntent): Promise<string> {
    const { hooks, events } = this.context;

    // 1. Emit beforePaymentSign hook
    await hooks.emit('beforePaymentSign', { intent });

    const paymentTypes = {
      Payment: [
        { name: 'recipient', type: 'address' },
        { name: 'asset', type: 'string' },
        { name: 'amount', type: 'uint256' },
        { name: 'feeAmount', type: 'uint256' },
        { name: 'uuid', type: 'uint256' },
        { name: 'deadline', type: 'uint48' },
      ],
    };

    const domain = {
      name: 'Sera',
      version: '1',
      chainId: intent.chainId,
      verifyingContract: intent.verifyingContract as `0x${string}`,
    };

    const message = {
      recipient: intent.recipient,
      asset: intent.asset,
      amount: intent.amount,
      feeAmount: intent.feeAmount,
      uuid: intent.uuid,
      deadline: intent.deadline,
    };

    const pipeline = new SigningPipeline(this.context);
    const signature = await pipeline.sign(domain, paymentTypes, message);

    events.emit('payment:submitted', { paymentId: intent.id });
    
    // 2. Emit afterPaymentSign hook
    await hooks.emit('afterPaymentSign', { intent, signature });

    return signature;
  }

  /**
   * Submits a signed payment instruction to the execution backend.
   */
  public async submit(intent: PaymentIntent, signature: string): Promise<PaymentResult> {
    const { events, httpClient, config } = this.context;

    config.logger.debug(`[Payments Module] Submitting signed payment execution: ${intent.id}`);

    const rawResponse = await httpClient.post<RawPaymentResult>('/payments', {
      payment_id: intent.id,
      signature: signature,
      route_params: {
        id: intent.id,
        recipient: intent.recipient,
        asset: intent.asset,
        amount: intent.amount,
        fee_amount: intent.feeAmount,
        memo: intent.memo,
        verifying_contract: intent.verifyingContract,
        chain_id: intent.chainId,
        uuid: intent.uuid,
        deadline: intent.deadline,
      },
    });

    const result = this.mapRawResult(rawResponse);
    events.emit('payment:completed', { result });

    return result;
  }

  /**
   * Retrieves the current processing status of a specific payment.
   */
  public async status(paymentId: string): Promise<PaymentStatusInfo> {
    const { events, httpClient } = this.context;

    const rawResponse = await httpClient.get<RawPaymentStatusInfo>(`/payments/${paymentId}/status`);
    const statusInfo = this.mapRawStatus(rawResponse);

    events.emit('payment:statusChanged', {
      paymentId: statusInfo.paymentId,
      status: statusInfo.status,
    });

    return statusInfo;
  }

  /**
   * Retrieves paginated payment history logs.
   */
  public async history(filters?: { limit?: number; offset?: number }): Promise<readonly PaymentResult[]> {
    const { httpClient } = this.context;

    const rawList = await httpClient.get<readonly RawPaymentResult[]>('/payments', {
      query: filters,
    });

    return rawList.map((raw) => this.mapRawResult(raw));
  }

  /**
   * Estimates transaction fees for executing a transfer.
   */
  public async estimate(params: { asset: string; amount: string }): Promise<PaymentEstimation> {
    const { httpClient } = this.context;

    const rawResponse = await httpClient.get<RawPaymentEstimation>('/payments/estimate', {
      query: {
        asset: params.asset,
        amount: params.amount,
      },
    });

    return {
      estimatedFee: rawResponse.estimated_fee,
      gasLimit: rawResponse.gas_limit,
      route: rawResponse.route.map((leg) => ({
        inputToken: leg.input_token as Address,
        outputToken: leg.output_token as Address,
        poolAddress: leg.pool_address as Address,
        poolFeeBps: leg.pool_fee_bps,
      })),
    };
  }

  /* UTILITY DATA MAPPERS */

  private mapRawIntent(raw: RawPaymentIntent): PaymentIntent {
    return {
      id: raw.id,
      recipient: raw.recipient as Address,
      asset: raw.asset,
      amount: raw.amount,
      feeAmount: raw.fee_amount,
      memo: raw.memo,
      verifyingContract: raw.verifying_contract as Address,
      chainId: raw.chain_id,
      uuid: raw.uuid,
      deadline: raw.deadline,
    };
  }

  private mapRawResult(raw: RawPaymentResult): PaymentResult {
    return {
      paymentId: raw.payment_id,
      txHash: raw.tx_hash as TransactionHash,
      recipient: raw.recipient as Address,
      asset: raw.asset,
      amount: raw.amount,
      status: raw.status,
      createdAt: raw.created_at,
    };
  }

  private mapRawStatus(raw: RawPaymentStatusInfo): PaymentStatusInfo {
    return {
      paymentId: raw.payment_id,
      status: raw.status,
      txHash: raw.tx_hash ? (raw.tx_hash as TransactionHash) : undefined,
      updatedAt: raw.updated_at,
    };
  }
}
