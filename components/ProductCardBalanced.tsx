"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductCardBalancedProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
  onBuyClick: (product: Product) => void;
  viewMode?: "grid" | "list";
}

export default function ProductCardBalanced({
  product,
  index,
  onQuickView,
  onBuyClick,
  viewMode = "grid",
}: ProductCardBalancedProps) {
  const priceLabel = `${product.price.toLocaleString("ru-RU")}₸`;
  const originalPriceLabel = product.originalPrice
    ? `${product.originalPrice.toLocaleString("ru-RU")}₸`
    : null;
  const isList = viewMode === "list";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`group ${isList ? "md:flex" : ""}`}
    >
      <motion.div
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-purple-200 ${
          isList ? "md:flex md:items-stretch md:w-full" : ""
        }`}
      >
        <div
          className={`relative bg-white border border-purple-100 overflow-hidden ${
            isList ? "h-56 md:h-auto md:min-h-[16rem] md:w-72" : "h-64"
          }`}
        >
          <div className={`absolute ${isList ? "inset-6" : "inset-4"}`}>
            <Image
              src={product.gallery[0] || "/assets/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            {product.isPopular && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 + 0.1 }}
                className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                🔥 Популярный
              </motion.span>
            )}
            {product.isBestSeller && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 + 0.15 }}
                className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                ⭐ Хит продаж
              </motion.span>
            )}
            {product.discount && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 + 0.2 }}
                className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                <span>🎯</span>
                <span>-{product.discount}%</span>
              </motion.span>
            )}
          </div>

          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold text-sm">{product.rating}</span>
            <span className="text-gray-500 text-xs">({product.reviewCount})</span>
          </div>
        </div>

        <div className={`p-6 ${isList ? "md:flex-1 md:pl-6 md:pr-8 md:py-6" : ""}`}>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-purple-600 font-medium mb-3">
            {product.tagline}
          </p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.shortDescription}
          </p>

          <div className="mb-4 space-y-2">
            {product.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-left">
                <span className="text-lg">{feature.icon}</span>
                <span className="text-gray-600 line-clamp-1">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>

          <div className={`border-t pt-4 mt-4 ${isList ? "md:flex md:items-center md:justify-between" : ""}`}>
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div>
                {originalPriceLabel && (
                  <span className="text-gray-400 line-through text-sm mr-2">
                    {originalPriceLabel}
                  </span>
                )}
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {priceLabel}
                </span>
              </div>
            </div>

            <div className={`flex gap-3 ${isList ? "md:w-auto" : ""}`}>
              <motion.button
                onClick={() => onQuickView(product)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 py-3 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-100 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Обзор
              </motion.button>
              <motion.button
                onClick={() => onBuyClick(product)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Купить</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
