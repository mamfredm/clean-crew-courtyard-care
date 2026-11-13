import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, MessageSquareText, Sparkles } from "lucide-react";
import heroImg from "@/assets/service-autowaesche.jpg";
import { PageHero } from "@/components/site/PageHero";
import { PricingNote } from "@/components/site/PricingNote";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/preise")({
  head: () => ({
    meta: pageMeta(
      "Preise & Angebote – unverbindlich anfragen | Clean Crew",
      "Jeder Auftrag ist individuell. Kontaktiert Clean Crew für ein unverbindliches und faires Angebot.",
    ),
  }),
  component: PreisePage,
});

const steps = [
  {
    icon: MessageSquareText,
    title: "Anfrage senden",
    text: "Erzählt uns über das Formular, was erledigt werden soll und wo.",
  },
  {
    icon: ClipboardList,
    title: "Angebot erhalten",
    text: "Wir melden uns bei euch mit einem individuellen, fairen Angebot.",
  },
  {
    icon: Sparkles,
    title: "Wir legen los",
    text: "Passt alles, kümmern wir uns um den Rest – bis alles glänzt.",
  },
];

function PreisePage() {
  return (
    <>
      <PageHero
        eyebrow="Preise & Angebote"
        title="Faire Preise. Individuell für euren Auftrag."
        text="Keine Pauschalen von der Stange – ihr bekommt ein Angebot, das zu eurem Auftrag passt."
        image={heroImg}
      />
      <section className="section-y bg-background">
        <div className="container-page">
          <SectionHeading eyebrow="So funktioniert's" title="In drei Schritten zum Angebot." align="center" />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100}>
                <div className="relative h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
                  <span className="absolute right-6 top-5 font-display text-6xl font-extrabold text-secondary">
                    {i + 1}
                  </span>
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <PricingNote />
    </>
  );
}
