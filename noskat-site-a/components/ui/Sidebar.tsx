import type { NewsPost } from '@/types'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'
import { formatDate } from '@/lib/utils'

export default function Sidebar({ title = 'Популярное', posts }: { title?: string; posts: NewsPost[] }) {
  return (
    <aside className="space-y-1">
      <h3 className="font-heading text-xs font-medium tracking-widest uppercase text-text-muted mb-4 pb-2 border-b border-border">{title}</h3>
      {posts.map((post, i) => (
        <Link key={post.slug} href={ROUTES.newsDetail(post.slug)}
          className="group flex gap-3 py-2.5 border-b border-border last:border-0">
          <span className="font-heading text-2xl font-bold text-border shrink-0 w-6">{i + 1}</span>
          <div>
            <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2 leading-snug">{post.title}</p>
            <p className="text-xs text-text-muted mt-1">{formatDate(post.date)}</p>
          </div>
        </Link>
      ))}
    </aside>
  )
}
