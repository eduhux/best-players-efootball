"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { getIcon } from "./iconMap";
import trofeus from "@/data/trofeus.json";

function iniciais(nome: string) {
  return nome.slice(0, 2).toUpperCase();
}

export default function Trofeus() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section id="trofeus" className="section-pad">
      <SectionTitle kicker="Linha do Tempo" title="Troféus e Histórico" accent="gold" />

      <div className="mx-auto max-w-3xl space-y-3">
        {trofeus.competicoes.map((comp, i) => {
          const Icon = getIcon(comp.icone);
          const aberta = aberto === i;
          const totalTitulos = comp.conquistas.reduce((a, x) => a + x.titulos, 0);

          return (
            <motion.div
              key={comp.competicao}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="glass overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setAberto(aberta ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/30">
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-white">
                    {comp.competicao}
                  </h3>
                  <span className="font-body text-xs text-white/40">
                    {totalTitulos} títulos · {comp.conquistas.length} campeões
                  </span>
                </div>
                <motion.div animate={{ rotate: aberta ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="text-gold" size={20} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {aberta && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 border-t border-white/10 px-5 py-4">
                      {comp.conquistas
                        .slice()
                        .sort((a, b) => b.titulos - a.titulos)
                        .map((c) => (
                          <div
                            key={c.jogador + c.clube}
                            className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-neon/20">
                              <span className="font-heading text-xs font-semibold text-white">
                                {iniciais(c.jogador)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="block font-heading text-sm font-medium text-white">
                                {c.jogador}
                              </span>
                              <span className="block font-body text-xs text-white/40">
                                {c.clube}
                              </span>
                            </div>
                            <span className="rounded-full bg-gold/10 px-3 py-1 font-heading text-sm font-semibold text-gold ring-1 ring-gold/20">
                              {c.titulos}x
                            </span>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
