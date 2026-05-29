import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

// Não deve aparecer em buscas (Google etc.)
export const metadata: Metadata = {
  title: "Painel Admin | Best Players in eFootball",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPanel />;
}
