import Link from 'next/link'
import type { Brand } from '@/types'
import { ROUTES } from '@/lib/routes'

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={ROUTES.brand(brand.slug)}
      className="group block bg-bg-card border border-border hover:border-acc transition-colors p-5">
      <div className="font-heading text-lg font-bold uppercase tracking-wider text-text-primary group-hover:text-acc transition-colors mb-2">
        {brand.name}
      </div>
      <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">{brand.description}</p>
      <div className="flex flex-wrap gap-1">
        {brand.models.slice(0, 3).map(m => (
          <span key={m} className="text-[10px] px-2 py-0.5 bg-bg-elevated text-text-muted font-heading tracking-wide">{m}</span>
        ))}
        {brand.models.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 bg-bg-elevated text-text-muted font-heading tracking-wide">+{brand.models.length - 3}</span>
        )}
      </div>
    </Link>
  )
}
