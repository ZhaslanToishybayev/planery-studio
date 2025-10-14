import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ROBOKASSA_MERCHANT_ID = process.env.ROBOKASSA_MERCHANT_ID || '';
const ROBOKASSA_PASSWORD_1 = process.env.ROBOKASSA_PASSWORD_1 || '';
const ROBOKASSA_PASSWORD_2 = process.env.ROBOKASSA_PASSWORD_2 || '';
const ROBOKASSA_TEST_MODE = process.env.ROBOKASSA_TEST_MODE === 'true';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, description, orderId, email } = body;

    if (!amount || !description || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate signature
    const signatureString = `${ROBOKASSA_MERCHANT_ID}:${amount}:${orderId}:${ROBOKASSA_PASSWORD_1}`;
    const signature = crypto.createHash('md5').update(signatureString).digest('hex');

    // Build payment URL
    const baseUrl = ROBOKASSA_TEST_MODE 
      ? 'https://auth.robokassa.ru/Merchant/Index.aspx'
      : 'https://auth.robokassa.ru/Merchant/Index.aspx';

    const params = new URLSearchParams({
      MerchantLogin: ROBOKASSA_MERCHANT_ID,
      OutSum: amount.toString(),
      InvId: orderId.toString(),
      Description: description,
      SignatureValue: signature,
      Email: email || '',
      IsTest: ROBOKASSA_TEST_MODE ? '1' : '0',
      Culture: 'ru',
      Encoding: 'utf-8'
    });

    const paymentUrl = `${baseUrl}?${params.toString()}`;

    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
