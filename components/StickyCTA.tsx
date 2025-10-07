"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 800px
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[var(--brand)] shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div className="container-1200 py-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="font-bold text-lg text-gray-900">
                Готовы повысить продуктивность?
              </div>
              <div className="text-sm text-gray-600">
                Более 500 пользователей уже организовали свою жизнь
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm text-gray-500 line-through">9 980 ₸</div>
                <div className="text-2xl font-bold text-[var(--brand)]">
                  6 990 ₸
                </div>
              </div>
              <a
                href="#pricing"
                className="btn whitespace-nowrap"
                onClick={() => {
                  // Track CTA click
                  console.log("Sticky CTA clicked");
                }}
              >
                Выбрать планер
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
