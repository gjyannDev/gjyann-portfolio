import { ThemeToggle } from "@/components/theme";
import { NavLinks } from "./nav-links";

/** Floating pill nav, centered and sticky at the top. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main"
        className="flex items-center gap-1 rounded-full border border-line bg-surface/70 px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md sm:gap-2"
      >
        <NavLinks />
        <span aria-hidden className="mx-1 h-5 w-px bg-line" />
        <ThemeToggle className="border" />
      </nav>
    </header>
  );
}
