import { SurveyForm } from "@/components/SurveyForm";

export const metadata = {
  title: "Escuta TUCXA | Consulentes",
  description: "Pesquisa para consulentes e visitantes do TUCXA.",
};

export default function PesquisaConsulentePage() {
  return <SurveyForm mode="consulente" />;
}
