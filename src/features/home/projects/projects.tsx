import Link from "next/link";
import { Section } from "../section";
import { intro, projects } from "./data";
import { ProjectList } from "./project-list";

type ProjectsProps = {
  /** "h1" when rendered as the main content of the /projects page. */
  titleAs?: "h1" | "h2";
  /** Max rows to show; adds a "view all" link when there are more. */
  limit?: number;
};

export function Projects({ titleAs = "h2", limit }: ProjectsProps) {
  const hasMore = limit !== undefined && projects.length > limit;

  return (
    <Section
      title="Projects"
      index="04"
      as={titleAs}
      description={intro}
      listAs="div"
      listClassName=""
    >
      <ProjectList limit={limit} />
      {hasMore && (
        <Link
          href="/projects"
          className="mt-6 inline-flex rounded-sm font-mono text-sm text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/40"
        >
          view all projects{" "}
          <span aria-hidden className="ml-1">
            →
          </span>
        </Link>
      )}
    </Section>
  );
}
