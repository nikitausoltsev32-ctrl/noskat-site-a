import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'Cookie-политика', description: 'Cookie-политика NOSECUT CHINA.', path: ROUTES.cookies })

export default function CookiesPage() {
  return (
    <StaticPage title="Cookie-политика" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'Cookie-политика' }]}>
      <p>Мы используем cookie для обеспечения корректной работы сайта.</p>
      <h2>Типы cookie</h2>
      <ul>
        <li><strong>Необходимые:</strong> обеспечивают базовую функциональность сайта. Всегда активны.</li>
        <li><strong>Аналитические:</strong> помогают нам понять, как пользователи взаимодействуют с сайтом. Подключаются только с вашего согласия.</li>
      </ul>
      <p>Вы можете изменить настройки cookie в любой момент через баннер в нижней части экрана.</p>
    </StaticPage>
  )
}
