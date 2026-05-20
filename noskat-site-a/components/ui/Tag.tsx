import Link from 'next/link'
import { clsx } from 'clsx'

interface TagProps {
  label: string
  href?: string
  active?: boolean
  className?: string
}

export default function Tag({ label, href, active, className }: TagProps) {
  const cls = clsx(
    'inline-block px-2.5 py-0.5 text-xs font-heading font-medium tracking-wider uppercase transition-colors',
    active ? 'bg-acc text-white' : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-border',
    className,
  )
  if (href) return <Link href={href} className={cls}>{label}</Link>
  return <span className={cls}>{label}</span>
}
