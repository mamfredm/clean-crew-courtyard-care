import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      ...pageMeta("Impressum | Clean Crew", "Impressum und Anbieterkennzeichnung von Clean Crew."),
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <div>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p className="mt-3">
          <strong>Clean Crew</strong>
          <br />
          [Vor- und Nachname der Inhaber]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
        </p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p className="mt-3">
          Telefon: [Telefonnummer]
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>
      </div>
      <div>
        <h2>Umsatzsteuer</h2>
        <p className="mt-3">[Umsatzsteuer-ID oder Hinweis auf Kleinunternehmerregelung nach § 19 UStG]</p>
      </div>
      <div>
        <h2>Verantwortlich für den Inhalt</h2>
        <p className="mt-3">[Name, Anschrift]</p>
      </div>
    </LegalPage>
  );
}
