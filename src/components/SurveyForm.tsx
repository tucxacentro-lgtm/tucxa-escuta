"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuestionsForRoles, getRoleLabel, roles } from "@/lib/surveyConfig";
import { QuestionCard, type AnswerDraft } from "@/components/QuestionCard";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type SurveyFormProps = {
  mode?: "internal" | "consulente";
};

export function SurveyForm({ mode = "internal" }: SurveyFormProps) {
  const router = useRouter();
  const initialRoles = mode === "consulente" ? ["consulente"] : [];
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoles);
  const [identified, setIdentified] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [allowContact, setAllowContact] = useState(false);
  const [answers, setAnswers] = useState<Record<string, AnswerDraft>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const availableRoles = useMemo(() => {
    if (mode === "consulente") {
      return roles.filter((role) => role.key === "consulente");
    }
    return roles.filter((role) => role.key !== "consulente");
  }, [mode]);

  const questions = useMemo(() => getQuestionsForRoles(selectedRoles), [selectedRoles]);

  function toggleRole(roleKey: string) {
    if (mode === "consulente") return;
    setSelectedRoles((current) => {
      if (current.includes(roleKey)) {
        return current.filter((item) => item !== roleKey);
      }
      return [...current, roleKey];
    });
  }

  function getAnswer(questionKey: string): AnswerDraft {
    const question = questions.find((item) => item.key === questionKey);
    return (
      answers[questionKey] ?? {
        questionKey,
        questionLabel: question?.label ?? questionKey,
        questionType: question?.type ?? "single",
        selectedOptions: [],
        comment: "",
      }
    );
  }

  function updateAnswer(next: AnswerDraft) {
    setAnswers((current) => ({ ...current, [next.questionKey]: next }));
  }

  async function submitSurvey() {
    setErrorMessage("");

    if (selectedRoles.length === 0) {
      setErrorMessage("Selecione pelo menos uma função/papel no TUCXA.");
      return;
    }

    const missing = questions.find((question) => question.required && getAnswer(question.key).selectedOptions.length === 0);
    if (missing) {
      setErrorMessage(`Responda a pergunta obrigatória: ${missing.label}`);
      return;
    }

    if (identified && !name.trim()) {
      setErrorMessage("Informe seu nome ou escolha responder de forma anônima.");
      return;
    }

    setStatus("submitting");

    const response = await fetch("/api/pesquisa/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roleKeys: selectedRoles,
        roleLabels: selectedRoles.map(getRoleLabel),
        identified,
        name,
        whatsapp,
        allowContact,
        answers: questions.map((question) => getAnswer(question.key)),
      }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setErrorMessage(json.error ?? "Não foi possível salvar sua resposta. Tente novamente.");
      return;
    }

    setStatus("success");
    router.push("/pesquisa/obrigado");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 text-white shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Escuta TUCXA</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
          Sua vivência pode ajudar a cuidar melhor da casa.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
          Esta pesquisa foi criada para entender, com respeito e discrição, onde existem dúvidas,
          retrabalhos, sobrecargas ou oportunidades de melhoria. Não é para apontar culpados: é para
          apoiar a organização, a harmonia e o cuidado com as pessoas.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
        <h2 className="text-lg font-bold">Como responder</h2>
        <p className="mt-2 text-sm leading-6">
          Primeiro selecione sua função/papel. Como a mesma pessoa pode ter mais de uma função, marque
          todas as opções que representam sua realidade. Depois, o sistema mostrará as perguntas comuns e
          também as perguntas específicas das funções escolhidas.
        </p>
      </div>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Etapa 1</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Qual é sua função/papel no TUCXA?
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {mode === "consulente"
                ? "Esta página é específica para consulentes/visitantes."
                : "Múltipla escolha: marque uma ou mais opções."}
            </p>
          </div>
          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Múltipla escolha
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {availableRoles.map((role) => {
            const checked = selectedRoles.includes(role.key);
            return (
              <label
                key={role.key}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  checked ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex gap-3">
                  <input
                    className="mt-1 h-4 w-4 accent-amber-700"
                    type="checkbox"
                    checked={checked}
                    disabled={mode === "consulente"}
                    onChange={() => toggleRole(role.key)}
                  />
                  <div>
                    <p className="font-bold text-slate-900">{role.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{role.description}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Etapa 2</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">Identificação opcional</h2>
        <p className="mt-1 text-sm text-slate-600">
          Você pode se identificar ou responder anonimamente. A identificação serve apenas se a
          diretoria/coordenação precisar entender melhor alguma sugestão.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className={`cursor-pointer rounded-2xl border p-4 ${!identified ? "border-amber-400 bg-amber-50" : "border-slate-200"}`}>
            <input
              className="mr-2 accent-amber-700"
              type="radio"
              name="identified"
              checked={!identified}
              onChange={() => setIdentified(false)}
            />
            Responder de forma anônima
          </label>
          <label className={`cursor-pointer rounded-2xl border p-4 ${identified ? "border-amber-400 bg-amber-50" : "border-slate-200"}`}>
            <input
              className="mr-2 accent-amber-700"
              type="radio"
              name="identified"
              checked={identified}
              onChange={() => setIdentified(true)}
            />
            Quero me identificar
          </label>
        </div>

        {identified ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="whatsapp">
                WhatsApp opcional
              </label>
              <input
                id="whatsapp"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
              />
            </div>
            <label className="flex gap-3 rounded-2xl border border-slate-200 p-4 text-sm sm:col-span-2">
              <input
                className="mt-1 h-4 w-4 accent-amber-700"
                type="checkbox"
                checked={allowContact}
                onChange={(event) => setAllowContact(event.target.checked)}
              />
              <span>Autorizo ser chamado(a) para aprofundar alguma resposta ou sugestão.</span>
            </label>
          </div>
        ) : null}
      </section>

      {selectedRoles.length > 0 ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Etapa 3</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">Perguntas da pesquisa</h2>
            <p className="mt-1 text-sm text-slate-600">
              As perguntas abaixo combinam uma base comum para todos com perguntas específicas para:
              {" "}
              <strong>{selectedRoles.map(getRoleLabel).join(", ")}</strong>.
            </p>
          </div>

          {questions.map((question, index) => (
            <QuestionCard
              key={question.key}
              index={index}
              question={question}
              value={getAnswer(question.key)}
              onChange={updateAnswer}
            />
          ))}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Leva poucos minutos. Responda pensando na sua vivência real, com respeito e discrição.
        </p>
        <button
          className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          disabled={status === "submitting"}
          onClick={submitSurvey}
        >
          {status === "submitting" ? "Enviando..." : "Enviar pesquisa"}
        </button>
      </div>
    </div>
  );
}
