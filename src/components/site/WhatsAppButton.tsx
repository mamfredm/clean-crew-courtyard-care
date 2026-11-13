import { MessageCircle } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";

/** Schwebender WhatsApp-Button – erscheint nur, wenn eine Telefonnummer hinterlegt ist. */
export function WhatsAppButton() {
  if (!site.phone) return null;
  return (
    <a
      href={whatsappUrl(site.phone)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Per WhatsApp schreiben"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-whatsapp px-5 font-semibold text-whatsapp-foreground shadow-lift transition-transform hover:-translate-y-0.5"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
