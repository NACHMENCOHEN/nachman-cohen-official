ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS welcome_email_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS welcome_email_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS welcome_email_error text;