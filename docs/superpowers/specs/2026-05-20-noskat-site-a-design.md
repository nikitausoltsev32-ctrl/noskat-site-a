# NOSECUT CHINA — Сайт А: Дизайн-документ

**Дата:** 2026-05-20  
**Проект:** SEO-информационный портал про ноускаты из Китая  
**Стек:** Next.js 14 App Router · TypeScript · Tailwind CSS · SSG

---

## 1. Решения

| Вопрос | Решение | Обоснование |
|---|---|---|
| Рендеринг | SSG (generateStaticParams) | Mock-данные, нет CMS, максимальный SEO |
| Роутер | App Router | ТЗ прямо указывает |
| Данные | Файлы в /data | CMS не планируется на этом этапе |
| Стиль | Tailwind CSS + CSS variables | Тёмная тема, кастомные цвета |
| Структура | Плоская по типу сущности | Проект не достаточно большой для feature-based |

---

## 2. Архитектура

### Структура файлов

```
/app
  layout.tsx                    ← root layout, CookieBanner
  page.tsx                      ← главная
  /news
    page.tsx                    ← список новостей
    /[slug]/page.tsx            ← детальная новость
    /category/[slug]/page.tsx   ← категория новостей
  /articles
    page.tsx                    ← список статей
    /[slug]/page.tsx            ← детальная статья
    /category/[slug]/page.tsx   ← категория статей
  /brands
    page.tsx                    ← список брендов
    /[slug]/page.tsx            ← SEO-хаб бренда
  /about/page.tsx
  /contacts/page.tsx
  /advertising/page.tsx
  /legal/privacy/page.tsx
  /legal/cookies/page.tsx
  /legal/terms/page.tsx
  not-found.tsx                 ← кастомная 404

/components
  /layout
    Header.tsx                  ← sticky, burger menu, scroll effect
    Footer.tsx
  /sections
    HeroPortal.tsx              ← H1, chips, кнопки, dark visual
    TodaySection.tsx            ← "Главное сегодня" — слайдер/лента
    NewsSection.tsx             ← блок последних новостей на главной
    ArticlesSection.tsx         ← блок статей/обзоров на главной
    CategoriesSection.tsx       ← блок категорий
    PopularSection.tsx          ← популярные материалы
    BrandsSection.tsx           ← бренды/хабы на главной
    FaqSection.tsx              ← FAQ аккордеон
    RelatedMaterials.tsx        ← похожие материалы
    ShareBlock.tsx              ← кнопки шеринга
  /cards
    NewsCard.tsx                ← image, tag, title, excerpt, date, views
    ArticleCard.tsx             ← крупнее, акцент на экспертность, readTime
    BrandCard.tsx               ← лого, название, краткое описание
  /ui
    Button.tsx                  ← варианты: primary, ghost, outline
    Tag.tsx                     ← категорийный тег / chip
    Chip.tsx                    ← фильтр-чип
    Breadcrumbs.tsx
    Pagination.tsx              ← нумерованная: 1 2 ... 5 6
    Sidebar.tsx                 ← популярные материалы в sidebar
    ArticleBody.tsx             ← типографика для тела статьи
    SectionHeader.tsx           ← заголовок раздела + ссылка "все"
  CookieBanner.tsx              ← localStorage, Яндекс.Метрика consent

/data
  news.ts                       ← NewsPost[]
  articles.ts                   ← Article[]
  brands.ts                     ← Brand[]
  categories.ts                 ← Category[]
  faq.ts                        ← FaqItem[]

/lib
  seo.ts                        ← generateMeta(), generateSchema()
  routes.ts                     ← ROUTES константы
  utils.ts                      ← formatDate(), calcReadTime()

/types
  index.ts                      ← все TypeScript-типы

/public
  /brand
    logo-circle.png
    hero-bg.png
    banner.png
```

---

## 3. Типы данных

```typescript
// /types/index.ts

interface NewsPost {
  slug: string
  title: string
  excerpt: string
  body: string           // HTML-строка
  category: string       // slug категории
  date: string           // ISO 8601
  readTime: number       // минуты
  image: string          // путь или URL
  views: number
  tags?: string[]
}

interface Article {
  slug: string
  title: string
  excerpt: string
  body: string           // HTML-строка
  category: string
  date: string
  readTime: number
  image: string
  tags?: string[]
}

interface Brand {
  slug: string
  name: string
  description: string
  models: string[]
  newsIds: string[]      // slug[]
  articleIds: string[]   // slug[]
  faq: FaqItem[]
}

interface Category {
  slug: string
  name: string
  type: 'news' | 'articles'
  description: string
}

interface FaqItem {
  question: string
  answer: string
}

interface SeoMeta {
  title: string
  description: string
  canonical: string
  og: { title: string; description: string; image?: string }
  schema?: object
}
```

---

## 4. SEO-архитектура

Каждая страница экспортирует `generateMetadata()`. Библиотека `/lib/seo.ts` предоставляет хелперы.

### Схемы JSON-LD

| Страница | Схема |
|---|---|
| Главная | WebSite + Organization |
| Детальная новость/статья | Article |
| Страница бренда | Organization + FAQPage |
| Любая страница | BreadcrumbList |
| Главная + бренды | FAQPage |

### Технические требования

- `sitemap.ts` — автогенерация из /data
- `robots.ts` — разрешить всё, кроме /legal/*
- Canonical на каждой странице
- OG-теги: title, description, image, type
- slug-URL: `/news/haval-f7x-novaya-model-2024`

---

## 5. Компонентная схема главной

```
<Header />                        sticky, blur on scroll
<main>
  <HeroPortal />                  H1, подзаголовок, chips, 2 кнопки, тёмный visual
  <TodaySection />                "Главное сегодня" — 3-4 топ-новости
  <NewsSection />                 последние 6 новостей + ссылка на /news
  <ArticlesSection />             последние 4 статьи + ссылка на /articles
  <CategoriesSection />           сетка 8 категорий с иконками
  <PopularSection />              топ-5 материалов
  <BrandsSection />               сетка 9 брендов
  <FaqSection />                  6 вопросов, аккордеон
</main>
<Footer />
<CookieBanner />                  fixed bottom, localStorage
```

---

## 6. Визуальная система

### CSS-переменные (tailwind.config.ts + globals.css)

```css
--bg: #0a0a0b          /* основной фон */
--bg-card: #111113     /* фон карточек */
--bg-elevated: #1a1a1d /* приподнятые элементы */
--border: #222225      /* бордеры */
--acc: #e53935         /* красный акцент */
--acc-hover: #c62828   /* hover акцента */
--text-primary: #f0f0f0
--text-secondary: #888
--text-muted: #555
```

### Шрифты

- **Oswald** — заголовки, логотип, навигация (700 italic для бренда)
- **Inter** — тело, карточки, UI

### Breakpoints (из ТЗ)

- `1440px` — расширенный desktop
- `1200px` — основной desktop
- `768px` — tablet
- `390px / 360px` — mobile

---

## 7. Cookie Banner

- Хранение: `localStorage` ключ `nc_cookie_consent`
- Значения: `{ necessary: true, analytics: boolean }`
- Яндекс.Метрика: подключается только если `analytics: true`
- Три действия: "Принять всё" / "Только необходимые" / "Настройки"
- В настройках: toggle аналитических, кнопка "Сохранить"

---

## 8. Порядок реализации (первый этап по ТЗ)

1. Инициализация проекта (next, ts, tailwind, структура папок)
2. Design system: globals.css, tailwind.config, шрифты
3. Типы `/types/index.ts`
4. Mock-данные `/data/*`
5. `/lib/seo.ts`, `/lib/routes.ts`, `/lib/utils.ts`
6. UI-компоненты: Button, Tag, Chip, Breadcrumbs, Pagination
7. Header + Footer
8. HeroPortal
9. Карточки: NewsCard, ArticleCard, BrandCard
10. Главная страница (desktop + mobile)
11. CookieBanner
12. sitemap.ts + robots.ts

После — остальные шаблоны страниц.

---

## 9. Что НЕ входит в Сайт А

- Форма заявки
- Калькулятор стоимости
- Подбор ноуската
- Любые коммерческие CTA
- Сайт Б (лидогенерация) — отдельный проект
