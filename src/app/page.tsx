import Link from "next/link";

const trustItems = [
  "Participação voluntária",
  "Identificação opcional",
  "Não solicita senhas",
  "Não solicita cartão ou dados bancários",
  "Não realiza pagamentos",
  "Uso institucional para melhoria dos processos",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl">
          <div className="bg-[radial-gradient(circle_at_top_right,#92400e,transparent_35%),linear-gradient(135deg,#020617,#111827_62%,#431407)] px-6 py-10 sm:px-10 sm:py-14">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-amber-200">Escuta TUCXA</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              Pesquisa institucional para ouvir, compreender e melhorar.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
              Este é o sistema oficial de pesquisas do TUCXA para coletar percepções, dúvidas e sugestões sobre acolhimento, comunicação, organização, eventos e processos da casa.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
              A proposta não é substituir o cuidado humano por tecnologia. É usar uma ferramenta simples para apoiar a escuta, a organização e a melhoria contínua, com respeito e discrição.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="rounded-2xl bg-amber-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-amber-300"
                href="/pesquisa"
              >
                Responder pesquisa interna
              </Link>
              <Link
                className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                href="/pesquisa/consulente"
              >
                Pesquisa para consulentes
              </Link>
              <Link
                className="rounded-2xl border border-white/30 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/10"
                href="/privacidade"
              >
                Privacidade e segurança
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700">
                  ✓
                </span>
                <p className="text-sm font-bold leading-6 text-slate-800">{item}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">Sobre este sistema</h2>
          <div className="mt-4 grid gap-5 text-sm leading-7 text-slate-700 md:grid-cols-2">
            <p>
              O Escuta TUCXA coleta respostas de pesquisas para ajudar a Diretoria e a Coordenação a identificarem oportunidades de melhoria. Os dados são usados para análise interna, priorização de ações e preparação de relatórios de acompanhamento.
            </p>
            <p>
              O sistema não pede senha pessoal, dados bancários, cartão de crédito ou qualquer pagamento. Quando houver identificação, ela é opcional e serve apenas para contato posterior, caso a pessoa aceite aprofundar alguma contribuição.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
