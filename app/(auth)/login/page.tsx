// app/(auth)/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { useLogin } from "@/lib/hooks/use-auth";
import { demoAccounts } from "@/lib/demo-accounts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldAlert, User2, Truck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const handleDemoLogin = (role: keyof typeof demoAccounts) => {
    const account = demoAccounts[role];
    loginMutation.mutate({
      email: account.email,
      password: account.password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome Back...
          </h1>
          <p className="text-sm text-muted-foreground">
            Login to your RESCUEGO account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                Register
              </Link>
            </p>

            <div className="relative py-2">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-center text-sm font-medium">
                Quick Demo Login
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex h-auto flex-col gap-1 py-3"
                  disabled={loginMutation.isPending}
                  onClick={() => handleDemoLogin("ADMIN")}
                >
                  <ShieldAlert className="h-5 w-5" />
                  <span className="text-xs font-semibold">Admin</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex h-auto flex-col gap-1 py-3"
                  disabled={loginMutation.isPending}
                  onClick={() => handleDemoLogin("PATIENT")}
                >
                  <User2 className="h-5 w-5" />
                  <span className="text-xs font-semibold">Patient</span>
                </Button>
              </div>

              <Button
                type="button"
                variant="outline"
                className="flex h-auto w-full flex-col gap-1 py-3"
                disabled={loginMutation.isPending}
                onClick={() => handleDemoLogin("DRIVER")}
              >
                <Truck className="h-5 w-5" />
                <span className="text-xs font-semibold">Driver</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}