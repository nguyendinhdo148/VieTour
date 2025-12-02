const defaultResumeData = {
  template: {
    theme: "themeOne",
    colorPalette: ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
  },
  profileInfo: {
    profilePreviewUrl: "",
    fullName: "Nguyễn Văn A",
    designation: "Lập trình viên Fullstack",
    summary:
      "Lập trình viên Fullstack năng động và hướng kết quả với hơn 5 năm kinh nghiệm xây dựng các ứng dụng web mở rộng bằng React, Node.js và TypeScript. Thành thạo trong thiết kế giao diện, phát triển backend và quản lý cơ sở dữ liệu. Có khả năng làm việc nhóm tốt, đam mê viết mã sạch, phát triển theo Agile và học hỏi không ngừng.",
  },
  contactInfo: {
    email: "nguyenvana@example.com",
    phoneNumber: "0123456789",
    location: "Hà Nội, Việt Nam",
    linkedin: "https://www.linkedin.com/in/nguyenvana",
    github: "https://github.com/nguyenvana",
    facebook: "https://www.facebook.com/nguyenvana",
    website: "https://nguyenvana.dev",
  },
  workExperience: [
    {
      company: "Công ty Công nghệ ABC",
      role: "Senior Fullstack Developer",
      startDate: "2020-09-01",
      endDate: "2024-06-01",
      description:
        "- Dẫn dắt phát triển cổng thông tin khách hàng bằng React, Node.js và PostgreSQL.\n- Tích hợp API REST và GraphQL cho trao đổi dữ liệu thời gian thực.\n- Tối ưu hiệu suất ứng dụng tăng 30% thông qua các kỹ thuật tối ưu và refactor mã.",
    },
    {
      company: "Công ty Phần mềm XYZ",
      role: "Fullstack Developer",
      startDate: "2018-09-01",
      endDate: "2020-06-01",
      description:
        "- Xây dựng giao diện web phản hồi bằng React và Redux.\n- Thiết kế dịch vụ backend với Express.js và MongoDB.\n- Phối hợp với nhóm QA và DevOps để đảm bảo chất lượng phần mềm và quy trình CI/CD mượt mà.",
    },
  ],
  education: [
    {
      degree: "Cử nhân Kỹ thuật phần mềm",
      institution: "Đại học Bách Khoa Hà Nội",
      startDate: "2014-09-01",
      endDate: "2018-06-01",
    },
  ],
  skills: [
    { name: "JavaScript", progress: 90 },
    { name: "TypeScript", progress: 85 },
    { name: "React", progress: 85 },
    { name: "Node.js", progress: 85 },
    { name: "MongoDB", progress: 75 },
    { name: "PostgreSQL", progress: 70 },
    { name: "Git", progress: 80 },
  ],
  projects: [
    {
      title: "Hệ thống Quản lý Dự án",
      description:
        "Một ứng dụng quản lý công việc đầy đủ tính năng với đăng nhập, cập nhật thời gian thực và phân quyền người dùng. Xây dựng với MERN stack.",
      github: "https://github.com/nguyenvana/project-manager",
      liveDemo: "https://project-manager.nguyenvana.dev",
    },
    {
      title: "Nền tảng Kết nối Lập trình viên",
      description:
        "Nền tảng mạng xã hội dành cho lập trình viên để chia sẻ ý tưởng và hợp tác dự án. Bao gồm tính năng chat, bài viết blog và bảng dự án.",
      github: "https://github.com/nguyenvana/devconnect",
      liveDemo: "https://devconnect.nguyenvana.dev",
    },
  ],
  certifications: [
    {
      name: "Phát triển Web Fullstack",
      issuer: "freeCodeCamp",
      year: "2022",
    },
    {
      name: "Chứng chỉ React Developer",
      issuer: "Coursera - Meta",
      year: "2023",
    },
  ],
  languages: [
    { name: "Tiếng Việt", progress: 100 },
    { name: "Tiếng Anh", progress: 85 },
  ],
  interests: [
    "Mã nguồn mở",
    "Viết blog công nghệ",
    "Đọc sách",
    "Chơi thể thao",
  ],
};

export default defaultResumeData;
