import type { Brand } from '@/types'
import BrandCard from '@/components/cards/BrandCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

export default function BrandsSection({ brands }: { brands: Brand[] }) {
  return (
    <section className="container py-12">
      <SectionHeader title="Бренды и хабы" href={ROUTES.brands} linkLabel="Все бренды" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {brands.map(b => <BrandCard key={b.slug} brand={b} />)}
      </div>
    </section>
  )
}
