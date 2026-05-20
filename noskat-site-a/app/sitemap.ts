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
