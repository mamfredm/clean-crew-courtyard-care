import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { ServiceIcon } from "./ServiceIcon";

export function ServicesDetail() {
  return (
    <section className="section-y bg-background">
      <div className="container-page space-y-20 md:space-y-28">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            <Reveal className={cn(i % 2 === 1 && "md:order-2")}>
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] shadow-lift">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <span
                  className={cn(
                    "absolute -bottom-5 font-display text-7xl font-extrabold leading-none text-accent md:text-8xl",
                    i % 2 === 1 ? "-left-2" : "-right-2",
                  )}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <ServiceIcon icon={s.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.description}</p>
              <ul className="mt-7 grid gap-3">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 font-medium"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild variant="default" size="lg" className="mt-8">
                <Link to="/kontakt">
                  Angebot für {s.title} anfragen <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
