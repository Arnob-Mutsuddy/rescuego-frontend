// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Siren } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Siren className="h-12 w-12 text-primary" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      {/* <Button asChild>
        <Link href="/">Go back home</Link>
      </Button> */}
      <Link
        href="/"
        className="inline-flex h-8 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
      >
        Go back home
      </Link>
    </div>
  );
}