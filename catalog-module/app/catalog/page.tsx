"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts, Product } from "../../data/products";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CheckoutModal from "../../components/CheckoutModal";
import ScrollProgress from "../../components/ScrollProgress";
import CookieConsent from "../../components/CookieConsent";
import QuickViewModal from "../../components/QuickViewModal";
import AnimatedTitle from "../../components/AnimatedTitle";
import ProductCardBalanced from "../../components/ProductCardBalanced";

type SortOption = "popular" | "price-asc" | "price-desc" | "rating";

export default function CatalogPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    title: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleBuyClick = (title: string, price: number) => {
    setSelectedProduct({ title, price: `${price}₸` });
    setIsCheckoutOpen(true);
  };

  const handleQuickView = (product: Product) => {
    console.log("Opening Quick View for:", product.name);
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    console.log("Closing Quick View");
    setIsQuickViewOpen(false);
  };

  const categories = useMemo(() => [
    { id: "all", name: "Все товары" },
    { id: "productivity", name: "Продуктивность" },
    { id: "education", name: "Образование" },
    { id: "business", name: "Бизнес" },
    { id: "special", name: "Специальные" },
  ], []);

  const getCategoryForProduct = useMemo(() => (tags: string[]) => {
    if (tags.includes("productivity") || tags.includes("para") || tags.includes("habits")) return "productivity";
    if (tags.includes("student") || tags.includes("education") || tags.includes("school") || tags.includes("study")) return "education";
    if (tags.includes("freelance") || tags.includes("clients") || tags.includes("projects") || tags.includes("business")) return "business";
    if (tags.includes("muslim") || tags.includes("spiritual") || tags.includes("fitness") || tags.includes("workout") || tags.includes("content")) return "special";
    return "productivity";
  }, []);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allProducts.forEach(product => {
      product.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).slice(0, 10); // Limit to 10 most common tags
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };
    categories.forEach(cat => {
      if (cat.id !== "all") {
        counts[cat.id] = allProducts.filter(p => getCategoryForProduct(p.tags) === cat.id).length;
      }
    });
    return counts;
  }, [categories, getCategoryForProduct]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => 
        getCategoryForProduct(product.tags) === selectedCategory
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popular":
          // First sort by isPopular/isBestSeller, then by reviewCount
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, selectedTags, searchQuery, sortBy, getCategoryForProduct]);

  return (
    <>
      <ScrollProgress />
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white pt-24 pb-16 relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <AnimatedTitle />
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Готовые решения для продуктивности, учёбы, бизнеса и личного развития. 
              Выберите свой идеальный планер!
            </p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Поиск по названию, описанию, тегам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg transition-colors shadow-md focus:shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Filters Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6"
            >
              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? "bg-white/20"
                        : "bg-gray-100"
                    }`}>
                      {categoryCounts[category.id] || 0}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:outline-none text-sm font-medium bg-white"
                >
                  <option value="popular">По популярности</option>
                  <option value="rating">По рейтингу</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                </select>
              </div>
            </motion.div>

            {/* Tags Cloud */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-sm text-gray-600 mb-3">Быстрые тэги:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                      selectedTags.includes(tag)
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-purple-50 border border-gray-200"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results Count & Active Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-gray-500">Найдено товаров:</span>
                <span className="font-bold text-purple-600 text-lg">{filteredProducts.length}</span>
                <span className="text-gray-400">из {allProducts.length}</span>
              </div>

              {/* Active Filters Display */}
              {(selectedTags.length > 0 || searchQuery || selectedCategory !== "all") && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs text-gray-500">Активные фильтры:</span>
                  
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find(c => c.id === selectedCategory)?.name}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="hover:bg-purple-200 rounded-full p-0.5"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}

                  {selectedTags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                      #{tag}
                      <button
                        onClick={() => toggleTag(tag)}
                        className="hover:bg-pink-200 rounded-full p-0.5"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      Поиск: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedTags([]);
                    }}
                    className="text-xs text-gray-500 hover:text-purple-600 underline"
                  >
                    Очистить всё
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCardBalanced
                  key={product.id}
                  product={product}
                  index={index}
                  onQuickView={handleQuickView}
                  onBuyClick={handleBuyClick}
                />
            ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 px-4"
            >
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Товары не найдены
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? (
                    <>По запросу "<span className="font-semibold">{searchQuery}</span>" ничего не найдено</>
                  ) : selectedTags.length > 0 ? (
                    <>С выбранными тегами товары не найдены</>
                  ) : (
                    <>В этой категории пока нет товаров</>
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {(searchQuery || selectedCategory !== "all" || selectedTags.length > 0) && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSelectedTags([]);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
                    >
                      Сбросить все фильтры
                    </button>
                  )}
                  <Link
                    href="/"
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Не можете выбрать? 🤔
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Возьмите Полный набор со скидкой 30% и получите всё необходимое!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products/bundle"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Посмотреть Полный набор →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
      <CookieConsent />
      
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        product={quickViewProduct}
        onBuyClick={handleBuyClick}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productTitle={selectedProduct.title}
        productPrice={selectedProduct.price}
      />
    </>
  );
}
