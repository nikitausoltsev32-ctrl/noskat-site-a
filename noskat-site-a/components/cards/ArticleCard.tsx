import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import Tag from '@/components/ui/Tag'
import { ALL_CATEGORIES } from '@/data/categories'

export default function ArticleCard({ article }: { article: Article }) {
  const cat = ALL_CATEGORIES.find(c => c.slug === article.category)
  return (
    <article className="group bg-bg-card border border-border hover:border-text-muted transition-colors flex gap-4 p-4">
      <Link href={ROUTES.articleDetail(article.slug)} className="block w-28 h-20 shrink-0 overflow-hidden relative bg-bg-elevated">
        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="112px" />
      </Link>
      <div className="min-w-0">
        {cat && <Tag label={cat.name} href={ROUTES.articlesCategory(cat.slug)} className="mb-2" />}
        <h3 className="font-heading text-sm font-semibold leading-snug text-text-primary group-hover:text-acc transition-colors mb-2 line-clamp-2">
          <Link href={ROUTES.articleDetail(article.slug)}>{article.title}</Link>
        </h3>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.readTime} мин чтения</span>
        </div>
      </div>
    </article>
  )
}
