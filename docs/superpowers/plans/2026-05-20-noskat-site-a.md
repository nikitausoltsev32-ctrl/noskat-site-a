# NOSECUT CHINA — Сайт А: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Построить SEO-информационный портал про ноускаты из Китая на Next.js 14 App Router с SSG, TypeScript и Tailwind CSS.

**Architecture:** SSG через generateStaticParams, данные из mock-файлов в /data, плоская структура компонентов по типу (layout/sections/cards/ui). SEO через generateMetadata + JSON-LD схемы на каждой странице.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, App Router, Google Fonts (Oswald + Inter)

---

### Task 1: Инициализация проекта

**Files:**
- Create: `noskat-site-a/` (новая папка проекта)
- Create: `noskat-site-a/tailwind.config.ts`
- Create: `noskat-site-a/app/globals.css`
- Modify: `noskat-site-a/next.config.ts`

- [ ] **Step 1: Создать Next.js проект**

```bash
cd "C:\Users\HomePc\moskats china"
npx create-next-app@latest noskat-site-a --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd noskat-site-a
```

- [ ] **Step 2: Установить зависимости**

```bash
npm install clsx
```

- [ ] **Step 3: Создать структуру папок**

```bash
mkdir -p app/news/\[slug\] app/news/category/\[slug\]
mkdir -p app/articles/\[slug\] app/articles/category/\[slug\]
mkdir -p app/brands/\[slug\]
mkdir -p app/about app/contacts app/advertising
mkdir -p app/legal/privacy app/legal/cookies app/legal/terms
mkdir -p components/layout components/sections components/cards components/ui
mkdir -p data lib types public/brand
```

- [ ] **Step 4: Скопировать брендовые ассеты**

```bash
cp "C:\Users\HomePc\moskats china\export\extracted\cars-noscats\project\brand\logo-circle.png" public/brand/
cp "C:\Users\HomePc\moskats china\export\extracted\cars-noscats\project\brand\hero-bg.png" public/brand/
cp "C:\Users\HomePc\moskats china\export\extracted\cars-noscats\project\brand\banner.png" public/brand/
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: init Next.js project structure"
```

---

### Task 2: Design System

**Files:**
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Написать tailwind.config.ts**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0b',
        'bg-card': '#111113',
        'bg-elevated': '#1a1a1d',
        border: '#222225',
        acc: '#e53935',
        'acc-hover': '#c62828',
        'text-primary': '#f0f0f0',
        'text-secondary': '#888888',
        'text-muted': '#555555',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Написать globals.css**

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg text-text-primary font-body;
  }
  * {
    @apply border-border;
  }
}

@layer utilities {
  .container {
    @apply max-w-content mx-auto px-4 md:px-6;
  }
  .accent-line {
    @apply h-0.5 bg-acc;
  }
}
```

- [ ] **Step 3: Обновить app/layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: { default: 'NOSECUT CHINA — Ноускаты из Китая', template: '%s | NOSECUT CHINA' },
  description: 'Информационный портал про ноускаты из Китая. Новости, обзоры, бренды, поставки и рынок.',
  metadataBase: new URL('https://nosecutchina.ru'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Проверить сборку**

```bash
npm run build
```
Ожидание: сборка без ошибок.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: design system — tailwind config, globals, fonts"
```

---

### Task 3: TypeScript типы

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Написать types/index.ts**

```typescript
// types/index.ts

export interface NewsPost {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  date: string
  readTime: number
  image: string
  views: number
  tags?: string[]
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  date: string
  readTime: number
  image: string
  tags?: string[]
}

export interface Brand {
  slug: string
  name: string
  description: string
  models: string[]
  newsIds: string[]
  articleIds: string[]
  faq: FaqItem[]
}

export interface Category {
  slug: string
  name: string
  type: 'news' | 'articles'
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}
```

- [ ] **Step 2: Commit**

```bash
git add types/index.ts
git commit -m "feat: TypeScript types"
```

---

### Task 4: Mock данные

**Files:**
- Create: `data/categories.ts`
- Create: `data/news.ts`
- Create: `data/articles.ts`
- Create: `data/brands.ts`
- Create: `data/faq.ts`

- [ ] **Step 1: data/categories.ts**

```typescript
import type { Category } from '@/types'

export const NEWS_CATEGORIES: Category[] = [
  { slug: 'market', name: 'Новости рынка', type: 'news', description: 'Главные события китайского авторынка' },
  { slug: 'deliveries', name: 'Поставки', type: 'news', description: 'Логистика и поставки ноускатов из Китая' },
  { slug: 'customs', name: 'Таможня', type: 'news', description: 'Таможенное оформление кузовных запчастей' },
  { slug: 'brands', name: 'Бренды Китая', type: 'news', description: 'Новости китайских автомобильных брендов' },
]

export const ARTICLE_CATEGORIES: Category[] = [
  { slug: 'reviews', name: 'Обзоры авто', type: 'articles', description: 'Экспертные обзоры автомобилей и ноускатов' },
  { slug: 'logistics', name: 'Логистика', type: 'articles', description: 'Схемы доставки запчастей из Китая' },
  { slug: 'restoration', name: 'Восстановление авто', type: 'articles', description: 'Восстановление передней части авто' },
  { slug: 'parts', name: 'Запчасти из Китая', type: 'articles', description: 'Кузовные запчасти и комплектующие' },
]

export const ALL_CATEGORIES = [...NEWS_CATEGORIES, ...ARTICLE_CATEGORIES]
```

- [ ] **Step 2: data/news.ts**

```typescript
import type { NewsPost } from '@/types'

export const NEWS: NewsPost[] = [
  {
    slug: 'haval-f7x-2024-postavki-rossiya',
    title: 'Поставки Haval F7x выросли на 34% — новые партии ноускатов уже в пути',
    excerpt: 'Китайский завод Great Wall Motors нарастил производство F7x. Первые партии ноускатов уже отгружены из Тяньцзиня.',
    body: '<p>Завод Great Wall Motors в провинции Хэбэй увеличил суточную норму выпуска Haval F7x на 34% по сравнению с прошлым кварталом...</p>',
    category: 'deliveries',
    date: '2024-11-15',
    readTime: 3,
    image: '/brand/banner.png',
    views: 1240,
    tags: ['haval', 'f7x', 'поставки'],
  },
  {
    slug: 'chery-tiggo-8-noskat-obzor',
    title: 'Ноускат Chery Tiggo 8: что входит в комплект и как отличить оригинал',
    excerpt: 'Разбираем комплектацию переднего кузовного набора Chery Tiggo 8 и главные признаки качественного ноуската.',
    body: '<p>Chery Tiggo 8 остаётся одним из самых популярных автомобилей среди заказчиков ноускатов...</p>',
    category: 'market',
    date: '2024-11-12',
    readTime: 5,
    image: '/brand/banner.png',
    views: 987,
    tags: ['chery', 'tiggo8'],
  },
  {
    slug: 'geely-monjaro-tamozhnya-2024',
    title: 'Таможня 2024: новые правила ввоза кузовных запчастей из Китая',
    excerpt: 'С 1 декабря вступают в силу изменения в таможенном декларировании кузовных запчастей. Что важно знать.',
    body: '<p>Федеральная таможенная служба опубликовала разъяснения по новым кодам ТН ВЭД для кузовных деталей...</p>',
    category: 'customs',
    date: '2024-11-10',
    readTime: 4,
    image: '/brand/banner.png',
    views: 2100,
    tags: ['таможня', 'импорт'],
  },
  {
    slug: 'byd-atto3-rynok-rossiya',
    title: 'BYD Atto 3 захватывает рынок: спрос на ноускаты вырос вдвое',
    excerpt: 'Рост продаж BYD в России привёл к рекордному спросу на кузовные запчасти и ноускаты для этой модели.',
    body: '<p>По данным аналитической компании «Автостат», продажи BYD Atto 3 в России выросли в 2.1 раза...</p>',
    category: 'brands',
    date: '2024-11-08',
    readTime: 3,
    image: '/brand/banner.png',
    views: 1560,
    tags: ['byd', 'atto3'],
  },
  {
    slug: 'changan-uni-k-noskat-komplekt',
    title: 'Changan UNI-K: полный комплект ноуската за 6 недель',
    excerpt: 'Новый маршрут поставки через Владивосток сократил срок доставки ноуската Changan UNI-K с 10 до 6 недель.',
    body: '<p>Логистическая компания «Восток Авто» открыла новый маршрут доставки кузовных запчастей...</p>',
    category: 'deliveries',
    date: '2024-11-05',
    readTime: 3,
    image: '/brand/banner.png',
    views: 890,
    tags: ['changan', 'unik', 'логистика'],
  },
  {
    slug: 'exeed-tx-noskat-rynok',
    title: 'Exeed TX входит в топ-5 по запросам на ноускаты — аналитика ноября',
    excerpt: 'Exeed TX вошёл в пятёрку самых запрашиваемых автомобилей для подбора ноуската по итогам октября 2024.',
    body: '<p>Аналитика запросов на подбор ноускатов за октябрь 2024 года показала заметный рост интереса к модели Exeed TX...</p>',
    category: 'market',
    date: '2024-11-03',
    readTime: 2,
    image: '/brand/banner.png',
    views: 730,
    tags: ['exeed', 'аналитика'],
  },
]

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return NEWS.find(n => n.slug === slug)
}

export function getNewsByCategory(categorySlug: string): NewsPost[] {
  return NEWS.filter(n => n.category === categorySlug)
}

export function getLatestNews(count = 6): NewsPost[] {
  return [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count)
}

export function getPopularNews(count = 5): NewsPost[] {
  return [...NEWS].sort((a, b) => b.views - a.views).slice(0, count)
}
```

- [ ] **Step 3: data/articles.ts**

```typescript
import type { Article } from '@/types'

export const ARTICLES: Article[] = [
  {
    slug: 'chto-takoe-noskat-avtomobilya',
    title: 'Что такое ноускат автомобиля и зачем его везут из Китая',
    excerpt: 'Подробное объяснение: что входит в ноускат, почему именно Китай стал главным поставщиком, и как это работает.',
    body: '<p>Ноускат — это передняя часть кузова автомобиля в сборе...</p>',
    category: 'reviews',
    date: '2024-11-14',
    readTime: 8,
    image: '/brand/banner.png',
    tags: ['ноускат', 'объяснение', 'китай'],
  },
  {
    slug: 'logistika-noskatov-iz-kitaya-2024',
    title: 'Логистика ноускатов из Китая в 2024 году: маршруты, сроки, стоимость',
    excerpt: 'Актуальные схемы доставки кузовных запчастей из Китая. Владивосток, Казахстан, Монголия — сравниваем.',
    body: '<p>За последние два года логистика поставок из Китая кардинально изменилась...</p>',
    category: 'logistics',
    date: '2024-11-09',
    readTime: 10,
    image: '/brand/banner.png',
    tags: ['логистика', 'доставка', 'маршруты'],
  },
  {
    slug: 'haval-f7-noskat-obzor-zapchasti',
    title: 'Ноускат Haval F7: полный обзор комплектации и качества запчастей',
    excerpt: 'Детальный разбор комплекта ноуската для Haval F7. Что входит, чего ожидать, на что смотреть при приёмке.',
    body: '<p>Haval F7 — один из самых массовых китайских кроссоверов на российском рынке...</p>',
    category: 'reviews',
    date: '2024-11-06',
    readTime: 12,
    image: '/brand/banner.png',
    tags: ['haval', 'f7', 'обзор'],
  },
  {
    slug: 'vosstanovlenie-peredney-chasti-avto',
    title: 'Восстановление передней части авто с ноускатом из Китая: пошаговый процесс',
    excerpt: 'Как происходит замена ноуската на практике: от заказа до установки. Реальный кейс с Geely Monjaro.',
    body: '<p>Восстановление автомобиля после фронтального ДТП с использованием китайского ноуската...</p>',
    category: 'restoration',
    date: '2024-11-01',
    readTime: 15,
    image: '/brand/banner.png',
    tags: ['восстановление', 'geely', 'monjaro'],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter(a => a.category === categorySlug)
}

export function getLatestArticles(count = 4): Article[] {
  return [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count)
}
```

- [ ] **Step 4: data/brands.ts**

```typescript
import type { Brand } from '@/types'

export const BRANDS: Brand[] = [
  {
    slug: 'haval',
    name: 'Haval',
    description: 'Один из самых популярных китайских брендов в России. Широкий выбор ноускатов для F7, F7x, H9.',
    models: ['F7', 'F7x', 'H9', 'Jolion', 'Dargo'],
    newsIds: ['haval-f7x-2024-postavki-rossiya', 'haval-f7-noskat-obzor-zapchasti'],
    articleIds: ['haval-f7-noskat-obzor-zapchasti'],
    faq: [
      { question: 'Какие модели Haval самые популярные для заказа ноуската?', answer: 'F7 и F7x — лидеры по запросам.' },
      { question: 'Сколько ждать ноускат Haval?', answer: 'В среднем 4–8 недель с момента заказа.' },
    ],
  },
  {
    slug: 'chery',
    name: 'Chery',
    description: 'Широкая линейка моделей. Ноускаты для Tiggo 4, 7, 8 и Arrizo в постоянном наличии.',
    models: ['Tiggo 4', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Arrizo 8'],
    newsIds: ['chery-tiggo-8-noskat-obzor'],
    articleIds: [],
    faq: [
      { question: 'Есть ли ноускаты для Chery Tiggo 8 Pro Max?', answer: 'Да, доступны по заказу.' },
    ],
  },
  {
    slug: 'geely',
    name: 'Geely',
    description: 'Премиальные ноускаты для Atlas Pro, Coolray и Monjaro. Высокое качество кузовных деталей.',
    models: ['Atlas Pro', 'Coolray', 'Monjaro', 'Emgrand'],
    newsIds: [],
    articleIds: ['vosstanovlenie-peredney-chasti-avto'],
    faq: [
      { question: 'Чем отличается ноускат Geely от других китайских марок?', answer: 'Geely использует более плотные пластики кузова.' },
    ],
  },
  {
    slug: 'changan',
    name: 'Changan',
    description: 'Быстрорастущий бренд. Ноускаты для UNI-K, UNI-V и CS серии.',
    models: ['UNI-K', 'UNI-V', 'CS55 Plus', 'CS75 Plus'],
    newsIds: ['changan-uni-k-noskat-komplekt'],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'byd',
    name: 'BYD',
    description: 'Электромобили и гибриды. Ноускаты для Atto 3, Han, Seal.',
    models: ['Atto 3', 'Han', 'Seal', 'Dolphin'],
    newsIds: ['byd-atto3-rynok-rossiya'],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'exeed',
    name: 'Exeed',
    description: 'Премиум-сегмент Chery. Ноускаты для TX, TXL и LX.',
    models: ['TX', 'TXL', 'LX', 'VX'],
    newsIds: ['exeed-tx-noskat-rynok'],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'tank',
    name: 'Tank',
    description: 'Внедорожная линейка Great Wall. Ноускаты для Tank 300, 400, 500.',
    models: ['300', '400', '500'],
    newsIds: [],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'li-auto',
    name: 'Li Auto',
    description: 'Гибридные внедорожники. L6, L7, L8, L9 — ноускаты под заказ.',
    models: ['L6', 'L7', 'L8', 'L9'],
    newsIds: [],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'zeekr',
    name: 'Zeekr',
    description: 'Электрический суббренд Geely. Ноускаты для 001 и 009.',
    models: ['001', '009', 'X'],
    newsIds: [],
    articleIds: [],
    faq: [],
  },
]

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find(b => b.slug === slug)
}
```

- [ ] **Step 5: data/faq.ts**

```typescript
import type { FaqItem } from '@/types'

export const MAIN_FAQ: FaqItem[] = [
  {
    question: 'Что такое ноускат автомобиля?',
    answer: 'Ноускат — это передняя часть кузова в сборе: бампер, фары, капот, крылья и решётка радиатора. Заменяется единым комплектом после серьёзного ДТП.',
  },
  {
    question: 'Почему ноускаты часто везут из Китая?',
    answer: 'Китайские заводы производят оригинальные и OEM-детали для большинства современных автомобилей. Цена ниже европейских аналогов в 2–4 раза при сопоставимом качестве.',
  },
  {
    question: 'Какие бренды чаще всего ищут?',
    answer: 'Haval F7/F7x, Chery Tiggo 8, Geely Monjaro, Changan UNI-K и BYD Atto 3 — лидеры по запросам в 2024 году.',
  },
  {
    question: 'Чем отличается ноускат от обычных кузовных запчастей?',
    answer: 'Ноускат — это комплект взаимосвязанных деталей передней части. Все элементы подобраны под конкретную модель и цвет, что упрощает восстановление.',
  },
  {
    question: 'Какие темы освещает портал?',
    answer: 'Новости китайского авторынка, обзоры ноускатов по брендам, логистика и таможня, восстановление автомобилей, аналитика рынка.',
  },
  {
    question: 'Как часто обновляются новости и обзоры?',
    answer: 'Новости публикуются несколько раз в неделю. Обзоры и аналитические статьи — еженедельно.',
  },
]
```

- [ ] **Step 6: Commit**

```bash
git add data/ types/
git commit -m "feat: types and mock data"
```

---

### Task 5: Библиотека утилит

**Files:**
- Create: `lib/routes.ts`
- Create: `lib/utils.ts`
- Create: `lib/seo.ts`

- [ ] **Step 1: lib/routes.ts**

```typescript
// lib/routes.ts
export const ROUTES = {
  home: '/',
  news: '/news',
  newsDetail: (slug: string) => `/news/${slug}`,
  newsCategory: (slug: string) => `/news/category/${slug}`,
  articles: '/articles',
  articleDetail: (slug: string) => `/articles/${slug}`,
  articlesCategory: (slug: string) => `/articles/category/${slug}`,
  brands: '/brands',
  brand: (slug: string) => `/brands/${slug}`,
  about: '/about',
  contacts: '/contacts',
  advertising: '/advertising',
  privacy: '/legal/privacy',
  cookies: '/legal/cookies',
  terms: '/legal/terms',
} as const
```

- [ ] **Step 2: lib/utils.ts**

```typescript
// lib/utils.ts
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export function calcReadTime(body: string): number {
  const words = body.replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`
  return String(views)
}
```

- [ ] **Step 3: lib/seo.ts**

```typescript
// lib/seo.ts
import type { Metadata } from 'next'

const BASE_URL = 'https://nosecutchina.ru'

export function generateMeta(opts: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = `${BASE_URL}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: 'NOSECUT CHINA',
      type: opts.type ?? 'website',
      images: opts.image ? [{ url: opts.image }] : [],
    },
  }
}

export function articleSchema(opts: {
  title: string
  description: string
  date: string
  image: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    image: `${BASE_URL}${opts.image}`,
    url: `${BASE_URL}${opts.path}`,
    publisher: {
      '@type': 'Organization',
      name: 'NOSECUT CHINA',
      url: BASE_URL,
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat: lib utilities — routes, utils, seo helpers"
```

---

### Task 6: UI компоненты

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/Chip.tsx`
- Create: `components/ui/Breadcrumbs.tsx`
- Create: `components/ui/Pagination.tsx`
- Create: `components/ui/SectionHeader.tsx`

- [ ] **Step 1: components/ui/Button.tsx**

```typescript
import Link from 'next/link'
import { clsx } from 'clsx'

type Variant = 'primary' | 'ghost' | 'outline'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  className?: string
}

export default function Button({ children, href, onClick, variant = 'primary', className }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 font-heading text-sm font-medium tracking-wider uppercase transition-colors duration-150'
  const variants: Record<Variant, string> = {
    primary: 'bg-acc text-white hover:bg-acc-hover',
    ghost: 'text-text-secondary hover:text-text-primary border border-border hover:border-text-muted',
    outline: 'border border-acc text-acc hover:bg-acc hover:text-white',
  }
  const cls = clsx(base, variants[variant], className)
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button onClick={onClick} className={cls}>{children}</button>
}
```

- [ ] **Step 2: components/ui/Tag.tsx**

```typescript
import Link from 'next/link'
import { clsx } from 'clsx'

interface TagProps {
  label: string
  href?: string
  active?: boolean
  className?: string
}

export default function Tag({ label, href, active, className }: TagProps) {
  const cls = clsx(
    'inline-block px-2.5 py-0.5 text-xs font-heading font-medium tracking-wider uppercase transition-colors',
    active ? 'bg-acc text-white' : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-border',
    className,
  )
  if (href) return <Link href={href} className={cls}>{label}</Link>
  return <span className={cls}>{label}</span>
}
```

- [ ] **Step 3: components/ui/Chip.tsx**

```typescript
import { clsx } from 'clsx'

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export default function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-1.5 text-xs font-heading tracking-wider uppercase rounded-full border transition-colors',
        active
          ? 'border-acc bg-acc/10 text-acc'
          : 'border-border text-text-muted hover:border-text-muted hover:text-text-secondary',
      )}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 4: components/ui/Breadcrumbs.tsx**

```typescript
import Link from 'next/link'

interface Crumb { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-border">/</span>}
            {item.href
              ? <Link href={item.href} className="hover:text-text-secondary transition-colors">{item.label}</Link>
              : <span className="text-text-secondary">{item.label}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

- [ ] **Step 5: components/ui/Pagination.tsx**

```typescript
import Link from 'next/link'
import { clsx } from 'clsx'

interface PaginationProps {
  current: number
  total: number
  buildHref: (page: number) => string
}

export default function Pagination({ current, total, buildHref }: PaginationProps) {
  if (total <= 1) return null

  const pages: (number | '...')[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return (
    <nav className="flex items-center gap-1">
      {pages.map((p, i) =>
        p === '...'
          ? <span key={`e${i}`} className="px-2 text-text-muted">...</span>
          : (
            <Link
              key={p}
              href={buildHref(p)}
              className={clsx(
                'w-9 h-9 flex items-center justify-center text-sm font-heading border transition-colors',
                p === current
                  ? 'border-acc bg-acc text-white'
                  : 'border-border text-text-muted hover:border-text-muted hover:text-text-secondary',
              )}
            >
              {p}
            </Link>
          )
      )}
    </nav>
  )
}
```

- [ ] **Step 6: components/ui/SectionHeader.tsx**

```typescript
import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  href?: string
  linkLabel?: string
}

export default function SectionHeader({ title, href, linkLabel = 'Все материалы' }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="h-0.5 w-8 bg-acc mb-3" />
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-text-primary">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-xs font-heading tracking-wider uppercase text-text-muted hover:text-acc transition-colors">
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add components/ui/
git commit -m "feat: UI components — Button, Tag, Chip, Breadcrumbs, Pagination, SectionHeader"
```

---

### Task 7: Header + Footer

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: components/layout/Header.tsx**

```typescript
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { ROUTES } from '@/lib/routes'

const NAV = [
  { label: 'Новости', href: ROUTES.news },
  { label: 'Статьи', href: ROUTES.articles },
  { label: 'Бренды', href: ROUTES.brands },
  { label: 'О проекте', href: ROUTES.about },
  { label: 'Контакты', href: ROUTES.contacts },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={clsx(
      'sticky top-0 z-50 border-b border-border transition-shadow',
      scrolled ? 'bg-bg/98 shadow-[0_2px_20px_rgba(0,0,0,.6)] backdrop-blur-sm' : 'bg-bg/95 backdrop-blur-sm',
    )}>
      <div className="h-0.5 bg-acc" />
      <div className="container flex items-center gap-6 h-15 py-0" style={{ height: 60 }}>
        {/* Logo */}
        <Link href={ROUTES.home} className="flex items-center gap-2.5 shrink-0">
          <img src="/brand/logo-circle.png" alt="NOSECUT CHINA" className="w-8 h-8 rounded-full object-cover border border-border" />
          <div>
            <div className="font-heading text-xl font-bold italic tracking-widest leading-none">
              NOSECUT <span className="text-acc">CHINA</span>
            </div>
            <div className="bg-acc inline-block px-1.5 py-px text-[8px] font-heading font-bold tracking-[2px] uppercase text-white mt-0.5">
              НОСКАТЫ И ПЕРЕД АВТО
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV.map(({ label, href }) => {
            const active = path === href || path.startsWith(href + '/')
            return (
              <Link key={href} href={href} className={clsx(
                'px-2.5 py-1.5 font-heading text-xs font-medium tracking-widest uppercase border-b-2 transition-colors',
                active ? 'text-acc border-acc' : 'text-text-muted border-transparent hover:text-text-secondary',
              )}>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Burger */}
        <button
          className="md:hidden ml-auto p-2 text-text-muted hover:text-text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg-card">
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="block px-4 py-3 font-heading text-sm tracking-wider uppercase text-text-secondary hover:text-text-primary hover:bg-bg-elevated border-b border-border last:border-0">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: components/layout/Footer.tsx**

```typescript
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

const SECTIONS = [
  { title: 'Контент', links: [
    { label: 'Новости', href: ROUTES.news },
    { label: 'Статьи', href: ROUTES.articles },
    { label: 'Бренды', href: ROUTES.brands },
  ]},
  { title: 'Портал', links: [
    { label: 'О проекте', href: ROUTES.about },
    { label: 'Контакты', href: ROUTES.contacts },
    { label: 'Реклама', href: ROUTES.advertising },
  ]},
  { title: 'Правовая информация', links: [
    { label: 'Политика конфиденциальности', href: ROUTES.privacy },
    { label: 'Cookie-политика', href: ROUTES.cookies },
    { label: 'Пользовательское соглашение', href: ROUTES.terms },
  ]},
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-card mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="font-heading text-xl font-bold italic tracking-widest mb-1">
              NOSECUT <span className="text-acc">CHINA</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mt-3">
              Информационный портал про ноускаты из Китая. Новости, обзоры, бренды и рынок.
            </p>
          </div>
          {/* Nav sections */}
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h3 className="font-heading text-xs font-medium tracking-widest uppercase text-text-muted mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-10 pt-6 text-xs text-text-muted text-center">
          © {new Date().getFullYear()} NOSECUT CHINA. Информационный портал.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/
git commit -m "feat: Header and Footer"
```

---

### Task 8: CookieBanner

**Files:**
- Create: `components/CookieBanner.tsx`

- [ ] **Step 1: Написать components/CookieBanner.tsx**

```typescript
'use client'
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'nc_cookie_consent'

interface Consent { necessary: true; analytics: boolean }

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [settings, setSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) setVisible(true)
    else {
      const consent: Consent = JSON.parse(saved)
      if (consent.analytics) loadMetrika()
    }
  }, [])

  function loadMetrika() {
    // Яндекс.Метрика подключается только после согласия
    if (typeof window !== 'undefined' && !(window as any).yaCounter) {
      // ym(XXXXXXXX, 'init', { ... })
    }
  }

  function acceptAll() {
    const consent: Consent = { necessary: true, analytics: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    loadMetrika()
    setVisible(false)
  }

  function acceptNecessary() {
    const consent: Consent = { necessary: true, analytics: false }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    setVisible(false)
  }

  function saveSettings() {
    const consent: Consent = { necessary: true, analytics }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    if (analytics) loadMetrika()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-bg-elevated border border-border p-4 shadow-2xl">
      <p className="text-sm text-text-secondary mb-3">
        Мы используем cookie для улучшения работы сайта. Аналитические cookie подключаются только с вашего согласия.
      </p>

      {settings ? (
        <div className="mb-3">
          <div className="flex items-center justify-between py-2 border-t border-border">
            <span className="text-xs text-text-secondary">Необходимые</span>
            <span className="text-xs text-text-muted">Всегда включены</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border">
            <span className="text-xs text-text-secondary">Аналитические (Яндекс.Метрика)</span>
            <button
              onClick={() => setAnalytics(!analytics)}
              className={`w-10 h-5 rounded-full transition-colors ${analytics ? 'bg-acc' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform mx-0.5 ${analytics ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <button onClick={saveSettings} className="w-full mt-3 py-2 text-xs font-heading tracking-wider uppercase bg-acc text-white hover:bg-acc-hover transition-colors">
            Сохранить настройки
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button onClick={acceptAll} className="py-2 text-xs font-heading tracking-wider uppercase bg-acc text-white hover:bg-acc-hover transition-colors">
            Принять всё
          </button>
          <div className="flex gap-2">
            <button onClick={acceptNecessary} className="flex-1 py-2 text-xs font-heading tracking-wider uppercase border border-border text-text-muted hover:text-text-secondary hover:border-text-muted transition-colors">
              Только необходимые
            </button>
            <button onClick={() => setSettings(true)} className="flex-1 py-2 text-xs font-heading tracking-wider uppercase border border-border text-text-muted hover:text-text-secondary hover:border-text-muted transition-colors">
              Настройки
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CookieBanner.tsx
git commit -m "feat: CookieBanner with localStorage and analytics consent"
```

---

### Task 9: Карточки

**Files:**
- Create: `components/cards/NewsCard.tsx`
- Create: `components/cards/ArticleCard.tsx`
- Create: `components/cards/BrandCard.tsx`

- [ ] **Step 1: components/cards/NewsCard.tsx**

```typescript
import Link from 'next/link'
import Image from 'next/image'
import type { NewsPost } from '@/types'
import { formatDate, formatViews } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import Tag from '@/components/ui/Tag'
import { ALL_CATEGORIES } from '@/data/categories'

export default function NewsCard({ post }: { post: NewsPost }) {
  const cat = ALL_CATEGORIES.find(c => c.slug === post.category)
  return (
    <article className="group bg-bg-card border border-border hover:border-text-muted transition-colors">
      <Link href={ROUTES.newsDetail(post.slug)} className="block aspect-[16/9] overflow-hidden relative bg-bg-elevated">
        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" />
      </Link>
      <div className="p-4">
        {cat && <Tag label={cat.name} href={ROUTES.newsCategory(cat.slug)} className="mb-3" />}
        <h3 className="font-heading text-base font-semibold leading-snug text-text-primary group-hover:text-acc transition-colors mb-2 line-clamp-2">
          <Link href={ROUTES.newsDetail(post.slug)}>{post.title}</Link>
        </h3>
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} мин</span>
          <span>·</span>
          <span>{formatViews(post.views)} просм.</span>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: components/cards/ArticleCard.tsx**

```typescript
import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import Tag from '@/components/ui/Tag'
import { ALL_CATEGORIES } from '@/data/categories'

export default function ArticleCard({ article }: { article: Article }) {
  const cat = ALL_CATEGORIES.find(c => c.slug === article.category)
  return (
    <article className="group bg-bg-card border border-border hover:border-text-muted transition-colors flex gap-4 p-4">
      <Link href={ROUTES.articleDetail(article.slug)} className="block w-28 h-20 shrink-0 overflow-hidden relative bg-bg-elevated">
        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="112px" />
      </Link>
      <div className="min-w-0">
        {cat && <Tag label={cat.name} href={ROUTES.articlesCategory(cat.slug)} className="mb-2" />}
        <h3 className="font-heading text-sm font-semibold leading-snug text-text-primary group-hover:text-acc transition-colors mb-2 line-clamp-2">
          <Link href={ROUTES.articleDetail(article.slug)}>{article.title}</Link>
        </h3>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.readTime} мин чтения</span>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: components/cards/BrandCard.tsx**

```typescript
import Link from 'next/link'
import type { Brand } from '@/types'
import { ROUTES } from '@/lib/routes'

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={ROUTES.brand(brand.slug)}
      className="group block bg-bg-card border border-border hover:border-acc transition-colors p-5">
      <div className="font-heading text-lg font-bold uppercase tracking-wider text-text-primary group-hover:text-acc transition-colors mb-2">
        {brand.name}
      </div>
      <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">{brand.description}</p>
      <div className="flex flex-wrap gap-1">
        {brand.models.slice(0, 3).map(m => (
          <span key={m} className="text-[10px] px-2 py-0.5 bg-bg-elevated text-text-muted font-heading tracking-wide">{m}</span>
        ))}
        {brand.models.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 bg-bg-elevated text-text-muted font-heading tracking-wide">+{brand.models.length - 3}</span>
        )}
      </div>
    </Link>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/cards/
git commit -m "feat: NewsCard, ArticleCard, BrandCard components"
```

---

### Task 10: Секции главной + Сборка

**Files:**
- Create: `components/sections/HeroPortal.tsx`
- Create: `components/sections/TodaySection.tsx`
- Create: `components/sections/NewsSection.tsx`
- Create: `components/sections/ArticlesSection.tsx`
- Create: `components/sections/CategoriesSection.tsx`
- Create: `components/sections/BrandsSection.tsx`
- Create: `components/sections/FaqSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: components/sections/HeroPortal.tsx**

```typescript
import Button from '@/components/ui/Button'
import { ROUTES } from '@/lib/routes'

const CHIPS = ['Новости рынка', 'Обзоры авто', 'Поставки', 'Таможня', 'Бренды Китая']

export default function HeroPortal() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-bg">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/brand/hero-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        {/* Red glow */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 -translate-y-1/2 rounded-full bg-acc/5 blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <span className="inline-block px-3 py-1 text-xs font-heading font-medium tracking-[3px] uppercase text-acc border border-acc/30 bg-acc/5 mb-6">
          Информационный портал
        </span>

        <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-wider text-text-primary leading-tight mb-4 max-w-2xl">
          Ноускаты из Китая:<br />
          <span className="text-acc">новости, обзоры,</span><br />
          поставки и рынок
        </h1>

        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mb-8">
          Следим за китайским авторынком, поставками ноускатов, логистикой, таможней, брендами и восстановлением автомобилей.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button href={ROUTES.news} variant="primary">Читать новости</Button>
          <Button href={ROUTES.articles} variant="ghost">Смотреть обзоры</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {CHIPS.map(chip => (
            <span key={chip} className="px-3 py-1.5 text-xs font-heading tracking-wider uppercase border border-border/60 text-text-muted">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: components/sections/FaqSection.tsx**

```typescript
'use client'
import { useState } from 'react'
import type { FaqItem } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="container py-16">
      <SectionHeader title="Частые вопросы" />
      <div className="space-y-1 max-w-3xl">
        {items.map((item, i) => (
          <div key={i} className="border border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-bg-elevated transition-colors"
            >
              <span className="font-heading text-sm font-medium tracking-wide text-text-primary">{item.question}</span>
              <span className={`text-acc transition-transform shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: components/sections/NewsSection.tsx**

```typescript
import type { NewsPost } from '@/types'
import NewsCard from '@/components/cards/NewsCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

export default function NewsSection({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="container py-12">
      <SectionHeader title="Последние новости" href={ROUTES.news} linkLabel="Все новости" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => <NewsCard key={post.slug} post={post} />)}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: components/sections/ArticlesSection.tsx**

```typescript
import type { Article } from '@/types'
import ArticleCard from '@/components/cards/ArticleCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

export default function ArticlesSection({ articles }: { articles: Article[] }) {
  return (
    <section className="container py-12">
      <SectionHeader title="Статьи и обзоры" href={ROUTES.articles} linkLabel="Все статьи" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: components/sections/BrandsSection.tsx**

```typescript
import type { Brand } from '@/types'
import BrandCard from '@/components/cards/BrandCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

export default function BrandsSection({ brands }: { brands: Brand[] }) {
  return (
    <section className="container py-12">
      <SectionHeader title="Бренды и хабы" href={ROUTES.brands} linkLabel="Все бренды" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {brands.map(b => <BrandCard key={b.slug} brand={b} />)}
      </div>
    </section>
  )
}
```

- [ ] **Step 6: components/sections/CategoriesSection.tsx**

```typescript
import Link from 'next/link'
import { ALL_CATEGORIES } from '@/data/categories'
import { ROUTES } from '@/lib/routes'
import SectionHeader from '@/components/ui/SectionHeader'

export default function CategoriesSection() {
  return (
    <section className="container py-12">
      <SectionHeader title="Разделы" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ALL_CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={cat.type === 'news' ? ROUTES.newsCategory(cat.slug) : ROUTES.articlesCategory(cat.slug)}
            className="group border border-border bg-bg-card hover:border-acc transition-colors p-4"
          >
            <div className="font-heading text-sm font-medium tracking-wide text-text-primary group-hover:text-acc transition-colors mb-1">
              {cat.name}
            </div>
            <p className="text-xs text-text-muted line-clamp-2">{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: components/sections/TodaySection.tsx**

```typescript
import Link from 'next/link'
import type { NewsPost } from '@/types'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import { ALL_CATEGORIES } from '@/data/categories'

export default function TodaySection({ posts }: { posts: NewsPost[] }) {
  const [main, ...rest] = posts
  if (!main) return null
  return (
    <section className="container py-12">
      <SectionHeader title="Главное сегодня" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main */}
        <Link href={ROUTES.newsDetail(main.slug)} className="group lg:col-span-2 relative block overflow-hidden bg-bg-elevated border border-border hover:border-acc transition-colors min-h-[260px]">
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            {ALL_CATEGORIES.find(c => c.slug === main.category) && (
              <Tag label={ALL_CATEGORIES.find(c => c.slug === main.category)!.name} className="mb-3" />
            )}
            <h2 className="font-heading text-xl font-bold text-text-primary group-hover:text-acc transition-colors leading-snug line-clamp-2">
              {main.title}
            </h2>
            <p className="text-xs text-text-muted mt-2">{formatDate(main.date)}</p>
          </div>
        </Link>
        {/* Side */}
        <div className="flex flex-col gap-3">
          {rest.slice(0, 3).map(post => {
            const cat = ALL_CATEGORIES.find(c => c.slug === post.category)
            return (
              <Link key={post.slug} href={ROUTES.newsDetail(post.slug)}
                className="group flex gap-3 p-3 bg-bg-card border border-border hover:border-acc transition-colors">
                <div className="min-w-0">
                  {cat && <Tag label={cat.name} className="mb-1.5" />}
                  <p className="font-heading text-sm font-medium text-text-primary group-hover:text-acc transition-colors line-clamp-2 leading-snug">{post.title}</p>
                  <p className="text-xs text-text-muted mt-1">{formatDate(post.date)}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Собрать app/page.tsx**

```typescript
import { Metadata } from 'next'
import { generateMeta, faqSchema } from '@/lib/seo'
import { getLatestNews } from '@/data/news'
import { getLatestArticles } from '@/data/articles'
import { BRANDS } from '@/data/brands'
import { MAIN_FAQ } from '@/data/faq'
import HeroPortal from '@/components/sections/HeroPortal'
import TodaySection from '@/components/sections/TodaySection'
import NewsSection from '@/components/sections/NewsSection'
import ArticlesSection from '@/components/sections/ArticlesSection'
import CategoriesSection from '@/components/sections/CategoriesSection'
import BrandsSection from '@/components/sections/BrandsSection'
import FaqSection from '@/components/sections/FaqSection'

export const metadata: Metadata = generateMeta({
  title: 'NOSECUT CHINA — Ноускаты из Китая',
  description: 'Информационный портал про ноускаты из Китая. Новости, обзоры, бренды, поставки и рынок.',
  path: '/',
})

export default function HomePage() {
  const latestNews = getLatestNews(6)
  const todayNews = getLatestNews(4)
  const articles = getLatestArticles(4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(MAIN_FAQ)) }}
      />
      <HeroPortal />
      <TodaySection posts={todayNews} />
      <NewsSection posts={latestNews} />
      <ArticlesSection articles={articles} />
      <CategoriesSection />
      <BrandsSection brands={BRANDS} />
      <FaqSection items={MAIN_FAQ} />
    </>
  )
}
```

- [ ] **Step 9: Запустить dev-сервер и проверить главную**

```bash
npm run dev
```
Открыть http://localhost:3000. Проверить: Hero, секции, адаптив на 375px.

- [ ] **Step 10: Commit**

```bash
git add components/sections/ app/page.tsx
git commit -m "feat: home page — hero, sections, full assembly"
```

---

### Task 11: Страницы новостей

**Files:**
- Create: `app/news/page.tsx`
- Create: `app/news/[slug]/page.tsx`
- Create: `app/news/category/[slug]/page.tsx`
- Create: `components/ui/Sidebar.tsx`
- Create: `components/sections/RelatedMaterials.tsx`

- [ ] **Step 1: components/ui/Sidebar.tsx**

```typescript
import type { NewsPost } from '@/types'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'
import { formatDate } from '@/lib/utils'

export default function Sidebar({ title = 'Популярное', posts }: { title?: string; posts: NewsPost[] }) {
  return (
    <aside className="space-y-1">
      <h3 className="font-heading text-xs font-medium tracking-widest uppercase text-text-muted mb-4 pb-2 border-b border-border">{title}</h3>
      {posts.map((post, i) => (
        <Link key={post.slug} href={ROUTES.newsDetail(post.slug)}
          className="group flex gap-3 py-2.5 border-b border-border last:border-0">
          <span className="font-heading text-2xl font-bold text-border shrink-0 w-6">{i + 1}</span>
          <div>
            <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2 leading-snug">{post.title}</p>
            <p className="text-xs text-text-muted mt-1">{formatDate(post.date)}</p>
          </div>
        </Link>
      ))}
    </aside>
  )
}
```

- [ ] **Step 2: app/news/page.tsx**

```typescript
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import { NEWS, getPopularNews } from '@/data/news'
import { NEWS_CATEGORIES } from '@/data/categories'
import NewsCard from '@/components/cards/NewsCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Pagination from '@/components/ui/Pagination'
import Sidebar from '@/components/ui/Sidebar'
import Tag from '@/components/ui/Tag'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({
  title: 'Новости китайского авторынка и ноускатов',
  description: 'Актуальные новости рынка, поставок, таможни и китайских автомобильных брендов.',
  path: ROUTES.news,
})

const PER_PAGE = 6

export default function NewsPage() {
  const popular = getPopularNews(5)
  const total = Math.ceil(NEWS.length / PER_PAGE)
  const posts = NEWS.slice(0, PER_PAGE)

  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Новости' }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">Новости</h1>
      <p className="text-text-muted text-sm mb-6">Актуальные новости китайского авторынка, поставок и ноускатов</p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Tag label="Все" active />
        {NEWS_CATEGORIES.map(cat => <Tag key={cat.slug} label={cat.name} href={ROUTES.newsCategory(cat.slug)} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {posts.map(post => <NewsCard key={post.slug} post={post} />)}
          </div>
          <Pagination current={1} total={total} buildHref={p => `${ROUTES.news}?page=${p}`} />
        </div>
        <Sidebar posts={popular} />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: components/sections/RelatedMaterials.tsx**

```typescript
import type { NewsPost } from '@/types'
import NewsCard from '@/components/cards/NewsCard'
import SectionHeader from '@/components/ui/SectionHeader'

export default function RelatedMaterials({ posts }: { posts: NewsPost[] }) {
  if (!posts.length) return null
  return (
    <section className="container py-10 border-t border-border mt-10">
      <SectionHeader title="Похожие материалы" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => <NewsCard key={post.slug} post={post} />)}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: app/news/[slug]/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateMeta, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { NEWS, getNewsBySlug, getPopularNews } from '@/data/news'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import { ALL_CATEGORIES } from '@/data/categories'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Tag from '@/components/ui/Tag'
import Sidebar from '@/components/ui/Sidebar'
import RelatedMaterials from '@/components/sections/RelatedMaterials'

export function generateStaticParams() {
  return NEWS.map(n => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getNewsBySlug(params.slug)
  if (!post) return {}
  return generateMeta({ title: post.title, description: post.excerpt, path: ROUTES.newsDetail(post.slug), image: post.image, type: 'article' })
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const post = getNewsBySlug(params.slug)
  if (!post) notFound()

  const cat = ALL_CATEGORIES.find(c => c.slug === post.category)
  const popular = getPopularNews(5)
  const related = NEWS.filter(n => n.category === post.category && n.slug !== post.slug).slice(0, 3)

  const schemas = [
    articleSchema({ title: post.title, description: post.excerpt, date: post.date, image: post.image, path: ROUTES.newsDetail(post.slug) }),
    breadcrumbSchema([
      { name: 'Главная', path: ROUTES.home },
      { name: 'Новости', path: ROUTES.news },
      { name: post.title, path: ROUTES.newsDetail(post.slug) },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <article>
            <Breadcrumbs items={[
              { label: 'Главная', href: ROUTES.home },
              { label: 'Новости', href: ROUTES.news },
              { label: post.title },
            ]} />
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4">
              {cat && <Tag label={cat.name} href={ROUTES.newsCategory(cat.slug)} />}
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} мин чтения</span>
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold uppercase tracking-wider text-text-primary leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-text-secondary text-base leading-relaxed border-l-2 border-acc pl-4 mb-8">{post.excerpt}</p>
            <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.body }} />
          </article>
          <Sidebar posts={popular} />
        </div>
      </div>
      <RelatedMaterials posts={related} />
    </>
  )
}
```

- [ ] **Step 5: app/news/category/[slug]/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import { NEWS_CATEGORIES } from '@/data/categories'
import { getNewsByCategory, getPopularNews } from '@/data/news'
import { ROUTES } from '@/lib/routes'
import NewsCard from '@/components/cards/NewsCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Sidebar from '@/components/ui/Sidebar'
import Pagination from '@/components/ui/Pagination'

export function generateStaticParams() {
  return NEWS_CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = NEWS_CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) return {}
  return generateMeta({ title: cat.name, description: cat.description, path: ROUTES.newsCategory(cat.slug) })
}

export default function NewsCategoryPage({ params }: { params: { slug: string } }) {
  const cat = NEWS_CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) notFound()
  const posts = getNewsByCategory(cat.slug)
  const popular = getPopularNews(5)

  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Новости', href: ROUTES.news }, { label: cat.name }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">{cat.name}</h1>
      <p className="text-text-muted text-sm mb-8">{cat.description}</p>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {posts.map(post => <NewsCard key={post.slug} post={post} />)}
          </div>
          {posts.length === 0 && <p className="text-text-muted">В этой категории пока нет материалов.</p>}
          <Pagination current={1} total={1} buildHref={p => `${ROUTES.newsCategory(cat.slug)}?page=${p}`} />
        </div>
        <Sidebar posts={popular} />
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add app/news/ components/ui/Sidebar.tsx components/sections/RelatedMaterials.tsx
git commit -m "feat: news pages — list, detail, category"
```

---

### Task 12: Страницы статей

**Files:**
- Create: `app/articles/page.tsx`
- Create: `app/articles/[slug]/page.tsx`
- Create: `app/articles/category/[slug]/page.tsx`

- [ ] **Step 1: app/articles/page.tsx**

```typescript
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import { ARTICLES } from '@/data/articles'
import { ARTICLE_CATEGORIES } from '@/data/categories'
import { getPopularNews } from '@/data/news'
import ArticleCard from '@/components/cards/ArticleCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Sidebar from '@/components/ui/Sidebar'
import Tag from '@/components/ui/Tag'
import Pagination from '@/components/ui/Pagination'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({
  title: 'Статьи и обзоры ноускатов из Китая',
  description: 'Экспертные статьи про ноускаты, логистику, восстановление автомобилей и запчасти из Китая.',
  path: ROUTES.articles,
})

export default function ArticlesPage() {
  const popular = getPopularNews(5)
  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Статьи' }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">Статьи и обзоры</h1>
      <p className="text-text-muted text-sm mb-6">Экспертный контент про ноускаты, логистику и китайский авторынок</p>
      <div className="flex flex-wrap gap-2 mb-8">
        <Tag label="Все" active />
        {ARTICLE_CATEGORIES.map(cat => <Tag key={cat.slug} label={cat.name} href={ROUTES.articlesCategory(cat.slug)} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div>
          <div className="grid grid-cols-1 gap-3 mb-8">
            {ARTICLES.map(a => <ArticleCard key={a.slug} article={a} />)}
          </div>
          <Pagination current={1} total={1} buildHref={p => `${ROUTES.articles}?page=${p}`} />
        </div>
        <Sidebar posts={popular} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: app/articles/[slug]/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateMeta, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { ARTICLES, getArticleBySlug } from '@/data/articles'
import { getPopularNews } from '@/data/news'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import { ALL_CATEGORIES } from '@/data/categories'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Tag from '@/components/ui/Tag'
import Sidebar from '@/components/ui/Sidebar'

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return generateMeta({ title: article.title, description: article.excerpt, path: ROUTES.articleDetail(article.slug), image: article.image, type: 'article' })
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()
  const cat = ALL_CATEGORIES.find(c => c.slug === article.category)
  const popular = getPopularNews(5)

  const schemas = [
    articleSchema({ title: article.title, description: article.excerpt, date: article.date, image: article.image, path: ROUTES.articleDetail(article.slug) }),
    breadcrumbSchema([
      { name: 'Главная', path: ROUTES.home },
      { name: 'Статьи', path: ROUTES.articles },
      { name: article.title, path: ROUTES.articleDetail(article.slug) },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <article>
            <Breadcrumbs items={[
              { label: 'Главная', href: ROUTES.home },
              { label: 'Статьи', href: ROUTES.articles },
              { label: article.title },
            ]} />
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4">
              {cat && <Tag label={cat.name} href={ROUTES.articlesCategory(cat.slug)} />}
              <span>{formatDate(article.date)}</span>
              <span>·</span>
              <span>{article.readTime} мин чтения</span>
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold uppercase tracking-wider text-text-primary leading-tight mb-6">
              {article.title}
            </h1>
            <p className="text-text-secondary text-base leading-relaxed border-l-2 border-acc pl-4 mb-8">{article.excerpt}</p>
            <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.body }} />
          </article>
          <Sidebar posts={popular} />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: app/articles/category/[slug]/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import { ARTICLE_CATEGORIES } from '@/data/categories'
import { getArticlesByCategory } from '@/data/articles'
import { getPopularNews } from '@/data/news'
import { ROUTES } from '@/lib/routes'
import ArticleCard from '@/components/cards/ArticleCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Sidebar from '@/components/ui/Sidebar'

export function generateStaticParams() {
  return ARTICLE_CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = ARTICLE_CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) return {}
  return generateMeta({ title: cat.name, description: cat.description, path: ROUTES.articlesCategory(cat.slug) })
}

export default function ArticlesCategoryPage({ params }: { params: { slug: string } }) {
  const cat = ARTICLE_CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) notFound()
  const articles = getArticlesByCategory(cat.slug)
  const popular = getPopularNews(5)

  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Статьи', href: ROUTES.articles }, { label: cat.name }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">{cat.name}</h1>
      <p className="text-text-muted text-sm mb-8">{cat.description}</p>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="grid grid-cols-1 gap-3">
          {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
          {articles.length === 0 && <p className="text-text-muted">В этой категории пока нет материалов.</p>}
        </div>
        <Sidebar posts={popular} />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/articles/
git commit -m "feat: articles pages — list, detail, category"
```

---

### Task 13: Страницы брендов

**Files:**
- Create: `app/brands/page.tsx`
- Create: `app/brands/[slug]/page.tsx`

- [ ] **Step 1: app/brands/page.tsx**

```typescript
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import { BRANDS } from '@/data/brands'
import BrandCard from '@/components/cards/BrandCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({
  title: 'Бренды ноускатов из Китая',
  description: 'SEO-хабы по китайским автомобильным брендам: Haval, Chery, Geely, Changan, BYD и другие.',
  path: ROUTES.brands,
})

export default function BrandsPage() {
  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Бренды' }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">Бренды</h1>
      <p className="text-text-muted text-sm mb-8">Ноускаты и кузовные запчасти для китайских автомобилей</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BRANDS.map(b => <BrandCard key={b.slug} brand={b} />)}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: app/brands/[slug]/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateMeta, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { BRANDS, getBrandBySlug } from '@/data/brands'
import { getNewsBySlug } from '@/data/news'
import { getArticleBySlug } from '@/data/articles'
import { ROUTES } from '@/lib/routes'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import NewsCard from '@/components/cards/NewsCard'
import ArticleCard from '@/components/cards/ArticleCard'
import FaqSection from '@/components/sections/FaqSection'
import SectionHeader from '@/components/ui/SectionHeader'

export function generateStaticParams() {
  return BRANDS.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug)
  if (!brand) return {}
  return generateMeta({
    title: `Ноускаты ${brand.name} из Китая`,
    description: brand.description,
    path: ROUTES.brand(brand.slug),
  })
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug)
  if (!brand) notFound()

  const brandNews = brand.newsIds.map(id => getNewsBySlug(id)).filter(Boolean) as ReturnType<typeof getNewsBySlug>[]
  const brandArticles = brand.articleIds.map(id => getArticleBySlug(id)).filter(Boolean) as ReturnType<typeof getArticleBySlug>[]

  const schemas = [
    breadcrumbSchema([
      { name: 'Главная', path: ROUTES.home },
      { name: 'Бренды', path: ROUTES.brands },
      { name: brand.name, path: ROUTES.brand(brand.slug) },
    ]),
    ...(brand.faq.length ? [faqSchema(brand.faq)] : []),
  ]

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <div className="container py-10">
        <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Бренды', href: ROUTES.brands }, { label: brand.name }]} />
        <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-4">
          Ноускаты <span className="text-acc">{brand.name}</span> из Китая
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-2xl mb-8">{brand.description}</p>

        {/* Models */}
        <div className="mb-10">
          <h2 className="font-heading text-sm font-medium tracking-widest uppercase text-text-muted mb-3">Популярные модели</h2>
          <div className="flex flex-wrap gap-2">
            {brand.models.map(m => (
              <span key={m} className="px-4 py-2 bg-bg-elevated border border-border font-heading text-sm tracking-wide text-text-secondary">{m}</span>
            ))}
          </div>
        </div>

        {/* News */}
        {brandNews.length > 0 && (
          <section className="mb-10">
            <SectionHeader title="Новости" href={ROUTES.news} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandNews.map(post => post && <NewsCard key={post.slug} post={post} />)}
            </div>
          </section>
        )}

        {/* Articles */}
        {brandArticles.length > 0 && (
          <section className="mb-10">
            <SectionHeader title="Статьи и обзоры" href={ROUTES.articles} />
            <div className="grid grid-cols-1 gap-3">
              {brandArticles.map(a => a && <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>
        )}

        {/* FAQ */}
        {brand.faq.length > 0 && <FaqSection items={brand.faq} />}
      </div>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/brands/
git commit -m "feat: brands pages — list and SEO hub"
```

---

### Task 14: Статические и юридические страницы + 404

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/contacts/page.tsx`
- Create: `app/advertising/page.tsx`
- Create: `app/legal/privacy/page.tsx`
- Create: `app/legal/cookies/page.tsx`
- Create: `app/legal/terms/page.tsx`
- Create: `app/not-found.tsx`
- Create: `components/ui/StaticPage.tsx`

- [ ] **Step 1: components/ui/StaticPage.tsx** (шаблон для текстовых страниц)

```typescript
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Crumb { label: string; href?: string }

interface StaticPageProps {
  title: string
  breadcrumbs: Crumb[]
  children: React.ReactNode
}

export default function StaticPage({ title, breadcrumbs, children }: StaticPageProps) {
  return (
    <div className="container py-10 max-w-3xl">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-8">{title}</h1>
      <div className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: app/about/page.tsx**

```typescript
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'О проекте', description: 'NOSECUT CHINA — информационный портал про ноускаты и кузовные запчасти из Китая.', path: ROUTES.about })

export default function AboutPage() {
  return (
    <StaticPage title="О проекте" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'О проекте' }]}>
      <p>NOSECUT CHINA — независимый информационный портал о ноускатах и кузовных запчастях из Китая.</p>
      <p>Мы отслеживаем новости китайского авторынка, публикуем обзоры брендов, освещаем вопросы логистики, таможни и восстановления автомобилей.</p>
      <h2>Что мы публикуем</h2>
      <ul>
        <li>Новости рынка и поставок</li>
        <li>Обзоры ноускатов по брендам и моделям</li>
        <li>Статьи про логистику и таможню</li>
        <li>Аналитику китайского авторынка</li>
      </ul>
      <h2>Контакты редакции</h2>
      <p>По вопросам редакции и сотрудничества: <a href="mailto:info@nosecutchina.ru">info@nosecutchina.ru</a></p>
    </StaticPage>
  )
}
```

- [ ] **Step 3: Создать остальные статические страницы по образцу**

`app/contacts/page.tsx`:
```typescript
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'Контакты', description: 'Связаться с редакцией NOSECUT CHINA.', path: ROUTES.contacts })

export default function ContactsPage() {
  return (
    <StaticPage title="Контакты" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'Контакты' }]}>
      <p>Email редакции: <a href="mailto:info@nosecutchina.ru">info@nosecutchina.ru</a></p>
      <p>По вопросам размещения рекламы: <a href="mailto:ads@nosecutchina.ru">ads@nosecutchina.ru</a></p>
    </StaticPage>
  )
}
```

`app/advertising/page.tsx` — аналогично с описанием рекламных возможностей.

`app/legal/privacy/page.tsx`, `app/legal/cookies/page.tsx`, `app/legal/terms/page.tsx` — юридический текст, тот же шаблон `StaticPage`.

- [ ] **Step 4: app/not-found.tsx**

```typescript
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <div className="font-heading text-8xl font-bold text-acc mb-4">404</div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-wider text-text-primary mb-4">Страница не найдена</h1>
      <p className="text-text-muted mb-8">Страница была удалена или никогда не существовала.</p>
      <Link href={ROUTES.home} className="inline-flex items-center gap-2 px-6 py-3 bg-acc text-white font-heading text-sm tracking-wider uppercase hover:bg-acc-hover transition-colors">
        На главную
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add app/about/ app/contacts/ app/advertising/ app/legal/ app/not-found.tsx components/ui/StaticPage.tsx
git commit -m "feat: static, legal pages and 404"
```

---

### Task 15: sitemap + robots + финальная сборка

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: app/sitemap.ts**

```typescript
import { MetadataRoute } from 'next'
import { NEWS } from '@/data/news'
import { ARTICLES } from '@/data/articles'
import { BRANDS } from '@/data/brands'
import { NEWS_CATEGORIES, ARTICLE_CATEGORIES } from '@/data/categories'
import { ROUTES } from '@/lib/routes'

const BASE = 'https://nosecutchina.ru'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE + ROUTES.home, priority: 1.0, changeFrequency: 'daily' as const },
    { url: BASE + ROUTES.news, priority: 0.9, changeFrequency: 'daily' as const },
    { url: BASE + ROUTES.articles, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: BASE + ROUTES.brands, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: BASE + ROUTES.about, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: BASE + ROUTES.contacts, priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  const newsPages = NEWS.map(n => ({
    url: BASE + ROUTES.newsDetail(n.slug),
    lastModified: new Date(n.date),
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  const articlePages = ARTICLES.map(a => ({
    url: BASE + ROUTES.articleDetail(a.slug),
    lastModified: new Date(a.date),
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const brandPages = BRANDS.map(b => ({
    url: BASE + ROUTES.brand(b.slug),
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  const catPages = [
    ...NEWS_CATEGORIES.map(c => ({ url: BASE + ROUTES.newsCategory(c.slug), priority: 0.6, changeFrequency: 'daily' as const })),
    ...ARTICLE_CATEGORIES.map(c => ({ url: BASE + ROUTES.articlesCategory(c.slug), priority: 0.6, changeFrequency: 'weekly' as const })),
  ]

  return [...staticPages, ...newsPages, ...articlePages, ...brandPages, ...catPages]
}
```

- [ ] **Step 2: app/robots.ts**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/legal/'] },
      { userAgent: 'Yandex', allow: '/' },
    ],
    sitemap: 'https://nosecutchina.ru/sitemap.xml',
  }
}
```

- [ ] **Step 3: Финальная сборка**

```bash
npm run build
```
Ожидание: 0 ошибок, все статические пути сгенерированы.

- [ ] **Step 4: Установить @tailwindcss/typography для prose**

```bash
npm install @tailwindcss/typography
```

Добавить в `tailwind.config.ts`:
```typescript
plugins: [require('@tailwindcss/typography')],
```

- [ ] **Step 5: Финальный dev-тест**

```bash
npm run dev
```

Проверить вручную:
- `/` — главная, все секции
- `/news` — список, пагинация
- `/news/haval-f7x-2024-postavki-rossiya` — детальная
- `/brands/haval` — SEO-хаб
- `/404` — несуществующая страница
- Mobile 375px — без горизонтального скролла

- [ ] **Step 6: Финальный commit**

```bash
git add -A
git commit -m "feat: sitemap, robots, @tailwindcss/typography — project complete"
```

---

## Итоговая структура проекта

```
noskat-site-a/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   ├── news/ [page, [slug], category/[slug]]
│   ├── articles/ [page, [slug], category/[slug]]
│   ├── brands/ [page, [slug]]
│   ├── about/ contacts/ advertising/
│   └── legal/ [privacy, cookies, terms]
├── components/
│   ├── layout/ [Header, Footer]
│   ├── sections/ [HeroPortal, TodaySection, NewsSection, ArticlesSection, CategoriesSection, BrandsSection, FaqSection, RelatedMaterials]
│   ├── cards/ [NewsCard, ArticleCard, BrandCard]
│   ├── ui/ [Button, Tag, Chip, Breadcrumbs, Pagination, SectionHeader, Sidebar, StaticPage]
│   └── CookieBanner.tsx
├── data/ [news, articles, brands, categories, faq]
├── lib/ [seo, routes, utils]
├── types/ index.ts
└── public/brand/ [logo, hero-bg, banner]
```
