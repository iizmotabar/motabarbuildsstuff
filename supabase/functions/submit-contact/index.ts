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

// Input sanitization to prevent XSS
const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

// Validate input lengths
const validateInputs = (name: string, email: string, message: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  if (name.length > 100) {
    return { valid: false, error: "Name must be less than 100 characters" };
  }
  if (!email || !isValidEmail(email)) {
    return { valid: false, error: "Valid email is required" };
  }
  if (!message || message.trim().length === 0) {
    return { valid: false, error: "Message is required" };
  }
  if (message.length > 5000) {
    return { valid: false, error: "Message must be less than 5000 characters" };
  }
  return { valid: true };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Extract and validate required fields
    const name = String(body.name || '');
    const email = String(body.email || '');
    const message = String(body.message || '');
    
    // Validate inputs
    const validation = validateInputs(name, email, message);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Sanitize all inputs for HTML email
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);
    
    // Optional tracking params - sanitize and limit length
    const utm_source = sanitizeInput(String(body.utm_source || '')).substring(0, 100);
    const utm_medium = sanitizeInput(String(body.utm_medium || '')).substring(0, 100);
    const utm_campaign = sanitizeInput(String(body.utm_campaign || '')).substring(0, 200);
    const gclid = sanitizeInput(String(body.gclid || '')).substring(0, 200);
    const fbclid = sanitizeInput(String(body.fbclid || '')).substring(0, 200);
    const msclkid = sanitizeInput(String(body.msclkid || '')).substring(0, 200);
    const client_id = sanitizeInput(String(body.client_id || '')).substring(0, 100);
    
    // Log without sensitive data
    console.log("Processing contact form submission:", { 
      name_length: name.length, 
      email_domain: email.split('@')[1] || 'unknown',
      has_utm: !!(utm_source || utm_medium || utm_campaign),
      has_click_ids: !!(gclid || fbclid || msclkid)
    });

    // 1. Create HubSpot contact (use original values for CRM)
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

    // 2. Send notification email via Resend (use sanitized values for HTML)
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
            from: "Motabar <hello@motabarbuildstuff.com>",
            to: ["motabar.javaid@gmail.com"],
            subject: `New Lead from motabar.builds: ${sanitizedName.substring(0, 50)}`,
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
                    <p style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">${sanitizedName}</p>
                    <a href="mailto:${sanitizedEmail}" style="color: #8b5cf6; font-size: 14px; text-decoration: none;">${sanitizedEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 20px; border-left: 4px solid #8b5cf6;">
                    <p style="margin: 0 0 8px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <p style="margin: 0; color: #e4e4e7; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage.replace(/\n/g, "<br>")}</p>
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
                Lead captured from <a href="https://motabarbuildstuff.com" style="color: #8b5cf6; text-decoration: none;">motabarbuildstuff.com</a>
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
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
