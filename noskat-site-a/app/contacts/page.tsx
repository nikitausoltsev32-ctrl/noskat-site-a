import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'Контакты', description: 'Связаться с редакцией NOSECUT CHINA.', path: ROUTES.contacts })

export default function ContactsPage() {
  return (
    <StaticPage title="Контакты" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'Контакты' }]}>
      <p>Email редакции: <a href="mailto:info@nosecutchina.ru">info@nosecutchina.ru</a></p>
      <p>По вопросам размещения рекламы: <a href="mailto:ads@nosecutchina.ru">ads@nosecutchina.ru</a></p>
    </StaticPage>
  )
}
