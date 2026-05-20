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
