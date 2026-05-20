import type { NewsPost } from '@/types'
import NewsCard from '@/components/cards/NewsCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

export default function NewsSection({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="container py-12">
      <SectionHeader title="Последние новости" href={ROUTES.news} linkLabel="Все новости" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => <NewsCard key={post.slug} post={post} />)}
      </div>
    </section>
  )
}
