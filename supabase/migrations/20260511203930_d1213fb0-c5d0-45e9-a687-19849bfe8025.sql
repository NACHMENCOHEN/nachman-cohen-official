ALTER TABLE public.broadcast_logs
  ADD COLUMN IF NOT EXISTS youtube_url text,
  ADD COLUMN IF NOT EXISTS spotify_url text,
  ADD COLUMN IF NOT EXISTS apple_music_url text,
  ADD COLUMN IF NOT EXISTS instagram_url text,
  ADD COLUMN IF NOT EXISTS telegram_url text,
  ADD COLUMN IF NOT EXISTS website_url text;