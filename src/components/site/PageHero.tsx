import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-32 md:pb-24 md:pt-44">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="animate-slow-zoom absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
          width={1920}
          height={1088}
        />
      )}
      <div className="bg-forest-gradient absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-accent">
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.02] text-ink-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}
