import ProductCard from './ProductCard'

interface Product {
  brand: string
  name: string
  price: number
  salePrice?: number
  rating?: number
}

interface ProductSectionProps {
  title: string
  products?: Product[]
}

const MOCK_PRODUCTS: Product[] = [
  { brand: 'Grten Lab', name: '그린 토닉 에센스 150ml', price: 28000 },
  { brand: 'Blure Sons', name: '로즈 앰플 세럼 30ml', price: 42000, salePrice: 22000 },
  { brand: 'Grten Lab', name: '그린 토닉 에센스 150ml', price: 28000 },
  { brand: 'Grten Lab', name: '그린 토닉 에센스 150ml', price: 28000, salePrice: 22000 },
  { brand: 'Grten Lab', name: '그린 토닉 에센스 150ml', price: 28000 },
  { brand: 'Blure Sons', name: '로즈 앰플 세럼 30ml', price: 42000 },
  { brand: 'Grten Lab', name: '그린 토닉 에센스 150ml', price: 28000 },
  { brand: 'Grten Lab', name: '그린 토닉 에센스 150ml', price: 28000 },
  { brand: 'Grten Lab', name: '그린 토닉 에센스 150ml', price: 28000, salePrice: 22000 },
  { brand: 'Blure Sons', name: '로즈 앰플 세럼 30ml', price: 42000 },
]

export default function ProductSection({ title, products = MOCK_PRODUCTS }: ProductSectionProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <button className="text-xs text-gray-400 hover:text-gray-600">더보기</button>
      </div>

      {/* 1행 */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {products.slice(0, 5).map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>

      {/* 2행 */}
      <div className="grid grid-cols-5 gap-4">
        {products.slice(5, 10).map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  )
}
