"use client";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductDeliveryProps {
  deliveryInfo: Product["deliveryInfo"];
}

export default function ProductDelivery({ deliveryInfo }: ProductDeliveryProps) {
  return (
    <section className="border-t border-gray-100 bg-white">
      <div className="container-1200 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading mb-4">{deliveryInfo.title}</h2>
            <p className="subheading">{deliveryInfo.timeline}</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--brand)] to-blue-300 hidden md:block" />

            <div className="space-y-8">
              {deliveryInfo.steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Number circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand)] to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-3">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final note */}
          <motion.div
            className="mt-12 text-center p-6 bg-green-50 border border-green-200 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl mb-2">✓</div>
            <p className="text-green-800 font-semibold">
              Никаких сложностей! Получите доступ за пару минут
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
