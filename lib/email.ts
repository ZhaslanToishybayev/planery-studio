// Email service for order confirmations
// This is a simplified version without external dependencies

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    // In a real implementation, this would send an email via SMTP
    // For now, we'll just log the email content
    console.log('📧 Email would be sent:', {
      to: emailData.to,
      subject: emailData.subject,
      content: emailData.text || emailData.html.replace(/<[^>]*>/g, '')
    });
    
    // Simulate email sending
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
  const html = `
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
          <h2>Ваш заказ №${orderId} успешно оплачен</h2>
          <p>Товар: <strong>${productName}</strong></p>
          <p>Ссылки для скачивания:</p>
          <ul>
            ${downloadLinks.map(link => `<li><a href="${link}" class="button">Скачать</a></li>`).join('')}
          </ul>
          <p>Если у вас возникли вопросы, не стесняйтесь обращаться в поддержку.</p>
        </div>
        <div class="footer">
          <p>С уважением, команда Planery Studio</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    to: email,
    subject: `Заказ №${orderId} - ${productName}`,
    html,
  };
}
