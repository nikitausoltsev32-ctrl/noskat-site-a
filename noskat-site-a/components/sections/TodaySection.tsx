import Link from 'next/link'
import type { NewsPost } from '@/types'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import { ALL_CATEGORIES } from '@/data/categories'

export default function TodaySection({ posts }: { posts: NewsPost[] }) {
  const [main, ...rest] = posts
  if (!main) return null
  return (
    <section className="container py-12">
      <SectionHeader title="Главное сегодня" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Link href={ROUTES.newsDetail(main.slug)} className="group lg:col-span-2 relative block overflow-hidden bg-bg-elevated border border-border hover:border-acc transition-colors min-h-[260px]">
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            {ALL_CATEGORIES.find(c => c.slug === main.category) && (
              <Tag label={ALL_CATEGORIES.find(c => c.slug === main.category)!.name} className="mb-3" />
            )}
            <h2 className="font-heading text-xl font-bold text-text-primary group-hover:text-acc transition-colors leading-snug line-clamp-2">
              {main.title}
            </h2>
            <p className="text-xs text-text-muted mt-2">{formatDate(main.date)}</p>
          </div>
        </Link>
        <div className="flex flex-col gap-3">
          {rest.slice(0, 3).map(post => {
            const cat = ALL_CATEGORIES.find(c => c.slug === post.category)
            return (
              <Link key={post.slug} href={ROUTES.newsDetail(post.slug)}
                className="group flex gap-3 p-3 bg-bg-card border border-border hover:border-acc transition-colors">
                <div className="min-w-0">
                  {cat && <Tag label={cat.name} className="mb-1.5" />}
                  <p className="font-heading text-sm font-medium text-text-primary group-hover:text-acc transition-colors line-clamp-2 leading-snug">{post.title}</p>
                  <p className="text-xs text-text-muted mt-1">{formatDate(post.date)}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
