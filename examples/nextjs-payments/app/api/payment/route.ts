import { NextResponse } from 'next/server';
import { client } from '../../../lib/client';
import { validatePaymentRequest } from '../../../lib/validation';
import { PaymentRequestPayload, PaymentResponsePayload } from '../../../lib/types';
import { isSeraError } from '@sera-protocol/sdk';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate request payload
    const validationError = validatePaymentRequest(body);
    if (validationError) {
      return NextResponse.json<PaymentResponsePayload>(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const payload = body as PaymentRequestPayload;

    // 2. Execute payment via the SDK payments module
    // This prepare(), sign(), and submit() automatically on the server.
    const result = await client.payments.pay({
      recipient: payload.recipient,
      amount: payload.amount,
      asset: payload.asset,
    });

    return NextResponse.json<PaymentResponsePayload>({
      success: true,
      paymentId: result.paymentId,
      txHash: result.txHash,
    });
  } catch (error: any) {
    // 3. Graceful error handling
    if (isSeraError(error)) {
      return NextResponse.json<PaymentResponsePayload>(
        { success: false, error: `Sera Protocol Error: [${error.code}] ${error.message}` },
        { status: 422 }
      );
    }

    return NextResponse.json<PaymentResponsePayload>(
      { success: false, error: error.message || 'An unexpected server error occurred' },
      { status: 500 }
    );
  }
}
