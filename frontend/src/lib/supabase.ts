import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadBannerImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('banners')
    .upload(fileName, file, { upsert: false })

  if (error) throw new Error('이미지 업로드 실패: ' + error.message)

  const { data } = supabase.storage.from('banners').getPublicUrl(fileName)
  return data.publicUrl
}
