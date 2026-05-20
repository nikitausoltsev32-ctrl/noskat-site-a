import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import StaticPage from '@/components/ui/StaticPage'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({ title: 'Политика конфиденциальности', description: 'Политика конфиденциальности NOSECUT CHINA.', path: ROUTES.privacy })

export default function PrivacyPage() {
  return (
    <StaticPage title="Политика конфиденциальности" breadcrumbs={[{ label: 'Главная', href: ROUTES.home }, { label: 'Политика конфиденциальности' }]}>
      <p>Настоящая политика описывает, как NOSECUT CHINA обрабатывает персональные данные пользователей.</p>
      <h2>Какие данные мы собираем</h2>
      <p>Мы собираем только технические данные: данные об использовании сайта через аналитические инструменты (при наличии согласия).</p>
      <h2>Cookie</h2>
      <p>Мы используем необходимые cookie для работы сайта. Аналитические cookie подключаются только после вашего явного согласия.</p>
      <h2>Контакты</h2>
      <p>По вопросам персональных данных: <a href="mailto:info@nosecutchina.ru">info@nosecutchina.ru</a></p>
    </StaticPage>
  )
}
