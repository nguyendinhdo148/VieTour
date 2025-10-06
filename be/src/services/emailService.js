import nodemailer from "nodemailer";

export const sendMail = async ({ to, subject, html, replyTo }) => {
  try {
    const transporter = nodemailer.createTransport({
      // service: "Gmail",
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"VieJobs" <${process.env.EMAIL_USER}>`, // Sử dụng from được truyền vào hoặc default
      to,
      subject,
      html,
      replyTo: replyTo || undefined,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    throw error;
  }
};

/* import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ email, resetUrl }) => {
  try {
    const mailOptions = {
      from: `VieJobs Support <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔒 Reset Your Password - VieJobs",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            min-height: 100vh;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 40px 20px;
            text-align: center;
            background-color: rgba(249, 249, 249, 0.95);
            border-radius: 16px;
            box-shadow:
              0 10px 25px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05),
              0 0 0 1px rgba(0, 0, 0, 0.02);
            backdrop-filter: blur(10px);
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #1a1a1a;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          .logo span {
            background: linear-gradient(45deg, #ff3366, #ff0000);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .title {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 20px 0;
          }
          .description {
            color: #4a5568;
            font-size: 16px;
            margin: 15px 0;
            line-height: 1.5;
          }
          .minutes {
            font-weight: 600;
            color: #2d3748;
          }
          .reset-button {
            background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
            color: #000000;
            padding: 12px 28px;
            text-decoration: none;
            border-radius: 8px;
            display: inline-block;
            font-size: 16px;
            font-weight: 600;
            margin: 25px 0;
            transition: all 0.2s ease;
            box-shadow:
              0 4px 6px -1px rgba(0, 102, 255, 0.2),
              0 2px 4px -1px rgba(0, 102, 255, 0.1);
          }
          .reset-button:hover {
            opacity: 0.95;
            transform: translateY(-1px);
            box-shadow:
              0 6px 8px -1px rgba(0, 102, 255, 0.25),
              0 3px 6px -1px rgba(0, 102, 255, 0.15);
            color: #000000;
          }
          .footer {
            color: #4a5568;
            font-size: 14px;
            margin-top: 30px;
          }
          .copyright {
            color: #718096;
            font-size: 14px;
            margin-top: 40px;
          }
          .links {
            margin-top: 10px;
          }
          .links a {
            color: #0066ff;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .links a:hover {
            color: #0052cc;
            text-decoration: underline;
          }
          .separator {
            color: #cbd5e0;
            margin: 0 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Vie<span>Jobs</span></div>
          <h1 class="title">🔑 Reset Your Password</h1>
          <p class="description">We received a request to reset your password. Click the button below to continue.</p>
          <p class="description">This link will expire in <span class="minutes">10 minutes</span>.</p>
          <a href="${resetUrl}" class="reset-button">🔗 Reset Password</a>
          <p class="footer">If you didn't request a password reset, please ignore this email or contact our support team.</p>
          <div class="copyright">
            © 2025 VieJobs. All rights reserved.<br>
            <div class="links">
              <a href="${process.env.FRONTEND_URL}">Visit our website</a>
              <span class="separator">|</span>
              <a href="${process.env.FRONTEND_URL}/contact">Contact Support</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);

    next();
  } catch (error) {
    throw new Error("Email sending failed");
  }
};

*/
