import type { NewsPost } from '@/types'

export const NEWS: NewsPost[] = [
  {
    slug: 'haval-f7x-2024-postavki-rossiya',
    title: 'Поставки Haval F7x выросли на 34% — новые партии ноускатов уже в пути',
    excerpt: 'Китайский завод Great Wall Motors нарастил производство F7x. Первые партии ноускатов уже отгружены из Тяньцзиня.',
    body: '<p>Завод Great Wall Motors в провинции Хэбэй увеличил суточную норму выпуска Haval F7x на 34% по сравнению с прошлым кварталом...</p>',
    category: 'deliveries',
    date: '2024-11-15',
    readTime: 3,
    image: '/brand/banner.png',
    views: 1240,
    tags: ['haval', 'f7x', 'поставки'],
  },
  {
    slug: 'chery-tiggo-8-noskat-obzor',
    title: 'Ноускат Chery Tiggo 8: что входит в комплект и как отличить оригинал',
    excerpt: 'Разбираем комплектацию переднего кузовного набора Chery Tiggo 8 и главные признаки качественного ноуската.',
    body: '<p>Chery Tiggo 8 остаётся одним из самых популярных автомобилей среди заказчиков ноускатов...</p>',
    category: 'market',
    date: '2024-11-12',
    readTime: 5,
    image: '/brand/banner.png',
    views: 987,
    tags: ['chery', 'tiggo8'],
  },
  {
    slug: 'geely-monjaro-tamozhnya-2024',
    title: 'Таможня 2024: новые правила ввоза кузовных запчастей из Китая',
    excerpt: 'С 1 декабря вступают в силу изменения в таможенном декларировании кузовных запчастей. Что важно знать.',
    body: '<p>Федеральная таможенная служба опубликовала разъяснения по новым кодам ТН ВЭД для кузовных деталей...</p>',
    category: 'customs',
    date: '2024-11-10',
    readTime: 4,
    image: '/brand/banner.png',
    views: 2100,
    tags: ['таможня', 'импорт'],
  },
  {
    slug: 'byd-atto3-rynok-rossiya',
    title: 'BYD Atto 3 захватывает рынок: спрос на ноускаты вырос вдвое',
    excerpt: 'Рост продаж BYD в России привёл к рекордному спросу на кузовные запчасти и ноускаты для этой модели.',
    body: '<p>По данным аналитической компании «Автостат», продажи BYD Atto 3 в России выросли в 2.1 раза...</p>',
    category: 'brands',
    date: '2024-11-08',
    readTime: 3,
    image: '/brand/banner.png',
    views: 1560,
    tags: ['byd', 'atto3'],
  },
  {
    slug: 'changan-uni-k-noskat-komplekt',
    title: 'Changan UNI-K: полный комплект ноуската за 6 недель',
    excerpt: 'Новый маршрут поставки через Владивосток сократил срок доставки ноуската Changan UNI-K с 10 до 6 недель.',
    body: '<p>Логистическая компания «Восток Авто» открыла новый маршрут доставки кузовных запчастей...</p>',
    category: 'deliveries',
    date: '2024-11-05',
    readTime: 3,
    image: '/brand/banner.png',
    views: 890,
    tags: ['changan', 'unik', 'логистика'],
  },
  {
    slug: 'exeed-tx-noskat-rynok',
    title: 'Exeed TX входит в топ-5 по запросам на ноускаты — аналитика ноября',
    excerpt: 'Exeed TX вошёл в пятёрку самых запрашиваемых автомобилей для подбора ноуската по итогам октября 2024.',
    body: '<p>Аналитика запросов на подбор ноускатов за октябрь 2024 года показала заметный рост интереса к модели Exeed TX...</p>',
    category: 'market',
    date: '2024-11-03',
    readTime: 2,
    image: '/brand/banner.png',
    views: 730,
    tags: ['exeed', 'аналитика'],
  },
]

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return NEWS.find(n => n.slug === slug)
}

export function getNewsByCategory(categorySlug: string): NewsPost[] {
  return NEWS.filter(n => n.category === categorySlug)
}

export function getLatestNews(count = 6): NewsPost[] {
  return [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count)
}

export function getPopularNews(count = 5): NewsPost[] {
  return [...NEWS].sort((a, b) => b.views - a.views).slice(0, count)
}
