import { profile, type ProfileLink } from "@/config/site";
import { cn } from "@/lib/utils";
import { InfoRow, StatusDot } from "../section";

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
      <InfoRow label="developer">{profile.handle}</InfoRow>
      <InfoRow label="experience">{profile.experience}</InfoRow>
      <InfoRow label="projects">{profile.projects}</InfoRow>
      <InfoRow label="location">{profile.location}</InfoRow>
      <InfoRow label="status">
        <StatusDot active={profile.status.available}>
          {profile.status.label}
        </StatusDot>
      </InfoRow>
      <InfoRow label="links">
        <Links links={profile.links} />
      </InfoRow>
    </dl>
  );
}
