// app/(public)/pricing/page.tsx
import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing & FAQ",
  description: "Transparent ambulance trip pricing and frequently asked questions about RESCUEGO.",
};

const faqs = [
  {
    question: "How is the trip cost calculated?",
    answer:
      "Your fare is calculated as a fixed base fare plus a per-kilometer rate, based on the real driving distance between the ambulance and your location.",
  },
  {
    question: "When do I pay?",
    answer:
      "Payment is only requested after your trip is marked as completed. You'll receive a secure Stripe checkout link from your dashboard.",
  },
  {
    question: "How are drivers verified?",
    answer:
      "Every driver's license and ambulance registration is reviewed and approved by our admin team before they can go on duty.",
  },
  {
    question: "Can I cancel a request?",
    answer:
      "Yes, you can cancel a pending or assigned request directly from your dashboard before the driver arrives.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold">Pricing & FAQ</h1>
      <p className="mt-2 text-muted-foreground">
        Simple, transparent pricing — no hidden fees.
      </p>

      <Card className="mt-8">
        <CardContent className="grid gap-6 pt-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Base Fare</p>
            <p className="text-2xl font-bold">$100</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Per Kilometer</p>
            <p className="text-2xl font-bold">$50</p>
          </div>
        </CardContent>
      </Card>

      <h2 className="mt-12 text-xl font-semibold">Frequently Asked Questions</h2>
      {/* <Accordion type="single" collapsible className="mt-4"> */}
      <Accordion className="mt-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}