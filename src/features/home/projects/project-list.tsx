"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "../chip";
import {
  PROJECT_TYPES,
  projects,
  type Project,
  type ProjectType,
} from "./data";

type Filter = "all" | ProjectType;
const FILTERS: Filter[] = ["all", ...PROJECT_TYPES];

const thumbBox =
  "relative aspect-16/10 overflow-hidden rounded-lg border border-line bg-surface";

/**
 * Thumbnail that opens the full image in a lightbox (Esc, backdrop or a click
 * closes it). Without an image it's a dotted placeholder that phones skip.
 */
function Thumb({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Dialog.Root>
        <Dialog.Trigger
          aria-label={`View ${project.title} preview full size`}
          className={cn(
            thumbBox,
            "group block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40",
          )}
        >
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 768px) 22rem, (min-width: 640px) 17rem, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute right-2 bottom-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 font-mono text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 aria-hidden className="size-3" /> view
          </span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <Dialog.Title className="sr-only">{project.title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close preview"
              className="relative h-full w-full max-w-6xl cursor-zoom-out"
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1152px) 72rem, 100vw"
                className="object-contain"
              />
            </Dialog.Close>
            <Dialog.Close
              aria-label="Close preview"
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white/60"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <div className={cn(thumbBox, "hidden sm:block")}>
      {(
        <div aria-hidden className="absolute inset-0 p-3">
          <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[6px_6px]" />
          <div className="relative space-y-2">
            <div className="h-1.5 w-1/3 rounded-full bg-line-strong" />
            <div className="h-1.5 w-2/3 rounded-full bg-line" />
            <div className="h-1.5 w-4/5 rounded-full bg-line" />
            <div className="mt-4 h-1.5 w-1/2 rounded-full bg-line" />
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({
  highlight,
  children,
}: {
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "rounded border px-1.5 py-px font-mono text-[11px]",
        highlight
          ? "border-line-strong bg-brand/10 text-text"
          : "border-line text-subtle",
      )}
    >
      {children}
    </span>
  );
}

function Row({ project, number }: { project: Project; number: number }) {
  return (
    <li className="grid gap-4 border-b border-line py-7 sm:grid-cols-[3.5rem_1fr_17rem] sm:gap-6 md:grid-cols-[3.5rem_1fr_22rem]">
      <div className="flex gap-3 font-mono text-xs text-subtle sm:flex-col sm:gap-1">
        <span>{String(number).padStart(2, "0")}</span>
        <span>{project.year}</span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-text">{project.title}</h3>
          <Badge>{project.type}</Badge>
          {project.featured && <Badge highlight>featured</Badge>}
        </div>
        <p className="mt-1.5 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </ul>
        {project.links.length > 0 && (
          <ul className="mt-4 flex gap-4 font-mono text-sm">
            {project.links.map(({ label, href }) => {
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="rounded-sm text-brand transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40"
                  >
                    {label} <span aria-hidden>↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Thumb project={project} />
    </li>
  );
}

/** Filter buttons + project rows. `limit` caps the rows (home page preview). */
export function ProjectList({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Keep each project's original number so it stays stable across filters.
  const rows = projects
    .map((project, i) => ({ project, number: i + 1 }))
    .filter(({ project }) => filter === "all" || project.type === filter)
    .slice(0, limit);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "h-8 rounded-full border px-3.5 font-mono text-xs transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40",
              filter === f
                ? "border-transparent bg-brand/12 text-brand"
                : "border-line text-muted hover:bg-hover hover:text-text",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {rows.length > 0 ? (
        <ol className="mt-6 border-t border-line">
          {rows.map(({ project, number }) => (
            <Row key={project.title} project={project} number={number} />
          ))}
        </ol>
      ) : (
        <p className="mt-6 border-t border-line pt-6 text-muted">
          No {filter} projects yet.
        </p>
      )}
    </>
  );
}
