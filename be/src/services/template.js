export const buildEmailTemplate = ({
  type, // "accepted" | "rejected"
  applicantName,
  jobTitle,
  companyName,
  companyLogo,
  emailRecruiter,
  jobDetailUrl, 
  bookingDate,
}) => {
  const subject =
    type === "accepted"
      ? `🎉 Xác nhận đặt bàn thành công tại ${companyName}`
      : `Thông báo về đơn đặt bàn của bạn tại ${companyName}`;

  const CTAButton =
    type === "accepted" && jobDetailUrl
      ? `<div style="text-align: center; margin-top: 32px;">
           <a
             href="${jobDetailUrl}"
             target="_blank"
             style="
               background-color: #f97316;
               border-radius: 6px;
               color: #ffffff;
               display: inline-block;
               font-size: 16px;
               font-weight: 600;
               padding: 14px 28px;
               text-decoration: none;
               text-align: center;
               font-family: Arial, sans-serif;
             "
           >
             Xem chi tiết địa điểm
           </a>
         </div>`
      : "";

  const bookingDateStr = bookingDate ? `<p style="margin: 0 0 16px; font-size: 16px; color: #f97316;">📅 Ngày đến: <strong>${bookingDate}</strong></p>` : "";

  const bodyContent =
    type === "accepted"
      ? `
          <p style="margin: 0 0 16px;">Xin chào <strong>${applicantName}</strong>,</p>
          <p style="margin: 0 0 16px;">Chúng tôi rất vui thông báo rằng đơn đặt bàn của bạn cho <strong>${jobTitle}</strong> tại <strong>${companyName}</strong> đã được <strong>xác nhận thành công</strong>.</p>
          ${bookingDateStr}
          <p style="margin: 0 0 16px;">Nhà hàng/Doanh nghiệp sẽ sớm liên hệ với bạn để hỗ trợ tốt nhất. Hãy đến đúng giờ để có trải nghiệm trọn vẹn nhé!</p>
          <p style="margin: 0 0 16px;">Nếu có bất kỳ thay đổi nào, vui lòng phản hồi qua email: <a href="mailto:${emailRecruiter}">${emailRecruiter}</a>.</p>
          ${CTAButton}
          <p style="margin: 32px 0 0;">Trân trọng,<br/><strong>Bộ phận CSKH - ${companyName}</strong></p>
        `
      : `
          <p style="margin: 0 0 16px;">Xin chào <strong>${applicantName}</strong>,</p>
          <p style="margin: 0 0 16px;">Cảm ơn bạn đã quan tâm và đặt bàn cho <strong>${jobTitle}</strong> tại <strong>${companyName}</strong>.</p>
          <p style="margin: 0 0 16px;">Tuy nhiên, chúng tôi rất tiếc phải thông báo rằng hiện tại chúng tôi <strong>không thể sắp xếp</strong> chỗ cho đơn đặt bàn này (có thể do quá tải hoặc sự kiện đã kết thúc).</p>
          <p style="margin: 0 0 16px;">Mong bạn thông cảm và rất hy vọng có cơ hội phục vụ bạn vào một dịp gần nhất.</p>
          <p style="margin: 32px 0 0;">Trân trọng,<br/><strong>Bộ phận CSKH - ${companyName}</strong></p>
        `;

  const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          ${
            companyLogo
              ? `<div style="text-align: center; margin-bottom: 24px;">
                  <img src="${companyLogo}" alt="${companyName} Logo" style="max-height: 60px; border-radius: 8px;" />
                </div>`
              : ""
          }
          <div style="font-size: 16px; color: #333; line-height: 1.5;">
            ${bodyContent}
          </div>
          <hr style="margin-top: 40px; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px;">
            © ${new Date().getFullYear()} ${companyName}. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    `;

  return { subject, html };
};

// ==========================================
// THÊM MỚI: MẪU EMAIL THÔNG BÁO CHO DOANH NGHIỆP KHI CÓ KHÁCH ĐẶT BÀN
// ==========================================
export const buildNewBookingToRecruiterTemplate = ({
  recruiterName,
  applicantName,
  applicantEmail,
  applicantPhone,
  bookingDate,
  numberOfGuests,
  jobTitle,
  companyName,
  dashboardUrl
}) => {
  const subject = `🔔 Có khách hàng mới đặt bàn tại ${companyName}!`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f0fdf4; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 32px; border-radius: 12px; border-top: 5px solid #22c55e; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
        <h2 style="color: #166534; margin-top: 0;">Thông báo Đặt bàn mới</h2>
        <p style="font-size: 16px; color: #333;">Xin chào <strong>${recruiterName || "Quản lý"}</strong>,</p>
        <p style="font-size: 16px; color: #333;">Doanh nghiệp của bạn vừa nhận được một đơn đặt bàn mới trên hệ thống. Dưới đây là thông tin chi tiết:</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px;"><strong>👤 Khách hàng:</strong> ${applicantName}</p>
          <p style="margin: 0 0 10px;"><strong>📞 Số điện thoại:</strong> 0${applicantPhone || "Không cung cấp"}</p>
          <p style="margin: 0 0 10px;"><strong>✉️ Email:</strong> ${applicantEmail}</p>
          <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 15px 0;"/>
          <p style="margin: 0 0 10px;"><strong>🏷 Dịch vụ/Chương trình:</strong> ${jobTitle}</p>
          <p style="margin: 0 0 10px;"><strong>📅 Ngày đến:</strong> ${bookingDate}</p>
          <p style="margin: 0;"><strong>👥 Số lượng khách:</strong> <span style="color: #f97316; font-weight: bold; font-size: 18px;">${numberOfGuests}</span> người</p>
        </div>

        <p style="font-size: 16px; color: #333;">Vui lòng truy cập trang Quản lý để <strong>Xác nhận</strong> hoặc <strong>Từ chối</strong> đơn đặt bàn này, khách hàng đang chờ phản hồi từ bạn!</p>
        
        <div style="text-align: center; margin-top: 32px;">
           <a href="${dashboardUrl}" target="_blank" style="background-color: #22c55e; border-radius: 6px; color: #ffffff; display: inline-block; font-size: 16px; font-weight: 600; padding: 14px 28px; text-decoration: none;">
             Mở trang Quản lý
           </a>
        </div>
      </div>
    </div>
  `;

  return { subject, html };
};

export const buildJobSuggestionsEmail = (user, suggestedJobs) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f1f5f9; color: #1e293b;">
      
      <!-- HEADER -->
      <div style="background-color: #1d4ed8; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Gợi ý việc làm phù hợp cho bạn</h1>
      </div>

      <!-- CONTENT -->
      <div style="background-color: white; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; margin-bottom: 16px;">Xin chào <strong>${
          user.fullname || "bạn"
        }</strong>,</p>
        <p style="margin-bottom: 20px;">Dưới đây là <strong>${
          suggestedJobs.length
        }</strong> công việc phù hợp với CV của bạn:</p>

        ${suggestedJobs
          .map(
            (job) => `
          <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 8px 0; color: #2563eb;">${job.title}</h2>
            <p style="margin: 4px 0;">🏢 <strong>${
              job.company?.name || "Công ty"
            }</strong></p>
            <p style="margin: 4px 0;">📍 ${job.location}</p>
            <p style="margin: 4px 0;">💵 ${job.salary}   VNĐ</p>
            <p style="margin: 4px 0; color: #10b981;">⭐ Độ phù hợp: <strong>${Math.round(
              job.matchScore
            )}%</strong></p>
            <a href="${process.env.URL_CLIENT}/job/detail/${job.slug}" 
              style="display: inline-block; margin-top: 10px; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
              Xem chi tiết →
            </a>
          </div>
        `
          )
          .join("")}
        <div style="background-color: #1d4ed8; padding: 30px 20px; border-radius: 0 0 8px 8px; color: #ffffff; text-align: center;">
          <p style="font-size: 14px; margin: 4px 0; color: #ffffff;">Tòa nhà A, Số 123 Nguyễn Huệ, Q.1, TP.HCM</p>
          <p style="font-size: 12px; margin: 0; color: #ffffff;">
            ©2014-2025 VieJobs Vietnam. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;
};