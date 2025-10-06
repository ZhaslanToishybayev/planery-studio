// Analytics Hook for tracking events

export const useAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, properties);
    }

    // Yandex Metrika
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(12345678, "reachGoal", eventName, properties);
    }

    // Console log for development
    console.log("📊 Analytics Event:", eventName, properties);
  };

  const trackPageView = (url: string) => {
    trackEvent("page_view", { page_path: url });
  };

  const trackPurchase = (plan: string, price: string) => {
    trackEvent("purchase", {
      plan,
      price,
      currency: "KZT",
    });
  };

  const trackCTAClick = (location: string, ctaText: string) => {
    trackEvent("cta_click", {
      location,
      cta_text: ctaText,
    });
  };

  const trackEmailSubmit = (source: string) => {
    trackEvent("email_submit", {
      source, // "lead_magnet", "newsletter", etc.
    });
  };

  const trackScrollDepth = (depth: number) => {
    trackEvent("scroll_depth", {
      depth_percentage: depth,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackPurchase,
    trackCTAClick,
    trackEmailSubmit,
    trackScrollDepth,
  };
};

// Predefined events
export const ANALYTICS_EVENTS = {
  VIEW_PRICING: "view_pricing",
  OPEN_CHECKOUT: "open_checkout",
  COMPLETE_PURCHASE: "complete_purchase",
  CLICK_CTA_HERO: "click_cta_hero",
  CLICK_CTA_STICKY: "click_cta_sticky",
  SUBMIT_LEAD_MAGNET: "submit_lead_magnet",
  VIEW_COMPARISON: "view_comparison",
  EXPAND_FAQ: "expand_faq",
  VIEW_TESTIMONIALS: "view_testimonials",
};
