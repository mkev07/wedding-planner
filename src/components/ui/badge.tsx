import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "accent";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-foreground/5 text-foreground/60",
  success: "bg-emerald-500/10 text-emerald-700",
  warning: "bg-amber-500/10 text-amber-700",
  danger: "bg-red-500/10 text-red-600",
  accent: "bg-accent/20 text-accent",
};

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
