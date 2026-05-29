"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Tela de carregamento estilosa exibida na entrada do site.
 * Mostra a bola digital girando + nome do grupo, depois some.
 */
export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base-900"
        >
          {/* Bola digital girando */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8 h-24 w-24"
          >
            <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-gold/50" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-neon/30 to-gold/30 blur-md" />
            <div className="absolute inset-3 flex items-center justify-center rounded-full border border-white/20 bg-base-800">
              <span className="font-display text-4xl text-gradient-gold">⚽</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="font-display text-3xl tracking-[0.25em] text-white sm:text-4xl"
          >
            BEST PLAYERS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-heading text-sm uppercase tracking-[0.4em] text-gold"
          >
            in eFootball
          </motion.p>

          {/* Barra de progresso */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 180 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="mt-8 h-[3px] rounded-full bg-gradient-to-r from-neon via-gold to-neon"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
