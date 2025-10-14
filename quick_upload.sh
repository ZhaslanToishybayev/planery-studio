#!/bin/bash

echo "Creating and uploading checkout fail page..."
cat > app/checkout/fail/page.tsx << 'FAIL_EOF'
'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CheckoutFailPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('ErrorCode');
  const errorMessage = searchParams.get('ErrorMessage');

  const getErrorMessage = (code: string | null) => {
    switch (code) {
      case '1':
        return 'Платеж был отменен пользователем';
      case '2':
        return 'Ошибка обработки платежа';
      case '3':
        return 'Недостаточно средств на карте';
      case '4':
        return 'Карта заблокирована';
      default:
        return errorMessage || 'Произошла ошибка при обработке платежа';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Платеж не выполнен
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-medium">
            {getErrorMessage(errorCode)}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Не расстраивайтесь! Вы можете попробовать снова или выбрать другой способ оплаты.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                Попробовать снова
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/products">
                Выбрать другой шаблон
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Если проблема повторяется, обратитесь в службу поддержки.
          </p>
        </div>
      </div>
    </div>
  );
}
FAIL_EOF

gh api repos/ZhaslanToishybayev/planery-studio/contents/app/checkout/fail/page.tsx --method PUT \
  --field message="Add checkout fail page with error handling" \
  --field content="$(base64 -w 0 app/checkout/fail/page.tsx)" \
  --field branch=main

echo "Creating and uploading email service..."
cat > lib/email.ts << 'EMAIL_EOF'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text || emailData.html.replace(/<[^>]*>/g, ''),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

export function createOrderConfirmationEmail(
  email: string,
  orderId: string,
  productName: string,
  downloadLinks: string[]
): EmailData {
  const html = \`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Подтверждение заказа</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Спасибо за покупку!</h1>
        </div>
        <div class="content">
          <h2>Ваш заказ №\${orderId} успешно оплачен</h2>
          <p>Товар: <strong>\${productName}</strong></p>
          <p>Ссылки для скачивания:</p>
          <ul>
            \${downloadLinks.map(link => \`<li><a href="\${link}" class="button">Скачать</a></li>\`).join('')}
          </ul>
          <p>Если у вас возникли вопросы, не стесняйтесь обращаться в поддержку.</p>
        </div>
        <div class="footer">
          <p>С уважением, команда Planery Studio</p>
        </div>
      </div>
    </body>
    </html>
  \`;

  return {
    to: email,
    subject: \`Заказ №\${orderId} - \${productName}\`,
    html,
  };
}
EMAIL_EOF

gh api repos/ZhaslanToishybayev/planery-studio/contents/lib/email.ts --method PUT \
  --field message="Add email service with HTML templates" \
  --field content="$(base64 -w 0 lib/email.ts)" \
  --field branch=main

echo "All files uploaded successfully!"
