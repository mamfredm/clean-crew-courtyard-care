import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("h-9 w-9", className)}>
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path
        d="M27.5 14.2a9 9 0 1 0 0 11.6"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-primary-foreground"
      />
      <path
        d="M30 6.5l1.3 3.2 3.2 1.3-3.2 1.3L30 15.5l-1.3-3.2-3.2-1.3 3.2-1.3z"
        className="fill-accent animate-shine origin-[30px_11px]"
      />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-lg font-extrabold leading-none tracking-tight",
          tone === "light" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        CLEAN <span className="text-accent">CREW</span>
      </span>
    </span>
  );
}
