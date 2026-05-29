"use client";

import { motion } from "framer-motion";

/**
 * Título de seção padrão com animação de entrada.
 */
export default function SectionTitle({
  kicker,
  title,
  accent = "gold",
}: {
  kicker?: string;
  title: string;
  accent?: "gold" | "neon";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      {kicker && (
        <span
          className={`mb-3 inline-block font-heading text-xs uppercase tracking-[0.4em] ${
            accent === "gold" ? "text-gold" : "text-neon"
          }`}
        >
          {kicker}
        </span>
      )}
      <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
        <span
          className={accent === "gold" ? "text-gradient-gold" : "text-gradient-neon"}
        >
          {title}
        </span>
      </h2>
      <div
        className={`mx-auto mt-5 h-[3px] w-24 rounded-full ${
          accent === "gold"
            ? "bg-gradient-to-r from-transparent via-gold to-transparent"
            : "bg-gradient-to-r from-transparent via-neon to-transparent"
        }`}
      />
    </motion.div>
  );
}
