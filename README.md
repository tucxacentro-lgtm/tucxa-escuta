# Escuta TUCXA

Sistema institucional de pesquisas do TUCXA para coletar percepções, dúvidas e sugestões sobre acolhimento, comunicação, organização, eventos e processos da casa.

## Segurança e privacidade

O sistema:

- não solicita senhas pessoais;
- não solicita cartão de crédito;
- não solicita dados bancários;
- não realiza pagamentos;
- não oferece download de programas;
- permite identificação opcional nas pesquisas.

A página `/privacidade` explica a finalidade da coleta e os cuidados recomendados ao responder.

## Variáveis de ambiente

Crie `.env.local` com base em `.env.local.example`.

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
ADMIN_SURVEY_TOKEN=SEU_TOKEN_GRANDE_E_SEGURO
NEXT_PUBLIC_SITE_URL=https://tucxa-escuta.vercel.app
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

## Google Search Console

Para domínio `vercel.app`, prefira adicionar uma propriedade do tipo **URL-prefix** com:

```txt
https://tucxa-escuta.vercel.app
```

Depois escolha a verificação por **HTML tag**, copie apenas o valor de `content="..."` e configure em:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=valor_copiado_do_content
```

Faça novo deploy na Vercel e clique em **Verificar** no Search Console.

## Scripts

```bash
npm run lint
npm run build
npm run dev
```
