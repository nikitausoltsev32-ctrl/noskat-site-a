import type { NewsPost } from '@/types'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'
import { formatDate } from '@/lib/utils'
import SectionHeader from '@/components/ui/SectionHeader'

export default function PopularSection({ posts }: { posts: NewsPost[] }) {
  if (!posts.length) return null
  return (
    <section className="container py-10">
      <SectionHeader title="Популярные материалы" href={ROUTES.news} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <Link key={post.slug} href={ROUTES.newsDetail(post.slug)}
            className="group flex gap-4 bg-bg-card border border-border p-4 hover:border-acc transition-colors">
            <span className="font-heading text-4xl font-bold text-border group-hover:text-acc transition-colors shrink-0 leading-none">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p className="font-heading text-sm font-medium text-text-primary group-hover:text-acc transition-colors leading-snug line-clamp-2">
                {post.title}
              </p>
              <p className="text-xs text-text-muted mt-2">{formatDate(post.date)} · {post.views.toLocaleString('ru')} просмотров</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
