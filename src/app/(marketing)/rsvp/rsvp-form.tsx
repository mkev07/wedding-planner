"use client";

import { useState, useTransition } from "react";
import { lookupGuest, submitRsvp } from "./actions";
import { cn } from "@/lib/utils";

type GuestResult = {
  id: string;
  name: string;
  email: string | null;
  rsvpStatus: string;
  dietaryNotes: string | null;
};

export function RsvpForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GuestResult[]>([]);
  const [selected, setSelected] = useState<GuestResult | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const data = await lookupGuest(query);
      setResults(data.guests);
      setSearched(true);
      setSelected(null);
      setSubmitted(false);
    });
  }

  function handleSelect(guest: GuestResult) {
    setSelected(guest);
    setRsvpStatus(guest.rsvpStatus);
    setDietaryNotes(guest.dietaryNotes ?? "");
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    startTransition(async () => {
      const result = await submitRsvp(selected.id, rsvpStatus, dietaryNotes);
      if (result.success) {
        setSubmitted(true);
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          required
          className="flex-1 rounded-xl border border-foreground/[0.06] bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-foreground text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      {searched && results.length === 0 && (
        <p className="text-sm text-foreground/50 text-center py-8">
          No guests found matching &ldquo;{query}&rdquo;. Please check the spelling and try again.
        </p>
      )}

      {results.length > 0 && !selected && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Select your name</p>
          {results.map((guest) => (
            <button
              key={guest.id}
              type="button"
              onClick={() => handleSelect(guest)}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-foreground/[0.06] hover:bg-foreground/[0.02] transition-colors text-left"
            >
              <div>
                <div className="text-sm font-medium text-foreground">{guest.name}</div>
                {guest.email && <div className="text-xs text-foreground/40">{guest.email}</div>}
              </div>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-md",
                guest.rsvpStatus === "accepted" && "bg-emerald-500/10 text-emerald-700",
                guest.rsvpStatus === "declined" && "bg-red-500/10 text-red-600",
                guest.rsvpStatus === "pending" && "bg-foreground/5 text-foreground/40",
              )}>
                {guest.rsvpStatus}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* RSVP Form */}
      {selected && !submitted && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-foreground/[0.06] rounded-xl p-6">
          <div>
            <h3 className="text-sm font-medium text-foreground">Hi, {selected.name}!</h3>
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
      )}

      {/* Success */}
      {submitted && (
        <div className="flex flex-col items-center gap-3 py-10 border border-foreground/[0.06] rounded-xl">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-600">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-foreground">Thank you, {selected?.name}!</h3>
          <p className="text-xs text-foreground/40">
            {rsvpStatus === "accepted"
              ? "We can't wait to celebrate with you!"
              : "We'll miss you! Thank you for letting us know."}
          </p>
          <button
            type="button"
            onClick={() => { setSelected(null); setSearched(false); setResults([]); setQuery(""); }}
            className="text-xs text-foreground/40 hover:text-foreground transition-colors mt-2"
          >
            Look up another guest
          </button>
        </div>
      )}
    </div>
  );
}
