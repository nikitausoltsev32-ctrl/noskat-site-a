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

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams
  const current = Math.max(1, parseInt(page ?? '1', 10) || 1)
  const popular = getPopularNews(5)
  const total = Math.ceil(NEWS.length / PER_PAGE)
  const posts = NEWS.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Новости' }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">Новости</h1>
      <p className="text-text-muted text-sm mb-6">Актуальные новости китайского авторынка, поставок и ноускатов</p>
      <div className="flex flex-wrap gap-2 mb-8">
        <Tag label="Все" active />
        {NEWS_CATEGORIES.map(cat => <Tag key={cat.slug} label={cat.name} href={ROUTES.newsCategory(cat.slug)} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {posts.map(post => <NewsCard key={post.slug} post={post} />)}
          </div>
          <Pagination current={current} total={total} buildHref={p => `${ROUTES.news}?page=${p}`} />
        </div>
        <Sidebar posts={popular} />
      </div>
    </div>
  )
}
