import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ARTIST_EMAIL = "Ncgraphics2023@gmail.com";

async function sendEmail(apiKey: string, to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Nachman Cohen <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Resend error:", data);
    throw new Error(`Resend API error: ${res.status}`);
  }
  return data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, phone, email, message, formType } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isBooking = formType === "booking";
    const subjectLine = isBooking
      ? `🎤 New Booking Request from ${name}`
      : `📩 New Contact Message from ${name}`;

    // Email to artist
    const artistHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #c8a45a; padding-bottom: 10px;">
          ${isBooking ? "New Booking Request" : "New Contact Message"}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 140px;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">${isBooking ? "Event Details:" : "Message:"}</td><td style="padding: 8px 0;">${message}</td></tr>
        </table>
        <p style="margin-top: 30px; color: #888; font-size: 12px;">Sent from nachmancohen.com</p>
      </div>
    `;

    // Confirmation to customer
    const confirmHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <h2 style="color: #333;">Thank You, ${name}!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thank you for contacting Nachman Cohen. We received your message and will get back to you soon.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">Nachman Cohen – Official Website</p>
      </div>
    `;

    // Send both emails
    await Promise.all([
      sendEmail(RESEND_API_KEY, ARTIST_EMAIL, subjectLine, artistHtml),
      sendEmail(RESEND_API_KEY, email, "Thank you for contacting Nachman Cohen", confirmHtml),
    ]);

    // Store in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("contact_submissions").insert({
      name,
      phone: phone || null,
      email,
      message,
      form_type: formType || "contact",
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
