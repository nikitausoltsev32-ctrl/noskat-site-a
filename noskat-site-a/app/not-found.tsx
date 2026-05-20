import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <div className="font-heading text-8xl font-bold text-acc mb-4">404</div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-wider text-text-primary mb-4">Страница не найдена</h1>
      <p className="text-text-muted mb-8">Страница была удалена или никогда не существовала.</p>
      <Link href={ROUTES.home} className="inline-flex items-center gap-2 px-6 py-3 bg-acc text-white font-heading text-sm tracking-wider uppercase hover:bg-acc-hover transition-colors">
        На главную
      </Link>
    </div>
  )
}
