import { CalendarClock, HandCoins, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Zuverlässig",
    text: "Was wir vereinbaren, halten wir ein – pünktlich und verbindlich.",
  },
  {
    icon: Sparkles,
    title: "Sorgfältig",
    text: "Wir arbeiten gründlich und achten auf jedes Detail.",
  },
  {
    icon: CalendarClock,
    title: "Flexibel",
    text: "Einmalig oder regelmäßig – wir richten uns nach euren Wünschen.",
  },
  {
    icon: HandCoins,
    title: "Faire Preise",
    text: "Individuelle, faire Angebote – abgestimmt auf euren Auftrag.",
  },
];

export function WhyGrid() {
  return (
    <section className="section-y bg-forest-gradient grain relative overflow-hidden" aria-labelledby="warum-titel">
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="Warum Clean Crew?"
          title={<span id="warum-titel">Darauf könnt ihr euch verlassen.</span>}
          tone="inverse"
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 90}>
              <div className="group h-full rounded-3xl border border-ink-border bg-ink-foreground/5 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-ink-foreground/10">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <r.icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-ink-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
