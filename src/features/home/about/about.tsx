import { cn } from "@/lib/utils";
import { Chip } from "../chip";
import { InfoRow, Section, StatusDot } from "../section";
import { about, stack, type StackGroup } from "./data";

/**
 * One stack group as a grid cell: header strip, then chips.
 * Cells draw right/bottom dashed borders; the grid draws top/left, so
 * shared edges never double up in 1 or 2 columns.
 */
function StackCard({ label, items }: StackGroup) {
  return (
    <div className="border-r border-b border-dashed border-line transition-colors hover:bg-hover/40">
      <dt className="border-b border-dashed border-line px-4 py-3 text-sm font-semibold text-text">
        {label}
      </dt>
      <dd className="px-4 py-4">
        <ul className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <Chip
              key={item.name}
              primary={item.primary}
              className={cn(
                "rounded-sm px-2 py-0.5 text-xs",
                !item.primary && "bg-surface",
              )}
            >
              {item.name}
            </Chip>
          ))}
        </ul>
      </dd>
    </div>
  );
}

type AboutProps = {
  /** "h1" when rendered as the main content of the /about page. */
  titleAs?: "h1" | "h2";
};

export function About({ titleAs = "h2" }: AboutProps) {
  return (
    <>
      <Section title="About" index="01" as={titleAs}>
        <InfoRow label="summary">{about.summary}</InfoRow>
        <InfoRow label="focus">{about.focus}</InfoRow>
        <InfoRow label="currently">
          <StatusDot>{about.currently}</StatusDot>
        </InfoRow>
        <InfoRow label="based in">{about.basedIn}</InfoRow>
      </Section>

      <Section
        title="Tech stack"
        index="02"
        listClassName="grid border-t border-l border-dashed border-line bg-surface/30 sm:grid-cols-2"
      >
        {stack.map((group) => (
          <StackCard key={group.label} {...group} />
        ))}
      </Section>
    </>
  );
}
