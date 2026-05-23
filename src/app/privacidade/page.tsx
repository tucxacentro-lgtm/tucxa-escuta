import Link from "next/link";

export const metadata = {
  title: "Privacidade e segurança",
  description: "Informações sobre privacidade, segurança e uso dos dados no sistema Escuta TUCXA.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:py-12">
      <article className="mx-auto max-w-4xl rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-700">Escuta TUCXA</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Privacidade e segurança</h1>
        <p className="mt-5 text-base leading-8 text-slate-700">
          Esta página explica como o sistema Escuta TUCXA utiliza as informações preenchidas nas pesquisas. O objetivo é dar transparência e tranquilidade para quem participa.
        </p>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-black">1. Finalidade da pesquisa</h2>
            <p className="mt-3 leading-7 text-slate-700">
              As respostas são usadas para entender oportunidades de melhoria nos processos, comunicação, acolhimento, organização, eventos e formas de apoio do TUCXA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">2. Identificação opcional</h2>
            <p className="mt-3 leading-7 text-slate-700">
              A pessoa pode responder de forma anônima ou se identificar. Nome e WhatsApp são opcionais e servem apenas caso a Diretoria ou Coordenação precise entender melhor alguma sugestão, quando a pessoa autorizar esse contato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">3. O que este sistema não solicita</h2>
            <ul className="mt-3 grid gap-3 text-slate-700 sm:grid-cols-2">
              {[
                "Não solicita senhas pessoais.",
                "Não solicita cartão de crédito.",
                "Não solicita dados bancários.",
                "Não solicita pagamento.",
                "Não oferece download de programas.",
                "Não substitui atendimento humano ou orientação da casa.",
              ].map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 ring-1 ring-slate-200">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black">4. Comentários opcionais</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Os comentários são opcionais. Não inclua conteúdos pessoais, espirituais sensíveis, senhas, documentos, dados bancários ou informações de terceiros. Use os comentários apenas para explicar melhor sua percepção sobre o processo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">5. Acesso ao painel</h2>
            <p className="mt-3 leading-7 text-slate-700">
              O painel administrativo é restrito à equipe autorizada, usado para acompanhar respostas agregadas, identificar prioridades e preparar análises internas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">6. Solicitação de remoção ou correção</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Caso você tenha se identificado e deseje solicitar correção ou remoção das suas informações, entre em contato com a Diretoria ou Coordenação do TUCXA pelo canal oficial de comunicação da casa.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
            Voltar para o início
          </Link>
          <Link href="/pesquisa" className="rounded-2xl bg-amber-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-amber-300">
            Responder pesquisa interna
          </Link>
          <Link href="/pesquisa/consulente" className="rounded-2xl bg-slate-100 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-200">
            Pesquisa para consulentes
          </Link>
        </div>
      </article>
    </main>
  );
}
