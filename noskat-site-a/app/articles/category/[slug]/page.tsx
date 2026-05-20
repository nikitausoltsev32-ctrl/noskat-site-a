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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = ARTICLE_CATEGORIES.find(c => c.slug === slug)
  if (!cat) return {}
  return generateMeta({ title: cat.name, description: cat.description, path: ROUTES.articlesCategory(cat.slug) })
}

export default async function ArticlesCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = ARTICLE_CATEGORIES.find(c => c.slug === slug)
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
