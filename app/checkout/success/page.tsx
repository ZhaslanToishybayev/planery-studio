'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatedCheckmark } from '@/components/AnimatedCheckmark';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    const invId = searchParams.get('InvId');
    const outSum = searchParams.get('OutSum');
    
    if (invId) setOrderId(invId);
    if (outSum) setAmount(outSum);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <AnimatedCheckmark />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Платеж успешно выполнен!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Спасибо за покупку! Ваш заказ обрабатывается.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Номер заказа:</p>
            <p className="font-mono text-lg font-semibold text-gray-900">
              #{orderId}
            </p>
            {amount && (
              <>
                <p className="text-sm text-gray-500 mt-2 mb-1">Сумма:</p>
                <p className="font-semibold text-green-600">
                  {amount} ₽
                </p>
              </>
            )}
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Информация о доступе к шаблонам будет отправлена на ваш email в течение 5-10 минут.
          </p>
          
          <Button asChild className="w-full">
            <Link href="/">
              Вернуться на главную
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Если у вас есть вопросы, свяжитесь с нами через поддержку.
          </p>
        </div>
      </div>
    </div>
  );
}
