import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import teamImg from "@/assets/team.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function AboutBlock({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="section-y bg-secondary" aria-labelledby="ueber-uns-titel">
      <div className="container-page grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-5">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={teamImg}
                alt="Das Clean-Crew-Team mit Schubkarre, Rechen und Besen"
                loading="lazy"
                width={1200}
                height={1408}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-3xl bg-ink px-6 py-5 text-ink-foreground shadow-lift sm:-right-8">
              <p className="font-display text-4xl font-extrabold leading-none text-accent">2</p>
              <p className="mt-1 text-sm font-medium">Leute. Ein Anspruch.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="md:col-span-7">
          <p className="eyebrow text-primary">
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            Über uns
          </p>
          <h2
            id="ueber-uns-titel"
            className="mt-4 text-balance text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl"
          >
            Ein junges Zweierteam mit Liebe zum Detail.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-secondary-foreground sm:text-xl">
            Wir sind Clean Crew – ein motiviertes Team, das Wert auf Zuverlässigkeit, Sorgfalt und
            saubere Arbeit legt. Unser Ziel ist es, unseren Kunden die Arbeit abzunehmen und für
            gepflegte Ergebnisse zu sorgen.
          </p>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            {["Zuverlässig", "Sorgfältig", "Motiviert"].map((w) => (
              <div
                key={w}
                className="rounded-2xl border border-primary/15 bg-background px-3 py-4 text-center text-sm font-semibold text-primary"
              >
                {w}
              </div>
            ))}
          </div>
          {showLink && (
            <Button asChild variant="ink" size="lg" className="mt-10">
              <Link to="/ueber-uns">
                Mehr über uns <ArrowRight />
              </Link>
            </Button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
