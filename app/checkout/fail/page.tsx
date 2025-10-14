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
