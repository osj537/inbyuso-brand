"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/authService";
import styles from "./Header.module.css";

const SUB_NAV = [
  "전체",
  "스킨케어",
  "메이크업",
  "클렌징",
  "선케어",
  "헤어바디",
  "향수",
  "신규입점",
  "세일",
];

export default function Header() {
  const [activeSub, setActiveSub] = useState("신규입점");
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Promise.resolve(authService.isLoggedIn()).then(setIsLoggedIn);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
    router.push("/main");
  };

  return (
    <header className={styles.header}>
      <div className={styles.mainNav}>
        <Link href="/" className={styles.logo}>
          INBYUSO
        </Link>
        <div className={styles.rightMenu}>
          <button className={styles.rightMenuItem}>검색</button>
          <button className={styles.rightMenuItem}>홈</button>
          <button className={styles.rightMenuItem}>장바구니</button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.rightMenuItem}>
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={styles.rightMenuItem}
            >
              로그인
            </button>
          )}
        </div>
      </div>

      <div className={styles.subNavWrapper}>
        <div className={styles.subNav}>
          {SUB_NAV.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSub(item)}
              className={`${styles.subNavItem} ${activeSub === item ? styles.subNavItemActive : ""}`}
            >
              {item}
            </button>
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
              <svg
                className={styles.searchIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
