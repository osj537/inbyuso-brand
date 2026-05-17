'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { bannerService, Banner, BannerRequest } from '@/lib/bannerService'
import { uploadBannerImage } from '@/lib/supabase'

export default function BannerAdminPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState<BannerRequest>({ title: '', imageUrl: '', linkUrl: '', sortOrder: 0 })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadBanners()
  }, [])

  const loadBanners = async () => {
    const data = await bannerService.getAllBanners()
    setBanners(data)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreviewUrl(URL.createObjectURL(file))
    setUploading(true)
    try {
      const url = await uploadBannerImage(file)
      setForm((prev) => ({ ...prev, imageUrl: url }))
    } catch (err) {
      alert('이미지 업로드 실패')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.imageUrl) return alert('제목과 이미지를 입력해주세요')
    if (editingId) {
      await bannerService.update(editingId, form)
    } else {
      await bannerService.create(form)
    }
    resetForm()
    loadBanners()
  }

  const handleEdit = (banner: Banner) => {
    setEditingId(banner.id)
    setForm({ title: banner.title, imageUrl: banner.imageUrl, linkUrl: banner.linkUrl ?? '', sortOrder: banner.sortOrder })
    setPreviewUrl(banner.imageUrl)
  }

  const handleToggle = async (id: string) => {
    await bannerService.toggle(id)
    loadBanners()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await bannerService.delete(id)
    loadBanners()
  }

  const resetForm = () => {
    setForm({ title: '', imageUrl: '', linkUrl: '', sortOrder: 0 })
    setEditingId(null)
    setPreviewUrl(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">배너 관리</h1>

      {/* 등록/수정 폼 */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          {editingId ? '배너 수정' : '새 배너 등록'}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-500"
              placeholder="배너 제목"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">링크 URL</label>
            <input
              type="text"
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-500"
              placeholder="클릭 시 이동할 URL (선택)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">순서</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이미지</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-sm file:cursor-pointer"
            />
          </div>
        </div>

        {previewUrl && (
          <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
            <Image src={previewUrl} alt="미리보기" fill className="object-cover" />
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            {uploading ? '업로드 중...' : editingId ? '수정 완료' : '등록'}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="px-5 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          )}
        </div>
      </div>

      {/* 배너 목록 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">이미지</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">제목</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">순서</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">상태</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">등록된 배너가 없습니다</td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="relative w-24 h-14 rounded overflow-hidden bg-gray-100">
                      <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{banner.title}</td>
                  <td className="px-4 py-3 text-gray-500">{banner.sortOrder}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${banner.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {banner.active ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(banner)} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">수정</button>
                      <button onClick={() => handleToggle(banner.id)} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                        {banner.active ? '비활성' : '활성'}
                      </button>
                      <button onClick={() => handleDelete(banner.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">삭제</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
