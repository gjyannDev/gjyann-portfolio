import { Chip } from "../chip";
import { InfoRow, Section, StatusDot } from "../section";
import { about, stack, type StackGroup } from "./data";

/** One stack group as a small card: label, then chips. */
function StackCard({ label, items }: StackGroup) {
  return (
    <div className="rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-line-strong">
      <dt className="font-mono text-xs text-subtle">{label}</dt>
      <dd className="mt-3">
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip key={item.name} primary={item.primary}>
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
        listClassName="grid gap-3 sm:grid-cols-2"
      >
        {stack.map((group) => (
          <StackCard key={group.label} {...group} />
        ))}
      </Section>
    </>
  );
}
