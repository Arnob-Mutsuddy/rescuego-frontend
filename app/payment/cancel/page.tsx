// app/payment/cancel/page.tsx
import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <XCircle className="h-8 w-8 text-red-600" />
      </div>
      <h1 className="text-2xl font-bold">Payment Cancelled</h1>
      <p className="max-w-md text-muted-foreground">
        Your payment was not completed. No charges were made. You can try
        again anytime from your payment history.
      </p>
      {/* <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard/payments">Try Again</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div> */}
        <div className="flex gap-3">
            <Link
                href="/dashboard/payments"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
            >
                Try Again
            </Link>

            <Link
                href="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            >
                Go to Dashboard
            </Link>
        </div>
    </div>
  );
}