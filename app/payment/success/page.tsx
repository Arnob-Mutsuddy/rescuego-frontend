// app/payment/success/page.tsx
"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const queryClient = useQueryClient();

  useEffect(() => {
    // Payment history cache invalidate so that new status can be seen
    queryClient.invalidateQueries({ queryKey: ["payments"] });
  }, [queryClient]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p className="max-w-md text-muted-foreground">
        Thank you — your trip payment has been processed successfully. You
        can view the receipt details in your payment history.
      </p>
      {sessionId && (
        <p className="text-xs text-muted-foreground">
          Reference: {sessionId.slice(0, 24)}...
        </p>
      )}
      {/* <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard/payments">View Payment History</Link>
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
        View Payment History
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

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <PaymentSuccessContent />
    </Suspense>
  );
}