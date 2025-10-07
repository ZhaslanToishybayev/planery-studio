"use client";
import { motion } from "framer-motion";

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  onBuyClick: () => void;
  badge?: string;
}

export default function PricingCard({
  title,
  price,
  originalPrice,
  description,
  features,
  isPopular = false,
  buttonText = "Купить",
  onBuyClick,
  badge,
}: PricingCardProps) {
  return (
    <motion.div
      className={`
        relative rounded-2xl p-6 md:p-8 border-2 transition-all
        card-shimmer
        ${
          isPopular
            ? "border-[var(--brand)] bg-gradient-to-br from-[var(--brand)]/5 via-[var(--accent-purple)]/5 to-transparent shadow-2xl"
            : "border-gray-200 bg-white hover:border-[var(--brand)]/50 hover:shadow-xl"
        }
      `}
      style={{
        boxShadow: isPopular 
          ? "0 0 40px rgba(0, 110, 173, 0.2), 0 0 80px rgba(124, 58, 237, 0.1)" 
          : undefined,
        marginTop: badge ? "2.5rem" : undefined,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        boxShadow: isPopular 
          ? "0 0 60px rgba(0, 110, 173, 0.3), 0 0 100px rgba(124, 58, 237, 0.15)" 
          : "0 20px 40px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.3 }}
    >
      {badge && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-[var(--brand)] via-[var(--accent-purple)] to-[var(--accent-pink)] text-white shadow-lg animate-pulse-glow whitespace-nowrap">
            {badge}
          </span>
        </div>
      )}

      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </div>

      <div className="text-center mb-6 md:mb-8">
        {originalPrice && (
          <div className="text-gray-400 line-through text-base md:text-lg mb-1">
            {originalPrice}
          </div>
        )}
        <div className="text-4xl md:text-5xl font-bold text-[var(--brand)] mb-2">
          {price}
        </div>
        <div className="text-xs md:text-sm text-gray-500">Разовый платёж, навсегда ваш</div>
      </div>

      <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5"
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
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onBuyClick}
        className={`
          w-full rounded-xl px-6 h-12 font-semibold transition-all
          hover:-translate-y-1 active:translate-y-0
          ${
            isPopular
              ? "text-white shadow-lg hover:shadow-2xl"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }
        `}
        style={{
          background: isPopular 
            ? "var(--gradient-cta)"
            : undefined
        }}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}
