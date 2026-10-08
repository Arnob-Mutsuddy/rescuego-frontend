// components/patient/review-dialog.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateReview } from "@/lib/hooks/use-review";
import { cn } from "@/lib/utils";

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "h-7 w-7",
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewDialog({
  emergencyRequestId,
  driverId,
  driverName,
}: {
  emergencyRequestId: string;
  driverId: string;
  driverName: string;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const createReview = useCreateReview();

  const handleSubmit = () => {
    createReview.mutate(
      { emergencyRequestId, driverId, rating, comment },
      {
        onSuccess: () => {
          setOpen(false);
          setComment("");
          setRating(5);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Rate Driver
        </Button>
      </DialogTrigger> */}
      <DialogTrigger
        render={
            <Button size="sm" variant="outline">
                Rate Driver
            </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate your trip with {driverName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Overall Rating</Label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment (optional)</Label>
            <Textarea
              id="comment"
              placeholder="How was your experience?"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full"
            disabled={createReview.isPending}
            onClick={handleSubmit}
          >
            {createReview.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}