import type { Article } from '@/types'
import ArticleCard from '@/components/cards/ArticleCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

export default function ArticlesSection({ articles }: { articles: Article[] }) {
  return (
    <section className="container py-12">
      <SectionHeader title="Статьи и обзоры" href={ROUTES.articles} linkLabel="Все статьи" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
      </div>
    </section>
  )
}
