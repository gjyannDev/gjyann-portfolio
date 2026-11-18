import { Container } from "@/components/layout";
import { cn } from "@/lib/utils";

type SectionProps = {
  title: string;
  /** Small mono marker on the right, e.g. "01". */
  index?: string;
  /** Heading level; use "h1" when the section is the page's main heading. */
  as?: "h1" | "h2";
  /** Optional lead paragraph under the title. */
  description?: string;
  /** Body element: <dl> for InfoRows, <ol> for ordered content, <div> when the body brings its own list. */
  listAs?: "dl" | "ol" | "div";
  /** Overrides the list styling (default: top divider for InfoRows). */
  listClassName?: string;
  children: React.ReactNode;
};

/** Numbered home section: title row, optional lead, then the list body. */
export function Section({
  title,
  index,
  as: Heading = "h2",
  description,
  listAs: List = "dl",
  listClassName = "border-t border-line",
  children,
}: SectionProps) {
  return (
    <section className="py-6">
      <Container className="max-w-4xl">
        <div className="flex items-baseline justify-between gap-4 pb-5">
          <Heading className="text-2xl font-semibold text-text sm:text-3xl">
            {title}
          </Heading>
          {index && (
            <span aria-hidden className="font-mono text-xs text-subtle">
              {index}
            </span>
          )}
        </div>
        {description && (
          <p className="-mt-1 mb-8 max-w-2xl leading-relaxed text-muted">
            {description}
          </p>
        )}
        <List className={listClassName}>{children}</List>
      </Container>
    </section>
  );
}

/** One label/value row. Must sit inside a <dl>. */
export function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-line py-3.5 sm:grid-cols-[8rem_1fr]">
      <dt className="font-mono text-xs text-subtle">{label}</dt>
      <dd className="min-w-0 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </dd>
    </div>
  );
}

/** Small dot + text. `active` adds the brand color and a soft pulse. */
export function StatusDot({
  active = true,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span aria-hidden className="relative flex size-2">
        {active && (
          <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
        )}
        <span
          className={cn(
            "relative size-2 rounded-full",
            active ? "bg-brand" : "bg-subtle",
          )}
        />
      </span>
      {children}
    </span>
  );
}
