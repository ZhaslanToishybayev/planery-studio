"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MobileBottomSheet from "./MobileBottomSheet";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productPrice: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  productTitle,
  productPrice,
}: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Здесь будет интеграция с платежной системой
    setTimeout(() => {
      setIsProcessing(false);
      alert("Спасибо за покупку! Проверьте email для получения доступа к шаблонам.");
      onClose();
    }, 2000);
  };

  const formContent = (
    <div>
      <div className="bg-gradient-to-br from-[var(--brand-50)] to-[var(--accent-purple)]/10 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-900">{productTitle}</span>
          <span className="text-xl font-bold text-[var(--brand)]">
            {productPrice}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Разовый платёж • Пожизненный доступ
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition text-base"
            placeholder="Ваше имя"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition text-base"
            placeholder="your@email.com"
          />
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-900">
              Ссылка на шаблон придёт на указанный email сразу после оплаты
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full btn h-12 md:h-14 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Обработка...
              </span>
            ) : (
              "Перейти к оплате"
            )}
          </button>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Безопасная оплата
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Гарантия 30 дней
            </span>
          </div>
        </div>
      </form>
    </div>
  );

  // На мобильных показываем Bottom Sheet
  if (isMobile) {
    return (
      <MobileBottomSheet isOpen={isOpen} onClose={onClose} title="Оформление заказа">
        <p className="text-gray-600 text-sm mb-6">
          Моментальный доступ к шаблонам после оплаты
        </p>
        {formContent}
      </MobileBottomSheet>
    );
  }

  // На десктопе показываем обычную модалку
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">Оформление заказа</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600">
                  Моментальный доступ к шаблонам после оплаты
                </p>
              </div>

              <div className="p-6">
                {formContent}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
