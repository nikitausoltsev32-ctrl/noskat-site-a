import type { Article } from '@/types'
import ArticleCard from '@/components/cards/ArticleCard'
import SectionHeader from '@/components/ui/SectionHeader'

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null
  return (
    <section className="container py-10 border-t border-border mt-10">
      <SectionHeader title="Похожие статьи" />
      <div className="grid grid-cols-1 gap-3">
        {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
      </div>
    </section>
  )
}
