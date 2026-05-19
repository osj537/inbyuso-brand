인디 뷰티 브랜드 전문 커머스 플랫폼

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Spring Boot (Java), Maven |
| Database | PostgreSQL (Railway) |
| Storage | Supabase Storage |
| 인증 | JWT (Access Token + Refresh Token) |
| 배포 | Railway (Frontend + Backend 분리 배포) |

## 프로젝트 구조

```
inbyuso/
├── frontend/          # Next.js 앱
│   └── src/
│       ├── app/
│       │   ├── main/          # 메인 페이지
│       │   ├── apply/         # 브랜드 입점 신청 페이지
│       │   └── admin/         # 관리자 페이지
│       ├── components/
│       │   ├── layout/        # Header, Footer
│       │   ├── home/          # 메인 페이지 컴포넌트
│       │   ├── product/       # 상품 섹션
│       │   └── apply/         # 입점 신청 페이지 컴포넌트
│       └── lib/               # API, 인증, Supabase 클라이언트
└── backend/           # Spring Boot 앱
    └── src/
```

## 구현 기능

### 사용자
- 회원가입 / 로그인 / 로그아웃 (JWT 인증)
- 메인 페이지 — 실시간 랭킹, 신규입점, 추천 상품 섹션
- 카테고리 서브 내비게이션 및 검색바
- 브랜드 입점 신청 페이지 (`/apply`)
  - 인뷰소 vs 쇼핑몰 수수료 비교표
  - 입점 이유 4가지 소개
  - 브랜드 대시보드 미리보기
  - 입점 4단계 프로세스
  - 수수료 구조 안내
  - 얼리버드 혜택 안내

### 관리자
- 관리자 전용 레이아웃 (`/admin`)
- 배너 관리 — Supabase Storage 이미지 업로드 / 배너 CRUD

### 백엔드 API
- 인증: `/auth/signup`, `/auth/login`, `/auth/logout`, `/auth/refresh`
- 상품: `/products?section=NEW|RANKING|RECOMMEND`
- 배너: 배너 조회 / 등록 / 수정 / 삭제

## 로컬 실행

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 환경변수

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-key>
```

## 배포

- Frontend: Railway (`devoted-wholeness` 서비스)
- Backend: Railway (`inbyuso-brand` 서비스)
