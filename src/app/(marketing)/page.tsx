import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-20 w-full">
        <div className="max-w-[52rem] mx-auto px-4 py-4">
          <div className="flex items-center justify-between rounded-xl bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-4 py-2.5">
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors">Features</a>
            </div>
            <Link href="/" className="font-serif text-xl tracking-tight text-foreground/80">
              Wed
            </Link>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors">Timeline</a>
              <Link href="/dashboard" className="text-xs font-medium bg-foreground text-white px-3 py-1.5 rounded-lg hover:bg-foreground/90 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[52rem] mx-auto px-6 md:px-8 pt-16 pb-14">
        <div className="flex flex-col items-center gap-5">
          <div
            className="animate-fade-in-up text-[10px] font-medium bg-amber-500/20 text-foreground/70 px-2 py-0.5 rounded-md"
            style={{ animationDelay: "0.05s" }}
          >
            💍 Your Wedding Planner
          </div>
          <h1
            className="animate-fade-in-up font-serif text-5xl md:text-6xl text-balance text-center leading-[1.1] tracking-tight max-w-[600px] text-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            Our Wedding, Perfectly Planned.
          </h1>
          <p
            className="animate-fade-in-up text-center max-w-[340px] text-base text-foreground/50"
            style={{ animationDelay: "0.2s" }}
          >
            Everything you need to plan the perfect day — guests, budget, timeline, and more.
          </p>
          <div
            className="animate-fade-in-up flex gap-3 mt-2"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/dashboard" className="bg-foreground text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
              Start Planning
            </Link>
            <a href="#features" className="bg-foreground/5 text-foreground/70 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/10 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Feature Cards - 3 col grid like resurf */}
      <section className="max-w-[52rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-foreground/[0.06]">
          <FeatureCard
            title="Guest List"
            description="Track RSVPs, dietary needs, and seating arrangements for every guest."
            delay="0.4s"
            border
          />
          <FeatureCard
            title="Budget Tracker"
            description="Stay on top of every expense. Know where every dollar goes."
            delay="0.5s"
            border
          />
          <FeatureCard
            title="Timeline"
            description="Never miss a deadline. From venue booking to final fittings."
            delay="0.6s"
          />
        </div>
      </section>

      {/* Feature Sections - vertical like resurf demos */}
      <section className="max-w-[52rem] mx-auto">
        <div className="grid grid-cols-1">
          <FeatureSection
            label="Vendors"
            title="Keep all your contacts in one place."
            description="Florist, photographer, caterer — every vendor organized with notes, contracts, and payment status."
            delay="0.1s"
          />
          <FeatureSection
            label="Seating"
            title="Drag and drop table arrangements."
            description="Visual seating chart that makes it easy to arrange tables, avoid drama, and keep everyone happy."
            delay="0.1s"
          />
          <FeatureSection
            label="Checklist"
            title="Your wedding to-do list."
            description="Pre-built checklist with everything from 12 months out to the big day. Customize it to fit your plans."
            delay="0.1s"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[52rem] mx-auto border-t border-foreground/[0.06]">
        <div className="flex flex-col items-center gap-6 px-6 md:px-8 py-20">
          <h2
            className="animate-fade-in-up font-serif text-3xl md:text-4xl text-balance text-center leading-tight tracking-tight text-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            Start planning your perfect day.
          </h2>
          <div
            className="animate-fade-in-up flex flex-col gap-3 items-center"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/dashboard" className="bg-foreground text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
              Get Started — It&apos;s Free
            </Link>
            <span className="text-foreground/30 text-sm">
              No account needed to start
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[52rem] mx-auto px-8 py-12">
        <div className="flex flex-col items-center gap-3">
          <span className="font-serif text-lg text-foreground/40">Wed</span>
          <p className="text-foreground/30 text-xs">© 2026 Wed. Made with love.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  delay,
  border,
}: {
  title: string;
  description: string;
  delay: string;
  border?: boolean;
}) {
  return (
    <div
      className={`animate-fade-in-up flex flex-col gap-1.5 px-6 md:px-8 py-6 ${
        border ? "sm:border-r border-foreground/[0.06]" : ""
      }`}
      style={{ animationDelay: delay }}
    >
      <h3 className="text-sm font-medium text-foreground/85">{title}</h3>
      <p className="text-sm text-foreground/45 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureSection({
  label,
  title,
  description,
  delay,
}: {
  label: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className="animate-fade-in-up flex flex-col gap-4 px-6 md:px-10 py-10 border-t border-foreground/[0.06]"
      style={{ animationDelay: delay }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-foreground/25 tracking-wide uppercase">
          {label}
        </span>
        <h3 className="text-2xl font-medium tracking-tight text-foreground">
          {title}
        </h3>
      </div>
      <p className="text-sm text-foreground/50 leading-relaxed max-w-lg">
        {description}
      </p>
      {/* Placeholder for future screenshots/demos */}
      <div className="w-full h-48 rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/[0.06] ring-inset flex items-center justify-center">
        <span className="text-xs text-foreground/20">Preview coming soon</span>
      </div>
    </div>
  );
}
