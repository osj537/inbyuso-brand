'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['스킨케어', '메이크업', '클렌징', '선케어', '헤어케어', '바디케어', '향', '비건뷰티', '기타']
const CHANNELS = ['쇼핑몰', '스마트스토어', '쿠팡', '무신사', '카카오쇼핑', '인스타그램샵', '오프라인 매장', '해외 판매', '없음 (첫 판매 채널)']
const CONTACT_METHODS = ['이메일', '전화', '카카오톡']
const REVENUE_OPTIONS = ['아직 매출 없음 (사업 창업)', '100만원 미만', '100~500만원', '500만~1,000만원', '1,000만원 이상']
const SOURCE_OPTIONS = ['인스타그램 / SNS', '지인 추천', '인뷰소에서 직접 연락', '검색', '기타']
const PRICE_RANGES = ['1만원 미만', '1~3만원', '3~5만원', '5~10만원', '10만원 이상']

type FormData = {
  brandNameKo: string
  brandNameEn: string
  foundedYear: string
  bizNumber: string
  ceoName: string
  brandDesc: string
  instagram: string
  storeUrl: string
  categories: string[]
  mainProductName: string
  mainProductPrice: string
  productCount: string
  priceRange: string
  currentChannels: string[]
  revenue: string
  contactName: string
  contactRole: string
  contactEmail: string
  contactPhone: string
  preferContact: string[]
  applyReason: string
  brandGoal: string
  extra: string
}

const initial: FormData = {
  brandNameKo: '', brandNameEn: '', foundedYear: '', bizNumber: '', ceoName: '',
  brandDesc: '', instagram: '', storeUrl: '',
  categories: [], mainProductName: '', mainProductPrice: '', productCount: '', priceRange: '', currentChannels: [], revenue: '',
  contactName: '', contactRole: '', contactEmail: '', contactPhone: '', preferContact: [],
  applyReason: '', brandGoal: '', extra: '',
}

function toggleArr(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-xs border-[1.5px] transition-all ${active ? 'bg-[#111] border-[#111] text-white font-medium' : 'border-[#D8D4CE] text-[#888480] hover:border-[#111] hover:text-[#111]'}`}
    >
      {label}
    </button>
  )
}

function Radio({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 border-[1.5px] text-left transition-all ${active ? 'border-[#111] bg-[#F0EDE8]' : 'border-[#D8D4CE] hover:border-[#111]'}`}
    >
      <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${active ? 'border-[#111] bg-[#111]' : 'border-[#D8D4CE]'}`}>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      <span className={`text-[13px] ${active ? 'text-[#111] font-medium' : 'text-[#888480]'}`}>{label}</span>
    </button>
  )
}

export default function ApplyFormPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initial)
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof FormData, val: string) => setForm(prev => ({ ...prev, [key]: val }))
  const toggleCat = (val: string) => setForm(prev => ({ ...prev, categories: toggleArr(prev.categories, val) }))
  const toggleChannel = (val: string) => setForm(prev => ({ ...prev, currentChannels: toggleArr(prev.currentChannels, val) }))
  const toggleContact = (val: string) => setForm(prev => ({ ...prev, preferContact: toggleArr(prev.preferContact, val) }))

  const handleSubmit = () => {
    if (!agreed) { alert('개인정보처리방침에 동의해주세요.'); return }
    const body = `
[브랜드 기본 정보]
브랜드명(한글): ${form.brandNameKo}
브랜드명(영문): ${form.brandNameEn}
설립연도: ${form.foundedYear}
사업자등록번호: ${form.bizNumber}
대표자명: ${form.ceoName}
브랜드 소개: ${form.brandDesc}
인스타그램: ${form.instagram}
스토어 URL: ${form.storeUrl}

[제품 및 판매 정보]
카테고리: ${form.categories.join(', ')}
대표 제품명: ${form.mainProductName}
대표 제품 가격: ${form.mainProductPrice}
전체 제품 수: ${form.productCount}
평균 가격대: ${form.priceRange}
현재 판매 채널: ${form.currentChannels.join(', ')}
월평균 매출: ${form.revenue}

[담당자 연락처]
담당자명: ${form.contactName}
직책: ${form.contactRole}
이메일: ${form.contactEmail}
연락처: ${form.contactPhone}
선호 연락 방법: ${form.preferContact.join(', ')}

[추가 정보]
신청 계기: ${form.applyReason}
인뷰소를 통해 이루고 싶은 것: ${form.brandGoal}
추가 전달 내용: ${form.extra}
    `.trim()

    window.location.href = `mailto:hello@inbyuso.com?subject=[입점신청] ${form.brandNameKo}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  const progress = (step / 4) * 100

  const stepLabels = ['브랜드 기본 정보', '제품 및 판매 정보', '담당자 연락처', '추가 정보']

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-4">
        <div className="text-center max-w-[480px]">
          <div className="w-16 h-16 rounded-full border-[1.5px] border-[#1F3D2A] flex items-center justify-center mx-auto mb-7 text-2xl">✓</div>
          <h2 className="text-[36px] font-light tracking-[-0.02em] mb-4">
            신청이<br /><em className="not-italic text-[#1F3D2A]">완료되었습니다</em>
          </h2>
          <p className="text-sm text-[#888480] leading-loose mb-10">
            입점 신청서가 성공적으로 제출되었습니다.<br />
            인뷰소 에디터가 직접 검토 후 5영업일 이내에<br />
            입력하신 이메일로 결과를 안내해드립니다.
          </p>
          <div className="flex flex-col gap-px bg-[#D8D4CE] border border-[#D8D4CE] mb-9 text-left">
            {[['검토 기간', '5영업일 이내'], ['결과 안내', '이메일 / 연락처'], ['문의', 'hello@inbyuso.com']].map(([label, val]) => (
              <div key={label} className="bg-[#F8F6F2] px-5 py-3.5 flex justify-between text-[13px]">
                <span className="text-[#B8B4AE]">{label}</span>
                <span className="font-medium">{val}</span>
              </div>
            ))}
          </div>
          <Link href="/main" className="inline-block border-[1.5px] border-[#111] px-8 py-3.5 text-sm font-medium tracking-[0.05em] hover:bg-[#111] hover:text-white transition-all">
            인뷰소 홈으로 →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-14 py-5 bg-[#F8F6F2]/90 backdrop-blur-md border-b border-[#D8D4CE]">
        <span className="text-[16px] font-bold tracking-[0.18em] uppercase">INBYUSO</span>
        <Link href="/apply" className="text-xs text-[#888480] flex items-center gap-1.5 hover:text-[#111] transition-colors">
          ← 입점 소개로 돌아가기
        </Link>
      </nav>

      {/* 히어로 */}
      <div className="max-w-[1280px] mx-auto px-14 pt-32 pb-16 border-b border-[#D8D4CE] grid grid-cols-2 gap-20 items-end">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-px bg-[#1F3D2A]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#1F3D2A]">브랜드 입점 신청</span>
          </div>
          <h1 className="text-[clamp(40px,4.5vw,64px)] font-light leading-[1.1] tracking-[-0.02em] mb-5">
            함께<br /><em className="not-italic text-[#1F3D2A]">시작합니다</em>
          </h1>
          <p className="text-sm text-[#888480] leading-loose font-light">
            까다로운 기준이 아닌 제품의 완성도로 심사됩니다.<br />
            5영업일 내에 검토 결과를 안내해드립니다.
          </p>
        </div>
        <div className="flex flex-col gap-px bg-[#D8D4CE] border border-[#D8D4CE]">
          {[['입점비', '0원', true], ['광고비', '0원', true], ['거래수수료', '25%', false], ['검토 기간', '5영업일 이내', false], ['배송비 지원', '건당 1,000원', true]].map(([label, val, green]) => (
            <div key={String(label)} className="bg-[#F8F6F2] px-5 py-4 flex items-center justify-between">
              <span className="text-[11px] text-[#B8B4AE]">{label}</span>
              <span className={`text-[13px] font-medium ${green ? 'text-[#1F3D2A]' : 'text-[#111]'}`}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 폼 레이아웃 */}
      <div className="max-w-[1280px] mx-auto px-14 py-16 grid grid-cols-[280px_1fr] gap-20 items-start">
        {/* 스텝 네비 */}
        <div className="sticky top-24">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#B8B4AE] mb-5 pb-4 border-b border-[#D8D4CE]">신청 단계</p>
          <div className="flex flex-col">
            {stepLabels.map((label, i) => {
              const n = i + 1
              const isActive = step === n
              const isDone = step > n
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => n < step && setStep(n)}
                  className="flex items-start gap-3.5 py-3.5 border-b border-[#D8D4CE] last:border-none text-left"
                >
                  <div className={`w-5 h-5 rounded-full border-[1.5px] flex-shrink-0 flex items-center justify-center mt-0.5 text-[9px] transition-all
                    ${isDone ? 'bg-[#1F3D2A] border-[#1F3D2A] text-white' : isActive ? 'bg-[#111] border-[#111] text-white' : 'border-[#D8D4CE] text-transparent'}`}>
                    ✓
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#B8B4AE] mb-0.5">Step 0{n}</p>
                    <p className={`text-[13px] leading-snug ${isActive ? 'text-[#111] font-semibold' : isDone ? 'text-[#1F3D2A]' : 'text-[#888480]'}`}>{label}</p>
                  </div>
                </button>
              )
            })}
          </div>
          <div className="mt-6 pt-5 border-t border-[#D8D4CE]">
            <div className="flex justify-between text-[11px] text-[#B8B4AE] mb-2">
              <span>진행률</span><span>{progress}%</span>
            </div>
            <div className="h-0.5 bg-[#D8D4CE]">
              <div className="h-full bg-[#1F3D2A] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* 폼 본문 */}
        <div>
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div className="pb-5 border-b-2 border-[#111] mb-9">
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#1F3D2A] mb-2">Step 01 / 04</p>
                <h2 className="text-[28px] font-light tracking-[-0.02em]">브랜드 <em className="not-italic text-[#1F3D2A]">기본 정보</em></h2>
                <p className="text-[13px] text-[#888480] mt-2 font-light">브랜드를 소개해주세요. 심사 전 가장 중요하게 검토되는 단계입니다.</p>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <Field label="브랜드명 (한글)" required>
                  <input type="text" value={form.brandNameKo} onChange={e => set('brandNameKo', e.target.value)} placeholder="예) 베르데멩" className={inputCls} />
                </Field>
                <Field label="브랜드명 (영문)" required>
                  <input type="text" value={form.brandNameEn} onChange={e => set('brandNameEn', e.target.value)} placeholder="예) Verde Lab" className={inputCls} />
                </Field>
                <Field label="브랜드 설립연도" required>
                  <input type="number" value={form.foundedYear} onChange={e => set('foundedYear', e.target.value)} placeholder="예) 2022" className={inputCls} />
                </Field>
                <Field label="사업자등록번호" required>
                  <input type="text" value={form.bizNumber} onChange={e => set('bizNumber', e.target.value)} placeholder="000-00-00000" className={inputCls} />
                </Field>
                <Field label="대표자명" required className="col-span-2">
                  <input type="text" value={form.ceoName} onChange={e => set('ceoName', e.target.value)} placeholder="대표자 성함을 입력해주세요" className={inputCls} />
                </Field>
              </div>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <Field label="브랜드 소개" required hint="브랜드의 핵심 가치와 철학을 150자 이내로 작성해주세요">
                <textarea value={form.brandDesc} onChange={e => set('brandDesc', e.target.value)} maxLength={150} placeholder="예) 베르데멩은 15가지 식물 추출물을 배합한 클린 비건 스킨케어 브랜드입니다." className={`${inputCls} resize-y min-h-[100px] leading-relaxed`} />
                <p className="text-right text-[11px] text-[#B8B4AE] mt-1">{form.brandDesc.length} / 150</p>
              </Field>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <div className="grid grid-cols-2 gap-5">
                <Field label="브랜드 인스타그램">
                  <input type="text" value={form.instagram} onChange={e => set('instagram', e.target.value)} placeholder="@verde_lab" className={inputCls} />
                </Field>
                <Field label="쇼핑몰 / 스토어 URL">
                  <input type="text" value={form.storeUrl} onChange={e => set('storeUrl', e.target.value)} placeholder="https://" className={inputCls} />
                </Field>
              </div>
              <NavBtns onNext={() => setStep(2)} />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className="pb-5 border-b-2 border-[#111] mb-9">
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#1F3D2A] mb-2">Step 02 / 04</p>
                <h2 className="text-[28px] font-light tracking-[-0.02em]">제품 및 <em className="not-italic text-[#1F3D2A]">판매 정보</em></h2>
                <p className="text-[13px] text-[#888480] mt-2 font-light">어떤 제품을 판매하고 있는지 알려주세요.</p>
              </div>
              <Field label="주요 카테고리" required hint="해당하는 카테고리를 모두 선택해주세요">
                <div className="flex flex-wrap gap-2 mt-1">
                  {CATEGORIES.map(c => <Chip key={c} label={c} active={form.categories.includes(c)} onClick={() => toggleCat(c)} />)}
                </div>
              </Field>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <div className="grid grid-cols-2 gap-5 mb-5">
                <Field label="대표 제품명" required>
                  <input type="text" value={form.mainProductName} onChange={e => set('mainProductName', e.target.value)} placeholder="예) 그린 토닉 에센스 150ml" className={inputCls} />
                </Field>
                <Field label="대표 제품 가격" required>
                  <input type="text" value={form.mainProductPrice} onChange={e => set('mainProductPrice', e.target.value)} placeholder="예) 28,000원" className={inputCls} />
                </Field>
                <Field label="전체 제품 수">
                  <input type="number" value={form.productCount} onChange={e => set('productCount', e.target.value)} placeholder="예) 12" className={inputCls} />
                </Field>
                <Field label="평균 가격대">
                  <select value={form.priceRange} onChange={e => set('priceRange', e.target.value)} className={selectCls}>
                    <option value="">선택해주세요</option>
                    {PRICE_RANGES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </Field>
              </div>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <Field label="현재 판매 채널" required hint="현재 이용 중인 채널을 모두 선택해주세요">
                <div className="flex flex-wrap gap-2 mt-1">
                  {CHANNELS.map(c => <Chip key={c} label={c} active={form.currentChannels.includes(c)} onClick={() => toggleChannel(c)} />)}
                </div>
              </Field>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <Field label="월평균 매출 규모">
                <div className="flex flex-col gap-2 mt-1">
                  {REVENUE_OPTIONS.map(r => <Radio key={r} label={r} active={form.revenue === r} onClick={() => set('revenue', r)} />)}
                </div>
              </Field>
              <NavBtns onPrev={() => setStep(1)} onNext={() => setStep(3)} />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <div className="pb-5 border-b-2 border-[#111] mb-9">
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#1F3D2A] mb-2">Step 03 / 04</p>
                <h2 className="text-[28px] font-light tracking-[-0.02em]">담당자 <em className="not-italic text-[#1F3D2A]">연락처</em></h2>
                <p className="text-[13px] text-[#888480] mt-2 font-light">검토 결과 및 입점 안내를 받으실 연락처를 입력해주세요.</p>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <Field label="담당자명" required>
                  <input type="text" value={form.contactName} onChange={e => set('contactName', e.target.value)} placeholder="성함을 입력해주세요" className={inputCls} />
                </Field>
                <Field label="직책 / 역할">
                  <input type="text" value={form.contactRole} onChange={e => set('contactRole', e.target.value)} placeholder="예) 대표, 마케팅 담당자" className={inputCls} />
                </Field>
                <Field label="이메일" required>
                  <input type="email" value={form.contactEmail} onChange={e => set('contactEmail', e.target.value)} placeholder="example@brand.com" className={inputCls} />
                </Field>
                <Field label="연락처" required>
                  <input type="tel" value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} placeholder="010-0000-0000" className={inputCls} />
                </Field>
              </div>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <Field label="선호하는 연락 방법">
                <div className="flex gap-2 mt-1">
                  {CONTACT_METHODS.map(c => <Chip key={c} label={c} active={form.preferContact.includes(c)} onClick={() => toggleContact(c)} />)}
                </div>
              </Field>
              <NavBtns onPrev={() => setStep(2)} onNext={() => setStep(4)} />
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <div className="pb-5 border-b-2 border-[#111] mb-9">
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#1F3D2A] mb-2">Step 04 / 04</p>
                <h2 className="text-[28px] font-light tracking-[-0.02em]">마지막으로 <em className="not-italic text-[#1F3D2A]">한 가지만</em></h2>
                <p className="text-[13px] text-[#888480] mt-2 font-light">인뷰소와 함께하고 싶은 이유를 자유롭게 적어주세요.</p>
              </div>
              <Field label="인뷰소에 입점 신청하게 된 계기" required>
                <div className="flex flex-col gap-2 mt-1">
                  {SOURCE_OPTIONS.map(r => <Radio key={r} label={r} active={form.applyReason === r} onClick={() => set('applyReason', r)} />)}
                </div>
              </Field>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <Field label="브랜드가 인뷰소를 통해 이루고 싶은 것" hint="자유롭게 적어주세요. 심사에 긍정적으로 반영됩니다.">
                <textarea value={form.brandGoal} onChange={e => set('brandGoal', e.target.value)} maxLength={500} placeholder="예) 쇼핑몰만으로는 새로운 고객을 만나는 데 한계가 있었어요..." className={`${inputCls} resize-y min-h-[140px] leading-relaxed`} />
                <p className="text-right text-[11px] text-[#B8B4AE] mt-1">{form.brandGoal.length} / 500</p>
              </Field>
              <Field label="추가로 전달하고 싶은 내용" hint="선택사항입니다.">
                <textarea value={form.extra} onChange={e => set('extra', e.target.value)} placeholder="샘플 발송 가능 여부, 협업 아이디어 등 자유롭게 적어주세요." className={`${inputCls} resize-y min-h-[100px] leading-relaxed`} />
              </Field>
              <div className="h-px bg-[#D8D4CE] my-7" />
              <label className="flex items-start gap-3 p-4 bg-[#F0EDE8] border border-[#D8D4CE] cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 mt-0.5 flex-shrink-0 accent-[#111]" />
                <span className="text-xs text-[#888480] leading-relaxed">
                  인뷰소의 <strong className="text-[#111]">개인정보처리방침</strong> 및 <strong className="text-[#111]">이용약관</strong>에 동의합니다. 수집된 정보는 입점 심사 목적으로만 사용됩니다. <span className="text-[#B84A28]">*</span>
                </span>
              </label>
              <NavBtns onPrev={() => setStep(3)} onNext={handleSubmit} nextLabel="입점 신청 완료 →" isSubmit />
            </div>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="border-t border-[#D8D4CE] px-14 py-7 max-w-[1280px] mx-auto flex justify-between items-center">
        <span className="text-[13px] font-bold tracking-[0.18em] uppercase">INBYUSO</span>
        <span className="text-[11px] text-[#B8B4AE]">© 2026 인뷰소 · 인디 뷰티 브랜드 발굴소</span>
      </footer>
    </div>
  )
}

const inputCls = "w-full border-[1.5px] border-[#D8D4CE] bg-[#F8F6F2] px-4 py-3.5 text-[14px] font-light text-[#111] outline-none focus:border-[#111] transition-colors placeholder-[#B8B4AE] tracking-[-0.01em]"
const selectCls = `${inputCls} cursor-pointer appearance-none`

function Field({ label, required, hint, children, className = '' }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode; className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#888480]">
        {label}{required && <span className="text-[#B84A28] ml-0.5">*</span>}
      </p>
      {hint && <p className="text-[11px] text-[#B8B4AE] font-light -mt-1">{hint}</p>}
      {children}
    </div>
  )
}

function NavBtns({ onPrev, onNext, nextLabel = '다음 단계 →', isSubmit = false }: {
  onPrev?: () => void; onNext: () => void; nextLabel?: string; isSubmit?: boolean
}) {
  return (
    <div className="flex items-center justify-between mt-10 pt-7 border-t border-[#D8D4CE]">
      {onPrev
        ? <button type="button" onClick={onPrev} className="text-xs text-[#888480] flex items-center gap-1.5 hover:text-[#111] transition-colors py-3">← 이전</button>
        : <span />
      }
      <button
        type="button"
        onClick={onNext}
        className={`px-9 py-3.5 text-[13px] font-medium tracking-[0.06em] text-white transition-all hover:-translate-x-0 flex items-center gap-2 ${isSubmit ? 'bg-[#1F3D2A] hover:bg-[#111]' : 'bg-[#111] hover:bg-[#1F3D2A]'}`}
      >
        {nextLabel}
      </button>
    </div>
  )
}
