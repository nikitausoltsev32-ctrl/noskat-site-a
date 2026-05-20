import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/legal/'] },
      { userAgent: 'Yandex', allow: '/' },
    ],
    sitemap: 'https://nosecutchina.ru/sitemap.xml',
  }
}
