"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { createMoonScene, moonPhase } from "./moon-scene";

const noop = () => () => {};
const HOUR = 3_600_000;
/** Current hour bucket on the client, null on the server (no Date during prerender). */
const useHour = () =>
  useSyncExternalStore(
    noop,
    () => Math.floor(Date.now() / HOUR),
    () => null,
  );

/** CSS px per dither cell (rounded to whole device pixels at draw time). */
const CELL = 2;

/** Moon placement in CSS px; matches the sky's h-72 / sm:h-88. */
function layout(width: number) {
  const sm = width >= 640;
  return { cx: width / 2, cy: sm ? 188 : 156, r: sm ? 76 : 56 };
}

/**
 * Dithered night sky at the top of every page: today's moon phase with real
 * maria, a halo, drifting cloud bands and stars (see moon-scene.ts).
 * Rendered once in the root layout, so it stays mounted across navigation.
 * - Scroll: layers sink at different rates (depth) and the sky fades out.
 * - Cursor: layers shift a few px, nearer ones more (fine pointers only).
 * - Paused while off-screen; one still frame under reduced motion.
 */
export function MoonSky() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  const { resolvedTheme } = useTheme();
  const hour = useHour();
  const moon = hour === null ? null : moonPhase(hour * HOUR);
  const dark = resolvedTheme !== "light";
  const phase = moon?.phase ?? 0.5;
  const illumination = moon?.illumination ?? 1;

  // Read by the render loop, so theme/phase changes don't rebuild WebGL.
  const live = useRef({ dark, phase, illumination });
  const redraw = useRef<(() => void) | null>(null);

  useEffect(() => {
    live.current = { dark, phase, illumination };
    redraw.current?.();
  }, [dark, phase, illumination]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const label = labelRef.current;
    if (!wrap || !stage || !canvas) return;

    const scene = createMoonScene(canvas);
    if (!scene) return; // No WebGL: the page simply has no sky.

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const start = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let size = { w: 0, h: 0, cell: CELL };
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Whole device pixels per cell keep the dots crisp at any zoom.
      const cell = Math.max(1, Math.round(CELL * dpr)) / dpr;
      const { width, height } = wrap.getBoundingClientRect();
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      scene.resize(cols, rows);
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;
      size = { w: width, h: height, cell };
    };

    const frame = (now: number) => {
      const { w, h, cell } = size;
      if (!w || !h) return;
      const time = reduce ? 42 : (now - start) / 1000;
      const scroll = reduce ? 0 : Math.min(Math.max(window.scrollY, 0), h);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      // Per layer: [scroll lag, cursor shift px]. Farther layers lag the
      // scroll more and follow the cursor less.
      const shift = (lag: number, px: number): [number, number] => [
        -pointer.x * px,
        scroll * lag - pointer.y * px,
      ];
      const { cx, cy, r } = layout(w);
      const [mx, my] = shift(0.4, 8);
      const toOffset = ([x, y]: [number, number]): [number, number] => [
        -x / cell,
        -y / cell,
      ];

      scene.draw({
        time,
        ink: live.current.dark ? 0.96 : 0.04,
        dark: live.current.dark,
        moon: [(cx + mx) / cell, (cy + my) / cell, r / cell],
        anchor: [cy / cell, r / cell],
        phase: live.current.phase,
        illumination: live.current.illumination,
        far: toOffset(shift(0.3, 14)),
        near: toOffset(shift(0.15, 22)),
        stars: toOffset(shift(0.45, 4)),
      });

      wrap.style.opacity = String(Math.max(0, 1 - scroll / (h * 1.1)));
      if (label) {
        label.style.transform = `translate(${cx + mx}px, ${cy + my + r + 24}px) translateX(-50%)`;
      }
    };

    const loop = (now: number) => {
      frame(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!raf && visible && !reduce) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    // One-off draw for changes while the loop is idle (reduced motion, off-screen).
    redraw.current = () => {
      if (!raf) frame(performance.now());
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    const ro = new ResizeObserver(() => {
      resize();
      redraw.current?.();
    });
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      pause();
      stage.style.opacity = "0";
    };

    resize();
    frame(start);
    stage.style.opacity = "1"; // CSS transition fades the sky in.
    io.observe(wrap);
    ro.observe(wrap);
    canvas.addEventListener("webglcontextlost", onContextLost);
    if (fine && !reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    play();

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("pointermove", onPointer);
      redraw.current = null;
      scene.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      // Pulled up under the sticky nav; the shader fades the sky into the page.
      className="pointer-events-none relative -mt-20 h-72 overflow-hidden sm:h-88"
    >
      <div
        ref={stageRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-1000"
      >
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 [image-rendering:pixelated]"
        />
        <p
          ref={labelRef}
          className="absolute left-0 top-0 whitespace-nowrap font-mono text-[11px] text-muted"
        >
          {moon && `${moon.name} · ${Math.round(moon.illumination * 100)}%`}
        </p>
      </div>
    </div>
  );
}
