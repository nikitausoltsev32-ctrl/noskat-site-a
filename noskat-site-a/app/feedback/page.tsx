import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import FeedbackForm from '@/components/ui/FeedbackForm'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({
  title: 'Обратная связь — NOSECUT CHINA',
  description: 'Форма обратной связи: вопросы по работе сайта, жалобы, запросы по 152-ФЗ и предложения.',
  path: ROUTES.feedback,
})

export default function FeedbackPage() {
  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Обратная связь' }]} />
      <div className="max-w-2xl mt-6">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mb-3">
          Обратная связь
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          Вопросы по работе сайта, замечания, запросы по 152-ФЗ — напишите нам.
          Постараемся ответить в течение нескольких рабочих дней. Это служебная форма
          обратной связи, не для подачи заявки на службу.
        </p>
        <FeedbackForm />
      </div>
    </div>
  )
}
