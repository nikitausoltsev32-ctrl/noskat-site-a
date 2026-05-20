import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'Пользовательское соглашение', description: 'Пользовательское соглашение NOSECUT CHINA.', path: ROUTES.terms })

export default function TermsPage() {
  return (
    <StaticPage title="Пользовательское соглашение" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'Пользовательское соглашение' }]}>
      <p>Используя портал NOSECUT CHINA, вы соглашаетесь с настоящим соглашением.</p>
      <h2>Использование материалов</h2>
      <p>Все материалы портала являются информационными. Перепечатка материалов без ссылки на источник запрещена.</p>
      <h2>Ограничение ответственности</h2>
      <p>Портал не несёт ответственности за решения, принятые пользователями на основании публикуемой информации.</p>
    </StaticPage>
  )
}
