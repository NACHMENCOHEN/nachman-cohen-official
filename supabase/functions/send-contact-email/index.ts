import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ARTIST_EMAIL = "Ncgraphics2023@gmail.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message, formType } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const isBooking = formType === "booking";
    const subjectLine = isBooking
      ? `New Booking Request from ${name}`
      : `New Contact Message from ${name}`;

    // Build the email body for the artist
    const artistEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #c8a45a; padding-bottom: 10px;">
          ${isBooking ? "🎤 New Booking Request" : "📩 New Contact Message"}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">${isBooking ? "Event Details:" : "Message:"}</td><td style="padding: 8px 0;">${message}</td></tr>
        </table>
        <p style="margin-top: 20px; color: #888; font-size: 12px;">Sent from nachmancohen.com</p>
      </div>
    `;

    // Build confirmation email for the customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <h2 style="color: #333;">Thank You, ${name}!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thank you for contacting Nachman Cohen. We received your message and will get back to you soon.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">Nachman Cohen – Official Website</p>
      </div>
    `;

    // Send email to artist
    const { error: artistError } = await supabase.functions.invoke("send-email-internal", {
      body: { to: ARTIST_EMAIL, subject: subjectLine, html: artistEmailHtml },
    });

    // Send confirmation to customer
    const { error: confirmError } = await supabase.functions.invoke("send-email-internal", {
      body: { to: email, subject: "Thank you for contacting Nachman Cohen", html: confirmationHtml },
    });

    if (artistError || confirmError) {
      console.error("Email errors:", { artistError, confirmError });
    }

    // Store submission in database
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
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
