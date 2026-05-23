# Ajustes de validação — Escuta TUCXA

Arquivos ajustados:

- `src/components/SurveyForm.tsx`
- `src/components/QuestionCard.tsx`
- `src/app/api/pesquisa/submit/route.ts`

## Comportamentos implementados

1. Bloqueia envio se a pessoa não marcar se deseja se identificar ou responder anonimamente.
2. Bloqueia envio se a pessoa escolher se identificar, mas não informar nome com pelo menos 2 caracteres.
3. Bloqueia envio se não houver função/papel selecionado na pesquisa interna.
4. Bloqueia envio se qualquer pergunta obrigatória estiver sem resposta.
5. Exige comentário com pelo menos 10 caracteres quando a pessoa marca “Outro” ou “Prefiro explicar no comentário”.
6. Destaca visualmente o bloco pendente.
7. Rola automaticamente até o primeiro bloco pendente.
8. Mostra mensagem clara do que falta responder.
9. Repete as validações no servidor em `/api/pesquisa/submit`.

## Observação sobre texto livre

Os comentários continuam opcionais nas perguntas comuns. Porém, quando a pessoa marca “Outro” ou “Prefiro explicar no comentário”, o comentário passa a ser obrigatório, com mínimo de 10 caracteres.
