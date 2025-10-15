"use client";
import { useState } from "react";
import { Product } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductHero from "@/components/product/ProductHero";
import ProductFeaturesList from "@/components/product/ProductFeaturesList";
import ProductGalleryDetailed from "@/components/product/ProductGalleryDetailed";
import ProductIncludes from "@/components/product/ProductIncludes";
import ProductDelivery from "@/components/product/ProductDelivery";
import ProductFAQ from "@/components/product/ProductFAQ";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyProductCTA from "@/components/product/StickyProductCTA";
import CheckoutModal from "@/components/CheckoutModal";
import CookieConsent from "@/components/CookieConsent";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleBuyClick = () => {
    setIsCheckoutOpen(true);
    console.log("Product buy clicked:", product.name);
  };

  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        <ProductBreadcrumbs productName={product.name} />

        <ProductHero product={product} onBuyClick={handleBuyClick} />

        {/* Full Description */}
        <section className="border-t border-gray-100 bg-white">
          <div className="container-1200 py-16">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {product.fullDescription}
              </div>
            </div>
          </div>
        </section>

        <ProductFeaturesList features={product.features} />

        <ProductGalleryDetailed
          gallery={product.gallery}
          productName={product.name}
        />

        <ProductIncludes included={product.included} />

        <ProductDelivery deliveryInfo={product.deliveryInfo} />

        {/* Requirements */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="container-1200 py-16">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Требования</h3>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {product.requirements}
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProductFAQ faq={product.faq} />

        <RelatedProducts products={relatedProducts} />

        {/* Final CTA */}
        <section className="border-t border-gray-100 bg-gradient-to-br from-[var(--brand)]/10 to-blue-50">
          <div className="container-1200 py-20 text-center">
            <h2 className="heading mb-4">Готовы начать?</h2>
            <p className="subheading mb-8 max-w-2xl mx-auto">
              Получите {product.name} прямо сейчас и начните организовывать жизнь уже сегодня
            </p>
            <button
              onClick={handleBuyClick}
              className="btn text-lg px-8 h-14"
            >
              Купить за {product.price.toLocaleString()} ₸
            </button>
            <div className="mt-6 text-sm text-gray-600">
              ✓ Моментальная доставка • ✓ Для Notion • ✓ Пожизненный доступ
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky CTA */}
      <StickyProductCTA product={product} onBuyClick={handleBuyClick} />

      {/* Cookie Consent */}
      <CookieConsent />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productTitle={product.name}
        productPrice={`${product.price.toLocaleString()} ₸`}
        productSlug={product.slug}
      />
    </>
  );
}
