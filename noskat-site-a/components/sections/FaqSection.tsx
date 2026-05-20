'use client'
import { useState } from 'react'
import type { FaqItem } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="container py-16">
      <SectionHeader title="Частые вопросы" />
      <div className="space-y-1 max-w-3xl">
        {items.map((item, i) => (
          <div key={i} className="border border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-bg-elevated transition-colors"
            >
              <span className="font-heading text-sm font-medium tracking-wide text-text-primary">{item.question}</span>
              <span className={`text-acc transition-transform shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
