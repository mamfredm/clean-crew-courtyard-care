import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/team.jpg";
import { AboutBlock } from "@/components/site/AboutBlock";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { WhyGrid } from "@/components/site/WhyGrid";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: pageMeta(
      "Über uns – das junge Zweierteam | Clean Crew",
      "Wir sind Clean Crew – ein motiviertes Zweierteam, das Wert auf Zuverlässigkeit, Sorgfalt und saubere Arbeit legt.",
    ),
  }),
  component: UeberUnsPage,
});

function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Zwei Leute. Ein Ziel: glänzende Ergebnisse."
        text="Wir nehmen euch die Arbeit ab – zuverlässig, sorgfältig und mit Freude an sauberen Ergebnissen."
        image={heroImg}
      />
      <AboutBlock showLink={false} />
      <WhyGrid />
      <CtaBand />
    </>
  );
}
