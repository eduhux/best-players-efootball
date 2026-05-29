"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import AnimatedCounter from "./AnimatedCounter";
import { getIcon } from "./iconMap";
import campeonatosData from "@/data/campeonatos.json";

export default function Campeonatos() {
  return (
    <section id="campeonatos" className="relative section-pad">
      <SectionTitle kicker="Competições Oficiais" title="Campeonatos" accent="neon" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {campeonatosData.campeonatos.map((c, i) => {
          const Icon = getIcon(c.icone);
          const isGold = c.cor === "gold";
          return (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className={`glass group relative overflow-hidden rounded-2xl p-6 transition-colors ${
                isGold ? "hover:border-gold/40" : "hover:border-neon/40"
              }`}
            >
              {/* Brilho de fundo no hover */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                  isGold ? "bg-gold/20" : "bg-neon/20"
                }`}
              />

              <div className="relative flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                    isGold
                      ? "bg-gold/10 text-gold ring-1 ring-gold/30"
                      : "bg-neon/10 text-neon ring-1 ring-neon/30"
                  }`}
                >
                  <Icon size={26} />
                </div>
                <div className="text-right">
                  <AnimatedCounter
                    value={c.edicoes}
                    className={`block font-display text-3xl ${
                      isGold ? "text-gradient-gold" : "text-gradient-neon"
                    }`}
                  />
                  <span className="font-body text-[10px] uppercase tracking-wider text-white/40">
                    edições
                  </span>
                </div>
              </div>

              <h3 className="relative mt-5 font-heading text-xl font-bold uppercase tracking-wide text-white">
                {c.nome}
              </h3>
              <p className="relative mt-2 font-body text-sm leading-relaxed text-white/60">
                {c.descricao}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
