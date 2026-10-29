-- Plug Aprova: painel da agência passa a exigir login (Supabase Auth) em vez da senha fixa.
-- Todas as regras da agência (tabelas e bucket "criativos") usam is_agency(), então basta trocar a função.
-- As regras dos clientes (link com token) não mudam.
create or replace function public.is_agency()
returns boolean
language sql
stable
as $$
  select auth.role() = 'authenticated';
$$;

-- a conferência da senha antiga deixa de existir
drop function if exists public.check_agency_pass(text);
