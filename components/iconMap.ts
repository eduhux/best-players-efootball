import {
  Trophy,
  Medal,
  Star,
  Award,
  Globe,
  Flag,
  Crown,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapa de ícones usados nos dados (campeonatos / troféus).
 * Os JSON guardam só o nome em texto; aqui resolvemos o componente.
 */
export const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Medal,
  Star,
  Award,
  Globe,
  Flag,
  Crown,
  Shield,
  Sparkles,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Trophy;
}
