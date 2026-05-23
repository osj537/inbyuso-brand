"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiClient, setAccessToken } from "@/lib/api";
import { ApiResponse, AuthResponse } from "@/types/auth";
import { authService } from "@/lib/authService";
import { wishlistService } from "@/lib/wishlistService";

interface AuthContextValue {
  authReady: boolean;
  wishedIds: Set<string>;
  toggleWish: (productId: string) => void;
  logout: () => Promise<void>;
  loadWishlist: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  authReady: false,
  wishedIds: new Set(),
  toggleWish: () => {},
  logout: async () => {},
  loadWishlist: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authReady, setAuthReady] = useState(false);
  const [wishedIds, setWishedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!authService.isLoggedIn()) {
      setAuthReady(true);
      return;
    }

    apiClient
      .post<ApiResponse<AuthResponse>>("/auth/refresh")
      .then((res) => {
        setAccessToken(res.data.data!.accessToken);
        return wishlistService.getMyWishlist();
      })
      .then((products) => {
        setWishedIds(new Set(products.map((p) => p.id)));
      })
      .catch(() => {
        setAccessToken(null);
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("role");
      })
      .finally(() => {
        setAuthReady(true);
      });
  }, []);

  function toggleWish(productId: string) {
    setWishedIds((prev) => {
      const next = new Set(prev);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
  }

  async function loadWishlist() {
    const products = await wishlistService.getMyWishlist();
    setWishedIds(new Set(products.map((p) => p.id)));
  }

  async function logout() {
    await authService.logout();
    setWishedIds(new Set());
  }

  return (
    <AuthContext.Provider value={{ authReady, wishedIds, toggleWish, logout, loadWishlist }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthReady() {
  return useContext(AuthContext).authReady;
}

export function useWishlist() {
  const { wishedIds, toggleWish } = useContext(AuthContext);
  return { wishedIds, toggleWish };
}

export function useLogout() {
  return useContext(AuthContext).logout;
}

export function useLoadWishlist() {
  return useContext(AuthContext).loadWishlist;
}
