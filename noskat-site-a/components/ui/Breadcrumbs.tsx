import Link from 'next/link'

interface Crumb { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-border">/</span>}
            {item.href
              ? <Link href={item.href} className="hover:text-text-secondary transition-colors">{item.label}</Link>
              : <span className="text-text-secondary">{item.label}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
  )
}
