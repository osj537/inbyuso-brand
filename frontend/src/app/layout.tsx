import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INBYUSO",
  description: "인디 뷰티 브랜드 플랫폼, Indie Beauty Lab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
