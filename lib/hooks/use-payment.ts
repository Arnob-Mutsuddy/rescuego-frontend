// lib/hooks/use-payment.ts
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentApi } from "@/lib/api/payment";

export function usePaymentHistory(params: { page?: number; limit?: number }) {
    return useQuery({
        queryKey: ["payments", params],
        queryFn: () => paymentApi.getHistory(params),
    });
}

export function useCreateCheckout() {
    return useMutation({
        mutationFn: (emergencyRequestId: string) =>
            paymentApi.createCheckout(emergencyRequestId),
        onSuccess: (data) => {
            // new tab Stripe checkout page opening
            window.location.href = data.checkoutUrl;
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to start payment"
            );
        },
    });
}