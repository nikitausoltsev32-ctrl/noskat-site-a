import Link from 'next/link'
import { clsx } from 'clsx'

type Variant = 'primary' | 'ghost' | 'outline'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  className?: string
}

export default function Button({ children, href, onClick, variant = 'primary', className }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 font-heading text-sm font-medium tracking-wider uppercase transition-colors duration-150'
  const variants: Record<Variant, string> = {
    primary: 'bg-acc text-white hover:bg-acc-hover',
    ghost: 'text-text-secondary hover:text-text-primary border border-border hover:border-text-muted',
    outline: 'border border-acc text-acc hover:bg-acc hover:text-white',
  }
  const cls = clsx(base, variants[variant], className)
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button onClick={onClick} className={cls}>{children}</button>
}
