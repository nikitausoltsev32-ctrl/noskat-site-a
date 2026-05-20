import Link from 'next/link'
import { clsx } from 'clsx'

interface PaginationProps {
  current: number
  total: number
  buildHref: (page: number) => string
}

export default function Pagination({ current, total, buildHref }: PaginationProps) {
  if (total <= 1) return null

  const pages: (number | '...')[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return (
    <nav className="flex items-center gap-1">
      {pages.map((p, i) =>
        p === '...'
          ? <span key={`e${i}`} className="px-2 text-text-muted">...</span>
          : (
            <Link
              key={p}
              href={buildHref(p)}
              className={clsx(
                'w-9 h-9 flex items-center justify-center text-sm font-heading border transition-colors',
                p === current
                  ? 'border-acc bg-acc text-white'
                  : 'border-border text-text-muted hover:border-text-muted hover:text-text-secondary',
              )}
            >
              {p}
            </Link>
          )
      )}
    </nav>
  )
}
