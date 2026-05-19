export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex gap-16">
          <div className="flex-1">
            <p className="text-white font-bold text-lg tracking-widest mb-2">INBYUSO</p>
            <p className="text-xs leading-5 text-gray-500">인디 뷰티 브랜드 플랫폼, Indie Beauty Lab.</p>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-3">플랫폼</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white">회사소개</a></li>
              <li><a href="#" className="hover:text-white">입점신청</a></li>
              <li><a href="#" className="hover:text-white">공지사항</a></li>
              <li><a href="#" className="hover:text-white">이용약관</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-3">브랜드</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white">브랜드 목록</a></li>
              <li><a href="#" className="hover:text-white">신규 브랜드</a></li>
              <li><a href="#" className="hover:text-white">에디터 추천</a></li>
              <li><a href="#" className="hover:text-white">인기 브랜드</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-3">고객서비스</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white">고객센터</a></li>
              <li><a href="#" className="hover:text-white">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-white">교환/반품</a></li>
              <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-600">
          © 2026 인뷰소. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
