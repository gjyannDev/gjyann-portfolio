import { profile } from "@/config/site";
import { Container } from "./container";

export async function Footer() {
  "use cache";
  return (
    <footer className="pb-10 pt-6">
      {/* Same width + divider as the home sections so edges line up. */}
      <Container className="max-w-4xl">
        <div className="flex flex-col gap-3 border-t border-line pt-5 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {profile.links.map(({ label, href }) => {
              // External sites and PDFs open in a new tab.
              const newTab = href.startsWith("http") || href.endsWith(".pdf");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="rounded-sm transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40"
                  >
                    {label} <span aria-hidden>↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
