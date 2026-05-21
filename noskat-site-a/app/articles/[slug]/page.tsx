import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateMeta, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { ARTICLES, getArticleBySlug, getLatestArticles } from '@/data/articles'
import { getPopularNews } from '@/data/news'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import { ALL_CATEGORIES } from '@/data/categories'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Tag from '@/components/ui/Tag'
import Sidebar from '@/components/ui/Sidebar'
import ShareBlock from '@/components/ui/ShareBlock'
import RelatedArticles from '@/components/sections/RelatedArticles'

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return generateMeta({ title: article.title, description: article.excerpt, path: ROUTES.articleDetail(article.slug), image: article.image, type: 'article' })
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()
  const cat = ALL_CATEGORIES.find(c => c.slug === article.category)
  const popular = getPopularNews(5)
  const related = getLatestArticles(4).filter(a => a.slug !== article.slug && a.category === article.category).slice(0, 3)

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
            {article.image && (
              <div className="mb-8 aspect-video overflow-hidden border border-border">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.body }} />
            <ShareBlock title={article.title} />
          </article>
          <Sidebar posts={popular} />
        </div>
      </div>
      <RelatedArticles articles={related} />
    </>
  )
}
