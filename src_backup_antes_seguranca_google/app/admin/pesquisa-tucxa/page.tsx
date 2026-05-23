import { Suspense } from "react";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = {
  title: "Painel Escuta TUCXA",
};

export default function AdminPesquisaTucxaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-700">Carregando...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
