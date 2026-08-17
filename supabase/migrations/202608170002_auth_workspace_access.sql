-- Authenticated workspace resolution for VE One login.
-- The function exposes only companies assigned to the signed-in user.

create or replace function public.get_my_workspaces()
returns table (
  tenant_id uuid,
  company_id uuid,
  company_name text,
  role text,
  is_default boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select
    membership.tenant_id,
    company.id as company_id,
    company.name as company_name,
    membership.role,
    access.is_default
  from public.tenant_memberships membership
  join public.user_company_access access
    on access.membership_id = membership.id
  join public.companies company
    on company.id = access.company_id
   and company.tenant_id = membership.tenant_id
  where membership.user_id = auth.uid()
    and membership.status = 'active'
    and coalesce(company.status, 'active') = 'active'
  order by access.is_default desc, company.name asc;
$$;

revoke all on function public.get_my_workspaces() from public;
grant execute on function public.get_my_workspaces() to authenticated;

comment on function public.get_my_workspaces() is
  'Returns only company workspaces explicitly assigned to the authenticated VE One user.';
