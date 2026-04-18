import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await resend.emails.send({
      from: "Arcline AI <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Arcline AI",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #0066cc;">Welcome to the future of clinic management, ${name}!</h2>
          <p>We're thrilled to have you on board. Arcline AI is now ready to help you grow your clinic while you sleep.</p>
          <p><strong>Next steps:</strong></p>
          <ul>
            <li>Log in to your dashboard to configure your AI receptionist.</li>
            <li>Connect your practice management software.</li>
            <li>Set up your custom booking rules.</li>
          </ul>
          <a href="${process.env.NEXTAUTH_URL}/login" style="display: inline-block; padding: 12px 24px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">Go to Dashboard</a>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #64748b; font-size: 12px;">If you have any questions, just reply to this email. We're here to help.</p>
        </div>
      `
    });
  } catch (error) {
    console.error("EMAIL_ERROR", error);
  }
};

export const sendBookingNotification = async (email: string, details: any) => {
  try {
    await resend.emails.send({
      from: "Arcline AI <onboarding@resend.dev>",
      to: email,
      subject: "New Demo Booking Confirmed",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #0066cc;">Booking Confirmed!</h2>
          <p>Your demo session with Dr. Sarah Miller has been successfully scheduled.</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Time:</strong> ${details.time}</p>
            <p style="margin: 5px 0 0 0;"><strong>Day:</strong> ${details.day}</p>
          </div>
          <p>A calendar invite will be sent to your email shortly.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #64748b; font-size: 12px;">Arcline AI - The growth engine for the modern medical clinic.</p>
        </div>
      `
    });
  } catch (error) {
    console.error("EMAIL_ERROR", error);
  }
};

export const sendLoginNotification = async (email: string, name: string) => {
  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });

    await resend.emails.send({
      from: "Arcline AI Security <onboarding@resend.dev>",
      to: email,
      subject: "Security Alert: New Login for Arcline AI",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0066cc;">New Login Detected</h2>
          <p>Hi ${name},</p>
          <p>Your Arcline AI account was recently logged into from a new session.</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Date:</strong> ${dateStr}</p>
            <p style="margin: 5px 0 0 0;"><strong>Time:</strong> ${timeStr}</p>
            <p style="margin: 5px 0 0 0;"><strong>Location:</strong> Australia (Detected from IP)</p>
          </div>
          <p>If this was you, you can safely ignore this email. If you did not authorize this login, please reset your password immediately.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #64748b; font-size: 12px;">Security is our top priority. Thank you for using Arcline AI.</p>
        </div>
      `
    });
  } catch (error) {
    console.error("LOGIN_EMAIL_ERROR", error);
  }
};
