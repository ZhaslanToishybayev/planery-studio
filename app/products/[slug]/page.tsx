import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductFeaturesList from "@/components/product/ProductFeaturesList";
import ProductGalleryDetailed from "@/components/product/ProductGalleryDetailed";
import ProductIncludes from "@/components/product/ProductIncludes";
import ProductDelivery from "@/components/product/ProductDelivery";
import ProductFAQ from "@/components/product/ProductFAQ";
import RelatedProducts from "@/components/product/RelatedProducts";
import CookieConsent from "@/components/CookieConsent";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  return (
    <ProductPageClient product={product} relatedProducts={relatedProducts} />
  );
}

// Generate static params for all products
export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({
    slug,
  }));
}
