import hofImg from "@/assets/service-hofreinigung.jpg";
import laubImg from "@/assets/service-laub.jpg";
import rasenImg from "@/assets/service-rasen.jpg";
import autoImg from "@/assets/service-autowaesche.jpg";

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  points: string[];
  image: string;
  icon: "brush" | "leaf" | "sprout" | "car";
};

export const services: Service[] = [
  {
    id: "hofreinigung",
    title: "Straßen- und Hofreinigung",
    short: "Saubere Wege, Einfahrten und Höfe – gründlich und ordentlich.",
    description:
      "Wir sorgen dafür, dass Gehwege, Einfahrten und Höfe sauber und gepflegt aussehen – damit ihr euch um andere Dinge kümmern könnt.",
    points: ["Gehwege kehren", "Einfahrten reinigen", "Höfe sauber halten"],
    image: hofImg,
    icon: "brush",
  },
  {
    id: "laubentfernung",
    title: "Laubentfernung",
    short: "Wir befreien Grundstücke und Gärten zuverlässig von Laub.",
    description:
      "Gerade im Herbst wird Laub schnell zur Last. Wir rechen zusammen, räumen auf und halten eure Flächen frei.",
    points: ["Laub zusammenrechen", "Grundstücke von Laub befreien", "Gartenflächen pflegen"],
    image: laubImg,
    icon: "leaf",
  },
  {
    id: "rasenpflege",
    title: "Rasenpflege",
    short: "Gepflegter Rasen mit sauberen Kanten – Woche für Woche.",
    description:
      "Ein gepflegter Rasen macht jedes Grundstück schöner. Wir mähen, pflegen die Kanten und halten Grünflächen ordentlich.",
    points: ["Rasen mähen", "Rasenkanten pflegen", "Grünflächen ordentlich halten"],
    image: rasenImg,
    icon: "sprout",
  },
  {
    id: "autowaesche",
    title: "Autowäsche",
    short: "Sorgfältige Handwäsche für glänzende Fahrzeuge.",
    description:
      "Wir waschen euer Fahrzeug von Hand – mit Liebe zum Detail, von der Karosserie bis zu den Felgen.",
    points: ["Außenreinigung", "Felgenreinigung", "Fahrzeugpflege"],
    image: autoImg,
    icon: "car",
  },
];

export const serviceOptions = [...services.map((s) => s.title), "Mehrere / Sonstiges"] as const;
