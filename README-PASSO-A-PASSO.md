# Escuta TUCXA - passo a passo rápido

## 1. Copiar arquivos para o projeto local

No PowerShell, a partir da pasta onde você extraiu este pacote:

```powershell
.\scripts\apply-escuta-files.ps1 -ProjectPath "C:\Users\lacos\Documents\GitHub\tucxa-escuta"
```

Ajuste o caminho acima para a pasta real do projeto.

## 2. Instalar dependências

Dentro do projeto `tucxa-escuta`:

```powershell
npm install @supabase/supabase-js zod
```

## 3. Configurar variáveis de ambiente

Crie o arquivo `.env.local` com base em `.env.local.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
ADMIN_SURVEY_TOKEN=troque-por-um-token-grande-e-seguro
```

## 4. Criar tabelas no Supabase

No Supabase do projeto "Tucxa Escuta", abra SQL Editor e execute:

```txt
supabase/001_create_escuta_tucxa.sql
```

## 5. Testar localmente

```powershell
npm run lint
npm run build
npm run dev
```

Acesse:

```txt
http://localhost:3000/pesquisa
http://localhost:3000/pesquisa/consulente
http://localhost:3000/admin/pesquisa-tucxa?token=SEU_TOKEN
```

## 6. Publicar na Vercel

Configure as mesmas variáveis de ambiente na Vercel:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_SURVEY_TOKEN
```

Depois:

```powershell
git add .
git commit -m "Cria pesquisa Escuta TUCXA"
git push
```

## 7. Links finais

Pesquisa interna para Recados TUCXA:

```txt
https://SEU-DOMINIO.vercel.app/pesquisa
```

Pesquisa de consulentes:

```txt
https://SEU-DOMINIO.vercel.app/pesquisa/consulente
```

Painel admin:

```txt
https://SEU-DOMINIO.vercel.app/admin/pesquisa-tucxa?token=SEU_TOKEN
```
