import { Container } from "@/components/layout";
import { Reveal, Stagger } from "@/components/motion";

type PageIntroProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/** Standard top section for inner pages: title, optional lead text, optional extra content. */
export function PageIntro({ title, description, children }: PageIntroProps) {
  return (
    <section className="py-24">
      <Container>
        <Stagger delay={0.1}>
          <Reveal>
            <h1 className="text-4xl font-semibold text-text">{title}</h1>
          </Reveal>
          {description && (
            <Reveal>
              <p className="mt-4 max-w-xl text-muted">{description}</p>
            </Reveal>
          )}
          {children && <Reveal className="mt-8">{children}</Reveal>}
        </Stagger>
      </Container>
    </section>
  );
}
