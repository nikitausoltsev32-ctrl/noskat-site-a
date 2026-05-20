import Button from '@/components/ui/Button'
import { ROUTES } from '@/lib/routes'

const CHIPS = ['Новости рынка', 'Обзоры авто', 'Поставки', 'Таможня', 'Бренды Китая']

export default function HeroPortal() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/brand/hero-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 -translate-y-1/2 rounded-full bg-acc/5 blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="container relative z-10 py-16 md:py-24">
        <span className="inline-block px-3 py-1 text-xs font-heading font-medium tracking-[3px] uppercase text-acc border border-acc/30 bg-acc/5 mb-6">
          Информационный портал
        </span>
        <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-wider text-text-primary leading-tight mb-4 max-w-2xl">
          Ноускаты из Китая:<br />
          <span className="text-acc">новости, обзоры,</span><br />
          поставки и рынок
        </h1>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mb-8">
          Следим за китайским авторынком, поставками ноускатов, логистикой, таможней, брендами и восстановлением автомобилей.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          <Button href={ROUTES.news} variant="primary">Читать новости</Button>
          <Button href={ROUTES.articles} variant="ghost">Смотреть обзоры</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {CHIPS.map(chip => (
            <span key={chip} className="px-3 py-1.5 text-xs font-heading tracking-wider uppercase border border-border/60 text-text-muted">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
