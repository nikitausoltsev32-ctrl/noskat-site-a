import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  href?: string
  linkLabel?: string
}

export default function SectionHeader({ title, href, linkLabel = 'Все материалы' }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="h-0.5 w-8 bg-acc mb-3" />
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-text-primary">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-xs font-heading tracking-wider uppercase text-text-muted hover:text-acc transition-colors">
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}
