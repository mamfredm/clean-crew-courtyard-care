/**
 * Zentrale Firmendaten von Clean Crew.
 * Tragt hier eure echten Kontaktdaten ein. Solange ein Wert `null` ist,
 * zeigt die Website einen Platzhalter. Sobald `phone` gesetzt ist,
 * erscheint automatisch der WhatsApp-Button.
 */
export const site = {
  name: "Clean Crew",
  slogan: "Wir bringen alles zum Glänzen!",
  intro:
    "Wir kümmern uns um Sauberkeit und gepflegte Außenbereiche. Ob Straßenreinigung, Gartenpflege oder Autowäsche – wir bringen alles zum Glänzen!",
  /** z. B. "+49 151 23456789" */
  phone: null as string | null,
  /** z. B. "kontakt@cleancrew.de" */
  email: null as string | null,
  /** z. B. "Musterstadt und Umgebung (ca. 15 km)" */
  area: null as string | null,
  placeholders: {
    phone: "Telefonnummer folgt",
    email: "E-Mail-Adresse folgt",
    area: "Einsatzgebiet folgt",
  },
} as const;

/** "+49 151 234" -> "49151234" für wa.me / tel: Links */
export function phoneDigits(phone: string) {
  return phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
}

export function whatsappUrl(phone: string, text = "Hallo Clean Crew, ich hätte gerne ein Angebot.") {
  return `https://wa.me/${phoneDigits(phone)}?text=${encodeURIComponent(text)}`;
}
