'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authService } from '@/lib/authService'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (!authService.isLoggedIn() || !authService.isAdmin()) {
      router.replace('/login')
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!authorized) return null

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-56 bg-black text-white flex-shrink-0">
        <div className="p-5 border-b border-gray-800">
          <Link href="/main" className="text-lg font-bold tracking-widest">INBYUSO</Link>
          <p className="text-xs text-gray-400 mt-1">관리자</p>
        </div>
        <nav className="p-3 space-y-1">
          <Link
            href="/admin/banners"
            className="flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            배너 관리
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            상품 관리
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
