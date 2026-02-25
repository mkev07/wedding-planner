# Wed — Design System

**Style:** Soft Minimal (Resurf-inspired)
**Reference:** https://resurf.so/

## Fonts

| Role | Font | Source |
|------|------|--------|
| Body / UI | **Inter Variable** | Google Fonts |
| Headings / Accent | **Instrument Serif** | Google Fonts |
| Monospace | **Geist Mono** | Vercel / Google Fonts |

No Kalam. No additional display fonts.

## Color Philosophy

Pure white background. No dark mode. Paper-like warmth.

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#0f0f0f` | Primary text |
| `--muted` | `#6b7280` | Secondary text |
| `--border` | `#e5e7eb` | Explicit borders |
| `--card-bg` | `#fafafa` | Card/section backgrounds |
| `--accent` | `#d4a574` | Warm gold accent (wedding feel) |

Text opacity is used instead of separate color tokens:
- Primary: `text-foreground` (100%)
- Secondary: `text-foreground/50`
- Tertiary: `text-foreground/25`
- Borders: `border-foreground/[0.06]` (ultra-subtle, almost invisible)

## Layout

- **Max width:** `52rem` — everything centered, feels like a contained card/window
- **Generous whitespace** — more padding than typical SaaS layouts
- **Rounded corners:** `rounded-xl` for cards/containers, `rounded-lg` for buttons
- **Shadows:** Soft and minimal — `shadow-[0_1px_3px_rgba(0,0,0,0.08)]`

## Components

### Navigation
- Sticky top, frosted glass: `bg-white/80 backdrop-blur-xl`
- Centered logo, links on sides
- Small text (`text-xs`), medium weight

### Buttons
- Primary: `bg-foreground text-white rounded-xl` (dark, not colored)
- Secondary: `bg-foreground/5 text-foreground/70 rounded-xl`
- No heavy gradients or colored backgrounds

### Cards / Sections
- Divided by ultra-subtle borders (`border-foreground/[0.06]`)
- No visible card borders or heavy shadows
- Content-first: label → heading → description → preview

### Feature Sections (Vertical)
- Uppercase tiny label (`text-xs tracking-wide uppercase text-foreground/25`)
- Large heading (`text-2xl font-medium tracking-tight`)
- Description paragraph below
- Preview placeholder with `ring-1 ring-foreground/[0.06]`

## Animation

Staggered fade-in-up on page load:

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```

Each element gets increasing `animation-delay`:
- Badge: `0.05s`
- Heading: `0.1s`
- Subtitle: `0.2s`
- CTA: `0.3s`
- Feature cards: `0.4s`, `0.5s`, `0.6s`

## What This Is NOT

- **Not shadcn/ui** — shares structural DNA (Tailwind tokens, Radix patterns) but adds editorial serif typography, Apple-grade animations, and extreme whitespace
- **Not dark mode** — intentionally paper-white
- **Not full-width** — contained, centered, window-like
- **Not colorful** — restraint is the palette. Dark text on white, warm gold accents only

## Vibe

> "shadcn meets Notion's marketing site meets a wedding invitation"

Clean. Warm. Unhurried. Every element has room to breathe.
