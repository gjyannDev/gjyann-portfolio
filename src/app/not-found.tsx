import Link from "next/link";
import { PageIntro } from "@/components/sections";

/** Replaces Next's built-in 404, which forces its own body background. */
export default function NotFound() {
  return (
    <PageIntro title="Page not found" description="The page you're looking for doesn't exist.">
      <Link href="/" className="text-sm text-text underline underline-offset-4 hover:text-muted">
        Back to home
      </Link>
    </PageIntro>
  );
}
