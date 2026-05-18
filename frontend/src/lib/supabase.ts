import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase 환경변수가 설정되지 않았습니다.')
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as any)[prop]
  }
})

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
