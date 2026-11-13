import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { beforeAfterItems, galleryItems, isSampleGallery } from "@/config/gallery";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "./BeforeAfter";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function BeforeAfterSection({ showLink = false }: { showLink?: boolean }) {
  const item = beforeAfterItems[0];
  if (!item) return null;
  return (
    <section className="section-y bg-background" aria-labelledby="vorher-nachher-titel">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Vorher – Nachher"
            title={<span id="vorher-nachher-titel">Der Unterschied ist sichtbar.</span>}
            text="Zieht den Regler nach links oder rechts und seht selbst, wie viel eine gründliche Reinigung ausmacht."
          />
          {showLink && (
            <Reveal delay={100}>
              <Link
                to="/arbeiten"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Zur Galerie <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          )}
        </div>
        <Reveal delay={120} className="lg:col-span-8">
          <BeforeAfter before={item.before} after={item.after} title={item.title} />
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{item.title}:</span> {item.description}
            {isSampleGallery && " (Beispielbild)"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section className="section-y bg-muted" aria-labelledby="galerie-titel">
      <div className="container-page">
        <SectionHeading
          eyebrow="Unsere Arbeiten"
          title={<span id="galerie-titel">Ein Blick auf unsere Arbeit.</span>}
          text={
            isSampleGallery
              ? "Hier zeigen wir bald Fotos unserer eigenen Aufträge. Die aktuellen Bilder sind Beispielbilder."
              : "Ein paar Eindrücke aus unseren bisherigen Aufträgen."
          }
        />
        <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-3">
          {galleryItems.map((g, i) => (
            <Reveal
              key={g.title + i}
              delay={(i % 3) * 90}
              className={cn(
                "group relative overflow-hidden rounded-3xl",
                i === 0 && "sm:col-span-2 sm:row-span-2",
              )}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="bg-hero-overlay pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="eyebrow text-accent">{g.category}</p>
                <p className="mt-1 font-display text-lg font-bold text-ink-foreground">{g.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
