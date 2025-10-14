export const FALLBACK_PROD_URL = "https://planery.studio";
export const FALLBACK_DEV_URL = "http://localhost:3000";

export const normalizeSiteUrl = (url: string | null | undefined) => {
  if (!url) {
    return FALLBACK_PROD_URL;
  }

  try {
    const cleaned = url.trim().replace(/\s/g, "");
    const prefixed = cleaned.startsWith("http") ? cleaned : `https://${cleaned}`;
    const parsed = new URL(prefixed);
    const normalized = `${parsed.protocol}//${parsed.host}`.replace(/\/+$/, "");
    return normalized || FALLBACK_PROD_URL;
  } catch {
    return FALLBACK_PROD_URL;
  }
};

const getRawSiteUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? FALLBACK_PROD_URL
      : FALLBACK_DEV_URL);

  return envUrl;
};

export const SITE_URL = normalizeSiteUrl(getRawSiteUrl());

interface ForwardedHeaders {
  get(name: string): string | null;
}

const getForwardedBase = (headers?: ForwardedHeaders) => {
  if (!headers) return null;

  const forwardedHost = headers.get("x-forwarded-host");
  if (!forwardedHost) return null;

  const forwardedProto = headers.get("x-forwarded-proto") ?? "https";
  return `${forwardedProto}://${forwardedHost}`;
};

export const getRequestBaseUrl = (
  request?: Request,
  headers?: ForwardedHeaders
) => {
  if (request) {
    try {
      const requestUrl = new URL(request.url);
      const explicitForwarded = getForwardedBase(headers);
      return (
        explicitForwarded ??
        `${requestUrl.protocol}//${requestUrl.host}` ??
        SITE_URL
      );
    } catch {
      // Ignore parsing issues and fallback
    }
  }

  const explicitForwarded = getForwardedBase(headers);
  return explicitForwarded ?? SITE_URL;
};

export const siteConfig = {
  name: "Planery Studio",
  description:
    "Профессиональные шаблоны Notion для студентов и продуктивных людей",
  url: SITE_URL,
  ogImage: "/assets/planery-logo.png",
  links: {
    twitter: "https://twitter.com/planerystudio",
    github: "https://github.com/planerystudio",
    instagram: "https://instagram.com/planerystudio",
    telegram: "https://t.me/planerystudio",
    email: "mailto:support@planerystudio.com",
  },
  social: {
    twitter: "@planerystudio",
    instagram: "@planerystudio",
    telegram: "@planerystudio",
  },
  contact: {
    email: "support@planerystudio.com",
    telegram: "https://t.me/planerystudio",
    instagram: "https://instagram.com/planerystudio",
  },
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    yandexMetrika: process.env.NEXT_PUBLIC_YM_ID,
  },
};
