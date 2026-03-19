export interface Article {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
  author_id: string | null
}

export interface ArticleBlock {
  id: string
  article_id: string
  type: 'text' | 'image'
  content: string | null
  image_url: string | null
  alignment: 'left' | 'center' | 'right' | 'justify'
  sort_order: number
  created_at: string
}

export interface ArticleWithBlocks extends Article {
  article_blocks: ArticleBlock[]
}
