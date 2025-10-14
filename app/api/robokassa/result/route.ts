import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ROBOKASSA_PASSWORD_2 = process.env.ROBOKASSA_PASSWORD_2 || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    
    const outSum = body.get('OutSum');
    const invId = body.get('InvId');
    const signature = body.get('SignatureValue');

    if (!outSum || !invId || !signature) {
      return new Response('ERROR: Missing parameters', { status: 400 });
    }

    // Verify signature
    const signatureString = `${outSum}:${invId}:${ROBOKASSA_PASSWORD_2}`;
    const calculatedSignature = crypto.createHash('md5').update(signatureString).digest('hex');

    if (calculatedSignature.toLowerCase() !== signature.toString().toLowerCase()) {
      console.error('Signature verification failed');
      return new Response('ERROR: Invalid signature', { status: 400 });
    }

    // Here you would typically:
    // 1. Update order status in database
    // 2. Send confirmation email
    // 3. Process the payment

    console.log(`Payment received: ${outSum} for order ${invId}`);

    // Return OK to Robokassa
    return new Response(`OK${invId}`);

  } catch (error) {
    console.error('Payment result error:', error);
    return new Response('ERROR: Internal server error', { status: 500 });
  }
}
