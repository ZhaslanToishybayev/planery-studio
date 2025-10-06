"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface StickyProductCTAProps {
  product: Product;
  onBuyClick: () => void;
}

export default function StickyProductCTA({ product, onBuyClick }: StickyProductCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[var(--brand)] shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div className="container-1200 py-3 md:py-4 flex items-center justify-between gap-4">
            {/* Product info */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm md:text-lg text-gray-900 truncate">
                {product.name}
              </div>
              <div className="hidden md:flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-right">
                {product.originalPrice && (
                  <div className="text-xs md:text-sm text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()} ₸
                  </div>
                )}
                <div className="text-xl md:text-3xl font-bold text-[var(--brand)]">
                  {product.price.toLocaleString()} ₸
                </div>
              </div>
              <button
                onClick={onBuyClick}
                className="btn whitespace-nowrap h-10 md:h-12 px-4 md:px-8 text-sm md:text-base"
              >
                Купить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
