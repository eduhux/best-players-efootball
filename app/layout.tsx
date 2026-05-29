import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Oswald, Sora } from "next/font/google";
import "./globals.css";

// Fonte de impacto para títulos grandes (estilo placar/broadcast)
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Fonte condensada atlética para títulos de seção
const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Fonte de corpo limpa e moderna
const sora = Sora({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BEST PLAYERS IN EFOOTBALL | Grupo Competitivo de eFootball Mobile",
  description:
    "Painel oficial do maior grupo competitivo de eFootball Mobile. Ranking histórico, campeonatos, hall da fama, estatísticas, troféus e regras oficiais.",
  keywords: [
    "eFootball",
    "eFootball Mobile",
    "campeonato eFootball",
    "ranking eFootball",
    "Best Players in eFootball",
    "grupo competitivo",
  ],
  authors: [{ name: "Best Players in eFootball" }],
  openGraph: {
    title: "BEST PLAYERS IN EFOOTBALL",
    description: "O maior grupo competitivo de eFootball Mobile.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${oswald.variable} ${sora.variable}`}>
      <body className="app-bg min-h-screen antialiased">{children}</body>
    </html>
  );
}
