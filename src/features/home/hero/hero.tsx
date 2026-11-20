import Image from "next/image";
import { Container } from "@/components/layout";
import { profile } from "@/config/site";
import { formatMonths, totalExperienceMonths } from "../experience/data";
import { HeroInfo } from "./hero-info";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (
    parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
}

/** Photo if `profile.avatar` is set, otherwise initials on a dotted tile. */
function Avatar() {
  return (
    <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-line-strong bg-surface min-[360px]:size-28 sm:size-36">
      {profile.avatar ? (
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          sizes="144px"
          priority
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[6px_6px]"
          />
          <span
            aria-hidden
            className="relative flex h-full items-center justify-center text-3xl font-medium tracking-wide text-text sm:text-4xl"
          >
            {initials(profile.name)}
          </span>
        </>
      )}
    </div>
  );
}

export async function Hero() {
  "use cache";
  // Total months across all roles, from the experience data, e.g. "1 yr 7 mos".
  const experience = formatMonths(totalExperienceMonths(new Date()));

  return (
    <section className="pb-6">
      <Container className="max-w-4xl">
        {/* Smaller avatar + gap under 360px keep the name to two lines. */}
        <div className="flex items-center gap-4 min-[360px]:gap-5 sm:gap-6">
          <Avatar />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-text sm:text-4xl">
              {profile.name}
            </h1>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-hover px-2.5 py-0.5 font-mono text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeroInfo experience={experience} />
      </Container>
    </section>
  );
}
