"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { allProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function ProductsPage() {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
          <div className="container-1200 py-16 md:py-24">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="heading mb-6">Наши продукты</h1>
              <p className="subheading text-xl mb-8">
                Профессиональные Notion-шаблоны для продуктивности и учёбы.
                Выберите подходящий план или возьмите всё сразу со скидкой.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Гарантия 30 дней</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>500+ пользователей</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>4.9★ рейтинг</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container-1200">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/products/${product.slug}`} className="block group h-full">
                    <div className="h-full bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[var(--brand)] hover:shadow-2xl transition-all duration-300 flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">📊</div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {product.isPopular && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[var(--brand)] to-blue-500 text-white text-xs font-semibold shadow-lg">
                              🔥 Популярный
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold shadow-lg">
                              ⭐ Бестселлер
                            </span>
                          )}
                          {product.discount && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--brand)] transition">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-1">{product.tagline}</p>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                          {product.shortDescription}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
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

                        {/* Price */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            {product.originalPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                {product.originalPrice.toLocaleString()} ₸
                              </div>
                            )}
                            <div className="text-3xl font-bold text-[var(--brand)]">
                              {product.price.toLocaleString()} ₸
                            </div>
                          </div>
                          <div className="text-[var(--brand)] font-semibold group-hover:translate-x-1 transition">
                            Подробнее →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-100 bg-gradient-to-br from-[var(--brand)]/5 to-blue-50">
          <div className="container-1200 py-20 text-center">
            <h2 className="heading mb-4">Не можете выбрать?</h2>
            <p className="subheading mb-8 max-w-2xl mx-auto">
              Возьмите Полный набор и получите оба шаблона со скидкой 30%. 
              Экономия 1,490₸!
            </p>
            <Link
              href="/products/bundle"
              className="btn text-lg px-8 h-14"
            >
              Смотреть Полный набор
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
