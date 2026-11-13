import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/nachher-hof.jpg";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { BeforeAfterSection, GallerySection } from "@/components/site/WorksSection";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/arbeiten")({
  head: () => ({
    meta: pageMeta(
      "Unsere Arbeiten – Galerie & Vorher-Nachher | Clean Crew",
      "Eindrücke unserer Arbeit: Hofreinigung, Laubentfernung, Rasenpflege und Autowäsche im Vorher-Nachher-Vergleich.",
    ),
  }),
  component: ArbeitenPage,
});

function ArbeitenPage() {
  return (
    <>
      <PageHero
        eyebrow="Unsere Arbeiten"
        title="Sauberkeit, die man sieht."
        text="Vorher, nachher und alles dazwischen – ein Blick auf das, was wir tun."
        image={heroImg}
      />
      <BeforeAfterSection />
      <GallerySection />
      <CtaBand />
    </>
  );
}
