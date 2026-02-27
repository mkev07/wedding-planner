import { cn } from "@/lib/utils";

export function Select({
  label,
  className,
  id,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground/70">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "rounded-xl border border-foreground/[0.06] bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_8px_center] bg-no-repeat pr-8",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
