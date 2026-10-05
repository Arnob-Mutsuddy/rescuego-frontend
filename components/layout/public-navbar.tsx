// components/layout/public-navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const roleDashboard: Record<string, string> = {
  PATIENT: "/dashboard",
  DRIVER: "/provider",
  ADMIN: "/admin",
};

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <Siren className="h-6 w-6" />
          RESCUEGO
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            // <Button asChild>
            //   <Link href={roleDashboard[user?.role ?? "PATIENT"]}>
            //     Go to Dashboard
            //   </Link>
            // </Button>
            <Link href={roleDashboard[user?.role ?? "PATIENT"]} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90" > Go to Dashboard </Link>

          ) : (
            // <>
            //   <Button variant="ghost" asChild>
            //     <Link href="/login">Login</Link>
            //   </Button>
            //   <Button asChild>
            //     <Link href="/register">Get Started</Link>
            //   </Button>
            // </>
            <> <Link href="/login" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground" > Login </Link> <Link href="/register" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90" > Get Started </Link> </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {isAuthenticated ? (
                // <Button asChild>
                //   <Link href={roleDashboard[user?.role ?? "PATIENT"]}>
                //     Go to Dashboard
                //   </Link>
                // </Button>
                <Link href={roleDashboard[user?.role ?? "PATIENT"]} onClick={() => setOpen(false)} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90" > Go to Dashboard </Link>
              ) : (
                // <>
                //   <Button variant="outline" asChild>
                //     <Link href="/login">Login</Link>
                //   </Button>
                //   <Button asChild>
                //     <Link href="/register">Get Started</Link>
                //   </Button>
                // </>
                <> <Link href="/login" onClick={() => setOpen(false)} className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground" > Login </Link> <Link href="/register" onClick={() => setOpen(false)} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90" > Get Started </Link> </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}