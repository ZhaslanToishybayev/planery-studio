"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/data/products";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-gray-100 bg-white">
      <div className="container-1200 py-20">
        <div className="text-center mb-12">
          <h2 className="heading mb-4">Вам также может понравиться</h2>
          <p className="subheading">
            Другие наши популярные продукты
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[var(--brand)] hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={product.gallery[0] || "/assets/catalog/client-portal.png"}
                      alt={`Скриншот ${product.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {product.isPopular && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--brand)] text-white text-xs font-semibold">
                          🔥 Популярный
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--brand)] transition">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()} ₸
                          </div>
                        )}
                        <div className="text-2xl font-bold text-[var(--brand)]">
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
  );
}
