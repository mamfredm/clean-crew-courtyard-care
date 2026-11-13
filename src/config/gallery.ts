/**
 * Bildergalerie "Unsere Arbeiten".
 * So tauscht ihr Bilder aus:
 * 1. Eigenes Foto in den Ordner src/assets legen (z. B. auftrag-1.jpg)
 * 2. Oben importieren:  import auftrag1 from "@/assets/auftrag-1.jpg";
 * 3. Unten in `galleryItems` einen Eintrag ergänzen oder ersetzen.
 * Sobald echte Fotos drin sind, `isSampleGallery` auf false setzen.
 */
import hof from "@/assets/service-hofreinigung.jpg";
import laub from "@/assets/service-laub.jpg";
import rasen from "@/assets/service-rasen.jpg";
import auto from "@/assets/service-autowaesche.jpg";
import einfahrt from "@/assets/hero.jpg";
import vorher from "@/assets/vorher-hof.jpg";
import nachher from "@/assets/nachher-hof.jpg";

export type GalleryItem = { src: string; alt: string; title: string; category: string };

/** true = es werden noch Beispielbilder gezeigt (Hinweis wird eingeblendet). */
export const isSampleGallery = true;

export const galleryItems: GalleryItem[] = [
  { src: einfahrt, alt: "Frisch gereinigte Einfahrt vor einem Haus", title: "Einfahrt gereinigt", category: "Hofreinigung" },
  { src: rasen, alt: "Frisch gemähter Rasen mit sauberen Kanten", title: "Rasen gemäht", category: "Rasenpflege" },
  { src: laub, alt: "Laub wird auf einem Rasen zusammengerecht", title: "Laub entfernt", category: "Laubentfernung" },
  { src: auto, alt: "Handwäsche eines dunklen Autos mit Felgenreinigung", title: "Auto gewaschen", category: "Autowäsche" },
  { src: hof, alt: "Gehweg wird mit einem Besen gekehrt", title: "Gehweg gekehrt", category: "Hofreinigung" },
  { src: nachher, alt: "Sauberer gepflasterter Hof nach der Reinigung", title: "Hof sauber", category: "Hofreinigung" },
];

/** Vorher-Nachher-Vergleiche. Gleicher Bildausschnitt ergibt den besten Effekt. */
export const beforeAfterItems = [
  {
    before: vorher,
    after: nachher,
    title: "Hofreinigung",
    description: "Laub, Moos und Schmutz entfernt – der Hof wirkt wieder gepflegt.",
  },
];
