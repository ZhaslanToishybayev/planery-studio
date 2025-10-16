"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUYER_NAMES = [
  "Алина К.",
  "Данияр Н.",
  "Айгерим С.",
  "Ербол М.",
  "Жанар Т.",
  "Асель Б.",
  "Нурлан А.",
  "Динара К.",
];

const BUYER_LOCATIONS = [
  "Алматы",
  "Астана",
  "Шымкент",
  "Караганда",
  "Актобе",
  "Тараз",
  "Павлодар",
];

export default function LiveStats() {
  const [todayPurchases, setTodayPurchases] = useState(0);
  const [recentBuyer, setRecentBuyer] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulate initial count
    const baseCount = 12;
    const randomAdd = Math.floor(Math.random() * 8);
    setTodayPurchases(baseCount + randomAdd);

    // Show random purchase notifications
    const interval = setInterval(() => {
      const randomName =
        BUYER_NAMES[Math.floor(Math.random() * BUYER_NAMES.length)];
      const randomLocation =
        BUYER_LOCATIONS[Math.floor(Math.random() * BUYER_LOCATIONS.length)];
      setRecentBuyer(`${randomName} из ${randomLocation}`);
      setShowNotification(true);
      
      setTodayPurchases(prev => prev + 1);

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Live Counter Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.span
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>
          <strong>{todayPurchases}</strong> покупок сегодня
        </span>
      </motion.div>

      {/* Recent Purchase Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed bottom-24 left-8 z-40 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 max-w-sm"
            initial={{ opacity: 0, x: -100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  Новая покупка! 🎉
                </div>
                <div className="text-sm text-gray-600">
                  <strong>{recentBuyer}</strong> только что приобрел шаблоны
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Несколько секунд назад
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
