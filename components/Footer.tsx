"use client";

import { Instagram, Youtube, MessageCircle, Twitch } from "lucide-react";

const redes = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitch, label: "Twitch", href: "#" },
  { icon: MessageCircle, label: "Comunidade", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-base-900/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <div className="leading-none">
              <span className="block font-display text-xl tracking-wider text-white">
                BEST PLAYERS
              </span>
              <span className="block font-heading text-[10px] uppercase tracking-[0.35em] text-gold">
                in eFootball
              </span>
            </div>
          </div>

          <p className="max-w-md font-body text-sm text-white/50">
            Competição, rivalidade e história dentro do eFootball Mobile.
          </p>

          {/* Redes sociais */}
          <div className="flex gap-3">
            {redes.map((r) => (
              <a
                key={r.label}
                href={r.href}
                aria-label={r.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:scale-110 hover:border-gold/40 hover:text-gold"
              >
                <r.icon size={18} />
              </a>
            ))}
          </div>

          <div className="mt-4 h-px w-full max-w-xs bg-white/10" />

          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Best Players in eFootball. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
