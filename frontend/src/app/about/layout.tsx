import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "INBYUSO — 회사소개",
  description: "인뷰소는 국내 인디 뷰티 브랜드를 위한 플레이스 기반 커머스 플랫폼입니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="manifest" href="/about-manifest.json" />
      {/* iOS standalone 지원 */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="INBYUSO" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
