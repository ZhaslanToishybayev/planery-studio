"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    // Initialize analytics here
    console.log("Cookies accepted, initializing analytics...");
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="text-3xl">🍪</div>
            <div>
              <h3 className="font-bold text-lg mb-2">Мы используем cookies</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Мы используем cookies для улучшения работы сайта и анализа трафика. 
                Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
                <a href="#" className="text-[var(--brand)] underline">
                  политикой конфиденциальности
                </a>
                .
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-[var(--brand)] text-white rounded-xl px-4 py-2 font-semibold hover:bg-[var(--brand-light)] transition"
            >
              Принять
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-gray-100 text-gray-700 rounded-xl px-4 py-2 font-semibold hover:bg-gray-200 transition"
            >
              Отклонить
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
