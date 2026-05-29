"use client";

import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import SectionTitle from "./SectionTitle";
import AnimatedCounter from "./AnimatedCounter";
import rankingData from "@/data/ranking.json";

// Garante ordenação por títulos (desc), independente do JSON
const jogadores = [...rankingData.jogadores]
  .sort((a, b) => b.titulos - a.titulos)
  .map((j, i) => ({ ...j, posicao: i + 1 }));

// Gera iniciais para o avatar fictício
function iniciais(nome: string) {
  const parts = nome.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Cor de fundo do avatar baseada no nome (determinística)
function avatarBg(nome: string) {
  const cores = [
    "from-neon/40 to-neon-blue/40",
    "from-gold/40 to-gold-deep/40",
    "from-emerald-400/40 to-teal-500/40",
    "from-rose-400/40 to-red-500/40",
    "from-violet-400/40 to-indigo-500/40",
    "from-amber-400/40 to-orange-500/40",
  ];
  const sum = nome.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return cores[sum % cores.length];
}

const podiumStyle = [
  { ring: "ring-gold", glow: "shadow-gold", label: "text-gold", order: "md:order-2 md:-mt-8" },
  { ring: "ring-slate-300", glow: "", label: "text-slate-300", order: "md:order-1" },
  { ring: "ring-amber-700", glow: "", label: "text-amber-600", order: "md:order-3" },
];

export default function Ranking() {
  const top3 = jogadores.slice(0, 3);
  const resto = jogadores.slice(3);

  return (
    <section id="ranking" className="section-pad">
      <SectionTitle kicker="Classificação Geral" title="Ranking Histórico" accent="gold" />

      {/* Pódio TOP 3 */}
      <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end">
        {top3.map((j, i) => {
          const s = podiumStyle[i];
          return (
            <motion.div
              key={j.nome}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-strong relative rounded-3xl p-6 text-center ${s.order} ${
                i === 0 ? `ring-2 ${s.ring} ${s.glow}` : `ring-1 ${s.ring}`
              }`}
            >
              {i === 0 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Trophy className="text-gold champion-glow" size={32} />
                </div>
              )}
              <div
                className={`mx-auto mb-4 mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${avatarBg(
                  j.nome
                )} ring-2 ${s.ring}`}
              >
                <span className="font-display text-2xl text-white">{iniciais(j.nome)}</span>
              </div>
              <span className={`font-heading text-sm uppercase tracking-widest ${s.label}`}>
                {j.posicao}º Lugar
              </span>
              <h3 className="mt-1 font-heading text-2xl font-bold text-white">{j.nome}</h3>
              <div className="mt-3 flex items-center justify-center gap-2">
                <AnimatedCounter
                  value={j.titulos}
                  className="font-display text-4xl text-gradient-gold"
                />
                <span className="font-body text-xs uppercase tracking-wider text-white/50">
                  títulos
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lista restante */}
      <div className="space-y-3">
        {resto.map((j, i) => (
          <motion.div
            key={j.nome}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors hover:border-gold/30"
          >
            <span className="w-8 text-center font-display text-2xl text-white/40">
              {j.posicao}
            </span>
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarBg(
                j.nome
              )}`}
            >
              <span className="font-heading text-sm font-semibold text-white">
                {iniciais(j.nome)}
              </span>
            </div>
            <span className="flex-1 font-heading text-lg font-medium text-white">{j.nome}</span>
            <div className="flex items-center gap-2">
              <Medal size={16} className="text-gold/70" />
              <span className="font-display text-2xl text-white">{j.titulos}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
