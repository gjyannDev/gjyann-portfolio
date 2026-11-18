import { cn } from "@/lib/utils";

/**
 * Mono tag chip, rendered as an <li>. `primary` highlights it.
 * Own file (no layout imports) so client components can use it.
 */
export function Chip({
  primary,
  className,
  children,
}: {
  primary?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "rounded-md border px-2.5 py-1 font-mono text-sm",
        primary
          ? "border-line-strong bg-brand/10 text-text"
          : "border-line text-muted",
        className,
      )}
    >
      {children}
    </li>
  );
}
