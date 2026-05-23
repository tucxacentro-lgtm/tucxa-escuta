import Link from "next/link";

export const metadata = {
  title: "Obrigado | Escuta TUCXA",
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">Escuta TUCXA</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950">Gratidão pela sua contribuição.</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Sua resposta ajudará a Diretoria e a Coordenação a entenderem melhor as prioridades,
          sempre respeitando a essência espiritual, humana e fraterna do TUCXA.
        </p>
        <Link
          href="/pesquisa"
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Voltar para a pesquisa
        </Link>
      </div>
    </main>
  );
}
