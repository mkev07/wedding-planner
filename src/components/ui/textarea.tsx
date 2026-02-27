import { cn } from "@/lib/utils";

export function Textarea({
  label,
  className,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground/70">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "rounded-xl border border-foreground/[0.06] bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow resize-y min-h-[80px]",
          className
        )}
        {...props}
      />
    </div>
  );
}
