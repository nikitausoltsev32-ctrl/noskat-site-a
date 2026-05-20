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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsBySlug(slug)
  if (!post) return {}
  return generateMeta({ title: post.title, description: post.excerpt, path: ROUTES.newsDetail(post.slug), image: post.image, type: 'article' })
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getNewsBySlug(slug)
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
