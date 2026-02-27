import { cn } from "@/lib/utils";

export function Input({
  label,
  className,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground/70">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "rounded-xl border border-foreground/[0.06] bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow",
          className
        )}
        {...props}
      />
    </div>
  );
}
