export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-12 h-12 rounded-xl bg-foreground/[0.03] flex items-center justify-center mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-foreground/20"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className="text-sm font-medium text-foreground/60 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-foreground/30 text-center max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
