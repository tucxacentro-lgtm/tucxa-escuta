"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { QRCodeSVG } from "qrcode.react";

const CONSULENTE_PATH = "/pesquisa/consulente";

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/$/, "");
}

function subscribeToNoopStore() {
  return () => undefined;
}

function getBrowserOrigin() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

function getServerOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "";
}

function usePesquisaConsulenteUrl() {
  const origin = useSyncExternalStore(subscribeToNoopStore, getBrowserOrigin, getServerOrigin);

  return useMemo(() => {
    const baseUrl = normalizeBaseUrl(origin || process.env.NEXT_PUBLIC_SITE_URL || "");
    return baseUrl ? `${baseUrl}${CONSULENTE_PATH}` : CONSULENTE_PATH;
  }, [origin]);
}

export function ConsulenteShareTools() {
  const [copied, setCopied] = useState(false);
  const pesquisaUrl = usePesquisaConsulenteUrl();

  const mensagemDivulgacao = useMemo(
    () =>
      `Ajude o TUCXA a melhorar o acolhimento.\n\nCriamos uma pesquisa rápida para consulentes e visitantes, com o objetivo de entender como podemos tornar a chegada, a orientação e o atendimento cada vez mais claros, respeitosos e organizados.\n\nA resposta pode ser anônima.\n\nAcesse pelo link:\n${pesquisaUrl}`,
    [pesquisaUrl],
  );

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm print:border-0 print:bg-white print:p-0 print:shadow-none">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between print:block">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-800 print:hidden">
            Divulgação
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
            Pesquisa para consulentes
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700 print:text-base">
            Gere o link e o QR Code para divulgar a pesquisa de consulentes/visitantes na recepção, na
            saída dos trabalhos ou por WhatsApp quando houver contato.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={() => copyText(pesquisaUrl)}
            className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
          >
            Copiar link
          </button>
          <button
            type="button"
            onClick={() => copyText(mensagemDivulgacao)}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Copiar mensagem
          </button>
          <a
            href="/pesquisa/consulente/divulgacao"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-amber-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-amber-300"
          >
            Abrir cartaz/QR Code
          </a>
        </div>
      </div>

      {copied ? (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 print:hidden">
          Conteúdo copiado com sucesso.
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-[280px_1fr] print:mt-8 print:block">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm print:mx-auto print:w-[360px] print:border print:p-6 print:shadow-none">
          <div className="mx-auto flex w-fit rounded-2xl bg-white p-3 ring-1 ring-slate-200">
            <QRCodeSVG value={pesquisaUrl} size={220} marginSize={2} />
          </div>
          <p className="mt-4 text-sm font-black text-slate-950">Escuta TUCXA</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Pesquisa para consulentes
          </p>
          <p className="mt-3 break-all rounded-2xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 print:bg-white print:text-sm">
            {pesquisaUrl}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm print:mt-8 print:border-0 print:p-0 print:shadow-none">
          <h3 className="text-lg font-black text-slate-950">Texto sugerido para cartaz ou WhatsApp</h3>
          <div className="mt-3 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 print:bg-white print:p-0 print:text-base">
            {mensagemDivulgacao}
          </div>
        </div>
      </div>
    </section>
  );
}
