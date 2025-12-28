import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactRequest = await req.json();
    
    console.log("Processing contact form submission:", { name, email });

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
            from: "Contact Form <onboarding@resend.dev>",
            to: ["motabar.javaid@gmail.com"],
            subject: `New Contact: ${name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
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
