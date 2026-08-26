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

    const now = new Date().toISOString();

    // Deactivate anything past its 24h window
    await supabase.from("stories").update({ is_active: false }).lt("expires_at", now).eq("is_active", true);

    // Purge media + rows older than 48h (grace window for admin review)
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: stale, error } = await supabase
      .from("stories")
      .select("id, storage_path")
      .lt("expires_at", cutoff)
      .limit(200);
    if (error) throw error;

    const paths = (stale ?? []).map((s) => s.storage_path).filter(Boolean);
    if (paths.length) {
      const { error: rmErr } = await supabase.storage.from("stories").remove(paths);
      if (rmErr) console.error("storage remove error", rmErr.message);
      await supabase
        .from("stories")
        .delete()
        .in("id", (stale ?? []).map((s) => s.id));
    }

    return new Response(JSON.stringify({ success: true, purged: paths.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("cleanup-stories failed", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
