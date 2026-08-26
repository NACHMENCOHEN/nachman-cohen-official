import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("stories")
      .select("id, media_type, storage_path, caption, event_title, duration_ms, created_at, expires_at")
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) throw error;

    const stories = [];
    for (const s of data ?? []) {
      const { data: signed } = await supabase.storage
        .from("stories")
        .createSignedUrl(s.storage_path, 60 * 60 * 6);
      if (!signed?.signedUrl) continue;
      stories.push({ ...s, media_url: signed.signedUrl });
    }

    return new Response(JSON.stringify({ stories }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
    });
  } catch (e) {
    console.error("get-stories failed", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg, stories: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
