import type { Metadata } from 'next'

const BASE_URL = 'https://nosecutchina.ru'

export function generateMeta(opts: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = `${BASE_URL}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: 'NOSECUT CHINA',
      type: opts.type ?? 'website',
      images: opts.image ? [{ url: opts.image }] : [],
    },
  }
}

export function articleSchema(opts: {
  title: string
  description: string
  date: string
  image: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    image: `${BASE_URL}${opts.image}`,
    url: `${BASE_URL}${opts.path}`,
    publisher: {
      '@type': 'Organization',
      name: 'NOSECUT CHINA',
      url: BASE_URL,
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
