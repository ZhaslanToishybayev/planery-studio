import { Resend } from "resend";
import type { Product } from "@/data/products";

interface DeliveryLinkDescriptor {
  label: string;
  envKey: string;
  required?: boolean;
}

interface DeliveryDetails {
  subject: string;
  preheader: string;
  intro: string;
  outro: string;
  links: DeliveryLinkDescriptor[];
}

interface ResolvedDeliveryLink {
  label: string;
  url: string;
}

const DELIVERY_CONFIG: Record<string, DeliveryDetails> = {
  productivity: {
    subject: "Ваш доступ к «Набор продуктивности»",
    preheader: "Скопируйте шаблон в Notion и начните пользоваться сразу",
    intro:
      "Спасибо за покупку! Ниже — ссылки на ваш шаблон и дополнительные материалы. Просто откройте Notion, нажмите «Duplicate» и шаблон появится в вашем рабочем пространстве.",
    outro:
      "Если возникнут вопросы, ответьте на это письмо или напишите нам в Telegram — мы всегда рядом и поможем с настройкой.",
    links: [
      {
        label: "Основной шаблон в Notion",
        envKey: "DELIVERY_LINK_PRODUCTIVITY_MAIN",
        required: true,
      },
    ],
  },
  student: {
    subject: "Ваш доступ к «Дэшборд студента»",
    preheader: "Ссылка для копирования шаблона в Notion внутри",
    intro:
      "Отличный выбор! Скопируйте шаблон по ссылке ниже и настройте его под свои занятия. Мы добавили все представления, чтобы учёба была под контролем.",
    outro:
      "Нужна помощь? Просто ответьте на письмо или напишите нам в Telegram — поддержка отвечает быстро.",
    links: [
      {
        label: "Шаблон в Notion",
        envKey: "DELIVERY_LINK_STUDENT_MAIN",
        required: true,
      },
    ],
  },
  bundle: {
    subject: "Ваш доступ к комплексу «Planery Bundle»",
    preheader: "Две ссылки внутри письма — продуктивность и учёба",
    intro:
      "Поздравляем с покупкой полного комплекта! Ниже две ссылки: первая — система продуктивности, вторая — дэшборд студента. Скопируйте оба шаблона себе в Notion.",
    outro:
      "Если нужна подсказка по настройке или интеграции двух шаблонов, просто ответьте на это письмо — мы поможем пошагово.",
    links: [
      {
        label: "Набор продуктивности — Notion",
        envKey: "DELIVERY_LINK_BUNDLE_PRODUCTIVITY",
        required: true,
      },
      {
        label: "Дэшборд студента — Notion",
        envKey: "DELIVERY_LINK_BUNDLE_STUDENT",
        required: true,
      },
    ],
  },
};

const resendClient = process.env.EMAIL_SERVICE_API_KEY
  ? new Resend(process.env.EMAIL_SERVICE_API_KEY)
  : null;

function resolveDeliveryLinks(slug: string) {
  const config = DELIVERY_CONFIG[slug];
  if (!config) {
    return { config: undefined, links: [] as ResolvedDeliveryLink[], missing: [] as string[] };
  }

  const missing: string[] = [];
  const links: ResolvedDeliveryLink[] = [];

  for (const descriptor of config.links) {
    const url = process.env[descriptor.envKey];
    if (!url) {
      if (descriptor.required) {
        missing.push(descriptor.envKey);
      }
      continue;
    }
    links.push({
      label: descriptor.label,
      url,
    });
  }

  return { config, links, missing };
}

function renderHtml({
  product,
  name,
  intro,
  outro,
  preheader,
  links,
}: {
  product: Product;
  name?: string;
  intro: string;
  outro: string;
  preheader: string;
  links: ResolvedDeliveryLink[];
}) {
  const greeting = name ? `${name.trim()},` : "Привет!";
  const linkList = links
    .map(
      (link) => `
        <tr>
          <td style="padding: 12px 0;">
            <a
              href="${link.url}"
              style="
                display: inline-block;
                padding: 14px 22px;
                border-radius: 999px;
                background: #1d4ed8;
                color: #ffffff;
                font-weight: 600;
                text-decoration: none;
              "
            >
              ${link.label}
            </a>
          </td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Доступ к ${product.name}</title>
  </head>
  <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; padding: 24px 0; color: #111827;">
    <span style="display:none !important; visibility:hidden; opacity:0; height:0; width:0; overflow:hidden; color:transparent;">${preheader}</span>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; border-radius: 24px; padding: 32px;">
            <tr>
              <td style="font-size: 16px; line-height: 26px;">
                <p style="margin: 0 0 16px;">${greeting}</p>
                <p style="margin: 0 0 16px;">${intro}</p>
                ${
                  links.length > 0
                    ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin: 12px 0 20px;">${linkList}</table>`
                    : ""
                }
                <p style="margin: 16px 0;">${outro}</p>
                <p style="margin: 16px 0;">С теплом,<br/>Команда Planery Studio</p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                  Если ссылки не открываются, напишите нам в Telegram <a href="https://t.me/planery_studio" style="color: #2563eb;">@planery_studio</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText({
  name,
  intro,
  outro,
  links,
}: {
  product: Product;
  name?: string;
  intro: string;
  outro: string;
  links: ResolvedDeliveryLink[];
}) {
  const greeting = name ? `${name.trim()},` : "Привет!";
  const linkList = links
    .map((link) => `- ${link.label}: ${link.url}`)
    .join("\n");

  return `${greeting}

${intro}

${linkList}

${outro}

С теплом,
Команда Planery Studio

Если ссылки не открываются, напишите нам в Telegram @planery_studio.`;
}

interface SendPurchaseEmailInput {
  email: string;
  name?: string;
  product: Product;
}

export async function sendPurchaseEmail({ email, name, product }: SendPurchaseEmailInput) {
  if (!resendClient) {
    console.error("[Email] EMAIL_SERVICE_API_KEY не задан, письмо не отправлено");
    return;
  }

  const from = process.env.EMAIL_FROM;
  if (!from) {
    console.error("[Email] EMAIL_FROM не задан, письмо не отправлено");
    return;
  }

  const { config, links, missing } = resolveDeliveryLinks(product.slug);

  if (!config) {
    console.error(`[Email] Нет конфигурации доставки для продукта ${product.slug}`);
    return;
  }

  if (missing.length > 0) {
    console.error(
      `[Email] Не заданы переменные окружения для ссылок: ${missing.join(
        ", "
      )}. Письмо не отправлено`
    );
    return;
  }

  const html = renderHtml({
    product,
    name,
    intro: config.intro,
    outro: config.outro,
    preheader: config.preheader,
    links,
  });

  const text = renderText({
    product,
    name,
    intro: config.intro,
    outro: config.outro,
    links,
  });

  console.info(`[Email] Отправка письма ${email} для продукта ${product.slug}`);
  const response = await resendClient.emails.send({
    from,
    to: email,
    subject: config.subject,
    html,
    text,
    headers: {
      "X-Planery-Product": product.slug,
    },
  });
  if ("data" in response && response.data) {
    console.info("[Email] Resend response id", response.data.id);
  } else if ("error" in response && response.error) {
    console.error("[Email] Resend API error", response.error);
  } else {
    console.info("[Email] Resend raw response", response);
  }
}
