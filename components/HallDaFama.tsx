"use client";

import { motion } from "framer-motion";
import { Crown, Trophy } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ranking from "@/data/ranking.json";

const destaquesNomes = ["Daniel", "Carlos", "David", "Davi"];
const maxTitulos = Math.max(...ranking.jogadores.map((j) => j.titulos));

const destaques = destaquesNomes
  .map((nome) => ranking.jogadores.find((j) => j.nome === nome))
  .filter((j): j is { posicao: number; nome: string; titulos: number } => Boolean(j));

function iniciais(nome: string) {
  return nome.slice(0, 2).toUpperCase();
}

export default function HallDaFama() {
  return (
    <section id="hall-da-fama" className="relative section-pad">
      {/* Brilho de fundo */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-64 max-w-3xl rounded-full bg-gold/5 blur-[120px]" />

      <SectionTitle kicker="Os Imortais do Grupo" title="Hall da Fama" accent="gold" />

      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destaques.map((j, i) => (
          <motion.div
            key={j.nome}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-strong group relative overflow-hidden rounded-3xl p-6 text-center ring-1 ring-gold/20 transition-all hover:ring-gold/50 hover:shadow-gold"
          >
            {/* Faixa shimmer no topo */}
            <div className="shimmer-gold absolute inset-x-0 top-0 h-1" />

            <div className="relative mx-auto mb-4 mt-3 inline-flex">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 via-base-700 to-neon/20 ring-2 ring-gold/40">
                <span className="font-display text-3xl text-white">{iniciais(j.nome)}</span>
              </div>
              <Crown
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-gold champion-glow"
                size={26}
              />
            </div>

            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
              {j.nome}
            </h3>
            <span className="font-body text-xs uppercase tracking-widest text-gold">
              {j.posicao}º no ranking geral
            </span>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Trophy size={18} className="text-gold" />
              <span className="font-display text-3xl text-gradient-gold">{j.titulos}</span>
              <span className="font-body text-xs uppercase text-white/50">títulos</span>
            </div>

            {/* Barra de evolução */}
            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(j.titulos / maxTitulos) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
                />
              </div>
              <span className="mt-2 block font-body text-[10px] uppercase tracking-wider text-white/40">
                {Math.round((j.titulos / maxTitulos) * 100)}% do líder histórico
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
