import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import handleCopyLink from "../helpers/HandleCopyLink";

const INTJPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Tổng quan" },
    { id: "strengths-weaknesses", title: "Điểm mạnh và điểm yếu" },
    { id: "relationship", title: "Mối quan hệ" },
    { id: "how-to-be-close", title: "Làm sao để thân thiết với INTJ" },
    { id: "career-path", title: "Con đường sự nghiệp" },
    { id: "workplace-habits", title: "Thói quen nơi công sở" },
    { id: "compare", title: "So sánh INTJ với ENTJ, INTP" },
    { id: "advice", title: "Lời khuyên dành cho INTJ" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="INTJ-page bg-gradient-to-b from-blue-50 to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}

        {/* Header */}
        <div className="mbti-result-header bg-white rounded-xl shadow-md p-6 mb-8 relative">
          <Link
            to="/tools/mbti"
            className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-full transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Trang chủ MBTI</span>
          </Link>
          <div className="flex flex-col items-center gap-6">
            {/* Banner image with overlay text */}
            <div className="flex items-center gap-1 mb-1">
              <h1 className=" text-3xl font-bold from-blue-500 to-purple-600 text-white bg-gradient-to-r p-2 rounded-lg shadow-md">
                INTJ - Nhà khoa học
              </h1>
            </div>
            <div className="relative w-full">
              <img
                src="/mbti_icons/intj1.webp"
                alt="INTJ - Người lý tưởng hóa"
                className="pointer w-full h-120 object-cover rounded-lg shadow "
              />
            </div>

            {/* Description */}
            <div className="text-lg text-gray-700 max-w-4xl text-center">
              INTJ được xem là nhóm tính cách bí ẩn và thông minh nhất. Họ
              thường đóng vai trò “chìa khóa” giải quyết vấn đề trong những tình
              huống hóc búa. Tinh thần lạc quan, luôn nhìn vào mặt tích cực
              khiến các INTJ có thể nhìn ra điểm sáng ngay cả trong những tình
              cảnh “éo le” nhất. Những người thuộc nhóm tính cách INTJ có tinh
              thần học hỏi cao, không ngừng khai phá những giới hạn mới của bản
              thân để tạo ra sự đổi mới tích cực cho môi trường xung quanh.
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-4">
              <Link
                to="/tools/mbti/test"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all"
              >
                <span>Làm bài test</span>
                <FontAwesomeIcon icon={faPen} />
              </Link>

              <button
                onClick={() => handleCopyLink(window.location.href)}
                className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-all cursor-pointer"
              >
                <span>Copy link</span>
                <FontAwesomeIcon icon={faLink} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mbti-content bg-white rounded-xl shadow-md overflow-hidden">
          {/* Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`cursor-pointer px-6 py-4 font-medium whitespace-nowrap  ${
                    activeSection === section.id
                      ? "text-pink-600 border-b-2 border-pink-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Section Content */}
          <div className="p-6 md:p-8">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-indigo-800 mb-4">
                    TỔNG QUAN TÍNH CÁCH INTJ
                  </h2>
                  <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    INTJ (Nhà khoa học) là nhóm tính cách bí ẩn và thông minh
                    nhất trong 16 loại tính cách MBTI. Với tư duy chiến lược và
                    khả năng phân tích sắc bén, họ thường đóng vai trò "chìa
                    khóa" giải quyết những vấn đề phức tạp. Các INTJ luôn nhìn
                    thấy điểm sáng trong mọi tình huống và không ngừng khai phá
                    giới hạn bản thân để tạo ra sự đổi mới tích cực.
                  </p>
                </div>

                {/* MBTI Breakdown */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                    Ý NGHĨA 4 CHỮ CÁI INTJ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "● I - Hướng nội (Introverted)",
                        color: "bg-indigo-100",
                        textColor: "text-indigo-800",
                        content:
                          "INTJ tập trung vào thế giới nội tâm phong phú của mình. Họ nạp năng lượng bằng cách dành thời gian một mình để suy nghĩ và nghiên cứu sâu về các ý tưởng.",
                      },
                      {
                        title: "● N - Trực giác (Intuitive)",
                        color: "bg-blue-100",
                        textColor: "text-blue-800",
                        content:
                          "INTJ tập trung vào bức tranh tổng thể và các khả năng tiềm ẩn hơn là chi tiết cụ thể. Họ có khả năng nhìn xa trông rộng và dự đoán xu hướng tương lai.",
                      },
                      {
                        title: "● T - Lý trí (Thinking)",
                        color: "bg-teal-100",
                        textColor: "text-teal-800",
                        content:
                          "INTJ đưa ra quyết định dựa trên logic và phân tích khách quan. Họ ưu tiên sự thật và hiệu quả hơn là yếu tố cảm xúc hay các mối quan hệ cá nhân.",
                      },
                      {
                        title: "● J - Nguyên tắc (Judging)",
                        color: "bg-purple-100",
                        textColor: "text-purple-800",
                        content:
                          "INTJ thích sự có tổ chức và quyết đoán. Họ luôn có kế hoạch rõ ràng và phương án dự phòng cho mọi tình huống, đồng thời đánh giá cao tính hiệu quả trong công việc.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`${item.color} p-5 rounded-lg transition-transform hover:scale-105`}
                      >
                        <h4
                          className={`font-bold ${item.textColor} mb-3 text-lg`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-gray-700">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Traits */}
                <div className="space-y-8">
                  {[
                    {
                      title: "Mọt sách chính hiệu",
                      icon: "📚",
                      content:
                        "INTJ sở hữu lượng kiến thức khổng lồ ở nhiều lĩnh vực nhờ tinh thần học hỏi không ngừng. Từ nhỏ đến lớn, họ luôn theo đuổi đam mê khám phá và không ngừng trau dồi tri thức. Điều này giúp họ tỏa ra sự tự tin và uyên bác trong mọi lĩnh vực họ quan tâm.",
                    },
                    {
                      title: "Tự lập và quyết đoán",
                      icon: "💪",
                      content:
                        "Nhờ kiến thức sâu rộng, INTJ có tinh thần tự lập rất cao. Họ quyết đoán trong mọi quyết định nhờ sự tin tưởng tuyệt đối vào năng lực bản thân. Tuy nhiên, họ thường im lặng trong những cuộc thảo luận không thuộc lĩnh vực chuyên môn, vì không thích trở thành tâm điểm chú ý.",
                    },
                    {
                      title: "Không ngừng cải tiến",
                      icon: "🚀",
                      content:
                        "INTJ luôn tìm kiếm phương án tối ưu nhất trong mọi việc. Họ quan sát, phân tích và thử nghiệm không ngừng để tìm ra giải pháp hiệu quả cao nhất. Tính cách này khiến họ trở thành những nhà cải tiến xuất sắc và nhà lãnh đạo tài ba với tầm nhìn chiến lược.",
                    },
                    {
                      title: "Tư duy hệ thống",
                      icon: "🧩",
                      content:
                        "INTJ có khả năng nhìn nhận vấn đề một cách hệ thống. Trong công việc, họ luôn ưu tiên những việc quan trọng và đánh giá dựa trên hiệu quả thực tế. Họ sẵn sàng dành hàng giờ để tái cấu trúc hệ thống nếu điều đó mang lại hiệu suất cao hơn.",
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-300"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{section.icon}</span>
                        <h3 className="text-xl font-bold text-gray-800">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 pl-10">{section.content}</p>
                    </div>
                  ))}
                </div>

                {/* Career & Relationships */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-700 mb-4">
                      INTJ trong công việc
                    </h3>
                    <p className="text-gray-700 mb-4">
                      INTJ phát huy thế mạnh trong các lĩnh vực đòi hỏi tư duy
                      chiến lược như khoa học, công nghệ, luật pháp và điều tra.
                      Họ là những nhà lãnh đạo bẩm sinh nhưng thường chọn lui về
                      vị trí cố vấn để có không gian sáng tạo. INTJ đánh giá cao
                      hiệu quả công việc và luôn tìm cách tối ưu hóa quy trình
                      làm việc.
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-indigo-700 mb-4">
                      INTJ trong quan hệ
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Trong các mối quan hệ, INTJ khá kín đáo và thận trọng. Họ
                      không giỏi thể hiện cảm xúc nhưng rất chân thành khi quan
                      tâm người khác. INTJ thích những mối quan hệ chất lượng
                      hơn số lượng, và đánh giá cao đối tác có cùng trí tuệ và
                      tầm nhìn với mình.
                    </p>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    INTJ NỔI TIẾNG
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Elon Musk",
                        role: "CEO Tesla & SpaceX",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg",
                      },
                      {
                        name: "Mark Zuckerberg",
                        role: "CEO Meta",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_v1.jpg/960px-Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_v1.jpg",
                      },
                      {
                        name: "Isaac Newton",
                        role: "Nhà vật lý học",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg",
                      },
                      {
                        name: "Stephen Hawking",
                        role: "Nhà vật lý lý thuyết",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg",
                      },
                      {
                        name: "Vladimir Lenin",
                        role: "Nhà cách mạng",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/c/c0/Lenin_in_1920_%28cropped%29.jpg",
                      },
                      {
                        name: "James Cameron",
                        role: "Đạo diễn phim",
                        image:
                          "https://cdn.britannica.com/84/160284-050-695B1DE3/James-Cameron-2012.jpg",
                      },
                      {
                        name: "Ludwig van Beethoven",
                        role: "Nhà soạn nhạc",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/330px-Beethoven.jpg",
                      },
                      {
                        name: "Albert Einstein",
                        role: "Nhà vật lý lý thuyết",
                        image:
                          "https://baogiaothong.mediacdn.vn/upload/4-2022/images/2022-10-05/10-nha-khoa-hoc-vi-dai-nhat-moi-thoi-dai-1-1664953509-223-width740height681.jpg",
                      },
                    ].map((person, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="size-16 bg-indigo-200 rounded-full mx-auto mb-3 flex items-center justify-center text-indigo-700 text-xl font-bold">
                          <Avatar className="size-16">
                            <AvatarImage
                              src={person.image || "image"}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {person.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {person.name}
                        </h4>
                        <p className="text-xs text-gray-600">{person.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Thought */}
                <div className="bg-blue-100 p-6 rounded-lg mt-8 text-center">
                  <p className="text-blue-800 italic font-medium">
                    "INTJ là những nhà tư tưởng chiến lược với tầm nhìn xa trông
                    rộng. Họ không ngừng học hỏi và cải tiến, luôn tìm cách áp
                    dụng kiến thức để giải quyết những vấn đề phức tạp nhất của
                    nhân loại."
                  </p>
                </div>
              </div>
            )}

            {/* Strengths & Weaknesses Section */}
            {activeSection === "strengths-weaknesses" && (
              <div className="space-y-8">
                {/* Main Header */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    PHÂN TÍCH SWOT CỦA{" "}
                    <span className="text-indigo-600">
                      NHÀ CHIẾN LƯỢC (INTJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    INTJ - Nhóm tính cách hiếm gặp (2% dân số) với tư duy hệ
                    thống và tầm nhìn xa trông rộng
                  </p>
                </div>

                {/* Strengths Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-green-600 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      THẾ MẠNH CỐT LÕI
                    </h3>
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-green-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Strength 1 */}
                    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-green-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tư Duy Chiến Lược
                          </h4>
                          <p className="text-gray-700">
                            Khả năng nhìn thấy bức tranh tổng thể và xây dựng kế
                            hoạch dài hạn với tỷ lệ thành công cao nhờ phân tích
                            logic không khoan nhượng.
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-green-700 italic">
                          "INTJ có thể dự đoán xu hướng 5-10 năm nhờ kết hợp dữ
                          liệu và mô hình hệ thống"
                        </p>
                      </div>
                    </div>

                    {/* Strength 2 */}
                    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-green-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Độc Lập Tuyệt Đối
                          </h4>
                          <p className="text-gray-700">
                            Không bị ảnh hưởng bởi áp lực xã hội, tự tin theo
                            đuổi con đường riêng dựa trên phân tích khách quan
                            thay vì cảm tính đám đông.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Tự chủ
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Không a dua
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Tư duy phản biện
                        </span>
                      </div>
                    </div>

                    {/* Strength 3 */}
                    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-green-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Sáng Tạo Hệ Thống
                          </h4>
                          <p className="text-gray-700">
                            Khả năng tái cấu trúc các quy trình và hệ thống theo
                            cách đột phá, kết hợp giữa tư duy logic và tầm nhìn
                            đổi mới.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Ứng dụng:</span>
                          Tối ưu hóa quy trình, phát minh công nghệ, chiến lược
                          kinh doanh
                        </div>
                      </div>
                    </div>

                    {/* Strength 4 */}
                    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-green-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Kiến Thức Sâu Rộng
                          </h4>
                          <p className="text-gray-700">
                            Ham học hỏi không ngừng trong lĩnh vực quan tâm, xây
                            dựng nền tảng kiến thức vững chắc để hỗ trợ cho các
                            quyết định chiến lược.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>Bề rộng</span>
                          <span>85% INTJ có kiến thức đa lĩnh vực</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weaknesses Section */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-red-600 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      ĐIỂM CẦN CẢI THIỆN
                    </h3>
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-red-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Weakness 1 */}
                    <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-red-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Kiêu Ngạo Trí Tuệ
                          </h4>
                          <p className="text-gray-700">
                            Xu hướng đánh giá thấp ý kiến của người khác, đặc
                            biệt khi họ không đáp ứng tiêu chuẩn logic của INTJ,
                            dẫn đến bỏ lỡ những góc nhìn giá trị.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Giải pháp:</span>
                          Thực hành lắng nghe chủ động, đặt câu hỏi khám phá
                          thay vì phán xét
                        </div>
                      </div>
                    </div>

                    {/* Weakness 2 */}
                    <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-red-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu Kiên Nhẫn
                          </h4>
                          <p className="text-gray-700">
                            Khó chịu với những người không theo kịp tốc độ tư
                            duy của họ hoặc khi hệ thống vận hành kém hiệu quả,
                            dễ dẫn đến thái độ khinh thường hoặc bỏ cuộc sớm.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Mẹo:</span>
                          Áp dụng nguyên tắc 10 phút - dành thời gian giải thích
                          trước khi từ chối ý tưởng
                        </div>
                      </div>
                    </div>

                    {/* Weakness 3 */}
                    <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-red-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Kỹ Năng Xã Hội Hạn Chế
                          </h4>
                          <p className="text-gray-700">
                            Thường bỏ qua các quy tắc xã giao cơ bản, khó diễn
                            đạt ý tưởng phức tạp thành ngôn ngữ đơn giản, và ít
                            quan tâm đến việc xây dựng mạng lưới quan hệ.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Cải thiện:</span>
                          Tham gia khóa học giao tiếp phi ngôn ngữ, tập trung
                          vào storytelling
                        </div>
                      </div>
                    </div>

                    {/* Weakness 4 */}
                    <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-red-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Cứng Nhắc Về Nguyên Tắc
                          </h4>
                          <p className="text-gray-700">
                            Bám chặt vào hệ thống niềm tin cá nhân đến mức bỏ lỡ
                            cơ hội đổi mới, từ chối các giải pháp sáng tạo nếu
                            chúng vi phạm "nguyên tắc" tự đặt ra.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-700 italic">
                          "Sự cứng nhắc của INTJ đôi khi là rào cản lớn nhất cho
                          chính sự đổi mới mà họ theo đuổi"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-xl text-white">
                  <div className="max-w-3xl mx-auto text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      CÂN BẰNG LÀ CHÌA KHÓA
                    </h3>
                    <p className="mb-4 text-indigo-100">
                      Sức mạnh thực sự của INTJ nằm ở khả năng kết hợp tư duy hệ
                      thống với sự linh hoạt, logic sắc bén với trí tuệ cảm xúc.
                      Khi học được cách cân bằng những mặt đối lập này, không gì
                      có thể ngăn cản bạn đạt đến đỉnh cao.
                    </p>
                    <div className=" bg-opacity-20 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Một INTJ phát triển toàn diện là người biết rằng trí
                        tuệ thực sự không chỉ nằm ở việc có câu trả lời đúng, mà
                        còn ở khả năng đặt những câu hỏi đúng cho đúng người."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Relationship Section */}
            {activeSection === "relationship" && (
              <div className="space-y-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-blue-800 mb-3">
                    MỐI QUAN HỆ CỦA INTJ
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
                  <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    INTJ tiếp cận các mối quan hệ với tư duy chiến lược và
                    logic. Họ đánh giá cao những kết nối trí tuệ và thường đặt
                    tiêu chuẩn cao cho bạn bè, đối tác.
                  </p>
                </div>

                {/* General Relationship Traits */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Tính cách trong quan hệ
                      </h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Độc lập và cần không gian riêng</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Đánh giá cao trí tuệ và năng lực</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Trực tiếp và thẳng thắn trong giao tiếp</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Không thích các nghi thức xã giao</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-100 p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Phù hợp nhất với
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { type: "ENTP", desc: "Kích thích trí tuệ" },
                        { type: "ENFP", desc: "Mang lại năng lượng" },
                        { type: "INTP", desc: "Cùng chia sẻ đam mê tri thức" },
                        { type: "INFJ", desc: "Hiểu được chiều sâu tư duy" },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-bold text-blue-600">
                            {item.type}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Love Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-12">
                  <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                      <div className="bg-white p-4 rounded-full shadow-lg">
                        <svg
                          className="w-16 h-16 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3 md:pl-8">
                      <h3 className="text-2xl font-bold text-blue-700 mb-4">
                        INTJ TRONG TÌNH YÊU
                      </h3>
                      <p className="text-gray-700 mb-4">
                        INTJ tiếp cận tình yêu như một dự án cần lập kế hoạch.
                        Họ tìm kiếm đối tác có thể chia sẻ tầm nhìn và giá trị
                        sống, đồng thời đánh giá cao sự độc lập trong mối quan
                        hệ.
                      </p>
                      <div className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
                        <p className="italic text-gray-700">
                          "INTJ không dễ dàng mở lòng nhưng khi đã cam kết, họ
                          là những người chung thủy và tận tâm với mối quan hệ."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Tiêu chuẩn cao",
                        icon: "🎯",
                        content:
                          "INTJ có tiêu chuẩn rất cao với người yêu, thường tìm kiếm sự tương đồng về trí tuệ và tham vọng.",
                      },
                      {
                        title: "Thể hiện tình cảm",
                        icon: "💡",
                        content:
                          "INTJ không giỏi thể hiện tình cảm theo cách thông thường, nhưng họ thể hiện qua hành động chăm sóc thực tế.",
                      },
                      {
                        title: "Thách thức",
                        icon: "⚠️",
                        content:
                          "INTJ cần học cách cân bằng giữa lý trí và cảm xúc trong tình yêu, cũng như chấp nhận sự không hoàn hảo.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-5 rounded-lg shadow-sm flex items-start"
                      >
                        <span className="text-2xl mr-4">{item.icon}</span>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-700">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Friendship Section */}
                <div className="bg-white p-8 rounded-2xl shadow-md mb-12">
                  <h3 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    INTJ TRONG TÌNH BẠN
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-start mb-6">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Chất lượng hơn số lượng
                          </h4>
                          <p className="text-gray-700">
                            INTJ có ít bạn nhưng những tình bạn này thường bền
                            chặt và sâu sắc. Họ đánh giá cao bạn bè có thể thảo
                            luận về ý tưởng và chia sẻ kiến thức.
                          </p>
                        </div>
                      </div>

                      <div className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-400 mb-6">
                        <p className="italic text-gray-700">
                          "INTJ không quan tâm đến số lượng bạn bè, mà là chất
                          lượng của những người thực sự hiểu và tôn trọng họ."
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Giao tiếp đặc biệt
                          </h4>
                          <p className="text-gray-700">
                            INTJ thích những cuộc trò chuyện có chiều sâu về ý
                            tưởng hơn là tán gẫu thông thường. Họ đánh giá cao
                            sự trung thực và thẳng thắn.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-teal-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-teal-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Ranh giới rõ ràng
                          </h4>
                          <p className="text-gray-700">
                            INTJ cần không gian riêng và tôn trọng không gian
                            của người khác. Họ không thích sự gắn bó quá mức hay
                            những đòi hỏi về thời gian.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parenting Section */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    INTJ KHI LÀM CHA MẸ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Phong cách nuôi dạy",
                          content:
                            "INTJ dạy con tính độc lập và tư duy phản biện. Họ khuyến khích con tự giải quyết vấn đề thay vì làm hộ chúng.",
                        },
                        {
                          title: "Giá trị cốt lõi",
                          content:
                            "INTJ coi trọng sự phát triển trí tuệ và năng lực giải quyết vấn đề. Họ muốn con trở thành người có năng lực và tự chủ.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="bg-white p-5 rounded-lg shadow-sm"
                        >
                          <h4 className="font-bold text-gray-800 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-700">{item.content}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Thách thức
                        </h4>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Khó thể hiện tình cảm bằng lời nói</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Kỳ vọng quá cao vào năng lực của con</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Thiếu kiên nhẫn với cảm xúc trẻ con</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-100 p-5 rounded-lg border-l-4 border-green-500">
                        <p className="italic text-gray-700">
                          "Các bậc cha mẹ INTJ cần học cách cân bằng giữa việc
                          dạy con tư duy độc lập và việc đáp ứng nhu cầu tình
                          cảm của chúng."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Quote */}
                <div className="text-center mt-12">
                  <div className="bg-blue-100 p-6 rounded-xl inline-block max-w-2xl">
                    <svg
                      className="w-10 h-10 text-blue-500 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl font-medium text-blue-800 mb-2">
                      "INTJ là những người bạn trung thành và đáng tin cậy,
                      những người yêu chân thành và những bậc cha mẹ tận tâm. Họ
                      có thể không giỏi thể hiện cảm xúc, nhưng luôn thể hiện
                      tình cảm qua hành động."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* How to Be Close Section */}
            {activeSection === "how-to-be-close" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    NGHỆ THUẬT KẾT NỐI VỚI{" "}
                    <span className="text-indigo-600">
                      NHÀ CHIẾN LƯỢC (INTJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    INTJ - Nhóm tính cách hiếm gặp (2% dân số) với tư duy hệ
                    thống và đòi hỏi cao trong các mối quan hệ
                  </p>
                </div>

                {/* Core Principles */}
                <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="bg-white p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-sm">
                        <svg
                          className="w-10 h-10 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                        Nguyên tắc vàng khi tiếp cận INTJ
                      </h3>
                      <p className="text-gray-700">
                        INTJ đánh giá cao sự chân thành, trí tuệ và hiệu quả. Họ
                        không quan tâm đến các nghi thức xã giao thông thường và
                        sẽ nhanh chóng nhận ra sự giả tạo. Để xây dựng mối quan
                        hệ với INTJ, bạn cần:
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connection Strategies */}
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Chiến lược kết nối hiệu quả
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Strategy 1 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Giao tiếp trực tiếp
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Nói thẳng vấn đề, tránh vòng vo</li>
                            <li>Sử dụng ngôn ngữ logic, có cấu trúc</li>
                            <li>Ưu tiên trao đổi qua văn bản hơn gọi điện</li>
                            <li>Tránh nói chuyện phiếm vô nghĩa</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 2 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tôn trọng không gian
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Không xâm phạm đời sống riêng tư</li>
                            <li>Cho họ thời gian ở một mình</li>
                            <li>Hẹn trước khi gặp mặt</li>
                            <li>Tránh những cuộc gọi không cần thiết</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 3 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Kích thích trí tuệ
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Thảo luận ý tưởng mới lạ</li>
                            <li>Đặt câu hỏi thách thức tư duy</li>
                            <li>Chia sẻ quan điểm độc đáo</li>
                            <li>Tránh những chủ đề tầm thường</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 4 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Thể hiện sự đáng tin
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Giữ lời hứa một cách tuyệt đối</li>
                            <li>Thẳng thắn thừa nhận sai lầm</li>
                            <li>Không nói xấu sau lưng</li>
                            <li>Tránh những lời khen giả tạo</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Tips */}
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Mẹo thực tế khi tương tác
                  </h3>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Nên làm
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Bắt đầu bằng những câu chuyện dí dỏm có ẩn ý
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Nhờ tư vấn khi gặp vấn đề phức tạp
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Tặng quà ý nghĩa tinh thần thay vì vật chất
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Để họ làm việc độc lập khi có thể
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-red-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Nên tránh
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Nói chuyện phiếm qua điện thoại
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Gọi điện/ghé thăm đột xuất
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Tặng quà đắt tiền gây áp lực
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Ép họ tham gia hoạt động xã hội
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Advice */}
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                    Lời khuyên cuối
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Xây dựng mối quan hệ với INTJ là một quá trình cần sự kiên
                    nhẫn. Họ có thể khó tiếp cận ban đầu, nhưng khi đã chấp nhận
                    bạn vào thế giới của mình, họ sẽ là những người bạn trung
                    thành và đáng tin cậy nhất.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="italic text-gray-700">
                      "Đừng cố gắng thay đổi một INTJ. Thay vào đó, hãy học cách
                      trân trọng sự thẳng thắn, trí tuệ và lòng trung thành đặc
                      biệt mà họ mang đến cho mối quan hệ."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Career Path Section */}
            {activeSection === "career-path" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    HÀNH TRÌNH SỰ NGHIỆP CỦA{" "}
                    <span className="text-indigo-600">
                      NHÀ CHIẾN LƯỢC (INTJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    INTJ - Nhóm tính cách hiếm gặp (2% dân số) với tư duy hệ
                    thống và khát khao cải tiến không ngừng
                  </p>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-lg mb-10 text-white">
                  <div className="max-w-3xl mx-auto text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      "INTJ không tìm kiếm công việc - họ kiến tạo sự thay đổi"
                    </h3>
                    <p className="text-indigo-100">
                      Những bộ óc chiến lược này luôn khao khát một sự nghiệp
                      cho phép họ giải quyết những vấn đề phức tạp, tối ưu hóa
                      hệ thống và tạo ra các giải pháp đột phá
                    </p>
                  </div>
                </div>

                {/* Career Journey */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Hành trình phát triển nghề nghiệp
                  </h3>

                  <div className="space-y-8">
                    {/* Stage 1 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          1
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn khởi đầu: Thử thách
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Khi mới bước vào sự nghiệp, INTJ thường cảm thấy chán
                          nản với những nhiệm vụ đơn giản, thủ tục. Họ khao khát
                          được đóng góp ý tưởng đột phá nhưng thường bị hạn chế
                          bởi vị trí junior.
                        </p>
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <p className="italic text-gray-700">
                            "Hãy kiên nhẫn trong 2-3 năm đầu. Đây là thời gian
                            để bạn học hỏi hệ thống trước khi cải tiến nó"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          2
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn bứt phá: Khẳng định
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Sau khi chứng minh năng lực, INTJ bắt đầu có cơ hội
                          thể hiện tài năng chiến lược. Đây là giai đoạn họ tỏa
                          sáng với những giải pháp sáng tạo và cách tiếp cận hệ
                          thống.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                            Lãnh đạo dự án
                          </span>
                          <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                            Tối ưu quy trình
                          </span>
                          <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                            Giải pháp đột phá
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          3
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn chín muồi: Ảnh hưởng
                        </h4>
                        <p className="text-gray-700">
                          Ở đỉnh cao sự nghiệp, INTJ trở thành những nhà chiến
                          lược tầm cỡ, có khả năng định hình hệ thống và dẫn dắt
                          tổ chức với tầm nhìn dài hạn. Họ tìm thấy ý nghĩa
                          trong việc đào tạo thế hệ tiếp theo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Strengths */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Thế mạnh nghề nghiệp nổi bật
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tư duy hệ thống
                          </h4>
                          <p className="text-gray-700">
                            Khả năng nhìn thấy bức tranh tổng thể và các mối
                            liên hệ phức tạp, từ đó đưa ra các giải pháp tối ưu.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Sáng tạo chiến lược
                          </h4>
                          <p className="text-gray-700">
                            Kết hợp giữa tư duy logic và khả năng sáng tạo để
                            tạo ra những giải pháp đột phá.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Độc lập & tự chủ
                          </h4>
                          <p className="text-gray-700">
                            Làm việc hiệu quả một mình, không cần giám sát và
                            luôn tìm cách tối ưu hóa công việc.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Học hỏi không ngừng
                          </h4>
                          <p className="text-gray-700">
                            Luôn tìm tòi kiến thức mới và áp dụng vào thực tiễn
                            để cải tiến liên tục.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ideal Career Paths */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Lộ trình sự nghiệp lý tưởng
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-indigo-700">
                          Chiến lược & Phân tích
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          hoạch định chiến lược
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          phân tích hệ thống
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Tư vấn
                          quản lý
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Chuyên
                          gia an ninh mạng
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-indigo-700">
                          Khoa học & Công nghệ
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Kỹ sư
                          phần mềm
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          khoa học dữ liệu
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          nghiên cứu khoa học
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Kiến
                          trúc sư hệ thống
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-indigo-700">
                          Sáng tạo & Đổi mới
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Kiến
                          trúc sư
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          thiết kế hệ thống
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          phát minh
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Thiết
                          kế game
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Career Warnings */}
                <div className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-red-700 mb-3">
                    Cảnh báo nghề nghiệp
                  </h3>
                  <p className="text-gray-700 mb-4">
                    INTJ nên tránh những môi trường công việc:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Quá nhiều thủ tục hành chính và quy tắc cứng nhắc</li>
                    <li>
                      Đòi hỏi giao tiếp xã hội liên tục và làm việc nhóm cao
                    </li>
                    <li>Không có cơ hội phát triển và học hỏi</li>
                    <li>Thiếu tính thử thách trí tuệ</li>
                  </ul>
                </div>

                {/* Career Development */}
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                    Lộ trình phát triển
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-indigo-500 font-bold">
                        1.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn tích lũy (0-5 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Tập trung học hỏi chuyên môn sâu, xây dựng nền tảng
                          kiến thức vững chắc
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-indigo-500 font-bold">
                        2.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoăng chuyên gia (5-10 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Phát triển tư duy chiến lược, trở thành chuyên gia
                          trong lĩnh vực
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-indigo-500 font-bold">
                        3.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn ảnh hưởng (10+ năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Định hình hệ thống, dẫn dắt tổ chức và đào tạo thế hệ
                          tiếp theo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workplace Habits Section */}
            {activeSection === "workplace-habits" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-indigo-800 mb-6 border-b-2 border-indigo-100 pb-4">
                  THÓI QUEN NƠI CÔNG SỞ CỦA INTJ
                </h2>

                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    Dù ở bất kỳ vị trí nào, INTJ luôn theo đuổi mục tiêu nghề
                    nghiệp với tiêu chuẩn cao. Tính cách độc lập và tư duy phản
                    biện mạnh mẽ giúp họ xuất sắc trong công việc, nhưng cũng có
                    thể khiến họ trở nên khắt khe với những đồng nghiệp không
                    đáp ứng được kỳ vọng.
                  </p>
                </div>

                {/* As Employees Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-indigo-700">
                      INTJ khi là nhân viên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách làm việc
                      </h4>
                      <p className="text-gray-700">
                        INTJ cực kỳ độc lập và ghét bị quản lý vi mô. Họ coi các
                        cuộc họp không cần thiết và quy tắc cứng nhắc là rào cản
                        cho hiệu suất.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thách thức
                      </h4>
                      <p className="text-gray-700">
                        Không ngần ngại chỉ trích cấp trên nếu thấy không đủ
                        năng lực. Cần học cách xây dựng mối quan hệ tốt để có
                        nhiều cơ hội phát triển.
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "INTJ đánh giá cấp trên bằng năng lực thực tế chứ không
                      phải chức danh. Họ tôn trọng sự thật hơn là hệ thống cấp
                      bậc."
                    </p>
                  </div>
                </div>

                {/* As Colleagues Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-indigo-700">
                      INTJ khi là đồng nghiệp
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Ưu điểm
                      </h4>
                      <p className="text-gray-700">
                        Làm việc cực kỳ hiệu quả khi được tự chủ. Có thể trở
                        thành đồng nghiệp xuất sắc nếu tìm được người cùng chí
                        hướng.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Hạn chế
                      </h4>
                      <p className="text-gray-700">
                        Xem các hoạt động team building và họp nhóm là lãng phí
                        thời gian. Không kiên nhẫn với đồng nghiệp thiếu tập
                        trung.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1 mr-3 text-indigo-500 text-xl">
                      💡
                    </div>
                    <div>
                      <p className="text-gray-700">
                        "Hầu hết INTJ thà làm việc một mình còn hơn bị trì hoãn
                        bởi đồng nghiệp. Nhưng họ sẽ hợp tác tuyệt vời nếu tìm
                        được người cùng tần số."
                      </p>
                    </div>
                  </div>
                </div>

                {/* As Managers Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-indigo-700">
                      INTJ khi làm cấp trên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách lãnh đạo
                      </h4>
                      <p className="text-gray-700">
                        Tập trung vào chiến lược tổng thể, ủy quyền nhưng vẫn
                        kiểm soát tiến độ. Khuyến khích sự đổi mới và hiệu quả
                        công việc.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Tiêu chuẩn
                      </h4>
                      <p className="text-gray-700">
                        Đánh giá cao nhân viên chủ động, có tư duy phản biện.
                        Không kiên nhẫn với người chỉ muốn "cầm tay chỉ việc".
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 text-indigo-500">
                        ⚠️
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Lãnh đạo INTJ cần chú ý: Sự thẳng thắn quá mức đôi khi
                          có thể làm nhụt chí nhân viên. Học cách cân bằng giữa
                          hiệu quả và động viên là chìa khóa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "compare" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    SO SÁNH{" "}
                    <span className="text-indigo-600">
                      NHÀ CHIẾN LƯỢC (INTJ)
                    </span>{" "}
                    VỚI
                    <span className="text-blue-600"> NHÀ TƯ DUY (INTP)</span> VÀ
                    <span className="text-teal-600">
                      {" "}
                      NGƯỜI ĐIỀU HÀNH (ENTJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Phân tích sâu về 3 nhóm tính cách thuộc "bộ tứ chiến lược" -
                    những bộ óc logic và hệ thống bậc nhất
                  </p>
                </div>

                {/* Core Similarities */}
                <div className="bg-gray-50 p-6 rounded-lg mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    Điểm chung cốt lõi của bộ ba NT
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          N
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Trực giác chiến lược
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Cả ba đều có khả năng nhìn thấy bức tranh lớn, tập trung
                        vào các khả năng và mô hình hơn là chi tiết cụ thể
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          T
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Tư duy logic
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Ra quyết định dựa trên phân tích khách quan thay vì cảm
                        xúc, coi trọng sự thật và hiệu quả
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          ★
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Khát vọng tri thức
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Ham học hỏi không ngừng, luôn tìm kiếm sự hiểu biết sâu
                        sắc về thế giới
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pair Comparisons */}
                <div className="space-y-10">
                  {/* INTJ vs INTP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-indigo-600">INTJ</span> vs{" "}
                        <span className="text-blue-600">INTP</span>:
                        <span className="text-sm font-normal ml-2">
                          Chiến lược gia vs Nhà phân tích
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-indigo-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Đều là những người hướng nội độc lập</li>
                          <li>
                            Có trí tưởng tượng phong phú và tư duy phức tạp
                          </li>
                          <li>Đánh giá cao tri thức và năng lực trí tuệ</li>
                          <li>Không giỏi thể hiện cảm xúc</li>
                          <li>
                            Thích làm việc trong môi trường có tính tự chủ cao
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Khác biệt then chốt
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Cách tiếp cận vấn đề
                            </h5>
                            <p className="text-gray-700 text-sm">
                              INTJ tập trung vào hiệu quả thực tế (Te), trong
                              khi INTP đam mê khám phá lý thuyết (Ti)
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách làm việc
                            </h5>
                            <p className="text-gray-700 text-sm">
                              INTJ có kế hoạch rõ ràng (J), INTP linh hoạt và
                              cởi mở (P)
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Mục tiêu
                            </h5>
                            <p className="text-gray-700 text-sm">
                              INTJ hướng tới kết quả cụ thể, INTP theo đuổi sự
                              hiểu biết toàn diện
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "Nếu INTJ là kiến trúc sư xây dựng hệ thống hoàn chỉnh,
                        thì INTP là nhà khoa học không ngừng khám phá các khả
                        năng. Cả hai đều thiên tài nhưng theo cách khác biệt."
                      </p>
                    </div>
                  </div>

                  {/* INTJ vs ENTJ */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-indigo-600 to-teal-600 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-indigo-600">INTJ</span> vs{" "}
                        <span className="text-teal-600">ENTJ</span>:
                        <span className="text-sm font-normal ml-2">
                          Chiến lược gia thầm lặng vs Nhà lãnh đạo bẩm sinh
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-indigo-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>
                            Chung chức năng nhận thức chính: Trực giác hướng nội
                            (Ni)
                          </li>
                          <li>
                            Cùng sử dụng Tư duy hướng ngoại (Te) để tổ chức thế
                            giới bên ngoài
                          </li>
                          <li>Có tầm nhìn chiến lược dài hạn</li>
                          <li>Đặt tiêu chuẩn cao cho bản thân và người khác</li>
                          <li>
                            Xuất sắc trong việc xây dựng hệ thống và quy trình
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-teal-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Khác biệt then chốt
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Năng lượng
                            </h5>
                            <p className="text-gray-700 text-sm">
                              INTJ (I) cần thời gian ở một mình, ENTJ (E) được
                              tiếp năng lượng từ tương tác xã hội
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách lãnh đạo
                            </h5>
                            <p className="text-gray-700 text-sm">
                              INTJ lãnh đạo bằng tầm nhìn và hệ thống, ENTJ lãnh
                              đạo bằng sự hiện diện và động lực trực tiếp
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Tốc độ hành động
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ENTJ quyết đoán và hành động nhanh hơn, INTJ cân
                              nhắc kỹ lưỡng trước khi hành động
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ENTJ như vị tướng dẫn đầu trận chiến, INTJ như nhà
                        chiến lược đằng sau hậu trường. Cả hai đều xuất sắc
                        nhưng với phong cách hoàn toàn khác biệt."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Comparison Table */}
                <div className="mt-12 mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Bảng so sánh chi tiết 3 nhóm tính cách
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-indigo-600 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold">
                            Đặc điểm
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            INTP
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            INTJ
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ENTJ
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {/* Row 1 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Chức năng nhận thức chính
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tư duy hướng nội (Ti)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Trực giác hướng nội (Ni)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tư duy hướng ngoại (Te)
                          </td>
                        </tr>
                        {/* Row 2 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Phong cách làm việc
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Linh hoạt, thử nghiệm
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-indigo-50">
                            Có kế hoạch, hệ thống
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-teal-50">
                            Quyết đoán, hiệu quả
                          </td>
                        </tr>
                        {/* Row 3 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Trong quan hệ
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Kín đáo, ít bạn bè
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Chọn lọc, sâu sắc
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Rộng rãi, có mạng lưới
                          </td>
                        </tr>
                        {/* Row 4 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Ưu thế nghề nghiệp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Phân tích lý thuyết, nghiên cứu
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-indigo-50">
                            Hoạch định chiến lược, hệ thống
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-teal-50">
                            Lãnh đạo, quản lý tổ chức
                          </td>
                        </tr>
                        {/* Row 5 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Điểm mạnh
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Sáng tạo, tư duy độc lập
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tầm nhìn, kiên định
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Truyền cảm hứng, thực thi
                          </td>
                        </tr>
                        {/* Row 6 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Điểm yếu
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Thiếu quyết đoán, trì hoãn
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-indigo-50">
                            Cứng nhắc, xa cách
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-teal-50">
                            Độc đoán, thiếu kiên nhẫn
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Career Comparison */}
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    So sánh nghề nghiệp phù hợp
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* INTP Column */}
                    <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-blue-700">INTP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Nhà
                          nghiên cứu khoa học
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Kỹ sư
                          phần mềm
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Nhà
                          triết học
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Nhà toán
                          học
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Kiến
                          trúc sư hệ thống
                        </li>
                      </ul>
                    </div>

                    {/* INTJ Column */}
                    <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-indigo-700">INTJ</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          hoạch định chiến lược
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Kiến
                          trúc sư doanh nghiệp
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          khoa học dữ liệu
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Chuyên
                          gia an ninh mạng
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          đầu tư chiến lược
                        </li>
                      </ul>
                    </div>

                    {/* ENTJ Column */}
                    <div className="bg-white p-6 rounded-xl border border-teal-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-teal-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-teal-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-teal-700">ENTJ</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Giám đốc
                          điều hành (CEO)
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Luật sư
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Nhà đầu
                          tư mạo hiểm
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Chính
                          trị gia
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Quản lý
                          cấp cao
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final Thoughts */}
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                    Nhận định cuối
                  </h3>
                  <p className="text-gray-700 mb-3">
                    INTJ, INTP và ENTJ đều là những nhóm tính cách có tư duy
                    chiến lược xuất sắc, nhưng mỗi nhóm có thế mạnh riêng:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                    <li>
                      <span className="font-medium">INTP</span> - Bậc thầy phân
                      tích lý thuyết và khám phá khả năng
                    </li>
                    <li>
                      <span className="font-medium">INTJ</span> - Nhà chiến lược
                      tầm xa với hệ thống hoàn chỉnh
                    </li>
                    <li>
                      <span className="font-medium">ENTJ</span> - Nhà lãnh đạo
                      quyết đoán với khả năng thực thi mạnh mẽ
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Sự khác biệt chính nằm ở cách họ tiếp cận thế giới: INTP với
                    sự tò mò vô tận, INTJ với tầm nhìn hệ thống, ENTJ với năng
                    lượng hành động. Khi hiểu rõ những khác biệt này, mỗi nhóm
                    có thể phát huy tối đa tiềm năng của mình.
                  </p>
                </div>
              </div>
            )}
            {activeSection === "advice" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-indigo-800 mb-8 border-b-2 border-indigo-100 pb-4">
                  LỜI KHUYÊN PHÁT TRIỂN DÀNH CHO CHIẾN LƯỢC GIA (INTJ)
                </h2>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-gray-800 to-indigo-900 p-8 rounded-lg mb-10 text-white">
                  <div className="max-w-3xl mx-auto text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Chiến lược hoàn thiện dành cho INTJ
                    </h3>
                    <p className="text-gray-300">
                      Là những nhà tư duy hệ thống xuất sắc, INTJ cần cân bằng
                      giữa trí tuệ sắc bén và kỹ năng xã hội để phát huy tối đa
                      tiềm năng lãnh đạo.
                    </p>
                  </div>
                </div>

                {/* Advice Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {/* Understand Before Judging */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Hiểu sâu vấn đề trước khi phán xét
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Thói quen đánh giá nhanh có thể khiến bạn bỏ lỡ thông tin
                      giá trị. Hãy:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Áp dụng quy tắc 5 phút: Lắng nghe toàn bộ trước khi phân
                        tích
                      </li>
                      <li>Đặt câu hỏi làm rõ: "Ý bạn cụ thể là...?"</li>
                      <li>Xem xét ít nhất 3 góc độ trước khi kết luận</li>
                    </ul>
                  </div>

                  {/* Humility */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Khiêm tốn trong tương tác
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Kiêu ngạo trí tuệ là rào cản lớn nhất của INTJ. Cần nhớ:
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="italic text-gray-700">
                        "Mỗi người đều có lĩnh vực thông thạo riêng. Sự kết hợp
                        đa chiều mới tạo ra giải pháp tối ưu."
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Tìm điểm mạnh ẩn sau vẻ ngoài "kém cỏi"</li>
                      <li>Học cách ghi nhận đóng góp của người khác</li>
                    </ul>
                  </div>
                </div>

                {/* Emotional Control Section */}
                <div className="mb-10 bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                        <svg
                          className="w-10 h-10 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold text-red-800 mb-4">
                        Làm chủ cảm xúc
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                          <h4 className="font-semibold text-red-700 mb-2">
                            Khi tức giận
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Hít thở sâu 3 lần trước khi phản ứng</li>
                            <li>Viết ra lý do tức giận thay vì nói ngay</li>
                            <li>
                              Đặt lời nhắc "Điều này có đáng để phá hỏng quan
                              hệ?"
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                          <h4 className="font-semibold text-red-700 mb-2">
                            Xây dựng quan hệ
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>
                              Dành 10 phút mỗi ngày quan tâm đến cảm xúc người
                              khác
                            </li>
                            <li>Học cách lắng nghe không phán xét</li>
                            <li>
                              Tìm 1 người hướng ngoại để học hỏi kỹ năng xã hội
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Logic & Emotion */}
                <div className="mb-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 bg-indigo-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-indigo-700">
                          Cân bằng giữa lý trí và cảm xúc
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        INTJ thường đánh giá thấp yếu tố cảm xúc - cả của bản
                        thân lẫn người khác. Hãy thử:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Nhận diện cảm xúc
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Lập biểu đồ cảm xúc hàng tuần</li>
                            <li>Đặt tên chính xác cảm giác đang trải qua</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Thể hiện tình cảm
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Thực hành lời khen cụ thể mỗi ngày</li>
                            <li>Học ngôn ngữ yêu thương của đối phương</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/3">
                      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Bài tập thực hành
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              1
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Phản hồi 3 lớp
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Khi nhận xét, đưa ra: (1) Điểm tốt, (2) Góp ý
                                cải thiện, (3) Khích lệ
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              2
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Quy tắc 24h
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Dành 1 ngày cân nhắc trước khi đưa ra quyết định
                                quan trọng
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              3
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Góc nhìn đa chiều
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Phân tích mỗi tình huống từ ít nhất 2 quan điểm
                                khác nhau
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Encouragement */}
                <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-8 rounded-lg text-white">
                  <div className="max-w-3xl mx-auto text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Sức mạnh của Chiến lược gia
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Bạn được ban tặng khả năng tư duy hệ thống xuất chúng và
                      tầm nhìn chiến lược hiếm có. Khi kết hợp với sự tự chủ cảm
                      xúc và kỹ năng xã hội, không gì có thể ngăn cản bạn đạt
                      đến đỉnh cao trong lĩnh vực của mình.
                    </p>
                    <div className="bg-indigo-800 bg-opacity-30 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Thế giới cần những bộ óc phân tích như bạn. Hãy mài
                        giũa thêm sự khôn ngoan cảm xúc, và bạn sẽ trở thành nhà
                        lãnh đạo toàn diện mà mọi tổ chức mong muốn."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default INTJPage;
