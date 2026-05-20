import Link from 'next/link'
import Image from 'next/image'
import type { NewsPost } from '@/types'
import { formatDate, formatViews } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import Tag from '@/components/ui/Tag'
import { ALL_CATEGORIES } from '@/data/categories'

export default function NewsCard({ post }: { post: NewsPost }) {
  const cat = ALL_CATEGORIES.find(c => c.slug === post.category)
  return (
    <article className="group bg-bg-card border border-border hover:border-text-muted transition-colors">
      <Link href={ROUTES.newsDetail(post.slug)} className="block aspect-[16/9] overflow-hidden relative bg-bg-elevated">
        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" />
      </Link>
      <div className="p-4">
        {cat && <Tag label={cat.name} href={ROUTES.newsCategory(cat.slug)} className="mb-3" />}
        <h3 className="font-heading text-base font-semibold leading-snug text-text-primary group-hover:text-acc transition-colors mb-2 line-clamp-2">
          <Link href={ROUTES.newsDetail(post.slug)}>{post.title}</Link>
        </h3>
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} мин</span>
          <span>·</span>
          <span>{formatViews(post.views)} просм.</span>
        </div>
      </div>
    </article>
  )
}
