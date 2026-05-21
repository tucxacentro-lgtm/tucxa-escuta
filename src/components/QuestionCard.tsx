"use client";

import type { SurveyQuestion } from "@/lib/surveyConfig";

export type AnswerDraft = {
  questionKey: string;
  questionLabel: string;
  questionType: "single" | "multiple";
  selectedOptions: string[];
  comment: string;
};

type QuestionCardProps = {
  question: SurveyQuestion;
  value: AnswerDraft;
  onChange: (next: AnswerDraft) => void;
  index: number;
};

export function QuestionCard({ question, value, onChange, index }: QuestionCardProps) {
  function toggleOption(optionValue: string) {
    if (question.type === "single") {
      onChange({ ...value, selectedOptions: [optionValue] });
      return;
    }

    const exists = value.selectedOptions.includes(optionValue);
    const selectedOptions = exists
      ? value.selectedOptions.filter((item) => item !== optionValue)
      : [...value.selectedOptions, optionValue];

    onChange({ ...value, selectedOptions });
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
            Pergunta {index + 1}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">{question.label}</h3>
          {question.helper ? <p className="mt-1 text-sm text-slate-600">{question.helper}</p> : null}
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {question.type === "single" ? "Escolha única" : "Múltipla escolha"}
        </span>
      </div>

      <div className="grid gap-2">
        {question.options.map((option) => {
          const checked = value.selectedOptions.includes(option.value);
          const inputType = question.type === "single" ? "radio" : "checkbox";

          return (
            <label
              key={option.value}
              className={`flex cursor-pointer gap-3 rounded-2xl border p-3 text-sm transition ${
                checked ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <input
                className="mt-1 h-4 w-4 accent-amber-700"
                type={inputType}
                checked={checked}
                onChange={() => toggleOption(option.value)}
                name={question.key}
              />
              <span className="font-medium text-slate-800">{option.label}</span>
            </label>
          );
        })}
      </div>

      {question.allowComment ? (
        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700" htmlFor={`${question.key}-comment`}>
            Comentário opcional
          </label>
          <textarea
            id={`${question.key}-comment`}
            className="mt-2 min-h-20 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
            placeholder="Use este espaço se quiser explicar melhor sua resposta, sem expor assuntos pessoais ou espirituais sensíveis."
            value={value.comment}
            onChange={(event) => onChange({ ...value, comment: event.target.value })}
          />
        </div>
      ) : null}
    </section>
  );
}
