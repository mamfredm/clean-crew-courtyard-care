import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";

export function ContactInfo() {
  const rows = [
    {
      icon: Phone,
      label: "Telefon",
      value: site.phone ?? site.placeholders.phone,
      href: site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : undefined,
    },
    {
      icon: Mail,
      label: "E-Mail",
      value: site.email ?? site.placeholders.email,
      href: site.email ? `mailto:${site.email}` : undefined,
    },
    { icon: MapPin, label: "Einsatzgebiet", value: site.area ?? site.placeholders.area },
  ];

  return (
    <div className="flex h-full flex-col rounded-[2rem] bg-forest-gradient p-8 text-forest-foreground sm:p-10">
      <h2 className="text-2xl font-bold">Direkter Kontakt</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Lieber direkt? Ihr erreicht uns auch so:
      </p>
      <ul className="mt-8 space-y-5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <r.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">{r.label}</p>
              {r.href ? (
                <a href={r.href} className="mt-0.5 block font-semibold hover:text-accent">
                  {r.value}
                </a>
              ) : (
                <p className="mt-0.5 font-semibold">{r.value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {site.phone && (
        <a
          href={whatsappUrl(site.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 font-semibold text-whatsapp-foreground transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> Per WhatsApp schreiben
        </a>
      )}
    </div>
  );
}
