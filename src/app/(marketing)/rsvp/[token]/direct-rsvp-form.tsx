"use client";

import { useState, useTransition } from "react";
import { submitRsvpByToken } from "../actions";
import { cn } from "@/lib/utils";

type Guest = {
  id: string;
  name: string;
  rsvpStatus: string;
  dietaryNotes: string | null;
  rsvpToken: string;
};

export function DirectRsvpForm({ guest }: { guest: Guest }) {
  const [rsvpStatus, setRsvpStatus] = useState(guest.rsvpStatus);
  const [dietaryNotes, setDietaryNotes] = useState(guest.dietaryNotes ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitRsvpByToken(guest.rsvpToken, rsvpStatus, dietaryNotes);
      if (result.success) {
        setSubmitted(true);
      }
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 border border-foreground/[0.06] rounded-xl">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-600">
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-foreground">Thank you, {guest.name}!</h3>
        <p className="text-xs text-foreground/40">
          {rsvpStatus === "accepted"
            ? "We can't wait to celebrate with you!"
            : "We'll miss you! Thank you for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-foreground/[0.06] rounded-xl p-6">
      <div>
        <h3 className="text-sm font-medium text-foreground">Hi, {guest.name}!</h3>
        <p className="text-xs text-foreground/40 mt-1">Please confirm your attendance.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground/70">Will you attend?</label>
        <div className="flex gap-2">
          {(["accepted", "declined"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setRsvpStatus(status)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                rsvpStatus === status
                  ? status === "accepted"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                    : "border-red-400 bg-red-500/10 text-red-600"
                  : "border-foreground/[0.06] text-foreground/40 hover:bg-foreground/[0.02]"
              )}
            >
              {status === "accepted" ? "Joyfully Accept" : "Respectfully Decline"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground/70">Dietary requirements</label>
        <textarea
          value={dietaryNotes}
          onChange={(e) => setDietaryNotes(e.target.value)}
          placeholder="Any allergies or dietary requirements..."
          className="rounded-xl border border-foreground/[0.06] bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10 resize-y min-h-[80px]"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || rsvpStatus === "pending"}
        className="bg-foreground text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit RSVP"}
      </button>
    </form>
  );
}
