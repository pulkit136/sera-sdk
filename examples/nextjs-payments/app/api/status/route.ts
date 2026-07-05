import { NextResponse } from 'next/server';
import { client } from '../../../lib/client';
import { StatusResponsePayload } from '../../../lib/types';
import { isSeraError } from '@sera-protocol/sdk';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json<StatusResponsePayload>(
        { success: false, error: 'paymentId query parameter is required' },
        { status: 400 }
      );
    }

    // Call the SDK status checks
    const statusInfo = await client.payments.status(paymentId);

    return NextResponse.json<StatusResponsePayload>({
      success: true,
      status: statusInfo.status,
    });
  } catch (error: any) {
    if (isSeraError(error)) {
      return NextResponse.json<StatusResponsePayload>(
        { success: false, error: `Sera Protocol Error: [${error.code}] ${error.message}` },
        { status: 422 }
      );
    }

    return NextResponse.json<StatusResponsePayload>(
      { success: false, error: error.message || 'An unexpected server error occurred' },
      { status: 500 }
    );
  }
}
