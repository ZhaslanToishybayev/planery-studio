'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CheckoutSuccessContent() {
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
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
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
          
          <Link 
            href="/"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Вернуться на главную
          </Link>
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
