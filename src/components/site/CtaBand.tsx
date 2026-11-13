import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function CtaBand() {
  return (
    <section className="bg-lime-gradient">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
        <Reveal>
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-accent-foreground sm:text-4xl">
            Bereit für ein sauberes Ergebnis?
          </h2>
          <p className="mt-2 text-base font-medium text-accent-foreground/80">
            Schreibt uns – wir melden uns mit einem unverbindlichen Angebot.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Button asChild variant="ink" size="xl">
            <Link to="/kontakt">
              Jetzt Angebot anfragen <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
