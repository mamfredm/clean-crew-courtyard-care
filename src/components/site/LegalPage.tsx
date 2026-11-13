import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-ink pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="container-page">
          <h1 className="text-4xl font-extrabold text-ink-foreground sm:text-5xl">{title}</h1>
        </div>
      </section>
      <section className="section-y bg-background">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_strong]:text-foreground">
            <p className="rounded-2xl border border-accent bg-secondary px-5 py-4 text-sm text-secondary-foreground">
              Hinweis: Die Angaben in eckigen Klammern sind Platzhalter und müssen vor der
              Veröffentlichung durch eure echten Daten ersetzt und rechtlich geprüft werden.
            </p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
