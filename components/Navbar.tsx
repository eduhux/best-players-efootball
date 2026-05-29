"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Ranking", href: "#ranking" },
  { label: "Campeonatos", href: "#campeonatos" },
  { label: "Hall da Fama", href: "#hall-da-fama" },
  { label: "Estatísticas", href: "#estatisticas" },
  { label: "Regras", href: "#regras" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-base-900/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2">
          <span className="text-2xl transition-transform group-hover:rotate-12">⚽</span>
          <div className="leading-none">
            <span className="block font-display text-xl tracking-wider text-white">
              BEST PLAYERS
            </span>
            <span className="block font-heading text-[10px] uppercase tracking-[0.35em] text-gold">
              in eFootball
            </span>
          </div>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-sm uppercase tracking-wider text-white/70 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botão mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/10 p-2 text-white md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-base-900/95 backdrop-blur-xl md:hidden"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 font-heading text-sm uppercase tracking-wider text-white/80 transition-colors hover:bg-white/5 hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
