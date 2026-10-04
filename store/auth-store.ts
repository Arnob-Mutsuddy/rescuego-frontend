// store/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
        // localStorage -> for axios interceptor
        localStorage.setItem("rescuego_token", token);
        // cookie -> middleware (server-side read)
        Cookies.set("rescuego_token", token, { expires: 7, sameSite: "lax" });
        Cookies.set("rescuego_role", user.role, { expires: 7, sameSite: "lax" });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("rescuego_token");
        Cookies.remove("rescuego_token");
        Cookies.remove("rescuego_role");
      },
    }),
    {
      name: "rescuego-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);