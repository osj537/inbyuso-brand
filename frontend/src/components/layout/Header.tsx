"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/lib/authService";
import { CATEGORIES } from "@/lib/categoryData";
import SearchOverlay from "./SearchOverlay";
import styles from "./Header.module.css";

const SUB_NAV = [
  { label: '전체', href: '/main' },
  ...CATEGORIES.map(c => ({ label: c.label, href: `/category/${encodeURIComponent(c.slug)}` })),
]

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBrandOwner, setIsBrandOwner] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    Promise.resolve(authService.isLoggedIn()).then(setIsLoggedIn);
    Promise.resolve(authService.isBrandOwner()).then(setIsBrandOwner);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
    setIsBrandOwner(false);
    router.push("/main");
  };

  const getActiveItem = () => {
    if (pathname === '/main') return '전체'
    const match = CATEGORIES.find(c => pathname.includes(encodeURIComponent(c.slug)) || pathname.includes(c.slug))
    return match?.label ?? ''
  }

  const activeItem = getActiveItem()

  return (
    <header className={styles.header}>
      <div className={styles.mainNav}>
        <Link href="/main" className={styles.logo}>INBYUSO</Link>
        <div className={styles.rightMenu}>
          <button className={styles.rightMenuItem}>검색</button>
          {isBrandOwner && (
            <button onClick={() => router.push('/brand')} className={styles.rightMenuItem}>브랜드 대시보드</button>
          )}
          <button className={styles.rightMenuItem}>홈</button>
          <button className={styles.rightMenuItem}>장바구니</button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.rightMenuItem}>로그아웃</button>
          ) : (
            <button onClick={() => router.push("/login")} className={styles.rightMenuItem}>로그인</button>
          )}
        </div>
      </div>

      <div className={styles.subNavWrapper}>
        <div className={styles.subNav}>
          {SUB_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.subNavItem} ${activeItem === item.label ? styles.subNavItemActive : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBarInner}>
          <div className={styles.searchInputWrapper}>
            <SearchOverlay />
          </div>
        </div>
      </div>
    </header>
  );
}
