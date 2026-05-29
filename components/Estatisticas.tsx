"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import SectionTitle from "./SectionTitle";
import ranking from "@/data/ranking.json";
import trofeus from "@/data/trofeus.json";

// Top 8 jogadores por títulos
const topJogadores = [...ranking.jogadores]
  .sort((a, b) => b.titulos - a.titulos)
  .slice(0, 8)
  .map((j) => ({ nome: j.nome, titulos: j.titulos }));

// Distribuição de troféus por competição
const distribuicao = trofeus.competicoes
  .map((c) => ({
    nome: c.competicao,
    total: c.conquistas.reduce((acc, x) => acc + x.titulos, 0),
  }))
  .sort((a, b) => b.total - a.total);

const PIE_COLORS = [
  "#f5c542",
  "#22d3ee",
  "#3b82f6",
  "#ffe08a",
  "#0ea5e9",
  "#c9962a",
  "#60a5fa",
  "#34d399",
  "#f59e0b",
];

// Tooltip customizado
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-strong rounded-xl px-4 py-2 text-sm shadow-glass">
      <p className="font-heading uppercase tracking-wider text-white">
        {label ?? payload[0].name}
      </p>
      <p className="text-gold">
        {payload[0].value} <span className="text-white/60">título(s)</span>
      </p>
    </div>
  );
}

export default function Estatisticas() {
  return (
    <section id="estatisticas" className="section-pad">
      <SectionTitle kicker="Números do Grupo" title="Estatísticas" accent="neon" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Gráfico de barras */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 lg:col-span-3"
        >
          <h3 className="mb-6 font-heading text-lg font-semibold uppercase tracking-wider text-white">
            Jogadores com mais títulos
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topJogadores} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffe08a" />
                    <stop offset="100%" stopColor="#c9962a" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="nome"
                  tick={{ fill: "#9aa0b4", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fill: "#9aa0b4", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="titulos" fill="url(#goldBar)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gráfico de rosca */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-3xl p-6 lg:col-span-2"
        >
          <h3 className="mb-6 font-heading text-lg font-semibold uppercase tracking-wider text-white">
            Distribuição de troféus
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribuicao}
                  dataKey="total"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  stroke="none"
                >
                  {distribuicao.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: "#9aa0b4" }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
