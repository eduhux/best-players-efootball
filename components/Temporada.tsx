"use client";

import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import SectionTitle from "./SectionTitle";
import premios from "@/data/premios.json";

const melhor = [...premios.melhorJogador].sort((a, b) => b.quantidade - a.quantidade);
const puskas = [...premios.puskas].sort((a, b) => b.quantidade - a.quantidade);

function Card({
  nome,
  quantidade,
  index,
  accent,
  unidade,
}: {
  nome: string;
  quantidade: number;
  index: number;
  accent: "gold" | "neon";
  unidade: string;
}) {
  const isGold = accent === "gold";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className={`glass group relative overflow-hidden rounded-2xl p-5 text-center transition-colors ${
        isGold ? "hover:border-gold/40" : "hover:border-neon/40"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 -top-8 mx-auto h-16 w-16 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100 ${
          isGold ? "bg-gold/30" : "bg-neon/30"
        }`}
      />
      <span
        className={`font-display text-5xl ${
          isGold ? "text-gradient-gold" : "text-gradient-neon"
        }`}
      >
        {quantidade}
      </span>
      <span className="mb-2 block font-body text-[10px] uppercase tracking-widest text-white/40">
        {unidade}
      </span>
      <h4 className="font-heading text-lg font-semibold uppercase tracking-wide text-white">
        {nome}
      </h4>
    </motion.div>
  );
}

export default function Temporada() {
  return (
    <section className="section-pad">
      {/* Melhor Jogador da Temporada */}
      <SectionTitle
        kicker="Reconhecimento Individual"
        title="Melhor Jogador da Temporada"
        accent="gold"
      />
      <div className="mb-20 flex flex-wrap justify-center gap-4">
        <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {melhor.map((m, i) => (
            <Card
              key={m.nome}
              nome={m.nome}
              quantidade={m.quantidade}
              index={i}
              accent="gold"
              unidade="prêmios"
            />
          ))}
        </div>
      </div>

      {/* Prêmio Puskás */}
      <div className="mb-12 flex items-center justify-center gap-3">
        <Zap className="text-neon" size={26} />
        <h3 className="font-heading text-3xl font-bold uppercase tracking-wide text-gradient-neon sm:text-4xl">
          Prêmio Puskás
        </h3>
        <Star className="text-gold" size={22} />
      </div>
      <p className="mx-auto mb-10 max-w-md text-center font-body text-sm text-white/50">
        Os autores dos gols mais bonitos da história do grupo.
      </p>
      <div className="flex justify-center">
        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {puskas.map((p, i) => (
            <Card
              key={p.nome}
              nome={p.nome}
              quantidade={p.quantidade}
              index={i}
              accent="neon"
              unidade="golaços"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
