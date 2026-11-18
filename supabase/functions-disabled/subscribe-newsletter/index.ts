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

const DEFAULT_SOCIAL = {
  website: "https://nachmancohen.com",
  youtube: "https://youtube.com/@nachman_cohen",
  instagram: "https://www.instagram.com/nachmencohen",
  tiktok: "https://www.tiktok.com/@nachman_cohen_music",
  spotify: "https://open.spotify.com/artist/3FW9FTp7VhD1x4B9TMN2iF",
  appleMusic:
    "https://music.apple.com/gb/artist/%D7%A0%D7%97%D7%9E%D7%9F-%D7%9B%D7%94%D7%9F-nachmancohen/1895101943",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function socialIconsHtml() {
  const iconBase = "https://img.icons8.com/ios-filled/64/D6B37A";
  const items = [
    { url: DEFAULT_SOCIAL.website, icon: `${iconBase}/domain.png`, label: "Website" },
    { url: DEFAULT_SOCIAL.youtube, icon: `${iconBase}/youtube-play.png`, label: "YouTube" },
    { url: DEFAULT_SOCIAL.instagram, icon: `${iconBase}/instagram-new.png`, label: "Instagram" },
    { url: DEFAULT_SOCIAL.tiktok, icon: `${iconBase}/tiktok.png`, label: "TikTok" },
    { url: DEFAULT_SOCIAL.spotify, icon: `${iconBase}/spotify.png`, label: "Spotify" },
    { url: DEFAULT_SOCIAL.appleMusic, icon: `${iconBase}/apple-music.png`, label: "Apple" },
  ];
  const cells = items
    .map(
      (i) =>
        `<td style="padding:0 6px;vertical-align:top;" align="center"><a href="${escapeHtml(i.url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;text-decoration:none;color:#D6B37A;font-family:Arial,Heebo,sans-serif;font-size:11px;font-weight:700;"><img src="${i.icon}" width="28" height="28" alt="${escapeHtml(i.label)}" border="0" style="display:block;border:0;outline:none;width:28px;height:28px;margin:0 auto 4px;" /><span style="color:#D6B37A;white-space:nowrap;text-decoration:none;">${escapeHtml(i.label)}</span></a></td>`,
    )
    .join("");
  return `<table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:24px auto 8px;"><tr>${cells}</tr></table>`;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function sendBrevo(payload: unknown) {
  const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
  if (!BREVO_API_KEY) {
    throw new Error("Missing email credentials");
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Brevo error ${res.status}: ${body}`);
  return body;
}

function welcomeHtml(name: string, unsubUrl: string) {
  const safeName = escapeHtml(name);
  return `<!doctype html><html lang="he" dir="rtl"><body style="margin:0;padding:0;background:#0B0B0B;font-family:Arial,Heebo,sans-serif;color:#EDEDED;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#141414;border:1px solid #2a2520;border-radius:14px;text-align:right;">
        <tr><td style="padding:36px 28px;">
          <div style="text-align:center;margin:0 0 24px;">
            <p style="font-family:Georgia,serif;color:#D6B37A;font-size:12px;letter-spacing:3px;margin:0;text-transform:uppercase;">Nachman Cohen Music</p>
            <p style="font-family:Georgia,serif;color:#EDEDED;font-size:20px;margin:6px 0 0;">נחמן כהן</p>
          </div>
          <p style="font-size:16px;line-height:1.8;margin:0 0 14px;">שלום ${safeName},</p>
          <p style="font-size:15px;line-height:1.9;margin:0 0 14px;color:#cfcfcf;">
            תודה שנרשמתם לעדכונים של נחמן כהן 🎶
          </p>
          <p style="font-size:15px;line-height:1.9;margin:0 0 14px;color:#cfcfcf;">
            מהיום תקבלו כאן עדכונים ראשונים על שירים חדשים, קליפים, ביצועים מיוחדים ועדכונים חשובים.
          </p>
          <p style="font-size:15px;line-height:1.9;margin:0 0 18px;color:#cfcfcf;">
            שמחים שאתם איתנו.
          </p>
          <p style="font-size:15px;line-height:1.9;margin:0;color:#D6B37A;font-family:Georgia,serif;">נחמן כהן Music</p>
          ${socialIconsHtml()}
          <hr style="border:none;border-top:1px solid #2a2520;margin:28px 0 18px;"/>
          <p style="font-size:12px;color:#8a8a8a;line-height:1.7;text-align:center;">
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

    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, unsubscribe_token, status, welcome_email_status")
      .eq("email", cleanEmail)
      .maybeSingle();

    let token: string;
    let subscriberId: string;
    // Send welcome only for brand-new subscribers OR reactivated (was unsubscribed)
    let shouldSendWelcome = false;

    if (existing) {
      token = existing.unsubscribe_token;
      subscriberId = existing.id;
      const wasUnsubscribed = existing.status === "unsubscribed";
      await supabase
        .from("subscribers")
        .update({ name: cleanName, status: "active", subscribed_at: new Date().toISOString() })
        .eq("id", existing.id);
      // Reactivation -> resend welcome. Otherwise (already active) -> do not resend.
      shouldSendWelcome = wasUnsubscribed;
    } else {
      const { data: inserted, error } = await supabase
        .from("subscribers")
        .insert({ name: cleanName, email: cleanEmail })
        .select("id, unsubscribe_token")
        .single();
      if (error) throw error;
      token = inserted.unsubscribe_token;
      subscriberId = inserted.id;
      shouldSendWelcome = true;
    }

    const unsubUrl = `${SITE_URL}/unsubscribe?token=${token}`;

    if (shouldSendWelcome) {
      try {
        await sendBrevo({
          sender: { name: FROM_NAME, email: FROM_EMAIL },
          replyTo: { email: REPLY_TO_EMAIL, name: REPLY_TO_NAME },
          to: [{ email: cleanEmail, name: cleanName }],
          subject: "תודה שנרשמתם לעדכונים של נחמן כהן",
          htmlContent: welcomeHtml(cleanName, unsubUrl),
        });
        await supabase
          .from("subscribers")
          .update({
            welcome_email_status: "sent",
            welcome_email_sent_at: new Date().toISOString(),
            welcome_email_error: null,
          })
          .eq("id", subscriberId);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error("Welcome email failed", msg);
        await supabase
          .from("subscribers")
          .update({ welcome_email_status: "failed", welcome_email_error: msg.slice(0, 1000) })
          .eq("id", subscriberId);
      }
    } else {
      console.log("Skipping welcome email (already active subscriber)", cleanEmail);
    }

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Unknown";
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});