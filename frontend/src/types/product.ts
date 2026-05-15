export interface Product {
  id: string
  brand: string
  name: string
  price: number
  salePrice?: number
  rating?: number
  imageUrl?: string
  category?: string
  discountRate?: number
  purchaseCount?: number
}

export type ProductSection = 'NEW' | 'RANKING' | 'RECOMMEND'
