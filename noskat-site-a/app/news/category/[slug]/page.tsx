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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = NEWS_CATEGORIES.find(c => c.slug === slug)
  if (!cat) return {}
  return generateMeta({ title: cat.name, description: cat.description, path: ROUTES.newsCategory(cat.slug) })
}

export default async function NewsCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = NEWS_CATEGORIES.find(c => c.slug === slug)
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
