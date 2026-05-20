import type { Category } from '@/types'

export const NEWS_CATEGORIES: Category[] = [
  { slug: 'market', name: 'Новости рынка', type: 'news', description: 'Главные события китайского авторынка' },
  { slug: 'deliveries', name: 'Поставки', type: 'news', description: 'Логистика и поставки ноускатов из Китая' },
  { slug: 'customs', name: 'Таможня', type: 'news', description: 'Таможенное оформление кузовных запчастей' },
  { slug: 'brands', name: 'Бренды Китая', type: 'news', description: 'Новости китайских автомобильных брендов' },
]

export const ARTICLE_CATEGORIES: Category[] = [
  { slug: 'reviews', name: 'Обзоры авто', type: 'articles', description: 'Экспертные обзоры автомобилей и ноускатов' },
  { slug: 'logistics', name: 'Логистика', type: 'articles', description: 'Схемы доставки запчастей из Китая' },
  { slug: 'restoration', name: 'Восстановление авто', type: 'articles', description: 'Восстановление передней части авто' },
  { slug: 'parts', name: 'Запчасти из Китая', type: 'articles', description: 'Кузовные запчасти и комплектующие' },
]

export const ALL_CATEGORIES = [...NEWS_CATEGORIES, ...ARTICLE_CATEGORIES]
