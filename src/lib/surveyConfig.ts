export type QuestionType = "single" | "multiple";

export type SurveyOption = {
  value: string;
  label: string;
};

export type SurveyQuestion = {
  key: string;
  label: string;
  helper?: string;
  type: QuestionType;
  required?: boolean;
  allowComment?: boolean;
  options: SurveyOption[];
};

export type SurveyRole = {
  key: string;
  label: string;
  description: string;
  isInternal?: boolean;
};

export const CAMPAIGN_KEY = "escuta-tucxa-2026";

export const roles: SurveyRole[] = [
  {
    key: "dirigente",
    label: "Dirigente / Diretoria",
    description: "Visão estratégica, prioridades, governança e sustentabilidade da casa.",
    isInternal: true,
  },
  {
    key: "coordenacao",
    label: "Coordenação",
    description: "Organização dos trabalhos, apoio aos filhos, presença, fluxos e intercorrências.",
    isInternal: true,
  },
  {
    key: "cambono",
    label: "Cambono",
    description: "Apoio aos atendimentos, materiais, registros, sigilo, comunicação e preparo.",
    isInternal: true,
  },
  {
    key: "cavalinho",
    label: "Cavalinho / médium de incorporação",
    description: "Preparo, presença, comunicação, estudos, desenvolvimento e apoio à rotina.",
    isInternal: true,
  },
  {
    key: "filho_corrente",
    label: "Filho(a) da corrente",
    description: "Participação na casa, comunicação, estudos, rotina e orientações gerais.",
    isInternal: true,
  },
  {
    key: "eventos",
    label: "Voluntário(a) de eventos",
    description: "Festa Junina, Feijoada, Bingo, Bazar, cozinha, compras, vendas e apoio geral.",
    isInternal: true,
  },
  {
    key: "administrativo",
    label: "Apoio administrativo / financeiro / compras",
    description: "Compras, controle de materiais, pagamentos, doações, mensalidades e relatórios.",
    isInternal: true,
  },
  {
    key: "consulente",
    label: "Consulente / visitante",
    description: "Experiência de chegada, acolhimento, orientações, espera e atendimento.",
    isInternal: false,
  },
  {
    key: "outro",
    label: "Outro papel / prefiro explicar nos comentários",
    description: "Use esta opção quando seu vínculo atual não estiver nas opções acima.",
    isInternal: true,
  },
];

const option = (label: string): SurveyOption => ({ value: label, label });

export const commonQuestions: SurveyQuestion[] = [
  {
    key: "tempo_vinculo",
    label: "Há quanto tempo você participa, ajuda ou frequenta o TUCXA?",
    helper: "Escolha a opção mais próxima da sua realidade atual.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Menos de 6 meses",
      "De 6 meses a 1 ano",
      "De 1 a 3 anos",
      "De 3 a 10 anos",
      "Mais de 10 anos",
      "Participo principalmente de eventos",
      "Sou visitante/consulente",
    ].map(option),
  },
  {
    key: "areas_melhoria",
    label: "Em quais áreas você percebe maior oportunidade de melhoria?",
    helper: "Marque todas as áreas em que uma organização melhor poderia ajudar.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Comunicação e avisos",
      "Organização dos trabalhos",
      "Recepção e acolhimento",
      "Escalas, presença e faltas",
      "Orientações para novos participantes",
      "Estudos, cursos e formação",
      "Eventos, festas e arrecadações",
      "Compras e controle de materiais",
      "Financeiro e prestação de contas",
      "Cadastros e atualização de informações",
      "Não percebo necessidade de melhoria no momento",
      "Outro",
    ].map(option),
  },
  {
    key: "maior_retrabalho",
    label: "O que mais costuma gerar dúvida, retrabalho ou demora?",
    helper: "Pense nos momentos em que algo precisa ser perguntado de novo, corrigido ou refeito.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Falta de informação clara",
      "Informações espalhadas em diferentes lugares",
      "Dependência de poucas pessoas",
      "Falta de confirmação de presença",
      "Mudanças comunicadas em cima da hora",
      "Ausência de histórico ou registro",
      "Falta de padrão no processo",
      "Dificuldade de saber com quem falar",
      "Dificuldade para novos integrantes entenderem o funcionamento",
      "Não percebo retrabalho ou demora",
      "Outro",
    ].map(option),
  },
  {
    key: "impactos",
    label: "Quando uma dificuldade acontece, qual impacto ela costuma gerar?",
    helper: "Esta pergunta ajuda a entender a consequência real da dor, não apenas o problema aparente.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Atraso",
      "Ansiedade ou insegurança",
      "Sobrecarga em poucas pessoas",
      "Desgaste entre pessoas",
      "Falta de clareza",
      "Perda de informação",
      "Retrabalho",
      "Dificuldade para acolher melhor",
      "Dificuldade para organizar o trabalho",
      "Impacto financeiro",
      "Não sei avaliar",
      "Outro",
    ].map(option),
  },
  {
    key: "tecnologia_uso",
    label: "Se o TUCXA tivesse uma página ou sistema simples no celular, o que você usaria?",
    helper: "Marque apenas o que realmente poderia fazer sentido para você.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Consultar comunicados oficiais",
      "Confirmar presença ou ausência",
      "Consultar calendário",
      "Responder pesquisas",
      "Acessar materiais de estudo",
      "Consultar orientações para eventos",
      "Atualizar meus dados",
      "Enviar sugestões",
      "Não usaria",
      "Usaria se fosse simples",
      "Precisaria de ajuda para usar",
    ].map(option),
  },
  {
    key: "cuidados_tecnologia",
    label: "Qual cuidado é mais importante ao usar tecnologia no TUCXA?",
    helper: "A tecnologia deve apoiar a casa sem substituir o cuidado humano, a discrição e a essência espiritual.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Preservar sigilo e discrição",
      "Não substituir o contato humano",
      "Ser simples para todos usarem",
      "Não expor assuntos espirituais ou pessoais",
      "Evitar excesso de mensagens",
      "Ter autorização da diretoria/coordenação",
      "Proteger dados pessoais",
      "Respeitar a hierarquia e os processos da casa",
      "Não sei avaliar",
      "Outro",
    ].map(option),
  },
  {
    key: "prioridade_inicial",
    label: "Qual melhoria deveria ser priorizada primeiro?",
    helper: "Escolha a que traria maior ganho inicial para a casa.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Comunicação e avisos",
      "Presença, faltas e escalas",
      "Atendimento e acolhimento",
      "Estudos e orientações",
      "Eventos e arrecadações",
      "Compras e materiais",
      "Financeiro",
      "Cadastro das pessoas",
      "Gestão de voluntários",
      "Ainda não sei",
    ].map(option),
  },
];

export const roleQuestions: Record<string, SurveyQuestion[]> = {
  dirigente: [
    {
      key: "dirigente_processos_dependentes",
      label: "Quais processos hoje dependem demais de poucas pessoas?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Comunicação",
        "Organização dos trabalhos",
        "Eventos",
        "Financeiro",
        "Compras",
        "Prestação de contas",
        "Escalas e presença",
        "Cadastro de pessoas",
        "Orientações para novos integrantes",
        "Não sei avaliar",
        "Outro",
      ].map(option),
    },
    {
      key: "dirigente_decisoes_dados",
      label: "Que tipo de decisão poderia melhorar com dados mais organizados?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Prioridade de projetos",
        "Organização de eventos",
        "Compra de materiais",
        "Comunicação",
        "Distribuição de voluntários",
        "Planejamento financeiro",
        "Formação e estudos",
        "Acompanhamento de presença",
        "Outro",
      ].map(option),
    },
  ],
  coordenacao: [
    {
      key: "coord_momentos_dificeis",
      label: "Em quais momentos a coordenação sente mais dificuldade?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Antes do início dos trabalhos",
        "Durante a chegada das pessoas",
        "Durante os atendimentos",
        "No encerramento",
        "Em casos de ausência ou falta",
        "Em mudanças de última hora",
        "Em encaminhamentos",
        "Em comunicação com cambonos/cavalinhos",
        "Em organização de eventos",
        "Outro",
      ].map(option),
    },
    {
      key: "coord_ajudas",
      label: "O que mais ajudaria a coordenação?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Lista de presença digital",
        "Confirmação antecipada de presença",
        "Registro de ausências",
        "Cadastro atualizado",
        "Lista de responsáveis por função",
        "Painel com pendências",
        "Histórico de encaminhamentos operacionais",
        "Checklist do dia de trabalho",
        "Canal para registrar ocorrências sem exposição",
        "Outro",
      ].map(option),
    },
  ],
  cambono: [
    {
      key: "cambono_dificuldades",
      label: "O que mais dificulta o trabalho de cambono?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Falta de orientação prévia",
        "Falta de materiais",
        "Dúvida sobre procedimento",
        "Dúvida sobre quando chamar a coordenação",
        "Dificuldade de registrar informações",
        "Dificuldade de repassar informações ao médium",
        "Trânsito/deslocamento durante o trabalho",
        "Falta de clareza para novos cambonos",
        "Não percebo dificuldade",
        "Outro",
      ].map(option),
    },
    {
      key: "cambono_apoios",
      label: "O que ajudaria o cambono no dia do trabalho?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Checklist de materiais",
        "Orientações rápidas por linha/entidade",
        "Lista de procedimentos importantes",
        "Canal para dúvidas com coordenação",
        "Registro seguro de observações operacionais",
        "Treinamento para novos cambonos",
        "Reforço sobre sigilo e discrição",
        "Organização de materiais disponíveis",
        "Outro",
      ].map(option),
    },
  ],
  cavalinho: [
    {
      key: "medium_preparacao",
      label: "O que mais dificulta sua preparação ou participação?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Horários",
        "Trabalho/estudo",
        "Transporte",
        "Comunicação de mudanças",
        "Falta de lembretes",
        "Dúvidas sobre procedimentos",
        "Dificuldade para avisar ausência",
        "Dificuldade para encontrar substituto quando necessário",
        "Falta de material de estudo",
        "Outro",
      ].map(option),
    },
    {
      key: "medium_estudos",
      label: "Em relação aos estudos e orientações, o que seria mais útil?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Textos curtos",
        "PDFs organizados",
        "Vídeos curtos",
        "Áudios",
        "Perguntas frequentes",
        "Trilhas para filhos novos",
        "Conteúdo por tema",
        "Calendário de cursos",
        "Não tenho necessidade no momento",
        "Outro",
      ].map(option),
    },
  ],
  filho_corrente: [
    {
      key: "filho_ajudas_participacao",
      label: "O que mais ajudaria sua participação na casa?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Avisos mais claros",
        "Calendário organizado",
        "Orientações para preparo",
        "Materiais de estudo",
        "Confirmação de presença",
        "Canal para dúvidas",
        "Atualização de cadastro",
        "Lembretes de cursos/eventos",
        "Melhor organização das informações",
        "Outro",
      ].map(option),
    },
    {
      key: "filho_temas_orientacao",
      label: "Em quais temas você gostaria de ter mais orientação?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Regulamento da casa",
        "Procedimentos dos trabalhos",
        "Preparo para os trabalhos",
        "Estudos sobre Umbanda",
        "Papel dos cambonos",
        "Papel dos cavalinhos",
        "Eventos e voluntariado",
        "Comunicação e avisos",
        "Outro",
      ].map(option),
    },
  ],
  eventos: [
    {
      key: "eventos_atuacao",
      label: "Em quais eventos ou ações você costuma ajudar?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Festa Junina",
        "Bingo",
        "Feijoada",
        "Pizza",
        "Bazar",
        "Campanhas de arrecadação",
        "Compras",
        "Cozinha",
        "Atendimento/vendas",
        "Ainda não ajudo, mas poderia ajudar",
        "Outro",
      ].map(option),
    },
    {
      key: "eventos_dificuldades",
      label: "O que mais gera dificuldade nos eventos?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Divulgação",
        "Escala de voluntários",
        "Compras",
        "Controle de estoque",
        "Vendas",
        "Pagamentos",
        "Prestação de contas",
        "Distribuição de tarefas",
        "Comunicação durante o evento",
        "Montagem/desmontagem",
        "Outro",
      ].map(option),
    },
  ],
  administrativo: [
    {
      key: "admin_oportunidades",
      label: "Onde há maior oportunidade de organização administrativa?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Cadastro de pessoas",
        "Mensalidades/contribuições",
        "Prestação de contas",
        "Compras",
        "Estoque de materiais",
        "Eventos",
        "Doações",
        "Documentos",
        "Relatórios para diretoria",
        "Outro",
      ].map(option),
    },
    {
      key: "admin_controle_manual",
      label: "O que hoje depende mais de controle manual?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Planilhas",
        "Cadernos",
        "Mensagens de WhatsApp",
        "Anotações avulsas",
        "Recibos/comprovantes",
        "Listas de presença",
        "Controle de materiais",
        "Controle de vendas em eventos",
        "Outro",
      ].map(option),
    },
  ],
  consulente: [
    {
      key: "consulente_experiencia_chegada",
      label: "Como foi sua experiência de chegada e orientação?",
      type: "single",
      required: true,
      allowComment: true,
      options: [
        "Muito clara e acolhedora",
        "Clara, mas poderia melhorar",
        "Tive algumas dúvidas",
        "Fiquei inseguro(a) sobre o que fazer",
        "Não sei avaliar",
      ].map(option),
    },
    {
      key: "consulente_info_previa",
      label: "Que informação ajudaria antes de ir ao TUCXA?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Horários",
        "Como funciona a chegada",
        "Regras básicas da casa",
        "Tempo aproximado de espera",
        "O que levar ou não levar",
        "Como funciona a senha/ficha",
        "Orientações após atendimento",
        "Localização",
        "Não precisei de informação adicional",
        "Outro",
      ].map(option),
    },
    {
      key: "consulente_tranquilidade",
      label: "O que poderia tornar a experiência do consulente mais tranquila?",
      type: "multiple",
      required: true,
      allowComment: true,
      options: [
        "Explicação simples na chegada",
        "Página com orientações",
        "Melhor sinalização",
        "Mais clareza sobre espera",
        "Orientação após atendimento",
        "Canal para dúvidas gerais",
        "Acolhimento inicial",
        "Não sei avaliar",
        "Outro",
      ].map(option),
    },
  ],
  outro: [
    {
      key: "outro_vinculo",
      label: "Como você descreveria seu vínculo ou contribuição com o TUCXA?",
      type: "single",
      required: true,
      allowComment: true,
      options: [
        "Ajudo eventualmente",
        "Participo de eventos",
        "Sou familiar/amigo de alguém da casa",
        "Estou conhecendo a casa",
        "Prefiro explicar no comentário",
      ].map(option),
    },
  ],
};

export function getQuestionsForRoles(roleKeys: string[]): SurveyQuestion[] {
  const seen = new Set<string>();
  const questions = [...commonQuestions];

  for (const roleKey of roleKeys) {
    for (const question of roleQuestions[roleKey] ?? []) {
      if (!seen.has(question.key)) {
        questions.push(question);
        seen.add(question.key);
      }
    }
  }

  return questions;
}

export function getRoleLabel(roleKey: string): string {
  return roles.find((role) => role.key === roleKey)?.label ?? roleKey;
}
