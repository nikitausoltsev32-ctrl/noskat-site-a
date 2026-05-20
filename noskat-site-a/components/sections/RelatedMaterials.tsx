import type { NewsPost } from '@/types'
import NewsCard from '@/components/cards/NewsCard'
import SectionHeader from '@/components/ui/SectionHeader'

export default function RelatedMaterials({ posts }: { posts: NewsPost[] }) {
  if (!posts.length) return null
  return (
    <section className="container py-10 border-t border-border mt-10">
      <SectionHeader title="Похожие материалы" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => <NewsCard key={post.slug} post={post} />)}
      </div>
    </section>
  )
}
