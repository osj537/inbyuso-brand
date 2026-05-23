export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  salePrice?: number;
  rating?: number;
  imageUrl?: string;
  mainCategory?: string;
  subCategory?: string;
  detailCategory?: string;
  discountRate?: number;
  purchaseCount?: number;
}

export type ProductSection = "NEW" | "RANKING" | "RECOMMEND";
