// app/(public)/services/page.tsx
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambulance, MapPinned, CreditCard, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore RESCUEGO's core services: emergency dispatch, live tracking, secure payments, and driver ratings.",
};

const services = [
  {
    icon: Ambulance,
    title: "Emergency Dispatch",
    description:
      "Request an ambulance in one tap with your live GPS location. We automatically find and assign the nearest available, verified ambulance.",
  },
  {
    icon: MapPinned,
    title: "Real-Time Trip Tracking",
    description:
      "Track your ambulance through every stage — en route, arrived, patient picked up, and hospital arrival.",
  },
  {
    icon: CreditCard,
    title: "Secure Online Payment",
    description:
      "Pay for completed trips securely through Stripe, with instant confirmation and full payment history.",
  },
  {
    icon: Star,
    title: "Driver Ratings & Reviews",
    description:
      "Rate your experience after every trip to help maintain a high-quality, accountable driver network.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Our Services</h1>
      <p className="mt-2 text-muted-foreground">
        Everything you need for a fast, transparent emergency response.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title}>
            <CardHeader className="flex flex-row items-center gap-3">
              <service.icon className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}