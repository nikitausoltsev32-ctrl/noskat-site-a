# NOSECUT CHINA

**Информационный портал про ноускаты из Китая**

Новости китайского авторынка, обзоры ноускатов, брендовые SEO-хабы, статьи про поставки, логистику и таможню.

🌐 **[noskat-site-a.vercel.app](https://noskat-site-a.vercel.app)**

---

## Стек

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Язык | TypeScript |
| Стили | Tailwind CSS |
| Деплой | Vercel |

---

## Страницы

```
/                          — Главная
/news                      — Список новостей
/news/[slug]               — Детальная новость
/news/category/[slug]      — Категория новостей
/articles                  — Список статей
/articles/[slug]           — Детальная статья
/articles/category/[slug]  — Категория статей
/brands                    — Список брендов
/brands/[slug]             — Брендовый SEO-хаб
/about                     — О проекте
/contacts                  — Контакты
/advertising               — Реклама
/legal/privacy             — Политика конфиденциальности
/legal/cookies             — Cookie-политика
/legal/terms               — Пользовательское соглашение
```

---

## SEO

- `title` / `description` / `canonical` на каждой странице
- OpenGraph с image и type
- `Article` JSON-LD на детальных страницах новостей и статей
- `BreadcrumbList` JSON-LD на всех внутренних страницах
- `FAQPage` JSON-LD на главной и брендовых хабах
- `sitemap.xml` — все маршруты
- `robots.txt`
- Нумерованная пагинация (не infinite scroll)

---

## Безопасность

Security headers на всех маршрутах:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Cookie

Баннер при первом заходе:

- **Принять всё** — включает аналитику
- **Только необходимые** — без аналитики
- **Настройки** — toggle для Яндекс.Метрики

Выбор сохраняется в `localStorage`. Яндекс.Метрика загружается только после согласия.

---

## Структура

```
/app              — маршруты (App Router)
/components
  /cards          — NewsCard, ArticleCard, BrandCard
  /layout         — Header, Footer
  /sections       — Hero, FAQ, Today, Popular, Brands и др.
  /ui             — Button, Tag, Chip, Breadcrumbs, Pagination, Sidebar, ShareBlock
/data             — mock-данные (news, articles, brands, categories, faq)
/lib              — seo.ts, routes.ts, utils.ts
/public/brand     — логотип и изображения
```

---

## Запуск

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

---

## Бренды

Haval · Chery · Geely · Changan · BYD · Exeed · Tank · Li Auto · Zeekr
