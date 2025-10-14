'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function CheckoutFailContent() {
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
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
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
            <Link 
              href="/"
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Попробовать снова
            </Link>
            
            <Link 
              href="/products"
              className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Выбрать другой шаблон
            </Link>
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

export default function CheckoutFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <CheckoutFailContent />
    </Suspense>
  );
}
