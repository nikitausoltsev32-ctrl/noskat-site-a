'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { ROUTES } from '@/lib/routes'
import CookieSettingsButton from '@/components/ui/CookieSettingsButton'

const NAV = [
  { label: 'Новости', href: ROUTES.news },
  { label: 'Статьи', href: ROUTES.articles },
  { label: 'Бренды', href: ROUTES.brands },
  { label: 'О проекте', href: ROUTES.about },
  { label: 'Контакты', href: ROUTES.contacts },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={clsx(
      'sticky top-0 z-50 border-b border-border transition-shadow',
      scrolled ? 'bg-bg/98 shadow-[0_2px_20px_rgba(0,0,0,.6)] backdrop-blur-sm' : 'bg-bg/95 backdrop-blur-sm',
    )}>
      <div className="h-0.5 bg-acc" />
      <div className="container flex items-center gap-6 py-0" style={{ height: 60 }}>
        <Link href={ROUTES.home} className="flex items-center gap-2.5 shrink-0">
          <img src="/brand/logo-circle.png" alt="NOSECUT CHINA" className="w-8 h-8 rounded-full object-cover border border-border" />
          <div>
            <div className="font-heading text-xl font-bold italic tracking-widest leading-none">
              NOSECUT <span className="text-acc">CHINA</span>
            </div>
            <div className="bg-acc inline-block px-1.5 py-px text-[8px] font-heading font-bold tracking-[2px] uppercase text-white mt-0.5">
              НОСКАТЫ И ПЕРЕД АВТО
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV.map(({ label, href }) => {
            const active = path === href || path.startsWith(href + '/')
            return (
              <Link key={href} href={href} className={clsx(
                'px-2.5 py-1.5 font-heading text-xs font-medium tracking-widest uppercase border-b-2 transition-colors',
                active ? 'text-acc border-acc' : 'text-text-muted border-transparent hover:text-text-secondary',
              )}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block ml-auto shrink-0">
          <CookieSettingsButton context="header" />
        </div>

        <button
          className="md:hidden ml-auto p-2 text-text-muted hover:text-text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-bg-card">
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="block px-4 py-3 font-heading text-sm tracking-wider uppercase text-text-secondary hover:text-text-primary hover:bg-bg-elevated border-b border-border last:border-0">
              {label}
            </Link>
          ))}
          <div className="px-4 py-3 border-t border-border">
            <CookieSettingsButton context="header" />
          </div>
        </div>
      )}
    </header>
  )
}
