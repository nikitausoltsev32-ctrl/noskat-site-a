import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

const SECTIONS = [
  { title: 'Контент', links: [
    { label: 'Новости', href: ROUTES.news },
    { label: 'Статьи', href: ROUTES.articles },
    { label: 'Бренды', href: ROUTES.brands },
  ]},
  { title: 'Портал', links: [
    { label: 'О проекте', href: ROUTES.about },
    { label: 'Контакты', href: ROUTES.contacts },
    { label: 'Реклама', href: ROUTES.advertising },
  ]},
  { title: 'Правовая информация', links: [
    { label: 'Политика конфиденциальности', href: ROUTES.privacy },
    { label: 'Cookie-политика', href: ROUTES.cookies },
    { label: 'Пользовательское соглашение', href: ROUTES.terms },
  ]},
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-card mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-heading text-xl font-bold italic tracking-widest mb-1">
              NOSECUT <span className="text-acc">CHINA</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mt-3">
              Информационный портал про ноускаты из Китая. Новости, обзоры, бренды и рынок.
            </p>
          </div>
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h3 className="font-heading text-xs font-medium tracking-widest uppercase text-text-muted mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-10 pt-6 text-xs text-text-muted text-center">
          © {new Date().getFullYear()} NOSECUT CHINA. Информационный портал.
        </div>
      </div>
    </footer>
  )
}
