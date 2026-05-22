import { Metadata } from 'next'
import { Suspense } from 'react'
import { generateMeta } from '@/lib/seo'
import { ARTICLES } from '@/data/articles'
import { ARTICLE_CATEGORIES } from '@/data/categories'
import { getPopularNews } from '@/data/news'
import ArticleCard from '@/components/cards/ArticleCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Sidebar from '@/components/ui/Sidebar'
import Tag from '@/components/ui/Tag'
import Pagination from '@/components/ui/Pagination'
import ArticlesFilter from '@/components/ui/ArticlesFilter'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({
  title: 'Статьи и обзоры ноускатов из Китая',
  description: 'Экспертные статьи про ноускаты, логистику, восстановление автомобилей и запчасти из Китая.',
  path: ROUTES.articles,
})

const PER_PAGE = 8

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; sort?: string }> }) {
  const { page, q = '', sort = 'new' } = await searchParams
  const current = Math.max(1, parseInt(page ?? '1', 10) || 1)
  const popular = getPopularNews(5)

  const query = q.toLowerCase().trim()
  let filtered = query
    ? ARTICLES.filter(a =>
        a.title.toLowerCase().includes(query) ||
        (a.excerpt ?? '').toLowerCase().includes(query)
      )
    : [...ARTICLES]

  if (sort === 'old') filtered = filtered.reverse()

  const total = Math.ceil(filtered.length / PER_PAGE)
  const articles = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Статьи' }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">Статьи и обзоры</h1>
      <p className="text-text-muted text-sm mb-6">Экспертный контент про ноускаты, логистику и китайский авторынок</p>
      <Suspense>
        <ArticlesFilter />
      </Suspense>
      <div className="flex flex-wrap gap-2 mb-8">
        <Tag label="Все" active />
        {ARTICLE_CATEGORIES.map(cat => <Tag key={cat.slug} label={cat.name} href={ROUTES.articlesCategory(cat.slug)} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div>
          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
              </div>
              <Pagination current={current} total={total} buildHref={p => {
                const sp = new URLSearchParams()
                if (q) sp.set('q', q)
                if (sort !== 'new') sp.set('sort', sort)
                sp.set('page', String(p))
                return `${ROUTES.articles}?${sp.toString()}`
              }} />
            </>
          ) : (
            <p className="text-text-muted text-sm py-8">По запросу «{q}» ничего не найдено.</p>
          )}
        </div>
        <Sidebar posts={popular} />
      </div>
    </div>
  )
}
