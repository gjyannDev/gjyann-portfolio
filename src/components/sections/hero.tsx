import { Container } from "@/components/layout";

export function Hero() {
  return (
    <section className="py-24">
      <Container>
        <h1 className="text-4xl font-semibold text-text">Hello World</h1>
        <p className="mt-4 font-mono text-sm text-muted">
          Portfolio coming soon.
        </p>
      </Container>
    </section>
  );
}
