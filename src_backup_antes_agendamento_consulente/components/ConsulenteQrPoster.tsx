"use client";

import { useMemo, useSyncExternalStore } from "react";
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

export function ConsulenteQrPoster() {
  const pesquisaUrl = usePesquisaConsulenteUrl();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-3xl print:max-w-none">
        <div className="mb-4 flex justify-end print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            Imprimir
          </button>
        </div>

        <section className="rounded-[2rem] bg-white p-8 text-center shadow-xl print:rounded-none print:p-10 print:shadow-none">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-700">Escuta TUCXA</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl print:text-5xl">
            Ajude o TUCXA a melhorar o acolhimento
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700 print:text-xl print:leading-9">
            Criamos uma pesquisa rápida para consulentes e visitantes. Sua resposta ajuda a tornar a
            chegada, a orientação e o atendimento cada vez mais claros, respeitosos e organizados.
          </p>

          <div className="mx-auto mt-8 flex w-fit rounded-[2rem] bg-white p-5 ring-1 ring-slate-200 print:p-6">
            <QRCodeSVG value={pesquisaUrl} size={300} marginSize={2} />
          </div>

          <p className="mt-6 text-xl font-black text-slate-950">Aponte a câmera do celular para responder</p>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">
            A pesquisa pode ser respondida de forma anônima. Leva poucos minutos e não busca apontar
            culpados: queremos ouvir para melhorar com respeito e discrição.
          </p>

          <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-slate-50 px-4 py-3 print:bg-white">
            <p className="break-all text-sm font-bold text-slate-700 print:text-base">{pesquisaUrl}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
