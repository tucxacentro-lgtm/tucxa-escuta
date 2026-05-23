import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">TUCXA</p>
        <h1 className="mt-3 text-4xl font-black">Escuta TUCXA</h1>
        <p className="mt-4 leading-7 text-slate-200">
          Pesquisa para identificar oportunidades de melhoria nos processos, comunicação,
          organização, eventos e apoio à casa.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="rounded-2xl bg-amber-400 px-5 py-3 text-center text-sm font-black text-slate-950" href="/pesquisa">
            Pesquisa interna
          </Link>
          <Link className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950" href="/pesquisa/consulente">
            Pesquisa para consulentes
          </Link>
        </div>
      </div>
    </main>
  );
}
