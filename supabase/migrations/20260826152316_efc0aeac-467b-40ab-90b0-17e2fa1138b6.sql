CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

SELECT cron.unschedule('cleanup-stories-hourly')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup-stories-hourly');

SELECT cron.schedule(
  'cleanup-stories-hourly',
  '17 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://ikmznyumbojibbwmqpir.supabase.co/functions/v1/cleanup-stories',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);