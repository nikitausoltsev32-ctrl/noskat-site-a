export interface NewsPost {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  date: string
  readTime: number
  image: string
  views: number
  tags?: string[]
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  date: string
  readTime: number
  image: string
  tags?: string[]
}

export interface Brand {
  slug: string
  name: string
  description: string
  models: string[]
  newsIds: string[]
  articleIds: string[]
  faq: FaqItem[]
}

export interface Category {
  slug: string
  name: string
  type: 'news' | 'articles'
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}
