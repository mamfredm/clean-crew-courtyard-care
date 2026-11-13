import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      ...pageMeta(
        "Datenschutzerklärung | Clean Crew",
        "Informationen zur Verarbeitung personenbezogener Daten auf der Website von Clean Crew.",
      ),
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <div>
        <h2>1. Verantwortliche Stelle</h2>
        <p className="mt-3">
          Clean Crew, [Vor- und Nachname], [Straße Hausnummer], [PLZ Ort], E-Mail: [E-Mail-Adresse]
        </p>
      </div>
      <div>
        <h2>2. Kontaktformular</h2>
        <p className="mt-3">
          Wenn ihr uns über das Kontaktformular eine Anfrage sendet, speichern wir eure Angaben
          (Name, Telefonnummer oder E-Mail-Adresse, gewünschte Dienstleistung, Einsatzort und
          Nachricht), um eure Anfrage zu bearbeiten und euch ein Angebot zu erstellen.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden gelöscht, sobald sie
          für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen
          Aufbewahrungspflichten bestehen.
        </p>
      </div>
      <div>
        <h2>3. Hosting</h2>
        <p className="mt-3">
          [Angaben zum Hosting-Anbieter und zur Verarbeitung von Server-Logfiles]
        </p>
      </div>
      <div>
        <h2>4. Schriftarten</h2>
        <p className="mt-3">
          Diese Website nutzt Schriftarten von Google Fonts. Beim Aufruf der Seite wird eine
          Verbindung zu Servern von Google hergestellt. [Rechtliche Bewertung bzw. Hinweis ergänzen]
        </p>
      </div>
      <div>
        <h2>5. WhatsApp</h2>
        <p className="mt-3">
          Wenn ihr uns über den WhatsApp-Button kontaktiert, gelten die Datenschutzbestimmungen von
          WhatsApp. [Hinweis ergänzen]
        </p>
      </div>
      <div>
        <h2>6. Eure Rechte</h2>
        <p className="mt-3">
          Ihr habt jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Außerdem könnt ihr euch bei einer
          Datenschutz-Aufsichtsbehörde beschweren.
        </p>
      </div>
    </LegalPage>
  );
}
