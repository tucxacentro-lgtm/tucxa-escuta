-- Escuta TUCXA - estrutura inicial / migração segura
-- Execute este script no SQL Editor do Supabase do projeto "Tucxa Escuta".
--
-- Este script é seguro para rodar mais de uma vez.
-- Ele mantém compatibilidade entre a versão antiga com role_key/role_label
-- e a versão nova com role_keys/role_labels, permitindo múltiplas funções.

create extension if not exists pgcrypto;

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  campaign_key text not null default 'escuta-tucxa-2026',
  role_key text not null default 'nao_informado',
  role_label text not null default 'Não informado',
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
  add column if not exists role_key text,
  add column if not exists role_label text,
  add column if not exists role_keys text[] not null default '{}',
  add column if not exists role_labels text[] not null default '{}',
  add column if not exists identified boolean not null default false,
  add column if not exists name text,
  add column if not exists whatsapp text,
  add column if not exists allow_contact boolean not null default false,
  add column if not exists submitted_at timestamptz not null default now(),
  add column if not exists user_agent text;

-- Ajusta colunas antigas para não bloquearem inserts novos.
alter table public.survey_responses
  alter column role_key set default 'nao_informado',
  alter column role_label set default 'Não informado';

update public.survey_responses
   set role_key = coalesce(role_key, role_keys[1], 'nao_informado')
 where role_key is null;

update public.survey_responses
   set role_label = coalesce(role_label, role_labels[1], 'Não informado')
 where role_label is null;

alter table public.survey_responses
  alter column role_key set not null,
  alter column role_label set not null;

-- Sincroniza dados antigos e novos.
update public.survey_responses
   set role_keys = array[role_key]
 where coalesce(array_length(role_keys, 1), 0) = 0
   and role_key is not null;

update public.survey_responses
   set role_labels = array[role_label]
 where coalesce(array_length(role_labels, 1), 0) = 0
   and role_label is not null;

update public.survey_responses
   set role_key = role_keys[1]
 where (role_key = 'nao_informado' or role_key is null)
   and coalesce(array_length(role_keys, 1), 0) > 0;

update public.survey_responses
   set role_label = role_labels[1]
 where (role_label = 'Não informado' or role_label is null)
   and coalesce(array_length(role_labels, 1), 0) > 0;

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

update public.survey_answers
   set question_key = coalesce(question_key, 'pergunta_sem_chave')
 where question_key is null;

update public.survey_answers
   set question_label = coalesce(question_label, 'Pergunta sem título')
 where question_label is null;

update public.survey_answers
   set question_type = coalesce(question_type, 'multiple')
 where question_type is null;

alter table public.survey_answers
  alter column question_key set not null,
  alter column question_label set not null,
  alter column question_type set not null;

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

create index if not exists idx_survey_responses_role_key
  on public.survey_responses (role_key);

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
  r.role_key,
  r.role_label,
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
  r.role_key,
  r.role_label,
  r.role_keys,
  r.role_labels,
  r.identified,
  r.name,
  r.whatsapp,
  r.allow_contact,
  r.submitted_at;
