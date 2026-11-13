import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 font-display text-2xl font-bold leading-tight">{site.slogan}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            Euer junges Team für saubere Wege, gepflegte Gärten und glänzende Autos.
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="eyebrow text-accent">Leistungen</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  to="/leistungen"
                  hash={s.id}
                  className="text-ink-muted transition-colors hover:text-ink-foreground"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="eyebrow text-accent">Kontakt</h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-muted">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {site.phone ? (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-ink-foreground">
                  {site.phone}
                </a>
              ) : (
                <span>{site.placeholders.phone}</span>
              )}
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {site.email ? (
                <a href={`mailto:${site.email}`} className="hover:text-ink-foreground">
                  {site.email}
                </a>
              ) : (
                <span>{site.placeholders.email}</span>
              )}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{site.area ?? site.placeholders.area}</span>
            </li>
          </ul>
          <Link
            to="/kontakt"
            className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Zum Kontaktformular →
          </Link>
        </div>

        <div className="md:col-span-2">
          <h3 className="eyebrow text-accent">Rechtliches</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/impressum" className="text-ink-muted hover:text-ink-foreground">
                Impressum
              </Link>
            </li>
            <li>
              <Link to="/datenschutz" className="text-ink-muted hover:text-ink-foreground">
                Datenschutzerklärung
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Clean Crew. Alle Rechte vorbehalten.</p>
          <p>Straßenreinigung · Gartenpflege · Autowäsche</p>
        </div>
      </div>
    </footer>
  );
}
