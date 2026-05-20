import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'Реклама', description: 'Рекламные возможности на портале NOSECUT CHINA.', path: ROUTES.advertising })

export default function AdvertisingPage() {
  return (
    <StaticPage title="Реклама" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'Реклама' }]}>
      <p>NOSECUT CHINA предлагает возможности для размещения рекламы на тематическом авто-портале.</p>
      <h2>Форматы размещения</h2>
      <ul>
        <li>Баннеры на главной и внутренних страницах</li>
        <li>Спонсорские материалы и обзоры</li>
        <li>Упоминания в новостях</li>
      </ul>
      <p>Для обсуждения сотрудничества: <a href="mailto:ads@nosecutchina.ru">ads@nosecutchina.ru</a></p>
    </StaticPage>
  )
}
