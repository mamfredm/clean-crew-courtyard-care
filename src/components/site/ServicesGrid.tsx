import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceIcon } from "./ServiceIcon";

export function ServicesGrid({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="section-y bg-background" aria-labelledby={showHeading ? "leistungen-titel" : undefined}>
      <div className="container-page">
        {showHeading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Unsere Dienstleistungen"
              title={<span id="leistungen-titel">Alles, was draußen glänzen soll.</span>}
              text="Vier Leistungen, ein Anspruch: saubere Arbeit, auf die ihr euch verlassen könnt."
            />
            <Reveal>
              <Link
                to="/leistungen"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Alle Leistungen ansehen <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <Link
                to="/leistungen"
                hash={s.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-soft">
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-primary">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
                    Mehr erfahren
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
