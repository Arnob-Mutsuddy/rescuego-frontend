// app/(auth)/register/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import { useRegister } from "@/lib/hooks/use-auth";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

export default function RegisterPage() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  // const onSubmit = (values: RegisterFormValues) => {
  //   const { confirmPassword, ...payload } = values;
  //   registerMutation.mutate(payload);
  // };
  const onSubmit = (values: RegisterFormValues) => {
  registerMutation.mutate({
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    password: values.password,
    role: values.role,
  });
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an Account 🚑
          </h1>
          <p className="text-sm text-muted-foreground">
            Join RESCUEGO as a patient or driver
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Register</CardTitle>
            <CardDescription>Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

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
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+8801XXXXXXXXX"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="role" className="w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PATIENT">Patient</SelectItem>
                        <SelectItem value="DRIVER">Driver</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-sm text-destructive">
                    {errors.role.message}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}