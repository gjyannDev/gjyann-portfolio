"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/config/site";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: profile.timeZone.id,
});

const subscribeClock = (onChange: () => void) => {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
};

/** Live local time, e.g. "9:07 PM UTC+8". Shows a placeholder until mounted. */
export function LocalTime() {
  // The snapshot is the formatted string, so React only re-renders when the minute changes.
  const time = useSyncExternalStore(
    subscribeClock,
    () => timeFormat.format(Date.now()),
    () => null,
  );

  return (
    <span className="tabular-nums">
      {time ?? "--:--"} {profile.timeZone.label}
    </span>
  );
}
