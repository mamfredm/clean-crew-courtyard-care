import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export const navItems = [
  { to: "/leistungen", label: "Leistungen" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/arbeiten", label: "Arbeiten" },
  { to: "/preise", label: "Preise" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-border bg-ink/85 py-3 backdrop-blur-xl"
          : "bg-transparent py-5",
      )}
    >
      <div className="container-page flex items-center justify-between gap-6">
        <Link to="/" aria-label="Clean Crew – Startseite" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-foreground/80 transition-colors hover:text-ink-foreground"
              activeProps={{ className: "!text-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="default" className="hidden sm:inline-flex">
            <Link to="/kontakt">
              Angebot anfragen <ArrowRight />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="heroOutline"
                size="icon"
                className="lg:hidden"
                aria-label="Menü öffnen"
              >
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] border-ink-border bg-ink p-0 text-ink-foreground">
              <SheetTitle className="sr-only">Menü</SheetTitle>
              <div className="flex h-full flex-col p-6">
                <Logo />
                <nav aria-label="Mobile Navigation" className="mt-10 flex flex-col">
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="border-b border-ink-border py-4 font-display text-2xl font-bold"
                    activeOptions={{ exact: true }}
                    activeProps={{ className: "text-accent" }}
                  >
                    Start
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="border-b border-ink-border py-4 font-display text-2xl font-bold"
                      activeProps={{ className: "text-accent" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild variant="hero" size="lg" className="mt-auto w-full">
                  <Link to="/kontakt" onClick={() => setOpen(false)}>
                    Jetzt Angebot anfragen <ArrowRight />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
