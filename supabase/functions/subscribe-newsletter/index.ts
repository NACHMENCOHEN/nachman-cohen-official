import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://nachmancohen.com";
const FROM_EMAIL = "ncgraphics2023@gmail.com";
const FROM_NAME = "נחמן כהן";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function sendBrevo(payload: unknown) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
  if (!LOVABLE_API_KEY || !BREVO_API_KEY) {
    throw new Error("Missing email credentials");
  }
  const res = await fetch("https://connector-gateway.lovable.dev/brevo/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Brevo error ${res.status}: ${body}`);
  return body;
}

function confirmationHtml(name: string, unsubUrl: string) {
  return `<!doctype html><html lang="he" dir="rtl"><body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Heebo,sans-serif;color:#EDEDED;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#141414;border:1px solid #2a2520;border-radius:14px;padding:36px 28px;text-align:right;">
        <tr><td>
          <h1 style="font-family:Georgia,serif;color:#D6B37A;font-size:26px;margin:0 0 18px;">נחמן כהן</h1>
          <p style="font-size:16px;line-height:1.8;margin:0 0 14px;">שלום ${name},</p>
          <p style="font-size:15px;line-height:1.9;margin:0 0 14px;color:#cfcfcf;">
            תודה שנרשמתם לעדכונים של נחמן כהן.<br/>
            נעדכן אתכם במייל כשיעלה שיר חדש, קליפ חדש או ביצוע מיוחד.
          </p>
          <p style="font-size:15px;line-height:1.9;margin:24px 0 0;color:#cfcfcf;">תודה,<br/>נחמן כהן</p>
          <hr style="border:none;border-top:1px solid #2a2520;margin:28px 0;"/>
          <p style="font-size:12px;color:#8a8a8a;line-height:1.7;">
            קיבלתם את המייל הזה כי נרשמתם לעדכונים באתר של נחמן כהן.<br/>
            <a href="${unsubUrl}" style="color:#D6B37A;text-decoration:underline;">להסרה מרשימת התפוצה לחצו כאן</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { name, email } = await req.json();
    if (!name || !email || typeof name !== "string" || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "שדות חסרים" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const cleanName = name.trim().slice(0, 120);
    const cleanEmail = email.trim().toLowerCase().slice(0, 254);
    if (!cleanName || !isEmail(cleanEmail)) {
      return new Response(JSON.stringify({ error: "פרטים לא תקינים" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Upsert by email - if exists set status active and refresh name
    const { data: existing } = await supabase.from("subscribers").select("id, unsubscribe_token, status").eq("email", cleanEmail).maybeSingle();

    let token: string;
    if (existing) {
      token = existing.unsubscribe_token;
      await supabase.from("subscribers").update({ name: cleanName, status: "active", subscribed_at: new Date().toISOString() }).eq("id", existing.id);
    } else {
      const { data: inserted, error } = await supabase.from("subscribers").insert({ name: cleanName, email: cleanEmail }).select("unsubscribe_token").single();
      if (error) throw error;
      token = inserted.unsubscribe_token;
    }

    const unsubUrl = `${SITE_URL}/unsubscribe?token=${token}`;

    try {
      await sendBrevo({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: cleanEmail, name: cleanName }],
        subject: "נרשמתם לעדכונים של נחמן כהן",
        htmlContent: confirmationHtml(cleanName, unsubUrl),
      });
    } catch (e) {
      console.error("Confirmation email failed", e);
    }

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Unknown";
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});