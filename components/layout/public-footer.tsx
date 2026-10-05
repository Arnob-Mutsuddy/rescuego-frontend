// components/layout/public-footer.tsx
import Link from "next/link";
import { Siren } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-primary">
              <Siren className="h-5 w-5" />
              RESCUEGO
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Real-time ambulance dispatch when every second counts.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Emergency</h4>
            <p className="text-sm text-muted-foreground">
              For life-threatening emergencies, request an ambulance directly
              through your patient dashboard.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RESCUEGO. Built for B7A7 Assignment.
        </div>
      </div>
    </footer>
  );
}