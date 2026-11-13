import { Brush, CarFront, Leaf, Sprout } from "lucide-react";
import type { Service } from "@/data/services";

const map = { brush: Brush, leaf: Leaf, sprout: Sprout, car: CarFront };

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} aria-hidden="true" />;
}
