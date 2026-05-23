import { SurveyForm } from "@/components/SurveyForm";

export const metadata = {
  title: "Escuta TUCXA",
  description: "Pesquisa para identificar oportunidades de melhoria no TUCXA.",
};

export default function PesquisaPage() {
  return <SurveyForm mode="internal" />;
}
