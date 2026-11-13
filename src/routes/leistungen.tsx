import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/service-rasen.jpg";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { PricingNote } from "@/components/site/PricingNote";
import { ServicesDetail } from "@/components/site/ServicesDetail";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: pageMeta(
      "Leistungen – Hofreinigung, Laub, Rasen & Autowäsche | Clean Crew",
      "Straßen- und Hofreinigung, Laubentfernung, Rasenpflege und Autowäsche von Clean Crew. Gründlich, zuverlässig und zu fairen Preisen.",
    ),
  }),
  component: LeistungenPage,
});

function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Unsere Dienstleistungen"
        title="Saubere Arbeit für Hof, Garten und Auto."
        text="Ob einmalig oder regelmäßig – wir übernehmen die Arbeit, ihr genießt das Ergebnis."
        image={heroImg}
      />
      <ServicesDetail />
      <PricingNote />
      <CtaBand />
    </>
  );
}
