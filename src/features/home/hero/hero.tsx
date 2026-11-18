import Image from "next/image";
import { Container } from "@/components/layout";
import { profile } from "@/config/site";
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
    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-line-strong bg-surface sm:size-24">
      {profile.avatar ? (
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          sizes="96px"
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
            className="relative flex h-full items-center justify-center text-2xl font-medium tracking-wide text-text sm:text-3xl"
          >
            {initials(profile.name)}
          </span>
        </>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section className="pb-6 pt-24">
      <Container className="max-w-4xl">
        <div className="flex items-center gap-5 sm:gap-6">
          <Avatar />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-text sm:text-4xl">
              {profile.name}
              <span className="ml-2 align-middle font-mono text-xs font-normal text-subtle">
                {profile.version}
              </span>
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

        <HeroInfo />
      </Container>
    </section>
  );
}
