import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serviceOptions } from "@/data/services";
import { contactSchema } from "@/lib/contact-schema";
import { submitContact } from "@/lib/contact.functions";
import { cn } from "@/lib/utils";

type Field = "name" | "contact" | "service" | "location" | "message";
const empty = { name: "", contact: "", service: "", location: "", message: "", website: "" };

export function ContactForm() {
  const send = useServerFn(submitContact);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (k: keyof typeof empty) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as Field]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as Field;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) {
        setStatus("sent");
        setValues(empty);
      } else {
        setStatus("error");
        setServerError(res.error);
      }
    } catch {
      setStatus("error");
      setServerError("Die Anfrage konnte gerade nicht gesendet werden.");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-10"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-3xl font-bold">Danke für eure Anfrage!</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Eure Nachricht ist bei uns angekommen. Wir melden uns bei euch.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Weitere Anfrage senden
        </Button>
      </div>
    );
  }

  const fieldCls = (k: Field) =>
    cn("h-12 rounded-xl bg-background", errors[k] && "border-destructive focus-visible:ring-destructive");

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-10"
    >
      <h2 className="text-2xl font-bold sm:text-3xl">Angebot anfragen</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Kostenlos und unverbindlich. Felder mit * sind Pflichtfelder.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <FieldWrap id="cf-name" label="Name *" error={errors.name}>
          <Input
            id="cf-name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            className={fieldCls("name")}
            aria-invalid={!!errors.name}
            maxLength={100}
          />
        </FieldWrap>
        <FieldWrap id="cf-contact" label="Telefonnummer oder E-Mail *" error={errors.contact}>
          <Input
            id="cf-contact"
            autoComplete="email"
            value={values.contact}
            onChange={(e) => set("contact")(e.target.value)}
            className={fieldCls("contact")}
            aria-invalid={!!errors.contact}
            maxLength={255}
          />
        </FieldWrap>
        <FieldWrap id="cf-service" label="Gewünschte Dienstleistung *" error={errors.service}>
          <select
            id="cf-service"
            value={values.service}
            onChange={(e) => set("service")(e.target.value)}
            aria-invalid={!!errors.service}
            className={cn(
              "flex w-full border border-input px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              fieldCls("service"),
              !values.service && "text-muted-foreground",
            )}
          >
            <option value="" disabled>
              Bitte auswählen
            </option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </FieldWrap>
        <FieldWrap id="cf-location" label="Einsatzort *" error={errors.location}>
          <Input
            id="cf-location"
            placeholder="Straße, PLZ, Ort"
            autoComplete="street-address"
            value={values.location}
            onChange={(e) => set("location")(e.target.value)}
            className={fieldCls("location")}
            aria-invalid={!!errors.location}
            maxLength={200}
          />
        </FieldWrap>
        <FieldWrap id="cf-message" label="Nachricht" error={errors.message} className="sm:col-span-2">
          <Textarea
            id="cf-message"
            rows={5}
            placeholder="Was dürfen wir für euch erledigen? Größe der Fläche, Wunschtermin, Besonderheiten …"
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            className={cn("rounded-xl bg-background", errors.message && "border-destructive")}
            maxLength={2000}
          />
        </FieldWrap>
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-website">Website</label>
          <input
            id="cf-website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set("website")(e.target.value)}
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverError} Bitte versucht es gleich noch einmal.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-xs">
          Mit dem Absenden stimmt ihr der Verarbeitung eurer Angaben zur Bearbeitung der Anfrage zu.
          Mehr in der{" "}
          <Link to="/datenschutz" className="underline hover:text-foreground">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <Button type="submit" variant="hero" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" /> Wird gesendet …
            </>
          ) : (
            <>
              Anfrage senden <Send />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function FieldWrap({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
