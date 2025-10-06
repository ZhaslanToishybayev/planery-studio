"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface ProductHeroProps {
  product: Product;
  onBuyClick: () => void;
}

export default function ProductHero({ product, onBuyClick }: ProductHeroProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
      <div className="container-1200 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-6xl">📊</div>
              </div>
              {/* Placeholder - заменить на реальное изображение когда будут */}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isPopular && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[var(--brand)] to-blue-500 text-white text-sm font-semibold">
                  🔥 Популярный выбор
                </span>
              )}
              {product.isBestSeller && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold">
                  ⭐ Бестселлер
                </span>
              )}
              {product.discount && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                  -{product.discount}% скидка
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-xl text-gray-600 mb-6">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating} ({product.reviewCount} отзывов)
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              {product.originalPrice && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()} ₸
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-700 text-sm font-semibold">
                    Экономия {(product.originalPrice - product.price).toLocaleString()} ₸
                  </span>
                </div>
              )}
              <div className="text-5xl font-bold text-[var(--brand)] mb-2">
                {product.price.toLocaleString()} ₸
              </div>
              <p className="text-gray-600">
                Разовый платёж • Пожизненный доступ • Все обновления бесплатно
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBuyClick}
                className="btn text-lg px-8 h-14 flex-1 sm:flex-initial"
              >
                Купить сейчас
              </button>
              <a
                href="#features"
                className="inline-flex items-center justify-center h-14 px-8 rounded-xl border-2 border-gray-300 font-semibold hover:border-[var(--brand)] hover:text-[var(--brand)] transition"
              >
                Подробнее
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
              <div>
                <div className="text-2xl mb-1">✓</div>
                <div>Гарантия 30 дней</div>
              </div>
              <div>
                <div className="text-2xl mb-1">⚡</div>
                <div>Мгновенная доставка</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🔄</div>
                <div>Бесплатные обновления</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
