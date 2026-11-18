/**
 * Page background, back to front:
 * 1. Soft white light anchored at the top center (static, dark theme only).
 * 2. Neutral white dot grid, fading out from the top.
 * 3. Film grain over everything (animated in CSS, still under reduced motion).
 */
export function Background() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-glow absolute -top-64 left-1/2 h-160 w-256 max-w-[140vw] -translate-x-1/2" />
        <div className="bg-dots absolute inset-0" />
      </div>
      <div
        aria-hidden

        className="bg-grain pointer-events-none fixed -inset-1/2 z-50"
      />
    </>
  );
}
