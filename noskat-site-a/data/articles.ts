import type { Article } from '@/types'

export const ARTICLES: Article[] = [
  {
    slug: 'chto-takoe-noskat-avtomobilya',
    title: 'Что такое ноускат автомобиля и зачем его везут из Китая',
    excerpt: 'Подробное объяснение: что входит в ноускат, почему именно Китай стал главным поставщиком, и как это работает.',
    body: '<p>Ноускат — это передняя часть кузова автомобиля в сборе...</p>',
    category: 'reviews',
    date: '2024-11-14',
    readTime: 8,
    image: '/brand/banner.png',
    tags: ['ноускат', 'объяснение', 'китай'],
  },
  {
    slug: 'logistika-noskatov-iz-kitaya-2024',
    title: 'Логистика ноускатов из Китая в 2024 году: маршруты, сроки, стоимость',
    excerpt: 'Актуальные схемы доставки кузовных запчастей из Китая. Владивосток, Казахстан, Монголия — сравниваем.',
    body: '<p>За последние два года логистика поставок из Китая кардинально изменилась...</p>',
    category: 'logistics',
    date: '2024-11-09',
    readTime: 10,
    image: '/brand/banner.png',
    tags: ['логистика', 'доставка', 'маршруты'],
  },
  {
    slug: 'haval-f7-noskat-obzor-zapchasti',
    title: 'Ноускат Haval F7: полный обзор комплектации и качества запчастей',
    excerpt: 'Детальный разбор комплекта ноуската для Haval F7. Что входит, чего ожидать, на что смотреть при приёмке.',
    body: '<p>Haval F7 — один из самых массовых китайских кроссоверов на российском рынке...</p>',
    category: 'reviews',
    date: '2024-11-06',
    readTime: 12,
    image: '/brand/banner.png',
    tags: ['haval', 'f7', 'обзор'],
  },
  {
    slug: 'vosstanovlenie-peredney-chasti-avto',
    title: 'Восстановление передней части авто с ноускатом из Китая: пошаговый процесс',
    excerpt: 'Как происходит замена ноуската на практике: от заказа до установки. Реальный кейс с Geely Monjaro.',
    body: '<p>Восстановление автомобиля после фронтального ДТП с использованием китайского ноуската...</p>',
    category: 'restoration',
    date: '2024-11-01',
    readTime: 15,
    image: '/brand/banner.png',
    tags: ['восстановление', 'geely', 'monjaro'],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter(a => a.category === categorySlug)
}

export function getLatestArticles(count = 4): Article[] {
  return [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count)
}
