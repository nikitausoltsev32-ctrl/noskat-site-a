import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo'
import { BRANDS } from '@/data/brands'
import BrandCard from '@/components/cards/BrandCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = generateMeta({
  title: 'Бренды ноускатов из Китая',
  description: 'SEO-хабы по китайским автомобильным брендам: Haval, Chery, Geely, Changan, BYD и другие.',
  path: ROUTES.brands,
})

export default function BrandsPage() {
  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: 'Главная', href: ROUTES.home }, { label: 'Бренды' }]} />
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-text-primary mt-4 mb-2">Бренды</h1>
      <p className="text-text-muted text-sm mb-8">Ноускаты и кузовные запчасти для китайских автомобилей</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BRANDS.map(b => <BrandCard key={b.slug} brand={b} />)}
      </div>
    </div>
  )
}
