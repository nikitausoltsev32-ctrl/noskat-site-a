# AGENTS.md — NOSECUT CHINA / Сайт А

> Этот файл читают агенты перед началом работы. Обновляй раздел **Статус** и **Лог изменений** после каждой выполненной задачи. Не трогай разделы "Проект" и "Запреты" — они статичные.

---

## Проект

**Сайт А: SEO-информационный портал про ноускаты из Китая**

- Тип: медиа-портал, не лендинг, не лидогенерация
- Домен: `nosecutchina.ru`
- Репозиторий: `noskat-site-a/` (вложенная папка проекта)
- План: `docs/superpowers/plans/2026-05-20-noskat-site-a.md`
- ТЗ: `noskat_site_a_claude_tz.md`

**Стек:** Next.js 14, TypeScript, Tailwind CSS, App Router, SSG, Google Fonts (Oswald + Inter)

**Структура проекта (`noskat-site-a/`):**
```
app/           — страницы (App Router)
components/    — layout/, sections/, cards/, ui/
data/          — mock данные (news, articles, brands, categories, faq)
lib/           — seo.ts, routes.ts, utils.ts
types/         — index.ts
public/brand/  — logo-circle.png, hero-bg.png, banner.png
```

---

## Запреты (никогда не нарушать)

- НЕ добавлять: форму заявки, "оставьте заявку", калькулятор, подбор, коммерческие CTA
- НЕ делать светлую тему, корпоративный стиль, "синий IT-сайт"
- НЕ использовать случайные Lorem Ipsum тексты — только реалистичный авто-контент
- НЕ изменять mock-данные без необходимости — они финальные
- Рабочая папка для npm-команд: `noskat-site-a/`, НЕ корневая

---

## Статус задач

Обновляй галочки по мере выполнения. После завершения задачи — запись в **Лог изменений**.

- [x] **Task 1** — Инициализация проекта (create-next-app, структура папок, копирование ассетов)
- [x] **Task 2** — Design System (tailwind.config.ts, globals.css, layout.tsx)
- [x] **Task 3** — TypeScript типы (`types/index.ts`)
- [x] **Task 4** — Mock данные (`data/`)
- [x] **Task 5** — Утилиты (`lib/routes.ts`, `lib/utils.ts`, `lib/seo.ts`)
- [ ] **Task 6** — UI компоненты (Button, Tag, Chip, Breadcrumbs, Pagination, SectionHeader)
- [ ] **Task 7** — Header + Footer
- [ ] **Task 8** — CookieBanner (localStorage + Яндекс.Метрика)
- [ ] **Task 9** — Карточки (NewsCard, ArticleCard, BrandCard)
- [ ] **Task 10** — Секции главной + сборка `app/page.tsx`
- [ ] **Task 11** — Страницы новостей (`/news`, `/news/[slug]`, `/news/category/[slug]`, Sidebar, RelatedMaterials)
- [ ] **Task 12** — Страницы статей (`/articles`, `/articles/[slug]`, `/articles/category/[slug]`)
- [ ] **Task 13** — Страницы брендов (`/brands`, `/brands/[slug]` SEO-хаб)
- [ ] **Task 14** — Статические и юридические страницы + 404
- [ ] **Task 15** — sitemap.ts, robots.ts, @tailwindcss/typography, финальная сборка

---

## Лог изменений

> Краткая запись: дата, что сделано, кем (имплементер/ревьюер). Новые записи — **сверху**.

<!-- Пример формата:
2026-05-20 | Task 1 ✅ | Инициализирован проект, создана структура папок, скопированы ассеты | implementer
-->

2026-05-20 | Task 5 ✅ | lib/routes.ts, lib/utils.ts, lib/seo.ts | implementer
2026-05-20 | Task 4 ✅ | Mock данные: categories, news (6), articles (4), brands (9), faq | implementer
2026-05-20 | Task 3 ✅ | TypeScript типы: NewsPost, Article, Brand, Category, FaqItem | implementer
2026-05-20 | Task 2 ✅ | Design system: tailwind config с custom токенами, globals.css, layout.tsx со стабами | implementer
2026-05-20 | Task 1 ✅ | Инициализирован Next.js проект, структура папок, скопированы ассеты | implementer

_Лог пополняется по мере выполнения задач._

---

## Инструкции для агентов

### Перед началом задачи

1. Прочитай этот файл полностью
2. Проверь статус — убедись, что предыдущие задачи выполнены
3. Работай только в `noskat-site-a/` — не трогай файлы в корне
4. Если задача зависит от предыдущей (например, Task 6 нужен Task 3) — проверь что зависимость есть в коде

### После завершения задачи

1. Поставь галочку `[x]` напротив задачи в разделе **Статус задач**
2. Добавь строку в **Лог изменений** (сверху) по формату: `ДАТА | Task N ✅ | краткое описание | роль`
3. Зафиксируй git commit согласно плану

### Правила коммитов

- Используй conventional commits: `feat:`, `fix:`, `chore:`
- Описание на английском, краткое
- Не коммить `.env`, секреты, временные файлы

### Если что-то сломалось

- Проверь `npm run build` в `noskat-site-a/` на наличие TypeScript ошибок
- Не игнорируй ошибки через `// @ts-ignore` без крайней необходимости
- Tailwind классы из кастомной темы: `bg-bg`, `bg-bg-card`, `bg-bg-elevated`, `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-acc`, `bg-acc`, `border-border`

### Команды

```bash
# Всегда из папки noskat-site-a/
cd "C:\Users\HomePc\moskats china\noskat-site-a"
npm run dev      # dev-сервер на http://localhost:3000
npm run build    # проверка сборки
npm run lint     # линтер
```
