import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function PricingNote() {
  return (
    <section className="section-y bg-background" aria-labelledby="preise-titel">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center sm:px-12 md:py-20">
            <div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent opacity-20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-primary opacity-60 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="eyebrow justify-center text-accent">Preise &amp; Angebote</p>
              <h2
                id="preise-titel"
                className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight text-ink-foreground sm:text-4xl md:text-5xl"
              >
                Jeder Auftrag ist individuell.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
                Kontaktiert uns für ein unverbindliches und faires Angebot.
              </p>
              <Button asChild variant="hero" size="xl" className="mt-9">
                <Link to="/kontakt">
                  Angebot anfordern <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
