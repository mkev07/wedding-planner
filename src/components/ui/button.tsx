import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-white hover:bg-foreground/90",
  secondary:
    "bg-foreground/5 text-foreground/70 hover:bg-foreground/10",
  ghost:
    "text-foreground/50 hover:text-foreground hover:bg-foreground/5",
  danger:
    "bg-red-500/10 text-red-600 hover:bg-red-500/20",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
