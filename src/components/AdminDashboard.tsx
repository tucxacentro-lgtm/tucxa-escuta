"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ConsulenteShareTools } from "@/components/ConsulenteShareTools";

type CountItem = {
  label: string;
  total: number;
};

type CommentItem = {
  submittedAt: string;
  roleLabels: string[];
  identified: boolean;
  name: string | null;
  whatsapp: string | null;
  questionLabel: string;
  selectedOptions: string[];
  comment: string;
};

type DashboardData = {
  totalResponses: number;
  anonymousResponses: number;
  identifiedResponses: number;
  allowContactCount: number;
  lastSubmittedAt: string | null;
  responsesByRole: CountItem[];
  topOptions: Record<string, CountItem[]>;
  comments: CommentItem[];
};

function MetricCard({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
      {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
    </div>
  );
}

function Ranking({ title, items }: { title: string; items: CountItem[] }) {
  const max = Math.max(...items.map((item) => item.total), 1);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? <p className="text-sm text-slate-500">Sem respostas ainda.</p> : null}
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-700">{item.label}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                {item.total}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${(item.total / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdminDashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("todos");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      const response = await fetch(`/api/admin/pesquisa-tucxa?token=${encodeURIComponent(token)}`, {
        cache: "no-store",
      });
      const json = await response.json().catch(() => null);
      if (!response.ok) {
        setError(json?.error ?? "Erro ao carregar painel.");
        setLoading(false);
        return;
      }
      setData(json);
      setLoading(false);
    }

    load();
  }, [token]);

  const filteredComments = useMemo(() => {
    if (!data) return [];
    if (roleFilter === "todos") return data.comments;
    return data.comments.filter((comment) => comment.roleLabels.includes(roleFilter));
  }, [data, roleFilter]);

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-10 text-slate-700">Carregando painel...</div>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  const exportUrl = `/api/admin/pesquisa-tucxa/export?token=${encodeURIComponent(token)}`;
  const roleLabels = data.responsesByRole.map((item) => item.label);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Painel administrativo</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black sm:text-5xl">Escuta TUCXA</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Acompanhe as respostas, principais dores marcadas, comentários e prioridades para apoiar a reunião da diretoria/coordenação.
            </p>
          </div>
          <a
            className="w-fit rounded-2xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300"
            href={exportUrl}
          >
            Exportar CSV
          </a>
        </div>
      </div>

      <div className="mt-6">
        <ConsulenteShareTools />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard label="Total de respostas" value={data.totalResponses} />
        <MetricCard label="Anônimas" value={data.anonymousResponses} />
        <MetricCard label="Identificadas" value={data.identifiedResponses} />
        <MetricCard label="Aceitam contato" value={data.allowContactCount} />
        <MetricCard
          label="Última resposta"
          value={data.lastSubmittedAt ? new Date(data.lastSubmittedAt).toLocaleString("pt-BR") : "-"}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Ranking title="Respostas por função/papel" items={data.responsesByRole} />
        <Ranking title="Áreas com maior oportunidade de melhoria" items={data.topOptions.areas_melhoria ?? []} />
        <Ranking title="O que mais gera dúvida, retrabalho ou demora" items={data.topOptions.maior_retrabalho ?? []} />
        <Ranking title="Impactos mais citados" items={data.topOptions.impactos ?? []} />
        <Ranking title="Usos desejados para tecnologia" items={data.topOptions.tecnologia_uso ?? []} />
        <Ranking title="Prioridade inicial sugerida" items={data.topOptions.prioridade_inicial ?? []} />
      </div>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Comentários abertos</h2>
            <p className="mt-1 text-sm text-slate-500">
              Use os comentários para montar o resumo executivo e aprofundar pontos de atenção.
            </p>
          </div>
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
          >
            <option value="todos">Todas as funções</option>
            {roleLabels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-3 text-left font-bold text-slate-700">Data</th>
                <th className="px-3 py-3 text-left font-bold text-slate-700">Função</th>
                <th className="px-3 py-3 text-left font-bold text-slate-700">Pergunta</th>
                <th className="px-3 py-3 text-left font-bold text-slate-700">Resposta</th>
                <th className="px-3 py-3 text-left font-bold text-slate-700">Comentário</th>
                <th className="px-3 py-3 text-left font-bold text-slate-700">Identificação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComments.map((comment, index) => (
                <tr key={`${comment.submittedAt}-${index}`} className="align-top">
                  <td className="px-3 py-3 text-slate-600">{new Date(comment.submittedAt).toLocaleString("pt-BR")}</td>
                  <td className="px-3 py-3 text-slate-700">{comment.roleLabels.join(", ")}</td>
                  <td className="px-3 py-3 text-slate-700">{comment.questionLabel}</td>
                  <td className="px-3 py-3 text-slate-700">{comment.selectedOptions.join("; ")}</td>
                  <td className="max-w-xl px-3 py-3 text-slate-900">{comment.comment}</td>
                  <td className="px-3 py-3 text-slate-600">
                    {comment.identified ? `${comment.name ?? "Identificado"}${comment.whatsapp ? ` - ${comment.whatsapp}` : ""}` : "Anônimo"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredComments.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">Nenhum comentário encontrado.</p> : null}
        </div>
      </section>
    </div>
  );
}
