export default function PromoFillerSection() {
  return (
    <section className="container py-12">
      <div className="border border-border bg-bg-card overflow-hidden flex flex-col md:flex-row min-h-[260px]">
        {/* Left: image placeholder — replace bg gradient with <img src="/promo-car.jpg"> when ready */}
        <div className="md:w-1/2 min-h-[200px] md:min-h-0 bg-gradient-to-br from-bg via-bg-elevated to-bg-card flex items-center justify-center">
          <span className="font-heading text-6xl font-bold tracking-widest text-border opacity-20 select-none">
            AUTO
          </span>
        </div>
        {/* Right: text */}
        <div className="md:w-1/2 flex flex-col justify-center px-10 py-10 border-t md:border-t-0 md:border-l border-border">
          <div className="h-0.5 w-10 bg-acc mb-5" />
          <p className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-widest leading-tight text-text-primary mb-4">
            Китайский автопром меняет правила игры
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Следите за рынком ноускатов — актуальные поставки, бренды и цены вместе с NOSECUT CHINA.
          </p>
        </div>
      </div>
    </section>
  )
}
