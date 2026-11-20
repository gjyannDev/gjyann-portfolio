import { profile } from "@/config/site";
import { Section } from "../section";
import {
  getContributions,
  type ContributionDay,
  type ContributionLevel,
} from "./api";

// Monochrome scale from the theme tokens: white steps on dark, black on light.
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  NONE: "bg-line",
  FIRST_QUARTILE: "bg-brand/25",
  SECOND_QUARTILE: "bg-brand/45",
  THIRD_QUARTILE: "bg-brand/70",
  FOURTH_QUARTILE: "bg-brand/95",
};
const LEVELS = Object.keys(LEVEL_CLASS) as ContributionLevel[];

const CELL = "size-2.5 rounded-[2px]";
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function dayTitle({ date, contributionCount: n }: ContributionDay) {
  return `${n === 0 ? "No" : n} contribution${n === 1 ? "" : "s"} on ${formatDate(date)}`;
}

const githubUrl =
  profile.links.find((l) => l.label === "github")?.href ??
  `https://github.com/${profile.handle}`;

function ProfileLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      className="rounded-sm font-mono text-sm text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40"
    >
      {children} <span aria-hidden>↗</span>
    </a>
  );
}

export async function GitHubActivity() {
  const calendar = await getContributions(profile.handle);

  return (
    <Section
      title="Activity"
      index="05"
      description="GitHub contributions over the last year, private work included."
      listAs="div"
      listClassName="rounded-xl border border-line bg-surface/60 p-4 sm:p-5"
    >
      {!calendar ? (
        <p className="text-sm text-muted">
          Contribution graph is unavailable right now.{" "}
          <ProfileLink>view on github</ProfileLink>
        </p>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted">
              <span className="font-medium text-text">
                {calendar.totalContributions.toLocaleString("en-US")}
              </span>{" "}
              contributions in the last year
            </p>
            <ProfileLink>@{profile.handle}</ProfileLink>
          </div>

          {/* Scrolls sideways below min width instead of shrinking cells; rtl
              starts it scrolled to the newest weeks on narrow screens. */}
          <div dir="rtl" className="overflow-x-auto pb-1">
            {/* One grid: col 1 = weekday labels, then one column per week; row 1 = months. */}
            <div
              role="img"
              dir="ltr"
              aria-label={`${calendar.totalContributions} GitHub contributions in the last year`}
              style={{
                gridTemplateColumns: `auto repeat(${calendar.weeks.length}, minmax(0, 1fr))`,
              }}
              className="grid min-w-[640px] gap-[3px] font-mono text-[10px] leading-none text-subtle"
            >
              {calendar.months.reduce<React.ReactNode[]>((cells, m, i) => {
                const start =
                  2 +
                  calendar.months
                    .slice(0, i)
                    .reduce((sum, prev) => sum + prev.totalWeeks, 0);
                cells.push(
                  <span
                    key={`${m.name}-${i}`}
                    aria-hidden
                    style={{
                      gridRow: 1,
                      gridColumn: `${start} / span ${m.totalWeeks}`,
                    }}
                    className="overflow-hidden whitespace-nowrap pb-1.5"
                  >
                    {m.totalWeeks >= 2 ? m.name : ""}
                  </span>,
                );
                return cells;
              }, [])}

              {DAY_LABELS.map((label, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{ gridRow: i + 2, gridColumn: 1 }}
                  className="self-center pr-1.5"
                >
                  {label}
                </span>
              ))}

              {calendar.weeks.flatMap((week, w) =>
                week.contributionDays.map((day) => (
                  <span
                    key={day.date}
                    aria-hidden
                    title={dayTitle(day)}
                    style={{ gridColumn: w + 2, gridRow: day.weekday + 2 }}
                    className={`aspect-square w-full rounded-[2px] ${LEVEL_CLASS[day.contributionLevel]}`}
                  />
                )),
              )}
            </div>
          </div>

          <div
            aria-hidden
            className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-subtle"
          >
            less
            {LEVELS.map((level) => (
              <span key={level} className={`${CELL} ${LEVEL_CLASS[level]}`} />
            ))}
            more
          </div>
        </>
      )}
    </Section>
  );
}
