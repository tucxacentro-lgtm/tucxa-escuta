"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CONSULENTE_ROLE_KEY,
  getQuestionsForRoles,
  getRoleLabel,
  roles,
} from "@/lib/surveyConfig";
import { QuestionCard, type AnswerDraft } from "@/components/QuestionCard";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type SurveyFormProps = {
  mode?: "internal" | "consulente";
};

function scrollToElement(id: string) {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 50);
}

export function SurveyForm({ mode = "internal" }: SurveyFormProps) {
  const router = useRouter();
  const isConsulenteMode = mode === "consulente";
  const initialRoles = isConsulenteMode ? [CONSULENTE_ROLE_KEY] : [];
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoles);
  const [identified, setIdentified] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [allowContact, setAllowContact] = useState(false);
  const [answers, setAnswers] = useState<Record<string, AnswerDraft>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [missingQuestionKey, setMissingQuestionKey] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const availableRoles = useMemo(() => {
    if (isConsulenteMode) {
      return roles.filter((role) => role.key === CONSULENTE_ROLE_KEY);
    }
    return roles.filter((role) => role.key !== CONSULENTE_ROLE_KEY);
  }, [isConsulenteMode]);

  const questions = useMemo(() => getQuestionsForRoles(selectedRoles), [selectedRoles]);

  function toggleRole(roleKey: string) {
    if (isConsulenteMode) return;
    setSelectedRoles((current) => {
      if (current.includes(roleKey)) {
        return current.filter((item) => item !== roleKey);
      }
      return [...current, roleKey];
    });
    setMissingQuestionKey(null);
    setErrorMessage("");
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
    if (missingQuestionKey === next.questionKey && next.selectedOptions.length > 0) {
      setMissingQuestionKey(null);
      setErrorMessage("");
    }
  }

  function validateBeforeSubmit(): boolean {
    setErrorMessage("");
    setMissingQuestionKey(null);

    if (selectedRoles.length === 0) {
      setErrorMessage("Selecione pelo menos uma função/papel no TUCXA.");
      scrollToElement("survey-role-section");
      return false;
    }

    if (identified && !name.trim()) {
      setErrorMessage("Informe seu nome ou escolha responder de forma anônima.");
      window.setTimeout(() => nameInputRef.current?.focus(), 50);
      return false;
    }

    const missing = questions.find((question) => {
      if (!question.required) return false;
      return getAnswer(question.key).selectedOptions.length === 0;
    });

    if (missing) {
      setMissingQuestionKey(missing.key);
      setErrorMessage(`Responda a pergunta obrigatória: ${missing.label}`);
      scrollToElement(`question-${missing.key}`);
      return false;
    }

    return true;
  }

  async function submitSurvey() {
    if (status === "submitting") return;
    if (!validateBeforeSubmit()) return;

    setStatus("submitting");

    const response = await fetch("/api/pesquisa/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roleKeys: selectedRoles,
        roleLabels: selectedRoles.map(getRoleLabel),
        roleKey: selectedRoles[0] ?? CONSULENTE_ROLE_KEY,
        roleLabel: getRoleLabel(selectedRoles[0] ?? CONSULENTE_ROLE_KEY),
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

  const selectedRoleLabels = selectedRoles.map(getRoleLabel).join(", ");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 text-white shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Escuta TUCXA</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
          {isConsulenteMode
            ? "Sua experiência pode ajudar a melhorar o acolhimento."
            : "Sua vivência pode ajudar a cuidar melhor da casa."}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
          {isConsulenteMode
            ? "Esta pesquisa foi criada para ouvir consulentes e visitantes, com respeito e discrição, sobre a chegada, a orientação, a espera e o acolhimento. Não compartilhe conteúdo pessoal ou espiritual: responda apenas sobre sua experiência com o processo."
            : "Esta pesquisa foi criada para entender, com respeito e discrição, onde existem dúvidas, retrabalhos, sobrecargas ou oportunidades de melhoria. Não é para apontar culpados: é para apoiar a organização, a harmonia e o cuidado com as pessoas."}
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
        <h2 className="text-lg font-bold">Como responder</h2>
        <p className="mt-2 text-sm leading-6">
          {isConsulenteMode
            ? "Responda pensando apenas na sua experiência como consulente ou visitante: chegada, orientação, acolhimento, espera e clareza do processo. Todas as perguntas precisam ser respondidas, e os comentários são opcionais."
            : "Primeiro selecione sua função/papel. Como a mesma pessoa pode ter mais de uma função, marque todas as opções que representam sua realidade. Depois, o sistema mostrará as perguntas comuns e também as perguntas específicas das funções escolhidas."}
        </p>
      </div>

      <section id="survey-role-section" className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Etapa 1</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">
              {isConsulenteMode ? "Pesquisa para consulentes/visitantes" : "Qual é sua função/papel no TUCXA?"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {isConsulenteMode
                ? "Esta página é exclusiva para quem veio ao TUCXA como consulente, visitante ou buscou informações sobre atendimento."
                : "Múltipla escolha: marque uma ou mais opções."}
            </p>
          </div>
          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {isConsulenteMode ? "Público específico" : "Múltipla escolha"}
          </span>
        </div>

        {isConsulenteMode ? (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4">
            <p className="font-bold text-slate-950">Consulente / visitante</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              As perguntas foram adaptadas para não tratar de rotinas internas da casa. O objetivo é entender se a chegada, as orientações e o acolhimento estão claros para quem vem buscar atendimento.
            </p>
          </div>
        ) : (
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
        )}
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
                ref={nameInputRef}
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
              {isConsulenteMode ? (
                "Todas as perguntas abaixo precisam ser respondidas. Os comentários são opcionais e não devem expor assuntos pessoais ou espirituais sensíveis."
              ) : (
                <>
                  As perguntas abaixo combinam uma base comum para todos com perguntas específicas para: <strong>{selectedRoleLabels}</strong>.
                </>
              )}
            </p>
          </div>

          {questions.map((question, index) => (
            <QuestionCard
              key={question.key}
              index={index}
              question={question}
              value={getAnswer(question.key)}
              onChange={updateAnswer}
              error={missingQuestionKey === question.key ? "Responda esta pergunta para continuar." : undefined}
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
