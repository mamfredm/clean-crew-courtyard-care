import { MoveHorizontal } from "lucide-react";
import { useId, useState } from "react";

export function BeforeAfter({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className="relative aspect-[3/2] w-full select-none overflow-hidden rounded-[2rem] bg-muted shadow-lift">
      <img
        src={after}
        alt={`${title} – nachher`}
        loading="lazy"
        width={1408}
        height={944}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src={before}
        alt={`${title} – vorher`}
        loading="lazy"
        width={1408}
        height={944}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-foreground backdrop-blur">
        Vorher
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
        Nachher
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-ink-foreground"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-foreground text-ink shadow-lift">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Vorher-Nachher-Regler für {title}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
