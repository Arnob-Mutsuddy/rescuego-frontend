// lib/hooks/use-review.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reviewApi, CreateReviewPayload } from "@/lib/api/review";
import { getErrorMessage } from "@/lib/error";

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({  
    mutationFn: (payload: CreateReviewPayload) =>
      reviewApi.createReview(payload),
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: (error) =>
      // toast.error(
      //   error?.response?.data?.message || "Failed to submit review"
      // ),
    toast.error(getErrorMessage(error, "Failed to submit review"))
  });
}

export function useDriverReviews(
  driverId: string,
  params: { page?: number; limit?: number }
) {
  return useQuery({
    queryKey: ["driver-reviews", driverId, params],
    queryFn: () => reviewApi.getDriverReviews(driverId, params),
    enabled: !!driverId,
  });
}