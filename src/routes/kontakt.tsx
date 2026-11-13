import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/service-hofreinigung.jpg";
import { ContactForm } from "@/components/site/ContactForm";
import { ContactInfo } from "@/components/site/ContactInfo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: pageMeta(
      "Kontakt – Angebot anfragen | Clean Crew",
      "Fragt jetzt euer unverbindliches Angebot bei Clean Crew an – für Hofreinigung, Laubentfernung, Rasenpflege oder Autowäsche.",
    ),
  }),
  component: KontaktPage,
});

function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Jetzt Angebot anfragen."
        text="Erzählt uns kurz, was ihr braucht – wir melden uns mit einem unverbindlichen und fairen Angebot."
        image={heroImg}
      />
      <section className="section-y bg-muted">
        <div className="container-page grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <ContactForm />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <ContactInfo />
          </Reveal>
        </div>
      </section>
    </>
  );
}
