// lib/hooks/use-auth.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi, LoginPayload, RegisterPayload } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { getErrorMessage } from "@/lib/error";
import { UserRole } from "@/types";

const roleRedirectMap: Record<UserRole, string> = {
  PATIENT: "/dashboard",
  DRIVER: "/provider",
  ADMIN: "/admin",
};

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success(`Welcome back, ${data.user.fullName}!`);
      router.push(roleRedirectMap[data.user.role]);
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Login failed. Please try again.")),
  });
}

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Account created successfully!");
      router.push(roleRedirectMap[data.user.role]);
    },
    onError: (error) =>
      toast.error(
        getErrorMessage(error, "Registration failed. Please try again.")
      ),
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };
}


// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { authApi, LoginPayload, RegisterPayload } from "@/lib/api/auth";
// import { useAuthStore } from "@/store/auth-store";
// import { UserRole } from "@/types";

// const roleRedirectMap: Record<UserRole, string> = {
//   PATIENT: "/dashboard",
//   DRIVER: "/provider",
//   ADMIN: "/admin",
// };

// export function useLogin() {
//   const router = useRouter();
//   const setAuth = useAuthStore((state) => state.setAuth);

//   return useMutation({
//     mutationFn: (payload: LoginPayload) => authApi.login(payload),
//     onSuccess: (data) => {
//       setAuth(data.user, data.token);
//       toast.success(`Welcome back, ${data.user.fullName}!`);
//       router.push(roleRedirectMap[data.user.role]);
//     },
//     onError: (error: any) => {
//       const message =
//         error?.response?.data?.message || "Login failed. Please try again.";
//       toast.error(message);
//     },
//   });
// }

// export function useRegister() {
//   const router = useRouter();
//   const setAuth = useAuthStore((state) => state.setAuth);

//   return useMutation({
//     mutationFn: (payload: RegisterPayload) => authApi.register(payload),
//     onSuccess: (data) => {
//       setAuth(data.user, data.token);
//       toast.success("Account created successfully!");
//       router.push(roleRedirectMap[data.user.role]);
//     },
//     onError: (error: any) => {
//       const message =
//         error?.response?.data?.message ||
//         "Registration failed. Please try again.";
//       toast.error(message);
//     },
//   });
// }

// export function useLogout() {
//   const router = useRouter();
//   const logout = useAuthStore((state) => state.logout);

//   return () => {
//     logout();
//     toast.success("Logged out successfully");
//     router.push("/login");
//   };
// }