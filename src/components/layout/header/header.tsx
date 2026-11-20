import { ThemeToggle } from "@/components/theme";
import { NavLinks } from "./nav-links";

/** Floating pill nav, centered and sticky at the top. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 flex justify-center px-3 pt-4 sm:px-4">
      <nav
        aria-label="Main"
        className="flex max-w-full items-center gap-0.5 rounded-full border border-line bg-surface/70 px-1 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md sm:gap-2 sm:px-2"
      >
        <NavLinks />
        {/* Phones skip the divider; the toggle's own border sets it apart. */}
        <span aria-hidden className="mx-1 hidden h-5 w-px bg-line sm:block" />
        <ThemeToggle className="border" />
      </nav>
    </header>
  );
}
