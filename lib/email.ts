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
  study: {
    subject: "Ваш доступ к «Планер для учебы»",
    preheader: "Скопируйте шаблон в Notion и настройте расписание за несколько минут",
    intro:
      "Спасибо за покупку! Ниже — ссылка на учебный планер. Откройте её в Notion, нажмите «Duplicate» и начните вести занятия, задания и конспекты в одном месте.",
    outro:
      "Если нужна помощь с настройкой или переносом данных, просто ответьте на письмо — мы быстро подскажем.",
    links: [
      {
        label: "Планер для учебы — скопировать в Notion",
        envKey: "DELIVERY_LINK_STUDY",
        required: true,
      },
    ],
  },
  freelancer: {
    subject: "Ваш доступ к «Планер фрилансера»",
    preheader: "Ссылка на систему управления проектами и клиентами внутри письма",
    intro:
      "Фриланс-бизнес под контролем! Перейдите по ссылке, сделайте Duplicate и ведите клиентов, проекты и финансы в одном пространстве.",
    outro:
      "Если хотите адаптировать шаблон под свою нишу, напишите нам — поделимся best practices.",
    links: [
      {
        label: "Планер фрилансера — скопировать в Notion",
        envKey: "DELIVERY_LINK_FREELANCER",
        required: true,
      },
    ],
  },
  "client-portal": {
    subject: "Ваш доступ к «Клиентский портал»",
    preheader: "Ссылки для персональных кабинетов клиентов внутри",
    intro:
      "Создайте профессиональные пространства для клиентов: проекты, оплаты и файлы будут всегда под рукой. Скопируйте шаблон и начните делиться порталом уже сегодня.",
    outro:
      "Если нужна помощь с онбордингом клиентов или настройкой прав доступа — мы рядом.",
    links: [
      {
        label: "Клиентский портал — скопировать в Notion",
        envKey: "DELIVERY_LINK_CLIENT_PORTAL",
        required: true,
      },
    ],
  },
  "school-student": {
    subject: "Ваш доступ к «Школьный планер»",
    preheader: "Шаблон для учёбы и контроля заданий — внутри письма",
    intro:
      "Давайте наведём порядок в школе! Скопируйте шаблон в свой Notion, добавьте уроки и дедлайны — и учебный процесс станет заметно проще.",
    outro:
      "Если планер настраивают родители или наставник — смело пересылайте ссылку им, доступ останется за вами.",
    links: [
      {
        label: "Школьный планер — скопировать в Notion",
        envKey: "DELIVERY_LINK_SCHOOL_STUDENT",
        required: true,
      },
    ],
  },
  "project-tracker": {
    subject: "Ваш доступ к «Трекер миссий»",
    preheader: "Геймифицированный трекер целей — ссылка внутри",
    intro:
      "Миссии готовы к запуску! Скопируйте шаблон в Notion, придумайте награды и отслеживайте прогресс с удовольствием.",
    outro:
      "Нужна помощь с геймификацией или идеями для миссий? Ответьте на письмо — обсудим.",
    links: [
      {
        label: "Трекер миссий — скопировать в Notion",
        envKey: "DELIVERY_LINK_PROJECT_TRACKER",
        required: true,
      },
    ],
  },
  para: {
    subject: "Ваш доступ к «PARA Dashboard»",
    preheader: "Projects, Areas, Resources и Archives — ссылка внутри",
    intro:
      "Добро пожаловать в систему PARA! Скопируйте шаблон, перенесите проекты и ресурсы — и ваш Second Brain готов к работе.",
    outro:
      "Если хотите подсказки по методологии Tiago Forte, просто ответьте на письмо — поделимся инструкциями.",
    links: [
      {
        label: "PARA Dashboard — скопировать в Notion",
        envKey: "DELIVERY_LINK_PARA",
        required: true,
      },
    ],
  },
  workout: {
    subject: "Ваш доступ к «Workout планер»",
    preheader: "План тренировок и трекер прогресса — ссылка в письме",
    intro:
      "Готовы к тренировкам? Скопируйте шаблон и начните планировать программы, отслеживать подходы и фиксировать прогресс.",
    outro:
      "Если нужно добавить питание или другие метрики — напишите нам, расскажем как расширить шаблон.",
    links: [
      {
        label: "Workout планер — скопировать в Notion",
        envKey: "DELIVERY_LINK_WORKOUT",
        required: true,
      },
    ],
  },
  muslim: {
    subject: "Ваш доступ к «Муслим планер»",
    preheader: "Трекер молитв и духовных практик — ссылка внутри",
    intro:
      "Пусть духовная дисциплина будет под защитой. Скопируйте шаблон и отслеживайте молитвы, цели и благие дела в едином месте.",
    outro:
      "Если захотите добавить семейные или групповые трекеры — подскажем, как сделать это удобно.",
    links: [
      {
        label: "Муслим планер — скопировать в Notion",
        envKey: "DELIVERY_LINK_MUSLIM",
        required: true,
      },
    ],
  },
  content: {
    subject: "Ваш доступ к «Планер креатора»",
    preheader: "Банк идей, контент-план и аналитика — ссылка в письме",
    intro:
      "Пора в стройный контент-процесс! Скопируйте шаблон в Notion, заполните банк идей и запустите контент-план по каналам.",
    outro:
      "Если хотите адаптировать планер под команду или конкретную платформу — просто ответьте на письмо, мы поможем.",
    links: [
      {
        label: "Планер креатора — скопировать в Notion",
        envKey: "DELIVERY_LINK_CONTENT",
        required: true,
      },
    ],
  },
  bundle: {
    subject: "Ваш полный доступ ко всем планерам Planery Studio",
    preheader: "Внутри письма — ссылки на все 9 шаблонов и инструкции по старту",
    intro:
      "Поздравляем с приобретением полного набора! Ниже — ссылки на все девять планеров. Откройте каждую, нажмите «Duplicate» и соберите единую экосистему планирования.",
    outro:
      "Если захотите связать планеры между собой или настроить командный доступ — ответьте на письмо, и мы подскажем лучшие практики.",
    links: [
      {
        label: "Планер для учебы",
        envKey: "DELIVERY_LINK_STUDY",
        required: true,
      },
      {
        label: "Планер фрилансера",
        envKey: "DELIVERY_LINK_FREELANCER",
        required: true,
      },
      {
        label: "Клиентский портал",
        envKey: "DELIVERY_LINK_CLIENT_PORTAL",
        required: true,
      },
      {
        label: "Школьный планер",
        envKey: "DELIVERY_LINK_SCHOOL_STUDENT",
        required: true,
      },
      {
        label: "Трекер миссий",
        envKey: "DELIVERY_LINK_PROJECT_TRACKER",
        required: true,
      },
      {
        label: "PARA Dashboard",
        envKey: "DELIVERY_LINK_PARA",
        required: true,
      },
      {
        label: "Workout планер",
        envKey: "DELIVERY_LINK_WORKOUT",
        required: true,
      },
      {
        label: "Муслим планер",
        envKey: "DELIVERY_LINK_MUSLIM",
        required: true,
      },
      {
        label: "Планер креатора",
        envKey: "DELIVERY_LINK_CONTENT",
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
