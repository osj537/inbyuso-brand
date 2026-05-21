"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/lib/authService";
import { CATEGORIES } from "@/lib/categoryData";
import styles from "./Header.module.css";

const SUB_NAV = [
  { label: '전체', href: '/main' },
  ...CATEGORIES.map(c => ({ label: c.label, href: `/category/${encodeURIComponent(c.slug)}` })),
]

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    Promise.resolve(authService.isLoggedIn()).then(setIsLoggedIn);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
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
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="검색어를 입력하세요"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
