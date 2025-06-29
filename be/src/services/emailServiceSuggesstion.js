import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
