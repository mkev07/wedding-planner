"use client";

import { useState } from "react";

export function CopyLinkButton({ rsvpToken }: { rsvpToken: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/rsvp/${rsvpToken}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-foreground/30 hover:text-foreground transition-colors p-1"
      aria-label="Copy RSVP link"
      title={copied ? "Copied!" : "Copy RSVP link"}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
