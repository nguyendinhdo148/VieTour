import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "smtp-brevo.com",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const sendSuggestionEmail = async (to, subject, html) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error(
      "Email configuration missing. Please check EMAIL_USER and EMAIL_PASSWORD environment variables."
    );
    return;
  }

  const mailOptions = {
    from: {
      name: "VieJobs",
      address: process.env.EMAIL_USER,
    },
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error.message);
    if (error.code === "EAUTH") {
      console.error(
        "Authentication failed. Please check your email credentials."
      );
    }
    throw error;
  }
};
