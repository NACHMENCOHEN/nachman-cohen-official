import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://nachmancohen.com";
const FROM_EMAIL = "updates@nachmancohen.com";
const FROM_NAME = "Nachman Cohen Music";
const REPLY_TO_EMAIL = "ncgraphics2023@gmail.com";
const REPLY_TO_NAME = "Nachman Cohen";
const TEST_EMAIL = "ncgraphics2023@gmail.com";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function broadcastHtml(opts: { title: string; description: string; link: string; buttonText: string; imageUrl: string; unsubUrl: string }) {
  const { title, description, link, buttonText, imageUrl, unsubUrl } = opts;
  const button = link && buttonText
    ? `<p style="text-align:center;margin:28px 0;"><a href="${escapeHtml(link)}" style="display:inline-block;background:linear-gradient(135deg,#D6B37A,#b8954f);color:#0B0B0B;font-weight:700;text-decoration:none;padding:14px 30px;border-radius:999px;font-size:15px;">${escapeHtml(buttonText)}</a></p>`
    : "";
  const cover = imageUrl
    ? `<p style="margin:0 0 24px;text-align:center;"><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" style="display:block;width:100%;max-width:600px;height:auto;border-radius:12px;border:0;outline:none;text-decoration:none;margin:0 auto;" /></p>`
    : "";
  return `<!doctype html><html lang="he" dir="rtl"><body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Heebo,sans-serif;color:#EDEDED;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#141414;border:1px solid #2a2520;border-radius:14px;overflow:hidden;text-align:right;">
        <tr><td>
          <div style="background:linear-gradient(135deg,#1a1410,#0B0B0B);padding:24px 28px;border-bottom:1px solid #2a2520;text-align:center;">
            <p style="font-family:Georgia,serif;color:#D6B37A;font-size:12px;letter-spacing:3px;margin:0;text-transform:uppercase;">Nachman Cohen Music</p>
            <p style="font-family:Georgia,serif;color:#EDEDED;font-size:18px;margin:6px 0 0;">נחמן כהן</p>
          </div>
          <div style="padding:32px 28px;">
          ${cover}
          <h1 style="font-family:Georgia,serif;color:#EDEDED;font-size:26px;margin:0 0 18px;line-height:1.4;">${escapeHtml(title)}</h1>
          <p style="font-size:15px;line-height:1.9;margin:0;color:#cfcfcf;white-space:pre-wrap;">${escapeHtml(description)}</p>
          ${button}
          <hr style="border:none;border-top:1px solid #2a2520;margin:28px 0;"/>
          <p style="font-size:12px;color:#8a8a8a;line-height:1.7;text-align:center;">
            קיבלתם את המייל הזה כי נרשמתם לעדכונים באתר של נחמן כהן.<br/>
            <a href="${unsubUrl}" style="color:#D6B37A;text-decoration:underline;">להסרה מרשימת התפוצה לחצו כאן</a>
          </p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

async function sendBrevo(payload: unknown) {
  const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
  if (!BREVO_API_KEY) throw new Error("BREVO_API_KEY is not configured");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error("Brevo error:", res.status, text);
    throw new Error(`Brevo ${res.status}: ${text}`);
  }
  console.log("Brevo OK:", text);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

  // Verify caller is admin
  const authHeader = req.headers.get("Authorization") || "";
  const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: userRes } = await userClient.auth.getUser();
  const user = userRes?.user;
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const admin = createClient(supabaseUrl, serviceKey);
  const { data: roleRow } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  if (!roleRow) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const { title, description, link, buttonText, imageUrl, test } = await req.json();
    if (!title || typeof title !== "string") {
      return new Response(JSON.stringify({ error: "כותרת חסרה" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const cleanTitle = title.trim().slice(0, 200);
    const cleanDesc = (description || "").toString().trim().slice(0, 2000);
    const cleanLink = (link || "").toString().trim().slice(0, 500);
    const cleanBtn = (buttonText || "").toString().trim().slice(0, 60);
    const cleanImage = (imageUrl || "").toString().trim().slice(0, 800);
    const safeImage = /^https:\/\//i.test(cleanImage) ? cleanImage : "";

    let subs: { email: string; name: string; unsubscribe_token: string }[];
    if (test) {
      subs = [{ email: TEST_EMAIL, name: "Test", unsubscribe_token: "test-token" }];
    } else {
      const { data, error } = await admin.from("subscribers").select("email, name, unsubscribe_token").eq("status", "active");
      if (error) throw error;
      subs = (data || []) as typeof subs;
    }

    let sent = 0;
    const errors: string[] = [];
    for (const s of subs) {
      const unsubUrl = `${SITE_URL}/unsubscribe?token=${s.unsubscribe_token}`;
      try {
        await sendBrevo({
          sender: { name: FROM_NAME, email: FROM_EMAIL },
          replyTo: { email: REPLY_TO_EMAIL, name: REPLY_TO_NAME },
          to: [{ email: s.email, name: s.name }],
          subject: test ? `[בדיקה] ${cleanTitle}` : cleanTitle,
          htmlContent: broadcastHtml({ title: cleanTitle, description: cleanDesc, link: cleanLink, buttonText: cleanBtn, imageUrl: safeImage, unsubUrl }),
        });
        sent++;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "err";
        errors.push(`${s.email}: ${msg}`);
      }
    }

    const status = errors.length === 0 ? "sent" : sent > 0 ? "partial" : "failed";
    await admin.from("broadcast_logs").insert({
      title: test ? `[בדיקה] ${cleanTitle}` : cleanTitle,
      description: cleanDesc,
      link: cleanLink,
      button_text: cleanBtn,
      image_url: safeImage || null,
      recipients_count: sent,
      status,
      error_message: errors.slice(0, 20).join("\n") || null,
      sent_by: user.id,
    });

    return new Response(JSON.stringify({ success: true, sent, total: subs.length, errors: errors.length, test: !!test }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown";
    console.error(e);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});