create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  program text not null,
  subid text not null,
  user_agent text,
  referer text,
  created_at timestamptz default now()
);

create index if not exists affiliate_clicks_subid_idx on affiliate_clicks (subid);
create index if not exists affiliate_clicks_created_at_idx on affiliate_clicks (created_at);
