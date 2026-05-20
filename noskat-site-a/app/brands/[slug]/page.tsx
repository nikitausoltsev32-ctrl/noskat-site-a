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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) return {}
  return generateMeta({
    title: `Ноускаты ${brand.name} из Китая`,
    description: brand.description,
    path: ROUTES.brand(brand.slug),
  })
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) notFound()

  const brandNews = brand.newsIds.map(id => getNewsBySlug(id)).filter((p): p is NonNullable<typeof p> => p !== undefined)
  const brandArticles = brand.articleIds.map(id => getArticleBySlug(id)).filter((a): a is NonNullable<typeof a> => a !== undefined)

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

        <div className="mb-10">
          <h2 className="font-heading text-sm font-medium tracking-widest uppercase text-text-muted mb-3">Популярные модели</h2>
          <div className="flex flex-wrap gap-2">
            {brand.models.map(m => (
              <span key={m} className="px-4 py-2 bg-bg-elevated border border-border font-heading text-sm tracking-wide text-text-secondary">{m}</span>
            ))}
          </div>
        </div>

        {brandNews.length > 0 && (
          <section className="mb-10">
            <SectionHeader title="Новости" href={ROUTES.news} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandNews.map(post => <NewsCard key={post.slug} post={post} />)}
            </div>
          </section>
        )}

        {brandArticles.length > 0 && (
          <section className="mb-10">
            <SectionHeader title="Статьи и обзоры" href={ROUTES.articles} />
            <div className="grid grid-cols-1 gap-3">
              {brandArticles.map(a => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>
        )}

        {brand.faq.length > 0 && <FaqSection items={brand.faq} />}
      </div>
    </>
  )
}
