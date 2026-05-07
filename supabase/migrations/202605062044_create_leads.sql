create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  magnet_id text not null,
  source text default 'tourwise',
  created_at timestamptz default now()
);

create index if not exists leads_email_idx on leads (email);
