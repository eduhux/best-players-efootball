"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import SectionTitle from "./SectionTitle";
import regras from "@/data/regras.json";

export default function Regras() {
  return (
    <section id="regras" className="section-pad">
      <SectionTitle kicker="Conduta do Grupo" title="Regras Oficiais" accent="neon" />

      {/* Regras */}
      <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {regras.regras.map((r, i) => (
          <motion.div
            key={r.numero}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass flex gap-4 rounded-2xl p-5 transition-colors hover:border-neon/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon ring-1 ring-neon/30">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <span className="font-heading text-xs uppercase tracking-widest text-neon">
                Regra {r.numero}
              </span>
              <h3 className="mt-0.5 font-heading text-base font-semibold text-white">{r.titulo}</h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-white/60">{r.texto}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leis e Punições */}
      <div className="mb-10 flex items-center justify-center gap-3">
        <ShieldAlert className="text-rose-400" size={26} />
        <h3 className="font-heading text-3xl font-bold uppercase tracking-wide text-rose-400 sm:text-4xl">
          Leis e Punições
        </h3>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {regras.punicoes.map((p, i) => (
          <motion.div
            key={p.numero}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-rose-500/[0.06] p-5 backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-rose-500/20 blur-2xl" />
            <div className="relative flex items-center gap-2">
              <AlertTriangle size={18} className="text-rose-400" />
              <span className="font-heading text-xs uppercase tracking-widest text-rose-400">
                Punição {p.numero}
              </span>
            </div>
            <h4 className="relative mt-2 font-heading text-base font-semibold text-white">
              {p.titulo}
            </h4>
            <p className="relative mt-1 font-body text-sm leading-relaxed text-white/70">
              {p.texto}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
