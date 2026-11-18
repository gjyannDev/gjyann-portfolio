import { cn } from "@/lib/utils";
import { Section } from "../section";
import {
  companies,
  companySpan,
  formatDuration,
  formatMonth,
  intro,
  type Company,
  type Role,
} from "./data";
import { SkillList } from "./skill-list";

function RoleItem({
  role,
  now,
  dotted,
}: {
  role: Role;
  now: Date;
  /** Show a timeline dot (companies with several roles). */
  dotted: boolean;
}) {
  const current = !role.end;
  return (
    <li className={cn("relative", dotted && "pl-5")}>
      {dotted && (
        <span
          aria-hidden
          className="absolute left-0 top-2 size-2 rounded-full border border-line-strong bg-bg"
        />
      )}
      <h4 className="font-medium text-text">{role.title}</h4>
      <p
        className={cn(
          "mt-0.5 font-mono text-xs uppercase tracking-wide",
          current ? "text-text" : "text-subtle",
        )}
      >
        {formatMonth(role.start)} – {formatMonth(role.end)} ·{" "}
        {formatDuration(role.start, role.end, now)}
      </p>
      <p className="mt-2 leading-relaxed text-muted">{role.summary}</p>
      <SkillList skills={role.skills} />
    </li>
  );
}

function CompanyItem({
  company,
  now,
  last,
}: {
  company: Company;
  now: Date;
  last: boolean;
}) {
  const multi = company.roles.length > 1;
  const span = companySpan(company.roles);
  const meta = [
    company.type,
    multi && formatDuration(span.start, span.end, now),
  ].filter(Boolean);

  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 sm:gap-x-5">
      {/* Badge + connecting line down to the next company. */}
      <div className="flex flex-col items-center">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface font-mono text-xs text-muted">
          {company.badge}
        </span>
        {!last && <span aria-hidden className="mt-2 w-px flex-1 bg-line" />}
      </div>

      <div className={cn("min-w-0", !last && "pb-10")}>
        <h3 className="text-lg font-semibold leading-10 text-text">
          {company.name}
        </h3>
        <p className="-mt-1 font-mono text-xs text-subtle">
          {meta.join(" · ")}
        </p>
        {company.location && (
          <p className="font-mono text-xs text-subtle">{company.location}</p>
        )}
        <ol className="mt-5 space-y-7">
          {company.roles.map((role) => (
            <RoleItem
              key={role.title + role.start}
              role={role}
              now={now}
              dotted={multi}
            />
          ))}
        </ol>
      </div>
    </li>
  );
}

type ExperienceProps = {
  /** "h1" when rendered as the main content of the /experience page. */
  titleAs?: "h1" | "h2";
};

export async function Experience({ titleAs = "h2" }: ExperienceProps) {
  // Cached so reading "now" (for "Present" durations) is allowed under cacheComponents.
  "use cache";
  const now = new Date();

  return (
    <Section
      title="Experience"
      index="03"
      as={titleAs}
      description={intro}
      listAs="ol"
      listClassName=""
    >
      {companies.map((company, i) => (
        <CompanyItem
          key={company.name}
          company={company}
          now={now}
          last={i === companies.length - 1}
        />
      ))}
    </Section>
  );
}
