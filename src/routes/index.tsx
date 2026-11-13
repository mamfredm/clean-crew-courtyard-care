import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { AboutBlock } from "@/components/site/AboutBlock";
import { CtaBand } from "@/components/site/CtaBand";
import { PricingNote } from "@/components/site/PricingNote";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { WhyGrid } from "@/components/site/WhyGrid";
import { BeforeAfterSection } from "@/components/site/WorksSection";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "Clean Crew – Hofreinigung, Gartenpflege & Autowäsche",
      "Clean Crew kümmert sich um Sauberkeit und gepflegte Außenbereiche: Straßen- und Hofreinigung, Laubentfernung, Rasenpflege und Autowäsche. Jetzt Angebot anfragen.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Clean Crew",
          slogan: site.slogan,
          description: site.intro,
          makesOffer: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink">
        <img
          src={heroImg}
          alt="Frisch gereinigte, glänzende Einfahrt vor einem gepflegten Haus"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="animate-slow-zoom absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

        <div className="container-page pb-16 pt-32 md:pb-24">
          <div className="max-w-4xl">
            <p
              className="animate-hero-in eyebrow text-accent"
              style={{ animationDelay: "100ms" }}
            >
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              Reinigung · Gartenpflege · Autowäsche
            </p>
            <h1
              className="animate-hero-in mt-6 font-display text-[clamp(3.5rem,13vw,9.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-ink-foreground"
              style={{ animationDelay: "200ms" }}
            >
              CLEAN
              <br />
              <span className="text-accent">CREW</span>
            </h1>
            <p
              className="animate-hero-in mt-6 font-display text-2xl font-bold text-ink-foreground sm:text-3xl md:text-4xl"
              style={{ animationDelay: "350ms" }}
            >
              {site.slogan}
            </p>
            <p
              className="animate-hero-in mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
              style={{ animationDelay: "450ms" }}
            >
              {site.intro}
            </p>
            <div
              className="animate-hero-in mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "550ms" }}
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/kontakt">
                  Jetzt Angebot anfragen <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/leistungen">Unsere Leistungen</Link>
              </Button>
            </div>
          </div>
        </div>

        <a
          href="#leistungen-start"
          aria-label="Nach unten scrollen"
          className="absolute bottom-8 right-8 hidden h-12 w-12 items-center justify-center rounded-full border border-ink-foreground/30 text-ink-foreground transition-colors hover:bg-ink-foreground/10 md:inline-flex"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      <div id="leistungen-start" className="scroll-mt-16">
        <ServicesGrid />
      </div>
      <AboutBlock />
      <WhyGrid />
      <BeforeAfterSection showLink />
      <PricingNote />
      <CtaBand />
    </>
  );
}
