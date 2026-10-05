// app/(public)/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Siren, MapPin, Clock, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "RESCUEGO connects patients with the nearest available ambulance in real time using live GPS dispatch.",
};

const features = [
  {
    icon: MapPin,
    title: "Nearest Ambulance, Instantly",
    description:
      "Our dispatch engine calculates real-time distance to find the closest available ambulance to you.",
  },
  {
    icon: Clock,
    title: "Live Trip Tracking",
    description:
      "Follow your ambulance's status from dispatch to hospital arrival, step by step.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Drivers Only",
    description:
      "Every driver is approved and verified by our admin team before going on duty.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Siren className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Emergency Help, <span className="text-primary">Dispatched Fast.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          RESCUEGO connects patients with the nearest available ambulance in
          seconds — real GPS tracking, verified drivers, and transparent
          pricing, all in one platform.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          {/* <Button size="lg" asChild>
            <Link href="/register">Request Help Now</Link>
          </Button> */}
          <Link href="/register" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50" > Request Help Now </Link>
          {/* <Button size="lg" variant="outline" asChild>
            <Link href="/services">Learn More</Link>
          </Button> */}
          <Link href="/services" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50" > Learn More </Link>

        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold">
            Why choose RESCUEGO?
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">
          Ready to get help when it matters most?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Join RESCUEGO today as a patient or become a driver partner.
        </p>
        {/* <Button size="lg" className="mt-6" asChild>
          <Link href="/register">Create Free Account</Link>
        </Button> */}
        <Link href="/register" className="mt-6 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50" > Create Free Account </Link>
      </section>
    </div>
  );
}