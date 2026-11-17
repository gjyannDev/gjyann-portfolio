import { siteConfig } from "@/config/site";
import { Container } from "./container";

export async function Footer() {
  "use cache";
  return (
    <footer className="border-t border-line">
      <Container className="py-6 text-xs text-subtle">
        © {new Date().getFullYear()} {siteConfig.name}
      </Container>
    </footer>
  );
}
