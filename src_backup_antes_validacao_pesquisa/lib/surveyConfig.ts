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
export const CONSULENTE_ROLE_KEY = "consulente";
export const CONSULENTE_ROLE_LABEL = "Consulente / visitante";

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
    key: CONSULENTE_ROLE_KEY,
    label: CONSULENTE_ROLE_LABEL,
    description: "Experiência de chegada, acolhimento, orientação, espera e atendimento.",
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

export const internalCommonQuestions: SurveyQuestion[] = [
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

export const consulenteQuestions: SurveyQuestion[] = [
  {
    key: "consulente_primeira_vez",
    label: "Esta foi sua primeira visita ao TUCXA?",
    helper: "Escolha a opção que melhor representa sua experiência recente.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Sim, foi minha primeira visita",
      "Não, já estive no TUCXA outras vezes",
      "Ainda não fui, estou buscando informações",
      "Prefiro não responder",
    ].map(option),
  },
  {
    key: "consulente_como_soube",
    label: "Como você ficou sabendo do TUCXA ou do atendimento?",
    helper: "Esta resposta ajuda a entender como as pessoas chegam até a casa.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Indicação de familiar ou amigo",
      "WhatsApp",
      "Rede social",
      "Já conhecia a casa",
      "Passei em frente / moro perto",
      "Outro",
      "Prefiro não responder",
    ].map(option),
  },
  {
    key: "consulente_info_antes",
    label: "Antes de chegar, quais informações teriam ajudado você?",
    helper: "Marque tudo que teria deixado a visita mais tranquila, inclusive sobre agendamento, horários e forma de atendimento.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Horários de funcionamento",
      "Dias destinados ao atendimento de consulentes",
      "Se precisava agendar antes",
      "Como funciona o agendamento pelo WhatsApp",
      "Se é necessário agendar toda semana",
      "Como funciona a chegada",
      "Como funciona senha, ficha ou ordem de atendimento",
      "Diferença entre atendimento, passe/benção e retorno",
      "Tempo aproximado de espera",
      "Localização e entrada correta",
      "O que pode ou não pode fazer dentro da casa",
      "Não senti falta de informação antes de chegar",
      "Outro",
    ].map(option),
  },
  {
    key: "consulente_agendamento",
    label: "Você teve alguma dúvida sobre agendamento ou forma de atendimento?",
    helper: "Marque as opções que representam dúvidas que você teve ou que poderiam ser melhor explicadas para consulentes e visitantes.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Não tive dúvida",
      "Não sabia se precisava agendar antes",
      "Não sabia se poderia chegar direto no dia de atendimento",
      "Não sabia se precisava agendar toda semana",
      "Não sabia como pedir informação pelo WhatsApp",
      "Não sabia quais dias ou horários eram destinados aos consulentes",
      "Não sabia a diferença entre conversar com uma entidade e receber apenas passe/benção",
      "Não sabia o que fazer em caso de retorno solicitado",
      "Não sabia se poderia pedir atendimento com uma entidade específica",
      "Não consegui contato ou resposta pelo WhatsApp",
      "Outro",
    ].map(option),
  },
  {
    key: "consulente_entidade_especifica",
    label: "Ficou claro para você como é definida a entidade ou linha de atendimento?",
    helper: "A ideia é entender se o processo ficou claro, sem tratar de conteúdo pessoal ou espiritual do atendimento.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Sim, ficou claro",
      "Mais ou menos",
      "Não ficou claro",
      "Eu achava que poderia escolher uma entidade específica",
      "Eu sabia que poderia haver orientação por linha, mas não por entidade específica",
      "Não sei avaliar",
      "Não se aplica / ainda não fui atendido(a)",
    ].map(option),
  },
  {
    key: "consulente_chegada_clareza",
    label: "Ao chegar, ficou claro o que você deveria fazer?",
    helper: "Pense na orientação inicial, recepção, senha, ficha, espera e encaminhamento.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Sim, ficou muito claro",
      "Ficou claro, mas poderia ser mais simples",
      "Tive algumas dúvidas",
      "Fiquei inseguro(a) sobre o que fazer",
      "Não se aplica / ainda não fui presencialmente",
    ].map(option),
  },
  {
    key: "consulente_menos_claro",
    label: "Ao chegar ou buscar atendimento, o que ficou menos claro?",
    helper: "Marque os pontos que poderiam ser melhor explicados para consulentes e visitantes.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Se eu precisava retirar senha",
      "Se eu seria atendido(a) por ordem de chegada",
      "Se minha ficha indicaria a entidade de atendimento",
      "Se eu poderia escolher uma entidade específica",
      "Se havia diferença entre atendimento, passe/benção e retorno",
      "Onde aguardar",
      "Com quem tirar dúvidas gerais",
      "O processo ficou claro para mim",
      "Não se aplica / ainda não fui presencialmente",
      "Outro",
    ].map(option),
  },
  {
    key: "consulente_acolhimento",
    label: "Como você avalia o acolhimento inicial recebido?",
    helper: "Não é avaliação de pessoas específicas; é para entender a experiência de chegada.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Muito acolhedor e respeitoso",
      "Bom, mas pode melhorar em alguns pontos",
      "Regular",
      "Não me senti bem orientado(a)",
      "Não se aplica / ainda não fui presencialmente",
      "Prefiro não responder",
    ].map(option),
  },
  {
    key: "consulente_espera",
    label: "Durante a espera, o que poderia ajudar?",
    helper: "Marque as opções que tornariam o momento mais tranquilo e organizado.",
    type: "multiple",
    required: true,
    allowComment: true,
    options: [
      "Explicação simples sobre o fluxo do atendimento",
      "Mais clareza sobre a ordem de chamada",
      "Orientações gerais por escrito ou cartaz",
      "Previsão aproximada de tempo de espera",
      "Explicação sobre retornos ou agendamentos",
      "Explicação sobre atendimento, passe/benção e ficha",
      "Melhor sinalização dos espaços",
      "Canal para tirar dúvidas gerais",
      "Nada, a espera foi tranquila",
      "Não se aplica / ainda não fui presencialmente",
      "Outro",
    ].map(option),
  },
  {
    key: "consulente_depois_atendimento",
    label: "Depois do atendimento, ficou claro se havia alguma orientação geral ou próximo passo?",
    helper: "Não compartilhe conteúdo pessoal ou espiritual; responda apenas sobre a clareza do processo.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Sim, ficou claro",
      "Parcialmente",
      "Não ficou claro",
      "Não houve orientação ou próximo passo",
      "Fiquei com dúvida sobre retorno ou novo agendamento",
      "Não se aplica / ainda não fui atendido(a)",
      "Prefiro não responder",
    ].map(option),
  },
  {
    key: "consulente_melhoria_prioridade",
    label: "O que mais tornaria a experiência do consulente mais tranquila?",
    helper: "Escolha uma melhoria que, na sua visão, faria mais diferença.",
    type: "single",
    required: true,
    allowComment: true,
    options: [
      "Informações antes da visita",
      "Orientação mais clara sobre agendamento",
      "Orientação mais clara na chegada",
      "Explicação sobre senha, ficha e ordem de atendimento",
      "Explicação sobre diferença entre atendimento, passe/benção e retorno",
      "Melhor sinalização dentro da casa",
      "Mais clareza sobre espera e ordem de atendimento",
      "Página simples com orientações para consulentes",
      "Canal para dúvidas gerais",
      "A experiência já foi tranquila",
      "Outro",
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
  const uniqueRoleKeys = Array.from(new Set(roleKeys));

  if (uniqueRoleKeys.length === 1 && uniqueRoleKeys[0] === CONSULENTE_ROLE_KEY) {
    return consulenteQuestions;
  }

  const seen = new Set<string>();
  const questions: SurveyQuestion[] = [];

  for (const question of internalCommonQuestions) {
    if (!seen.has(question.key)) {
      questions.push(question);
      seen.add(question.key);
    }
  }

  for (const roleKey of uniqueRoleKeys) {
    if (roleKey === CONSULENTE_ROLE_KEY) continue;
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
