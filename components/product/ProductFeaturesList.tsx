"use client";
import Image from "next/image";
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
              <div className={`relative ${index % 2 === 0 ? "" : "lg:col-start-2"}`}>
                <div className="absolute -top-8 -left-6 hidden md:block">
                  <div className="h-20 w-16 rounded-2xl overflow-hidden border border-white/60 shadow-lg bg-white/60 backdrop-blur">
                    <Image
                      src={feature.screenshot || "/assets/catalog/client-portal.png"}
                      alt={`${feature.title} — мини-превью`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </div>

                <div className="relative rounded-[36px] bg-gradient-to-br from-[#7f5af0] via-[#ff8ba7] to-[#ffd803] p-4 sm:p-7 shadow-[0_35px_60px_-40px_rgba(127,90,240,0.65)] overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_70%)]" />
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(140deg,rgba(255,255,255,0.4)_0%,transparent_45%,transparent_55%,rgba(255,255,255,0.4)_100%)]" />

                  <div className="relative rounded-[26px] border border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden">
                    <div className="relative aspect-[4/5] md:aspect-[3/4]">
                      <Image
                        src={feature.screenshot || "/assets/catalog/client-portal.png"}
                        alt={`${feature.title} — скриншот`}
                        fill
                        className="object-contain scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/15" />
                    <div className="absolute inset-0 border border-white/10 rounded-[26px] pointer-events-none" />
                  </div>
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
