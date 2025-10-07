"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  hours?: number;
  title?: string;
}

export default function CountdownTimer({
  hours = 24, // Default 24 hours countdown
  title = "Специальное предложение заканчивается через:",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Calculate end date from current time
    const endDate = new Date(Date.now() + hours * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - Date.now();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [hours]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>⏰ {title}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white rounded-xl shadow-lg px-4 py-3 min-w-[70px]">
            <div className="text-3xl font-bold text-[var(--brand)]">--</div>
          </div>
        </div>
      </div>
    );
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        className="bg-white rounded-xl shadow-lg px-3 sm:px-4 py-2 sm:py-3 min-w-[60px] sm:min-w-[70px]"
        key={value}
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-2xl sm:text-3xl font-bold text-[var(--brand)]">
          {String(value).padStart(2, "0")}
        </div>
      </motion.div>
      <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">{label}</div>
    </div>
  );

  return (
    <motion.div
      className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 border-2 border-orange-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-2 text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs sm:text-sm">⏰ {title}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <TimeUnit value={timeLeft.hours} label="Часов" />
        <div className="text-2xl sm:text-3xl font-bold text-orange-500">:</div>
        <TimeUnit value={timeLeft.minutes} label="Минут" />
        <div className="text-2xl sm:text-3xl font-bold text-orange-500">:</div>
        <TimeUnit value={timeLeft.seconds} label="Секунд" />
      </div>

      <div className="text-center mt-4 text-xs sm:text-sm text-gray-600">
        Скидка 50% действует ограниченное время!
      </div>
    </motion.div>
  );
}
