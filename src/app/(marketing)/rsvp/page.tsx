import Link from "next/link";
import { RsvpForm } from "./rsvp-form";

export default function RsvpPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="w-full">
        <div className="max-w-[32rem] mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="font-serif text-xl tracking-tight text-foreground/80">
              Wed
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-[32rem] mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-2 mb-10">
          <h1 className="font-serif text-3xl tracking-tight text-foreground text-center">
            RSVP
          </h1>
          <p className="text-sm text-foreground/50 text-center">
            Search for your name to respond to the invitation.
          </p>
        </div>

        <RsvpForm />
      </main>

      {/* Footer */}
      <footer className="max-w-[32rem] mx-auto px-8 py-12">
        <div className="flex flex-col items-center gap-3">
          <span className="font-serif text-lg text-foreground/40">Wed</span>
          <p className="text-foreground/30 text-xs">&copy; 2026 Wed. Made with love.</p>
        </div>
      </footer>
    </div>
  );
}
