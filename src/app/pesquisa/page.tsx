import Link from "next/link";
import type { Metadata } from "next";
import { SurveyForm } from "@/components/SurveyForm";

export const metadata: Metadata = {
  title: "Pesquisa interna",
  description:
    "Pesquisa institucional e voluntária do TUCXA para ouvir participantes internos sobre comunicação, organização, acolhimento e melhoria de processos.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  openGraph: {
    title: "Pesquisa interna | Escuta TUCXA",
    description:
      "Pesquisa institucional e voluntária do TUCXA. Não solicita senha, cartão, dados bancários, pagamento ou instalação de aplicativos.",
  },
};

type PesquisaPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const trustItems = [
  "Pesquisa institucional do TUCXA",
  "Participação voluntária",
  "Identificação opcional",
  "Não solicita senha",
  "Não solicita cartão, dados bancários ou pagamento",
  "Não instala aplicativos nem oferece downloads",
];

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PesquisaPage({ searchParams }: PesquisaPageProps) {
  const params = searchParams ? await searchParams : {};
  const iniciar = getSingleParam(params.iniciar);

  if (iniciar === "1") {
    return <SurveyForm mode="internal" />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl">
          <div className="bg-[radial-gradient(circle_at_top_right,#92400e,transparent_35%),linear-gradient(135deg,#020617,#111827_62%,#431407)] px-6 py-10 sm:px-10 sm:py-14">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-amber-200">Escuta TUCXA</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              Pesquisa interna para ouvir, organizar e melhorar com respeito.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
              Esta página reúne a pesquisa institucional do TUCXA para dirigentes, coordenação,
              cambonos, cavalinhos, filhos da corrente, voluntários de eventos e apoios administrativos.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
              A pesquisa é voluntária, a identificação é opcional e o objetivo é entender oportunidades
              de melhoria em comunicação, organização, acolhimento, estudos, eventos e processos da casa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="rounded-2xl bg-amber-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-amber-300"
                href="/pesquisa?iniciar=1"
              >
                Começar pesquisa interna
              </Link>
              <Link
                className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                href="/pesquisa/consulente"
              >
                Sou consulente ou visitante
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
          <h2 className="text-2xl font-black text-slate-950">Como funciona</h2>
          <div className="mt-4 grid gap-5 text-sm leading-7 text-slate-700 md:grid-cols-2">
            <p>
              Primeiro, a pessoa seleciona uma ou mais funções que representam sua participação no TUCXA.
              Em seguida, responde perguntas comuns e perguntas específicas conforme as funções escolhidas.
            </p>
            <p>
              O sistema não pede senha pessoal, dados bancários, cartão de crédito ou pagamento. Os comentários
              são opcionais e devem tratar apenas de percepções sobre processos, sem exposição de assuntos pessoais
              ou espirituais sensíveis.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">Antes de começar</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
            Responda pensando na sua vivência real. Não existe resposta certa ou errada. A contribuição de cada pessoa
            ajuda a Diretoria e a Coordenação a enxergarem prioridades e definirem melhorias com mais clareza.
          </p>
          <div className="mt-6">
            <Link
              className="inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-slate-800"
              href="/pesquisa?iniciar=1"
            >
              Começar agora
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
