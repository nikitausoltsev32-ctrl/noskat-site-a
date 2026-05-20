import Link from 'next/link'
import { ALL_CATEGORIES } from '@/data/categories'
import { ROUTES } from '@/lib/routes'
import SectionHeader from '@/components/ui/SectionHeader'

export default function CategoriesSection() {
  return (
    <section className="container py-12">
      <SectionHeader title="Разделы" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ALL_CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={cat.type === 'news' ? ROUTES.newsCategory(cat.slug) : ROUTES.articlesCategory(cat.slug)}
            className="group border border-border bg-bg-card hover:border-acc transition-colors p-4"
          >
            <div className="font-heading text-sm font-medium tracking-wide text-text-primary group-hover:text-acc transition-colors mb-1">
              {cat.name}
            </div>
            <p className="text-xs text-text-muted line-clamp-2">{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
