"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/authService";
import { useLogout } from "@/context/AuthContext";
import styles from "./Header.module.css";

export default function ApplyHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBrandOwner, setIsBrandOwner] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Promise.resolve(authService.isLoggedIn()).then(setIsLoggedIn);
    Promise.resolve(authService.isBrandOwner()).then(setIsBrandOwner);
  }, []);

  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setIsBrandOwner(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/main");
      router.refresh();
    }, 1500);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.mainNav}>
          <Link href="/main" className={styles.logo}>INBYUSO</Link>
          <div className={styles.rightMenu}>
            {isBrandOwner && (
              <button onClick={() => router.push('/brand')} className={styles.rightMenuItem}>브랜드 대시보드</button>
            )}
            <button className={styles.rightMenuItem} onClick={() => router.push('/main')}>홈</button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className={styles.rightMenuItem}>로그아웃</button>
            ) : (
              <button onClick={() => router.push("/login")} className={styles.rightMenuItem}>로그인</button>
            )}
          </div>
        </div>
      </header>

      {showToast && (
        <div className="fixed bottom-6 left-0 right-0 mx-auto w-fit bg-gray-800 text-white text-sm px-5 py-3 rounded-full shadow-lg z-50 animate-fade-in">
          로그아웃 되었습니다
        </div>
      )}
    </>
  );
}
