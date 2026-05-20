import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'О проекте', description: 'NOSECUT CHINA — информационный портал про ноускаты и кузовные запчасти из Китая.', path: ROUTES.about })

export default function AboutPage() {
  return (
    <StaticPage title="О проекте" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'О проекте' }]}>
      <p>NOSECUT CHINA — независимый информационный портал о ноускатах и кузовных запчастях из Китая.</p>
      <p>Мы отслеживаем новости китайского авторынка, публикуем обзоры брендов, освещаем вопросы логистики, таможни и восстановления автомобилей.</p>
      <h2>Что мы публикуем</h2>
      <ul>
        <li>Новости рынка и поставок</li>
        <li>Обзоры ноускатов по брендам и моделям</li>
        <li>Статьи про логистику и таможню</li>
        <li>Аналитику китайского авторынка</li>
      </ul>
      <h2>Контакты редакции</h2>
      <p>По вопросам редакции и сотрудничества: <a href="mailto:info@nosecutchina.ru">info@nosecutchina.ru</a></p>
    </StaticPage>
  )
}
