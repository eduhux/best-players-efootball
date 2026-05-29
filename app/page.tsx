import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ranking from "@/components/Ranking";
import Campeonatos from "@/components/Campeonatos";
import HallDaFama from "@/components/HallDaFama";
import Estatisticas from "@/components/Estatisticas";
import Temporada from "@/components/Temporada";
import Trofeus from "@/components/Trofeus";
import Regras from "@/components/Regras";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Ranking />
        <Campeonatos />
        <HallDaFama />
        <Estatisticas />
        <Temporada />
        <Trofeus />
        <Regras />
      </main>
      <Footer />
    </>
  );
}
