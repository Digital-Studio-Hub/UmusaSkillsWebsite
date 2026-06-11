import { Inbound } from "inboundemail";

const apiKey = process.env.INBOUND_API_KEY || "";

if (!apiKey) {
  console.warn(
    "INBOUND_API_KEY not found — emails will not be sent. " +
    "Set it in your environment variables or secrets."
  );
}

const client = apiKey ? new Inbound(apiKey) : null;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
}

export async function sendContactFormEmail(data: ContactFormData) {
  if (!client) {
    console.error(
      "Email client not initialized. INBOUND_API_KEY is missing."
    );
    return false;
  }

  try {
    // Send confirmation email to the user
    await client.emails.send({
      from: "Cledwyn from Lekker Network <noreply@umusaskillsdevelopment.co.za>",
      to: data.email,
      subject: "We Received Your Enquiry - Umusa Skills Development",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f5f5f5; padding: 20px;">
              <h2 style="color: #003d7a; margin-bottom: 20px;">Thank You for Your Enquiry!</h2>
              <p>Hi ${data.name},</p>
              <p>Thank you for reaching out to Umusa Skills Development. We have received your enquiry and will get back to you shortly.</p>
              
              <div style="background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid #003d7a;">
                <h3 style="color: #003d7a; margin-top: 0;">Your Information:</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Interested Course:</strong> ${data.course}</p>
                ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
              </div>
              
              <p>If you have any urgent questions, feel free to:</p>
              <ul>
                <li>Call us at: <a href="tel:+27123456789">+27 12 345 6789</a></li>
                <li>Email us at: <a href="mailto:umusaskillsdevelopment@gmail.com">umusaskillsdevelopment@gmail.com</a></li>
                <li>WhatsApp us for instant response</li>
              </ul>
              
              <p>Best regards,<br><strong>Cledwyn</strong><br>Umusa Skills Development Team</p>
              <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                This email was sent to ${data.email}. If you no longer wish to receive emails, you can unsubscribe.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Send admin notification email
    await client.emails.send({
      from: "Cledwyn from Lekker Network <noreply@umusaskillsdevelopment.co.za>",
      to: "umusaskillsdevelopment@gmail.com",
      subject: `New Enquiry: ${data.name} - ${data.course}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f5f5f5; padding: 20px;">
              <h2 style="color: #003d7a;">New Contact Form Submission</h2>
              
              <div style="background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h3 style="color: #003d7a; margin-top: 0;">Contact Details:</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
                <p><strong>Interested Course:</strong> ${data.course}</p>
                ${data.message ? `<p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
              </div>
              
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                Submitted at: ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`Contact form email sent successfully for ${data.email}`);
    return true;
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return false;
  }
}

export async function sendAdminNotification(
  subject: string,
  html: string,
  recipientEmail?: string
) {
  if (!client) {
    console.error(
      "Email client not initialized. INBOUND_API_KEY is missing."
    );
    return false;
  }

  try {
    await client.emails.send({
      from: "Cledwyn from Lekker Network <noreply@umusaskillsdevelopment.co.za>",
      to: recipientEmail || "umusaskillsdevelopment@gmail.com",
      subject,
      html,
    });

    console.log(`Admin notification sent: ${subject}`);
    return true;
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return false;
  }
}
