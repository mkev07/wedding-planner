import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="h-2 rounded-full bg-foreground/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground/80 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-foreground/40">
        {value} of {max} ({percentage}%)
      </span>
    </div>
  );
}
