"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Award } from "lucide-react";
import Particles from "./Particles";
import AnimatedCounter from "./AnimatedCounter";
import ranking from "@/data/ranking.json";
import campeonatos from "@/data/campeonatos.json";

const totalTitulos = ranking.jogadores.reduce((acc, j) => acc + j.titulos, 0);
const totalJogadores = ranking.jogadores.length;
const totalCampeonatos = campeonatos.campeonatos.length;

const stats = [
  { icon: Trophy, value: totalTitulos, label: "Títulos disputados" },
  { icon: Users, value: totalJogadores, label: "Jogadores na história" },
  { icon: Award, value: totalCampeonatos, label: "Competições oficiais" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-pitch-grid pt-24"
    >
      <Particles />

      {/* Bola digital flutuante decorativa */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[8%] top-[22%] hidden lg:block"
      >
        <div className="relative h-44 w-44">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-gold/40" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neon/25 to-gold/25 blur-2xl" />
          <div className="absolute inset-8 flex items-center justify-center rounded-full border border-white/15 bg-base-800/70 backdrop-blur-md">
            <span className="text-6xl">⚽</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8"
      >
        <motion.span
          variants={item}
          className="mb-6 inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 font-heading text-xs uppercase tracking-[0.35em] text-gold"
        >
          ⚡ Painel Oficial do Grupo
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-6xl leading-[0.95] tracking-wide text-white sm:text-7xl md:text-8xl"
        >
          BEST PLAYERS
          <br />
          <span className="text-gradient-gold champion-glow">IN EFOOTBALL</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl font-body text-lg text-white/70"
        >
          O maior grupo competitivo de eFootball Mobile.
        </motion.p>

        {/* Botões */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#ranking"
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gold-deep via-gold to-gold-soft px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-base-900 shadow-gold transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Ver Ranking
          </a>
          <a
            href="#campeonatos"
            className="group w-full rounded-xl border border-neon/40 bg-neon/5 px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-neon backdrop-blur-sm transition-all hover:bg-neon/10 hover:shadow-neon sm:w-auto"
          >
            Ver Campeonatos
          </a>
        </motion.div>

        {/* Estatísticas rápidas com contador animado */}
        <motion.div
          variants={item}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-3 sm:gap-6"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl px-3 py-5 text-center transition-colors hover:border-gold/30"
            >
              <s.icon className="mx-auto mb-2 text-gold" size={22} />
              <AnimatedCounter
                value={s.value}
                className="block font-display text-4xl text-white sm:text-5xl"
              />
              <span className="mt-1 block font-body text-[11px] uppercase tracking-wider text-white/50 sm:text-xs">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Degradê inferior para transição suave */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-900 to-transparent" />
    </section>
  );
}
