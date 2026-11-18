"use client";

import { useState } from "react";
import { Chip } from "../chip";

const VISIBLE = 3;

/** Shows the first few skills; a "+N skills" chip reveals the rest. */
export function SkillList({ skills }: { skills: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = skills.length - VISIBLE;
  const shown = expanded || hidden <= 0 ? skills : skills.slice(0, VISIBLE);

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {shown.map((skill) => (
        <Chip key={skill}>{skill}</Chip>
      ))}
      {hidden > 0 && !expanded && (
        <li>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-md border border-dashed border-line-strong px-2.5 py-1 font-mono text-sm text-subtle transition-colors hover:border-subtle hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40"
          >
            +{hidden} skills
          </button>
        </li>
      )}
    </ul>
  );
}
