import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: { default: 'NOSECUT CHINA — Ноускаты из Китая', template: '%s | NOSECUT CHINA' },
  description: 'Информационный портал про ноускаты из Китая. Новости, обзоры, бренды, поставки и рынок.',
  metadataBase: new URL('https://nosecutchina.ru'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
