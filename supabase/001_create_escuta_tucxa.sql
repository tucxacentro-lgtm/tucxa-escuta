-- Escuta TUCXA - estrutura inicial / migração segura
-- Execute este script no SQL Editor do Supabase do projeto "Tucxa Escuta".
--
-- Este script é seguro para rodar mais de uma vez.
-- Ele também corrige instalações que tenham sido criadas com colunas antigas
-- role_key/role_label, adicionando role_keys/role_labels para permitir múltiplas funções.

create extension if not exists pgcrypto;

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  campaign_key text not null default 'escuta-tucxa-2026',
  role_keys text[] not null default '{}',
  role_labels text[] not null default '{}',
  identified boolean not null default false,
  name text,
  whatsapp text,
  allow_contact boolean not null default false,
  submitted_at timestamptz not null default now(),
  user_agent text
);

-- Garante compatibilidade caso a tabela já exista de uma versão anterior.
alter table public.survey_responses
  add column if not exists campaign_key text not null default 'escuta-tucxa-2026',
  add column if not exists role_keys text[] not null default '{}',
  add column if not exists role_labels text[] not null default '{}',
  add column if not exists identified boolean not null default false,
  add column if not exists name text,
  add column if not exists whatsapp text,
  add column if not exists allow_contact boolean not null default false,
  add column if not exists submitted_at timestamptz not null default now(),
  add column if not exists user_agent text;

-- Se você chegou a criar a versão antiga com role_key/role_label, preserva esses dados
-- copiando para os novos campos em formato de lista.
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'survey_responses'
      and column_name = 'role_key'
  ) then
    execute $sql$
      update public.survey_responses
         set role_keys = array[role_key]
       where coalesce(array_length(role_keys, 1), 0) = 0
         and role_key is not null
    $sql$;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'survey_responses'
      and column_name = 'role_label'
  ) then
    execute $sql$
      update public.survey_responses
         set role_labels = array[role_label]
       where coalesce(array_length(role_labels, 1), 0) = 0
         and role_label is not null
    $sql$;
  end if;
end $$;

create table if not exists public.survey_answers (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.survey_responses(id) on delete cascade,
  question_key text not null,
  question_label text not null,
  question_type text not null check (question_type in ('single', 'multiple')),
  selected_options jsonb not null default '[]'::jsonb,
  comment text,
  created_at timestamptz not null default now()
);

-- Garante compatibilidade caso a tabela já exista parcialmente.
alter table public.survey_answers
  add column if not exists response_id uuid references public.survey_responses(id) on delete cascade,
  add column if not exists question_key text,
  add column if not exists question_label text,
  add column if not exists question_type text,
  add column if not exists selected_options jsonb not null default '[]'::jsonb,
  add column if not exists comment text,
  add column if not exists created_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'survey_answers_question_type_check'
      and conrelid = 'public.survey_answers'::regclass
  ) then
    alter table public.survey_answers
      add constraint survey_answers_question_type_check
      check (question_type in ('single', 'multiple'));
  end if;
end $$;

create index if not exists idx_survey_responses_campaign_submitted
  on public.survey_responses (campaign_key, submitted_at desc);

create index if not exists idx_survey_responses_roles
  on public.survey_responses using gin (role_keys);

create index if not exists idx_survey_answers_response
  on public.survey_answers (response_id);

create index if not exists idx_survey_answers_question
  on public.survey_answers (question_key);

alter table public.survey_responses enable row level security;
alter table public.survey_answers enable row level security;

-- Não criamos policies públicas neste MVP.
-- As respostas são gravadas e lidas por API Routes do Next.js usando SUPABASE_SERVICE_ROLE_KEY.
-- Isso evita expor insert/select direto no navegador.

drop view if exists public.v_survey_response_summary;

create view public.v_survey_response_summary as
select
  r.id,
  r.campaign_key,
  r.role_keys,
  r.role_labels,
  r.identified,
  case when r.identified then r.name else null end as name,
  case when r.identified then r.whatsapp else null end as whatsapp,
  r.allow_contact,
  r.submitted_at,
  count(a.id) as total_answers
from public.survey_responses r
left join public.survey_answers a on a.response_id = r.id
group by
  r.id,
  r.campaign_key,
  r.role_keys,
  r.role_labels,
  r.identified,
  r.name,
  r.whatsapp,
  r.allow_contact,
  r.submitted_at;
