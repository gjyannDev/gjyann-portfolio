import { profile, type ProfileLink } from "@/config/site";
import { cn } from "@/lib/utils";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-center gap-4 border-b border-line py-3.5 sm:grid-cols-[8rem_1fr]">
      <dt className="font-mono text-xs text-subtle">{label}</dt>
      <dd className="min-w-0 text-sm text-muted sm:text-base">{children}</dd>
    </div>
  );
}

function Status() {
  const { label, available } = profile.status;
  return (
    <span className="inline-flex items-center gap-2.5">
      <span aria-hidden className="relative flex size-2">
        {available && (
          <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
        )}
        <span
          className={cn(
            "relative size-2 rounded-full",
            available ? "bg-brand" : "bg-subtle",
          )}
        />
      </span>
      {label}
    </span>
  );
}

function Links({ links }: { links: ProfileLink[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm">
      {links.map(({ label, href, primary }) => {
        const external = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={cn(
                "rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40",
                primary
                  ? "text-brand hover:text-brand-hover"
                  : "text-muted hover:text-text",
              )}
            >
              {label} <span aria-hidden>↗</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Spec-sheet style table of profile facts. */
export function HeroInfo() {
  return (
    <dl className="mt-10 border-t border-line">
      <Row label="developer">{profile.handle}</Row>
      <Row label="experience">{profile.experience}</Row>
      <Row label="projects">{profile.projects}</Row>
      <Row label="location">{profile.location}</Row>
      <Row label="status">
        <Status />
      </Row>
      <Row label="links">
        <Links links={profile.links} />
      </Row>
    </dl>
  );
}
