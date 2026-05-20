import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Crumb { label: string; href?: string }

interface StaticPageProps {
  title: string
  breadcrumbs: Crumb[]
  children: React.ReactNode
}

export default function StaticPage({ title, breadcrumbs, children }: StaticPageProps) {
  return (
    <div className="container py-10 max-w-3xl">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-8">{title}</h1>
      <div className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  )
}
