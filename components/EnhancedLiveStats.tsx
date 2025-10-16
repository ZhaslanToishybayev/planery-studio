"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Activity {
  id: number;
  type: "purchase" | "review";
  user: string;
  city: string;
  product?: string;
  rating?: number;
  text?: string;
  time: string;
  avatar: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "purchase",
    user: "Айгерим",
    city: "Алматы",
    product: "Полный набор",
    time: "2 минуты назад",
    avatar: "АА",
  },
  {
    id: 2,
    type: "review",
    user: "Данияр",
    city: "Астана",
    rating: 5,
    text: "Отличный планер!",
    time: "5 минут назад",
    avatar: "ДА",
  },
  {
    id: 3,
    type: "purchase",
    user: "Мадина",
    city: "Шымкент",
    product: "Для студента",
    time: "8 минут назад",
    avatar: "МШ",
  },
  {
    id: 4,
    type: "review",
    user: "Арман",
    city: "Караганда",
    rating: 5,
    text: "Именно то, что искал",
    time: "12 минут назад",
    avatar: "АК",
  },
  {
    id: 5,
    type: "purchase",
    user: "Дильназ",
    city: "Алматы",
    product: "Продуктивность",
    time: "15 минут назад",
    avatar: "ДА",
  },
];

export default function EnhancedLiveStats() {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setCurrentActivity(randomActivity);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Показать первое уведомление через 3 секунды
    const initialTimer = setTimeout(showNotification, 3000);

    // Затем показывать каждые 8-15 секунд
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 7000 + 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentActivity) return null;

  const gradients = {
    purchase: "from-green-500 to-emerald-500",
    review: "from-[var(--brand)] to-[var(--accent-purple)]",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-4 md:left-6 z-40 max-w-[calc(100vw-2rem)] md:max-w-sm"
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-l-4 border-green-500">
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 bg-gradient-to-br ${gradients[currentActivity.type]}`}
                >
                  {currentActivity.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm md:text-base truncate">
                      {currentActivity.user} из {currentActivity.city}
                    </p>
                    {currentActivity.type === "purchase" && (
                      <span className="flex-shrink-0 text-xl">🎉</span>
                    )}
                    {currentActivity.type === "review" && (
                      <div className="flex gap-0.5 flex-shrink-0">
                        {[...Array(currentActivity.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">⭐</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {currentActivity.type === "purchase" && (
                    <p className="text-gray-700 text-sm mb-1">
                      купил <span className="font-semibold text-[var(--brand)]">{currentActivity.product}</span>
                    </p>
                  )}

                  {currentActivity.type === "review" && currentActivity.text && (
                    <p className="text-gray-700 text-sm mb-1 italic">
                      &ldquo;{currentActivity.text}&rdquo;
                    </p>
                  )}

                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {currentActivity.time}
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Закрыть"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
