-- VE One core SaaS foundation.
-- This migration is intentionally limited to identity, tenancy, branches,
-- memberships and auditability. Business modules build on these keys.

create extension if not exists pgcrypto;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active'
    check (status in ('trial', 'active', 'suspended', 'closed')),
  default_currency char(3) not null default 'USD',
  default_locale text not null default 'en',
  timezone text not null default 'Asia/Baghdad',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.companies
  add column if not exists tenant_id uuid references public.tenants(id),
  add column if not exists legal_name text,
  add column if not exists code text,
  add column if not exists base_currency char(3) default 'USD',
  add column if not exists timezone text default 'Asia/Baghdad',
  add column if not exists status text default 'active',
  add column if not exists updated_at timestamptz default now();

create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  code text not null,
  country_code char(2) not null,
  city text not null,
  timezone text not null default 'Asia/Baghdad',
  is_head_office boolean not null default false,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);

create table if not exists public.tenant_memberships (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'employee',
  status text not null default 'active'
    check (status in ('invited', 'active', 'suspended', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, user_id)
);

create table if not exists public.user_company_access (
  membership_id uuid not null references public.tenant_memberships(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  is_default boolean not null default false,
  primary key (membership_id, company_id)
);

create table if not exists public.user_branch_access (
  membership_id uuid not null references public.tenant_memberships(id) on delete cascade,
  branch_id uuid not null references public.branches(id) on delete cascade,
  is_default boolean not null default false,
  primary key (membership_id, branch_id)
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  branch_id uuid references public.branches(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  before_data jsonb,
  after_data jsonb,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists companies_tenant_id_idx
  on public.companies (tenant_id);
create index if not exists branches_tenant_company_idx
  on public.branches (tenant_id, company_id);
create index if not exists memberships_user_tenant_idx
  on public.tenant_memberships (user_id, tenant_id);
create index if not exists audit_log_tenant_time_idx
  on public.audit_log (tenant_id, occurred_at desc);

alter table public.tenants enable row level security;
alter table public.branches enable row level security;
alter table public.tenant_memberships enable row level security;
alter table public.user_company_access enable row level security;
alter table public.user_branch_access enable row level security;
alter table public.audit_log enable row level security;

create or replace function public.is_tenant_member(requested_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tenant_memberships membership
    where membership.tenant_id = requested_tenant_id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
  );
$$;

revoke all on function public.is_tenant_member(uuid) from public;
grant execute on function public.is_tenant_member(uuid) to authenticated;

drop policy if exists "tenant members can read tenant" on public.tenants;
create policy "tenant members can read tenant"
on public.tenants for select to authenticated
using (public.is_tenant_member(id));

drop policy if exists "tenant members can read branches" on public.branches;
create policy "tenant members can read branches"
on public.branches for select to authenticated
using (public.is_tenant_member(tenant_id));

drop policy if exists "users can read own memberships" on public.tenant_memberships;
create policy "users can read own memberships"
on public.tenant_memberships for select to authenticated
using (user_id = auth.uid());

drop policy if exists "users can read own company access" on public.user_company_access;
create policy "users can read own company access"
on public.user_company_access for select to authenticated
using (
  exists (
    select 1 from public.tenant_memberships membership
    where membership.id = membership_id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
  )
);

drop policy if exists "users can read own branch access" on public.user_branch_access;
create policy "users can read own branch access"
on public.user_branch_access for select to authenticated
using (
  exists (
    select 1 from public.tenant_memberships membership
    where membership.id = membership_id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
  )
);

drop policy if exists "tenant members can read audit log" on public.audit_log;
create policy "tenant members can read audit log"
on public.audit_log for select to authenticated
using (public.is_tenant_member(tenant_id));

comment on table public.tenants is
  'Top-level SaaS isolation boundary. Every VE One business record must carry tenant_id.';
comment on table public.branches is
  'Operational branches such as Erbil, Baghdad, Basra, Sulaymaniyah, Zakho and Kirkuk.';
comment on table public.audit_log is
  'Append-only business audit trail. Application roles determine write access via server-side operations.';
