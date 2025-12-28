import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  client_id?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, utm_source, utm_medium, utm_campaign, gclid, fbclid, msclkid, client_id }: ContactRequest = await req.json();
    
    console.log("Processing contact form submission:", { name, email, utm_source, utm_medium, utm_campaign, gclid, fbclid, msclkid, client_id });

    // 1. Create HubSpot contact
    const hubspotApiKey = Deno.env.get("HUBSPOT_API_KEY");
    if (hubspotApiKey) {
      try {
        const hubspotResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${hubspotApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            properties: {
              firstname: name.split(" ")[0],
              lastname: name.split(" ").slice(1).join(" ") || "",
              email: email,
              message: message,
              hs_analytics_source: utm_source || "",
              utm_medium: utm_medium || "",
              utm_campaign: utm_campaign || "",
              gclid: gclid || "",
              fbclid: fbclid || "",
              msclkid: msclkid || "",
              client_id: client_id || "",
            },
          }),
        });

        if (hubspotResponse.ok) {
          console.log("HubSpot contact created successfully");
        } else {
          const errorData = await hubspotResponse.text();
          console.error("HubSpot error:", errorData);
          // Continue even if HubSpot fails - don't block the form
        }
      } catch (hubspotError) {
        console.error("HubSpot request failed:", hubspotError);
      }
    }

    // 2. Send notification email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Motabar's Website <onboarding@resend.dev>",
            to: ["motabar.javaid@gmail.com"],
            subject: `🔔 New Lead: ${name}`,
            html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f0f14;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f0f14; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a24 0%, #12121a 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(139, 92, 246, 0.15);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                ✨ New Lead Incoming!
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
                ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="padding: 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                    <p style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">${name}</p>
                    <a href="mailto:${email}" style="color: #8b5cf6; font-size: 14px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 20px; border-left: 4px solid #8b5cf6;">
                    <p style="margin: 0 0 8px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <p style="margin: 0; color: #e4e4e7; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Tracking Data -->
          ${(utm_source || utm_medium || utm_campaign || gclid || fbclid || msclkid || client_id) ? `
          <tr>
            <td style="padding: 0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 16px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📊 Attribution Data</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${utm_source ? `<tr><td style="color: #71717a; font-size: 13px; padding: 4px 0;">Source:</td><td style="color: #e4e4e7; font-size: 13px; padding: 4px 0;">${utm_source}</td></tr>` : ''}
                      ${utm_medium ? `<tr><td style="color: #71717a; font-size: 13px; padding: 4px 0;">Medium:</td><td style="color: #e4e4e7; font-size: 13px; padding: 4px 0;">${utm_medium}</td></tr>` : ''}
                      ${utm_campaign ? `<tr><td style="color: #71717a; font-size: 13px; padding: 4px 0;">Campaign:</td><td style="color: #e4e4e7; font-size: 13px; padding: 4px 0;">${utm_campaign}</td></tr>` : ''}
                      ${gclid ? `<tr><td style="color: #71717a; font-size: 13px; padding: 4px 0;">Google Click ID:</td><td style="color: #e4e4e7; font-size: 13px; padding: 4px 0; word-break: break-all;">${gclid}</td></tr>` : ''}
                      ${fbclid ? `<tr><td style="color: #71717a; font-size: 13px; padding: 4px 0;">Facebook Click ID:</td><td style="color: #e4e4e7; font-size: 13px; padding: 4px 0; word-break: break-all;">${fbclid}</td></tr>` : ''}
                      ${msclkid ? `<tr><td style="color: #71717a; font-size: 13px; padding: 4px 0;">Microsoft Click ID:</td><td style="color: #e4e4e7; font-size: 13px; padding: 4px 0; word-break: break-all;">${msclkid}</td></tr>` : ''}
                      ${client_id ? `<tr><td style="color: #71717a; font-size: 13px; padding: 4px 0;">GA Client ID:</td><td style="color: #e4e4e7; font-size: 13px; padding: 4px 0;">${client_id}</td></tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          <!-- Footer -->
          <tr>
            <td style="background-color: rgba(0,0,0,0.3); padding: 24px 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; color: #71717a; font-size: 12px;">
                Lead captured from <a href="https://motabar.com" style="color: #8b5cf6; text-decoration: none;">motabar.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
            `,
          }),
        });

        if (resendResponse.ok) {
          console.log("Notification email sent successfully");
        } else {
          const errorData = await resendResponse.text();
          console.error("Resend error:", errorData);
        }
      } catch (emailError) {
        console.error("Email send failed:", emailError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Contact form submitted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
