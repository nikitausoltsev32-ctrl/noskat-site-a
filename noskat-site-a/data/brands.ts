import type { Brand } from '@/types'

export const BRANDS: Brand[] = [
  {
    slug: 'haval',
    name: 'Haval',
    description: 'Один из самых популярных китайских брендов в России. Широкий выбор ноускатов для F7, F7x, H9.',
    models: ['F7', 'F7x', 'H9', 'Jolion', 'Dargo'],
    newsIds: ['haval-f7x-2024-postavki-rossiya', 'haval-f7-noskat-obzor-zapchasti'],
    articleIds: ['haval-f7-noskat-obzor-zapchasti'],
    faq: [
      { question: 'Какие модели Haval самые популярные для заказа ноуската?', answer: 'F7 и F7x — лидеры по запросам.' },
      { question: 'Сколько ждать ноускат Haval?', answer: 'В среднем 4–8 недель с момента заказа.' },
    ],
  },
  {
    slug: 'chery',
    name: 'Chery',
    description: 'Широкая линейка моделей. Ноускаты для Tiggo 4, 7, 8 и Arrizo в постоянном наличии.',
    models: ['Tiggo 4', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Arrizo 8'],
    newsIds: ['chery-tiggo-8-noskat-obzor'],
    articleIds: [],
    faq: [
      { question: 'Есть ли ноускаты для Chery Tiggo 8 Pro Max?', answer: 'Да, доступны по заказу.' },
    ],
  },
  {
    slug: 'geely',
    name: 'Geely',
    description: 'Премиальные ноускаты для Atlas Pro, Coolray и Monjaro. Высокое качество кузовных деталей.',
    models: ['Atlas Pro', 'Coolray', 'Monjaro', 'Emgrand'],
    newsIds: [],
    articleIds: ['vosstanovlenie-peredney-chasti-avto'],
    faq: [
      { question: 'Чем отличается ноускат Geely от других китайских марок?', answer: 'Geely использует более плотные пластики кузова.' },
    ],
  },
  {
    slug: 'changan',
    name: 'Changan',
    description: 'Быстрорастущий бренд. Ноускаты для UNI-K, UNI-V и CS серии.',
    models: ['UNI-K', 'UNI-V', 'CS55 Plus', 'CS75 Plus'],
    newsIds: ['changan-uni-k-noskat-komplekt'],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'byd',
    name: 'BYD',
    description: 'Электромобили и гибриды. Ноускаты для Atto 3, Han, Seal.',
    models: ['Atto 3', 'Han', 'Seal', 'Dolphin'],
    newsIds: ['byd-atto3-rynok-rossiya'],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'exeed',
    name: 'Exeed',
    description: 'Премиум-сегмент Chery. Ноускаты для TX, TXL и LX.',
    models: ['TX', 'TXL', 'LX', 'VX'],
    newsIds: ['exeed-tx-noskat-rynok'],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'tank',
    name: 'Tank',
    description: 'Внедорожная линейка Great Wall. Ноускаты для Tank 300, 400, 500.',
    models: ['300', '400', '500'],
    newsIds: [],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'li-auto',
    name: 'Li Auto',
    description: 'Гибридные внедорожники. L6, L7, L8, L9 — ноускаты под заказ.',
    models: ['L6', 'L7', 'L8', 'L9'],
    newsIds: [],
    articleIds: [],
    faq: [],
  },
  {
    slug: 'zeekr',
    name: 'Zeekr',
    description: 'Электрический суббренд Geely. Ноускаты для 001 и 009.',
    models: ['001', '009', 'X'],
    newsIds: [],
    articleIds: [],
    faq: [],
  },
]

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find(b => b.slug === slug)
}
