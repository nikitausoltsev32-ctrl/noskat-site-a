import { Metadata } from 'next'
import { generateMeta, faqSchema } from '@/lib/seo'
import { getLatestNews, getPopularNews } from '@/data/news'
import { getLatestArticles } from '@/data/articles'
import { BRANDS } from '@/data/brands'
import { MAIN_FAQ } from '@/data/faq'
import HeroPortal from '@/components/sections/HeroPortal'
import TodaySection from '@/components/sections/TodaySection'
import NewsSection from '@/components/sections/NewsSection'
import ArticlesSection from '@/components/sections/ArticlesSection'
import CategoriesSection from '@/components/sections/CategoriesSection'
import PopularSection from '@/components/sections/PopularSection'
import BrandsSection from '@/components/sections/BrandsSection'
import FaqSection from '@/components/sections/FaqSection'

export const metadata: Metadata = generateMeta({
  title: 'NOSECUT CHINA — Ноускаты из Китая',
  description: 'Информационный портал про ноускаты из Китая. Новости, обзоры, бренды, поставки и рынок.',
  path: '/',
})

export default function HomePage() {
  const latestNews = getLatestNews(6)
  const todayNews = getLatestNews(4)
  const articles = getLatestArticles(4)
  const popular = getPopularNews(6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(MAIN_FAQ)) }}
      />
      <HeroPortal />
      <TodaySection posts={todayNews} />
      <NewsSection posts={latestNews} />
      <ArticlesSection articles={articles} />
      <CategoriesSection />
      <PopularSection posts={popular} />
      <BrandsSection brands={BRANDS} />
      <FaqSection items={MAIN_FAQ} />
    </>
  )
}
