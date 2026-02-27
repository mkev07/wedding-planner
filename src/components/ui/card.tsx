import { cn } from "@/lib/utils";

export function Card({
  className,
  shadow,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  shadow?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-foreground/[0.06] bg-white p-5",
        shadow && "shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
