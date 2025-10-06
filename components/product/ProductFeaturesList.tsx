"use client";
import { motion } from "framer-motion";
import { ProductFeature } from "@/data/products";

interface ProductFeaturesListProps {
  features: ProductFeature[];
}

export default function ProductFeaturesList({ features }: ProductFeaturesListProps) {
  return (
    <section id="features" className="border-t border-gray-100 bg-white">
      <div className="container-1200 py-20">
        <div className="text-center mb-16">
          <h2 className="heading mb-4">Что внутри</h2>
          <p className="subheading">
            Детальный обзор всех возможностей шаблона
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? "" : "lg:grid-flow-dense"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Screenshot */}
              <div
                className={`relative ${
                  index % 2 === 0 ? "" : "lg:col-start-2"
                }`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-6xl">{feature.icon}</div>
                  </div>
                  {/* Placeholder - в реальности будет изображение */}
                </div>
              </div>

              {/* Content */}
              <div
                className={index % 2 === 0 ? "" : "lg:col-start-1 lg:row-start-1"}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--brand)]/10 text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
