import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import handleCopyLink from "../helpers/HandleCopyLink";

const INFPPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Tổng quan" },
    { id: "strengths-weaknesses", title: "Điểm mạnh và điểm yếu" },
    { id: "relationship", title: "Mối quan hệ" },
    { id: "how-to-be-close", title: "Làm sao để thân thiết với INFP" },
    { id: "career-path", title: "Con đường sự nghiệp" },
    { id: "workplace-habits", title: "Thói quen nơi công sở" },
    { id: "compare", title: "So sánh INFP với ENFP, INTP" },
    { id: "advice", title: "Lời khuyên dành cho INFP" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="INFP-page bg-gradient-to-b from-blue-50 to-purple-50">
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
                INFP - Người lý tưởng hóa
              </h1>
            </div>
            <div className="relative w-full">
              <img
                src="/mbti_icons/infp1.png"
                alt="INFP - Người lý tưởng hóa"
                className="pointer w-full h-120 object-cover rounded-lg shadow "
              />
            </div>

            {/* Description */}
            <div className="text-lg text-gray-700 max-w-4xl text-center">
              Các INFP khá điềm tĩnh, thậm chí có phần nhút nhát và cả nể, rất
              ngại từ chối người khác. Tuy vậy, ẩn sâu bên trong họ là một tâm
              hồn nồng nhiệt và đam mê bất diệt. Các INFP sống có lý tưởng, có
              mục đích, họ biết mình cần gì, muốn gì và nên làm gì. Chủ nghĩa cá
              nhân cũng là một đặc điểm nổi bật ở những người thuộc nhóm tính
              cách INFP.
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
                    TỔNG QUAN TÍNH CÁCH INFP
                  </h2>
                  <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    INFP (Người lý tưởng hóa) là những cá nhân điềm tĩnh, nhạy
                    cảm với vẻ ngoài nhút nhát nhưng ẩn chứa nội tâm đầy đam mê.
                    Họ sống có lý tưởng rõ ràng với chủ nghĩa cá nhân mạnh mẽ,
                    luôn ý thức sâu sắc về giá trị bản thân và những điều mình
                    theo đuổi.
                  </p>
                </div>

                {/* MBTI Breakdown */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                    Ý NGHĨA 4 CHỮ CÁI INFP
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "● I - Hướng nội (Introverted)",
                        color: "bg-indigo-100",
                        textColor: "text-indigo-800",
                        content:
                          "INFP tìm thấy năng lượng từ thế giới nội tâm phong phú. Họ coi trọng chiều sâu cảm xúc và suy nghĩ cá nhân hơn các tương tác xã hội ồn ào.",
                      },
                      {
                        title: "● N - Trực giác (Intuitive)",
                        color: "bg-purple-100",
                        textColor: "text-purple-800",
                        content:
                          "INFP tập trung vào ý nghĩa ẩn sau sự việc thay vì chi tiết cụ thể. Họ có khả năng nhìn xa trông rộng và liên tưởng độc đáo.",
                      },
                      {
                        title: "● F - Cảm xúc (Feeling)",
                        color: "bg-pink-100",
                        textColor: "text-pink-800",
                        content:
                          "INFP ra quyết định dựa trên giá trị cá nhân và sự đồng cảm. Họ đề cao sự hài hòa trong các mối quan hệ hơn logic khách quan.",
                      },
                      {
                        title: "● P - Linh hoạt (Perceiving)",
                        color: "bg-teal-100",
                        textColor: "text-teal-800",
                        content:
                          "INFP thích cuộc sống tự do, không ràng buộc. Họ giữ cho các lựa chọn luôn mở và thích ứng linh hoạt với hoàn cảnh.",
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
                      title: "HÀNH TRÌNH TÌM KIẾM Ý NGHĨA",
                      icon: "🔍",
                      content:
                        "INFP không ngừng khám phá mục đích sống và giá trị cốt lõi. Họ đặt câu hỏi về ý nghĩa đằng sau mọi việc và tìm kiếm sự chân thực trong mọi trải nghiệm.",
                    },
                    {
                      title: "TÂM HỒN ĐỒNG CẢM",
                      icon: "💞",
                      content:
                        "Với khả năng thấu cảm tự nhiên, INFP là những người lắng nghe tuyệt vời. Dù không giỏi biểu lộ cảm xúc, sự quan tâm chân thành của họ luôn được nhận ra và trân quý.",
                    },
                    {
                      title: "NGHỆ SĨ NGÔN TỪ",
                      icon: "✍️",
                      content:
                        "INFP thể hiện bản thân mạnh mẽ nhất qua văn chương. Khả năng diễn đạt tinh tế giúp họ truyền tải những suy nghĩ phức tạp thành ngôn từ giàu hình ảnh.",
                    },
                    {
                      title: "CHỦ NGHĨA HOÀN HẢO",
                      icon: "✨",
                      content:
                        "INFP đặt tiêu chuẩn cao cho bản thân và công việc. Điều này đôi khi khiến họ khó hợp tác vì yêu cầu khắt khe hơn người khác, đồng thời tự tạo áp lực lớn cho chính mình.",
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-300"
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
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-indigo-700 mb-4">
                      CON ĐƯỜNG SỰ NGHIỆP
                    </h3>
                    <p className="text-gray-700 mb-4">
                      INFP tỏa sáng trong các lĩnh vực sáng tạo và giúp đỡ người
                      khác. Nghề nghiệp lý tưởng bao gồm:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        <span className="font-medium">Nhà văn/Nhà thơ</span> -
                        Thể hiện thế giới nội tâm qua ngôn từ
                      </li>
                      <li>
                        <span className="font-medium">Tư vấn tâm lý</span> -
                        Giúp đỡ người khác vượt qua khó khăn
                      </li>
                      <li>
                        <span className="font-medium">
                          Giáo viên/Người hướng dẫn
                        </span>{" "}
                        - Truyền cảm hứng cho thế hệ sau
                      </li>
                      <li>
                        <span className="font-medium">
                          Nhà hoạt động xã hội
                        </span>{" "}
                        - Đấu tranh vì lý tưởng nhân đạo
                      </li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-pink-700 mb-4">
                      MỐI QUAN HỆ
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Trong các mối quan hệ, INFP là những người:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Trung thành và sâu sắc trong tình cảm</li>
                      <li>Cần không gian riêng để nuôi dưỡng nội tâm</li>
                      <li>
                        Khó mở lòng nhưng một khi tin tưởng sẽ rất chân thành
                      </li>
                      <li>Nhạy cảm với xung đột và tìm cách hòa giải</li>
                      <li>Đánh giá cao sự tự do và chân thực</li>
                    </ul>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold text-center text-purple-700 mb-6">
                    INFP NỔI TIẾNG
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "William Shakespeare",
                        role: "Nhà văn học",
                        image:
                          "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c807856bb6f582dcc86116e6c5802ad0a147a785468aff5d85e85ada30c6e76380844b/Shake.jpg",
                      },
                      {
                        name: "Vincent Van Gogh",
                        role: "Họa sĩ Hậu Ấn tượng",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/250px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
                      },
                      {
                        name: "Johnny Depp",
                        role: "Diễn viên Hollywood",
                        image:
                          "https://m.media-amazon.com/images/M/MV5BZjA3NzZiZDktZjc2My00MzY2LThhOWMtZGFjYzg4ZDI2ZWVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                      },
                      {
                        name: "J.R.R. Tolkien",
                        role: "Nhà văn học",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/d/d4/J._R._R._Tolkien%2C_ca._1925.jpg",
                      },
                      {
                        name: "Princess Diana",
                        role: "Hoạt động xã hội",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Diana%2C_Princess_of_Wales_1997_%282%29.jpg",
                      },
                      {
                        name: "Aldous Huxley",
                        role: "Nhà văn học, triết học",
                        image:
                          "https://hips.hearstapps.com/hmg-prod/images/gettyimages-517398572sq.jpg",
                      },
                      {
                        name: "Audrey Hepburn",
                        role: "Diễn viên, nhà hoạt động nhân đạo",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Audrey_Hepburn_1956om_%283x4_cropped%29.jpg",
                      },
                      {
                        name: "Timothée Chalamet",
                        role: "Diễn viên",
                        image:
                          "https://m.media-amazon.com/images/M/MV5BZTIyZWY4ZjktOGJiZi00NGFkLTllMjctZjJjMmNiMjIxOTY2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
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
                <div className="bg-indigo-100 p-6 rounded-lg mt-8 text-center">
                  <p className="text-indigo-800 italic font-medium">
                    "INFP là những nhà lý tưởng hóa không ngừng tìm kiếm cái đẹp
                    và ý nghĩa. Họ mang trong mình ngọn lửa đam mê âm ỉ và khát
                    khao tạo ra sự khác biệt cho thế giới."
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
                    ĐIỂM MẠNH VÀ ĐIỂM YẾU CỦA{" "}
                    <span className="text-purple-600">
                      NHÓM TÍNH CÁCH INFP (NGƯỜI LÝ TƯỞNG HÓA)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    INFP - Nhóm tính cách "Người lý tưởng hóa" với trái tim nhân
                    hậu, trí tưởng tượng phong phú và khát khao sâu sắc về một
                    thế giới tốt đẹp hơn
                  </p>
                </div>

                {/* Strengths Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-pink-600 flex items-center">
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
                      ĐIỂM MẠNH ĐẶC TRƯNG
                    </h3>
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Strength 1 */}
                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-pink-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-pink-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Đồng cảm sâu sắc
                          </h4>
                          <p className="text-gray-700">
                            INFP có khả năng thấu hiểu cảm xúc người khác một
                            cách phi thường. Họ cảm nhận được niềm vui, nỗi buồn
                            của người khác như chính mình.
                          </p>
                        </div>
                      </div>
                      <div className="bg-pink-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-pink-700 italic">
                          "INFP được mệnh danh là những người chữa lành bằng
                          trái tim, luôn biết cách an ủi và thấu hiểu người
                          khác"
                        </p>
                      </div>
                    </div>

                    {/* Strength 2 */}
                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-pink-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-pink-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Hào phóng và vị tha
                          </h4>
                          <p className="text-gray-700">
                            INFP luôn sẵn lòng chia sẻ và giúp đỡ người khác mà
                            không mong đợi đền đáp. Họ mong muốn xây dựng một
                            thế giới công bằng và nhân ái.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">
                          Vị tha
                        </span>
                        <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">
                          Chia sẻ
                        </span>
                        <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">
                          Nhân ái
                        </span>
                      </div>
                    </div>

                    {/* Strength 3 */}
                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-pink-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-pink-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Cởi mở và bao dung
                          </h4>
                          <p className="text-gray-700">
                            INFP không phán xét người khác dựa trên lối sống hay
                            quan điểm. Họ chấp nhận sự khác biệt và luôn tìm
                            kiếm sự hòa hợp.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-pink-500 rounded-full"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>Mức độ cởi mở</span>
                          <span>90% INFP được đánh giá là rất bao dung</span>
                        </div>
                      </div>
                    </div>

                    {/* Strength 4 */}
                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-pink-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-pink-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Sáng tạo không ngừng
                          </h4>
                          <p className="text-gray-700">
                            INFP có trí tưởng tượng phong phú và luôn tìm kiếm
                            cái đẹp. Họ thường thể hiện bản thân qua nghệ thuật,
                            văn chương hoặc âm nhạc.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Biểu hiện:</span>
                          Nghệ sĩ, nhà văn, nhà thơ, nhạc sĩ bẩm sinh
                        </div>
                      </div>
                    </div>

                    {/* Strength 5 */}
                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-pink-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-pink-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Đam mê mãnh liệt
                          </h4>
                          <p className="text-gray-700">
                            Khi tìm thấy lý tưởng, INFP sẽ cống hiến hết mình
                            với niềm đam mê cháy bỏng. Họ theo đuổi ước mơ với
                            sự kiên định hiếm có.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">
                          Nhiệt huyết
                        </span>
                        <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">
                          Cống hiến
                        </span>
                        <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">
                          Lý tưởng
                        </span>
                      </div>
                    </div>

                    {/* Strength 6 */}
                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-pink-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-pink-600"
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
                          <h4 className="font-bold text-gray-800 mb-1">
                            Lý tưởng cao đẹp
                          </h4>
                          <p className="text-gray-700">
                            INFP luôn hướng tới những giá trị chân-thiện-mỹ. Họ
                            sống có mục đích và kiên định với niềm tin của mình
                            dù gặp khó khăn.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-pink-50 p-3 rounded-lg">
                        <p className="text-sm text-pink-700 italic">
                          "INFP là những người mơ mộng thực tế, luôn tìm cách
                          biến lý tưởng thành hiện thực bằng sự kiên trì và tình
                          yêu thương"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weaknesses Section */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-purple-700 flex items-center">
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
                      ĐIỂM YẾU CẦN LƯU Ý
                    </h3>
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Weakness 1 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu thực tế
                          </h4>
                          <p className="text-gray-700">
                            INFP đôi khi quá mơ mộng và xa rời thực tế. Họ có
                            thể thất vọng khi thế giới không đẹp như trong tưởng
                            tượng của mình.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Gợi ý:</span>
                          Cân bằng giữa lý tưởng và thực tế, chấp nhận sự không
                          hoàn hảo
                        </div>
                      </div>
                    </div>

                    {/* Weakness 2 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-700"
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
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tự cô lập
                          </h4>
                          <p className="text-gray-700">
                            INFP thường gặp khó khăn trong việc kết nối xã hội.
                            Họ dễ rút vào thế giới nội tâm và trở nên xa cách
                            với mọi người.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-purple-700 italic">
                          "INFP cần học cách mở lòng và chủ động hơn trong giao
                          tiếp để tránh cảm giác cô đơn"
                        </p>
                      </div>
                    </div>

                    {/* Weakness 3 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu tập trung
                          </h4>
                          <p className="text-gray-700">
                            Trí tưởng tượng bay bổng khiến INFP dễ sao nhãng. Họ
                            thường bắt đầu nhiều dự án nhưng khó hoàn thành.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          Mơ mộng
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          Chần chừ
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          Đa nhiệm
                        </span>
                      </div>
                    </div>

                    {/* Weakness 4 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Dễ tổn thương
                          </h4>
                          <p className="text-gray-700">
                            INFP nhạy cảm cao độ và dễ bị ảnh hưởng bởi cảm xúc
                            tiêu cực. Họ thường giữ nỗi buồn trong lòng thay vì
                            chia sẻ.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-purple-500 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>Độ nhạy cảm</span>
                          <span>
                            85% INFP tự nhận mình rất dễ bị tổn thương
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Weakness 5 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-700"
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
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Né tránh xung đột
                          </h4>
                          <p className="text-gray-700">
                            INFP ghét mâu thuẫn đến mức họ có thể hy sinh nhu
                            cầu bản thân để giữ hòa khí, dẫn đến sự oán giận
                            ngấm ngầm.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Giải pháp:</span>
                          Học cách đặt ranh giới lành mạnh và bảo vệ quan điểm
                          cá nhân
                        </div>
                      </div>
                    </div>

                    {/* Weakness 6 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tự phê bình khắc nghiệt
                          </h4>
                          <p className="text-gray-700">
                            INFP thường đặt tiêu chuẩn quá cao cho bản thân. Khi
                            không đạt được, họ dễ rơi vào vòng xoáy tự trách và
                            nghi ngờ bản thân.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Cải thiện:</span>
                          Học cách yêu thương và tha thứ cho chính mình, chấp
                          nhận sự không hoàn hảo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-xl text-white">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      PHÁT HUY TIỀM NĂNG INFP
                    </h3>
                    <p className="mb-4 text-pink-100">
                      Sức mạnh thực sự của INFP nằm ở khả năng kết hợp trí tưởng
                      tượng phong phú với lòng trắc ẩn sâu sắc. Khi học được
                      cách cân bằng giữa lý tưởng và thực tế, giữa ước mơ và
                      hành động, họ có thể trở thành những người truyền cảm hứng
                      và thay đổi thế giới.
                    </p>
                    <div className=" bg-opacity-20 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Một INFP trưởng thành hiểu rằng tình yêu thương cần đi
                        đôi với hành động cụ thể. Khi họ học cách bảo vệ năng
                        lượng tinh thần và tập trung vào điểm mạnh, không gì có
                        thể ngăn cản họ tạo nên sự khác biệt."
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
                  <h2 className="text-3xl font-bold text-indigo-800 mb-3">
                    MỐI QUAN HỆ CỦA INFP
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-indigo-500 mx-auto rounded-full"></div>
                  <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    INFP trong các mối quan hệ là những người trung thành, sâu
                    sắc nhưng khá khép kín. Họ tìm kiếm sự kết nối tâm hồn hơn
                    là những mối quan hệ hời hợt.
                  </p>
                </div>

                {/* General Relationship Traits */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
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
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>Trung thành tuyệt đối với người thân thiết</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>
                          Khó mở lòng nhưng một khi tin tưởng sẽ rất chân thành
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>
                          Nhạy cảm với xung đột và luôn tìm cách hòa giải
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>
                          Cần thời gian riêng tư để "sạc pin" tinh thần
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-pink-100 p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-pink-600"
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
                        {
                          type: "ENFJ",
                          desc: "Bổ sung năng lượng và giúp INFP cởi mở",
                        },
                        {
                          type: "ENFP",
                          desc: "Cùng chia sẻ giá trị và đam mê",
                        },
                        {
                          type: "INFJ",
                          desc: "Hiểu được chiều sâu nội tâm của INFP",
                        },
                        {
                          type: "ISFJ",
                          desc: "Mang lại sự ổn định và chăm sóc",
                        },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-bold text-indigo-600">
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
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl mb-12">
                  <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                      <div className="bg-white p-4 rounded-full shadow-lg">
                        <svg
                          className="w-16 h-16 text-pink-500"
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
                      <h3 className="text-2xl font-bold text-pink-700 mb-4">
                        INFP TRONG TÌNH YÊU
                      </h3>
                      <p className="text-gray-700 mb-4">
                        INFP là những người lãng mạn bẩm sinh, họ tin vào "tình
                        yêu đích thực" và không ngừng tìm kiếm mối liên kết tâm
                        hồn sâu sắc.
                      </p>
                      <div className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-pink-400 mb-4">
                        <p className="italic text-gray-700">
                          "INFP không chỉ yêu bằng trái tim mà còn bằng cả linh
                          hồn. Họ mong muốn một tình yêu vượt qua mọi rào cản
                          vật chất để chạm đến sự đồng điệu tinh thần."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Tình yêu lý tưởng hóa",
                        icon: "💭",
                        content:
                          "INFP thường xây dựng hình mẫu người yêu lý tưởng dựa trên sách vở hoặc trải nghiệm. Điều này khiến họ khó tìm được người phù hợp trong thực tế.",
                      },
                      {
                        title: "Cách thể hiện tình cảm",
                        icon: "💌",
                        content:
                          "Không phô trương, INFP thể hiện tình yêu qua những hành động nhỏ, sự quan tâm âm thầm và những lá thư tay đầy cảm xúc.",
                      },
                      {
                        title: "Thách thức trong tình yêu",
                        icon: "⚠️",
                        content:
                          "INFP dễ thất vọng khi hiện thực không như mong đợi. Họ cần học cách chấp nhận sự không hoàn hảo và giao tiếp cởi mở hơn.",
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
                  <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-blue-500"
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
                    INFP TRONG TÌNH BẠN
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Chất lượng hơn số lượng
                          </h4>
                          <p className="text-gray-700">
                            INFP có ít bạn nhưng tình bạn thường kéo dài cả đời.
                            Họ đầu tư thời gian và công sức để xây dựng mối quan
                            hệ sâu sắc.
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400 mb-6">
                        <p className="italic text-gray-700">
                          "Khi đã coi ai là bạn, INFP sẽ trở thành người bạn
                          trung thành nhất bạn từng có - luôn lắng nghe, thấu
                          hiểu và sẵn sàng giúp đỡ khi cần."
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start mb-6">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-600"
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
                            INFP thích những cuộc trò chuyện sâu sắc về ý nghĩa
                            cuộc sống hơn là tán gẫu thông thường. Họ có thể im
                            lặng hàng giờ nhưng vẫn cảm thấy kết nối.
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
                            Ranh giới cá nhân
                          </h4>
                          <p className="text-gray-700">
                            INFP cần không gian riêng để "sạc pin". Bạn bè thân
                            thiết hiểu và tôn trọng điều này, không cảm thấy bị
                            xúc phạm khi INFP cần thời gian một mình.
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
                    INFP KHI LÀM CHA MẸ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Phong cách nuôi dạy",
                          content:
                            "INFP trao cho con cái sự tự do khám phá thế giới, đồng thời là chỗ dựa tinh thần vững chắc. Họ khuyến khích con phát triển cá tính độc đáo.",
                        },
                        {
                          title: "Giá trị cốt lõi",
                          content:
                            "INFP dạy con về lòng nhân ái, sự chân thành và trách nhiệm. Họ muốn con mình trở thành người tốt hơn là đạt thành tích cao.",
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
                            <span>
                              Quá nhạy cảm với lỗi lầm của con, dễ tự trách bản
                              thân
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Khó thiết lập kỷ luật cứng rắn khi cần thiết
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Có xu hướng bảo vệ con quá mức khỏi thực tế phũ
                              phàng
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-100 p-5 rounded-lg border-l-4 border-green-500">
                        <p className="italic text-gray-700">
                          "Là cha mẹ, INFP mong muốn con cái được sống đúng với
                          bản chất chứ không phải trở thành bản sao của mình. Họ
                          nuôi dưỡng những cá tính độc đáo và khuyến khích con
                          theo đuổi đam mê."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Quote */}
                <div className="text-center mt-12">
                  <div className="bg-indigo-100 p-6 rounded-xl inline-block max-w-2xl">
                    <svg
                      className="w-10 h-10 text-indigo-500 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl font-medium text-indigo-800 mb-2">
                      "INFP yêu bằng cả trái tim và linh hồn. Trong mọi mối quan
                      hệ, họ tìm kiếm sự chân thành, thấu hiểu và ý nghĩa sâu
                      sắc hơn là những kết nối hời hợt."
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
                    LÀM SAO ĐỂ THÂN THIẾT VỚI{" "}
                    <span className="text-green-600">NHÀ LÝ TƯỞNG (INFP)</span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    INFP - Nhóm tính cách giàu cảm xúc, sáng tạo với trái tim
                    nhân hậu và khát khao tìm kiếm ý nghĩa cuộc sống
                  </p>
                </div>

                {/* Core Principles */}
                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="bg-white p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-sm">
                        <svg
                          className="w-10 h-10 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-green-800 mb-3">
                        Nguyên tắc vàng khi tiếp cận INFP
                      </h3>
                      <p className="text-gray-700">
                        "Sự chân thành và thấu hiểu" là chìa khóa để kết nối với
                        INFP - nhóm tính cách coi trọng giá trị bản thân và các
                        mối quan hệ sâu sắc. Để xây dựng mối quan hệ với INFP:
                        <span className="font-medium block mt-2">
                          "Hãy thể hiện sự đồng cảm chân thật, tôn trọng không
                          gian cảm xúc của họ và luôn sẵn sàng lắng nghe mà
                          không phán xét"
                        </span>
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
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Lắng nghe chân thành
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Tạo không gian an toàn để họ chia sẻ</li>
                            <li>Thể hiện sự thấu hiểu bằng ngôn ngữ cơ thể</li>
                            <li>Tránh ngắt lời hoặc phán xét vội vàng</li>
                            <li>Đặt câu hỏi mở để khuyến khích họ bộc lộ</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 2 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tôn trọng không gian riêng
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Hiểu rằng họ cần thời gian một mình để nạp năng
                              lượng
                            </li>
                            <li>
                              Không ép buộc họ tham gia hoạt động xã hội khi
                              không muốn
                            </li>
                            <li>
                              Chấp nhận khi họ cần "biến mất" một thời gian
                            </li>
                            <li>
                              Duy trì khoảng cách vừa phải nhưng luôn sẵn sàng
                              khi họ cần
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 3 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Chia sẻ giá trị sâu sắc
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Thảo luận về ý nghĩa cuộc sống và giá trị cá nhân
                            </li>
                            <li>Khuyến khích họ thể hiện góc nhìn độc đáo</li>
                            <li>Tránh các cuộc nói chuyện hời hợt, vô nghĩa</li>
                            <li>
                              Đánh giá cao sự sáng tạo và trí tưởng tượng của họ
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 4 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Hỗ trợ cảm xúc
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Giúp họ gọi tên và xử lý những cảm xúc phức tạp
                            </li>
                            <li>
                              Kiên nhẫn khi họ vật lộn với thế giới nội tâm
                            </li>
                            <li>
                              Đề nghị giúp đỡ một cách tế nhị khi họ gặp khó
                              khăn
                            </li>
                            <li>Tránh phủ nhận hoặc coi nhẹ cảm xúc của họ</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Tips */}
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Hướng dẫn tương tác hàng ngày
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
                              Thể hiện sự đồng cảm và thấu hiểu
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Tôn trọng nhu cầu không gian riêng
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Khuyến khích họ bày tỏ cảm xúc thật
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Chia sẻ những suy nghĩ chân thành từ trái tim
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
                              Phán xét hoặc chỉ trích giá trị cá nhân của họ
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Ép buộc họ tham gia hoạt động xã hội quá mức
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Coi thường cảm xúc hoặc lý tưởng của họ
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Thiếu kiên nhẫn khi họ cần thời gian suy nghĩ
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Advice */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">
                    Lời khuyên từ chuyên gia
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Xây dựng mối quan hệ với INFP là một hành trình cần sự kiên
                    nhẫn và chân thành. Một khi đã tin tưởng bạn, họ sẽ trở
                    thành người bạn trung thành nhất, luôn sẵn sàng lắng nghe và
                    hỗ trợ bạn. Hãy trân trọng sự nhạy cảm, sâu sắc và lòng trắc
                    ẩn mà họ mang đến cho cuộc sống của bạn.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="italic text-gray-700">
                      "Mối quan hệ với INFP như một khu vườn tâm hồn - cần thời
                      gian, sự chăm sóc và thấu hiểu để nở hoa. Khi được yêu
                      thương đúng cách, họ sẽ mang đến cho bạn những trải nghiệm
                      cảm xúc sâu sắc và ý nghĩa mà bạn không ngờ tới."
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
                    CON ĐƯỜNG SỰ NGHIỆP CỦA{" "}
                    <span className="text-purple-700">
                      NGƯỜI LÝ TƯỞNG HÓA (INFP)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    INFP - Những người sáng tạo với trái tim ấm áp, luôn tìm
                    kiếm ý nghĩa và mục đích trong công việc
                  </p>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-l from-purple-500 to-purple-700 p-8 rounded-lg mb-10 text-white">
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      "INFP xây dựng sự nghiệp bằng sự sáng tạo và lòng trắc ẩn"
                    </h3>
                    <p className="text-purple-100">
                      Những người lý tưởng hóa phát triển mạnh trong môi trường
                      cho phép họ thể hiện giá trị cá nhân và giúp đỡ người khác
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
                        <div className="bg-purple-100 text-purple-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          1
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn khám phá: Tìm kiếm ý nghĩa
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Khi mới bắt đầu sự nghiệp, INFP thường dành thời gian
                          để khám phá các lĩnh vực khác nhau, tìm kiếm công việc
                          phù hợp với giá trị cá nhân. Họ xuất sắc trong các vai
                          trò cho phép họ thể hiện sự sáng tạo và giúp đỡ người
                          khác.
                        </p>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="italic text-gray-700">
                            "INFP cần môi trường làm việc linh hoạt, nơi họ có
                            thể phát huy khả năng sáng tạo và làm việc theo cách
                            riêng của mình"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-purple-100 text-purple-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          2
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn phát triển: Chuyên môn hóa
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Sau khi tìm được lĩnh vực phù hợp, INFP phát triển
                          chuyên môn sâu trong các ngành nghề sáng tạo hoặc hỗ
                          trợ. Họ được đánh giá cao nhờ khả năng thấu hiểu và
                          tạo ra những giải pháp nhân văn.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                            Sáng tạo
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                            Đồng cảm
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                            Linh hoạt
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-purple-100 text-purple-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          3
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn chín muồi: Truyền cảm hứng
                        </h4>
                        <p className="text-gray-700">
                          Ở đỉnh cao sự nghiệp, INFP trở thành những nhà văn,
                          nhà tư vấn hoặc chuyên gia tâm lý có tiếng. Họ tạo ra
                          ảnh hưởng thông qua việc truyền cảm hứng và giúp đỡ
                          người khác tìm thấy ý nghĩa cuộc sống.
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
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-600"
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
                            Sáng tạo độc đáo
                          </h4>
                          <p className="text-gray-700">
                            Khả năng tư duy khác biệt và tạo ra những ý tưởng
                            mới lạ
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Đồng cảm sâu sắc
                          </h4>
                          <p className="text-gray-700">
                            Khả năng thấu hiểu và kết nối với cảm xúc của người
                            khác
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-600"
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
                            Giàu lý tưởng
                          </h4>
                          <p className="text-gray-700">
                            Luôn hướng tới những giá trị cao đẹp và mục đích ý
                            nghĩa
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-600"
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
                            Linh hoạt thích ứng
                          </h4>
                          <p className="text-gray-700">
                            Khả năng điều chỉnh và tìm giải pháp phù hợp với
                            từng hoàn cảnh
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ideal Career Paths */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Ngành nghề phù hợp
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-600"
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
                        <h4 className="font-bold text-purple-700">
                          Sáng tạo & Nghệ thuật
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhà
                          văn/Nhà thơ
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhạc
                          sĩ/Nhà soạn nhạc
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Họa
                          sĩ/Nhiếp ảnh gia
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Biên
                          kịch/Đạo diễn
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-gray-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-purple-700">
                          Tâm lý & Hỗ trợ
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhà tâm
                          lý học
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Tư vấn
                          viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhân
                          viên công tác xã hội
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Huấn
                          luyện viên cá nhân
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-purple-600"
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
                        </div>
                        <h4 className="font-bold text-purple-700">
                          Giáo dục & Nhân văn
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Giáo
                          viên/Giảng viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhà
                          hoạt động xã hội
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Chuyên
                          viên đào tạo
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhà
                          nghiên cứu nhân văn
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Career Warnings */}
                <div className="mb-12 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-purple-700 mb-3">
                    Cảnh báo nghề nghiệp
                  </h3>
                  <p className="text-gray-700 mb-4">
                    INFP nên tránh những môi trường công việc:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Cứng nhắc, quan liêu và quá nhiều quy tắc</li>
                    <li>Đặt nặng lợi nhuận hơn giá trị nhân văn</li>
                    <li>Phải làm việc với người thiếu chân thành</li>
                    <li>Đòi hỏi cạnh tranh khốc liệt và áp lực cao</li>
                  </ul>
                </div>

                {/* Career Development */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Lộ trình phát triển
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-purple-500 font-bold">
                        1.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn khám phá (0-5 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Thử nghiệm các lĩnh vực khác nhau, tìm kiếm công việc
                          phù hợp với giá trị cá nhân và phát triển kỹ năng sáng
                          tạo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-purple-500 font-bold">
                        2.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn chuyên sâu (5-10 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Tập trung phát triển chuyên môn trong lĩnh vực đã
                          chọn, xây dựng phong cách riêng và mạng lưới quan hệ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-purple-500 font-bold">
                        3.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn truyền cảm hứng (10+ năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Sử dụng kinh nghiệm và uy tín để truyền cảm hứng, giúp
                          đỡ người khác và tạo ra tác động tích cực đến xã hội
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Quote */}
                <div className="text-center mt-12">
                  <div className="bg-purple-100 p-6 rounded-xl inline-block max-w-2xl">
                    <svg
                      className="w-10 h-10 text-purple-500 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl font-medium text-purple-800 mb-2">
                      "INFP xây dựng sự nghiệp bằng sự sáng tạo và lòng trắc ẩn.
                      Họ là những người theo đuổi lý tưởng, luôn tìm kiếm ý
                      nghĩa sâu sắc trong công việc. Để phát huy hết tiềm năng,
                      INFP cần môi trường tôn trọng giá trị cá nhân, cho phép họ
                      làm việc độc lập và có không gian để sáng tạo."
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Workplace Habits Section */}
            {activeSection === "workplace-habits" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-2 border-blue-100 pb-4">
                  THÓI QUEN NƠI CÔNG SỞ
                </h2>

                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    Những người thuộc nhóm tính cách INFP muốn làm việc một cách
                    có mục đích, có tổ chức. Trong công việc, họ sẽ cân bằng cảm
                    xúc và đạo đức nghề nghiệp, hy vọng rằng những đóng góp của
                    họ sẽ giúp đỡ được tổ chức. Việc này được thể hiện qua cách
                    các INFP đối xử và giao tiếp hàng ngày với đồng nghiệp và
                    cấp trên.
                  </p>
                </div>

                {/* As Employees Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-600">
                      INFP khi là nhân viên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điểm mạnh nổi bật
                      </h4>
                      <p className="text-gray-700">
                        Trung thành, tận tâm và lạc quan. Tự hào khi hoàn thành
                        nhiệm vụ. Luôn tìm cách giúp đỡ người khác. Có khả năng
                        đưa ra giải pháp sáng tạo. Làm việc tốt khi có không
                        gian tự do.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thách thức
                      </h4>
                      <p className="text-gray-700">
                        Dễ bị tổn thương bởi lời phê bình. Khó làm việc dưới áp
                        lực cao. Cần đặt deadline rõ ràng để tránh trì hoãn. Dễ
                        bị phân tâm bởi nhiều ý tưởng. Khó tập trung trong môi
                        trường căng thẳng.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "Các INFP là nhân viên xuất sắc khi được làm việc trong
                      môi trường cởi mở, được khích lệ và có mục đích rõ ràng.
                      Họ cần sự công nhận và tránh xa những xung đột không cần
                      thiết."
                    </p>
                  </div>
                </div>

                {/* As Colleagues Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-600">
                      INFP khi là đồng nghiệp
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Giá trị mang lại
                      </h4>
                      <p className="text-gray-700">
                        Tạo sự hòa hợp trong nhóm. Luôn sẵn sàng giúp đỡ đồng
                        nghiệp. Giao tiếp đồng cảm và chân thành. Mang lại bầu
                        không khí tích cực. Là người lắng nghe tuyệt vời.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điều cần lưu ý
                      </h4>
                      <p className="text-gray-700">
                        Không thích phân cấp thứ bậc. Tránh xung đột bằng mọi
                        giá. Có thể khó đưa ra phản hồi tiêu cực. Đôi khi quá lý
                        tưởng hóa. Cần thời gian để mở lòng với người mới.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1 mr-3 text-blue-500 text-xl">
                      💡
                    </div>
                    <div>
                      <p className="text-gray-700">
                        "Đồng nghiệp INFP giống như 'linh hồn' của nhóm - họ kết
                        nối mọi người bằng sự chân thành và ấm áp, luôn tìm cách
                        thúc đẩy sự hợp tác thay vì cạnh tranh."
                      </p>
                    </div>
                  </div>
                </div>

                {/* As Managers Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-600">
                      INFP khi làm quản lý
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách lãnh đạo
                      </h4>
                      <p className="text-gray-700">
                        Đối xử bình đẳng với nhân viên. Tập trung vào bức tranh
                        tổng thể. Khuyến khích sự sáng tạo. Hỗ trợ thay vì kiểm
                        soát. Lắng nghe ý kiến của mọi người.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Ưu tiên
                      </h4>
                      <p className="text-gray-700">
                        Xây dựng môi trường làm việc hài hòa. Phát triển tiềm
                        năng nhân viên. Đề cao giá trị đạo đức. Khuyến khích sự
                        tự chủ. Tránh các xung đột không cần thiết.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 text-gray-600">⚠️</div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Lời khuyên cho lãnh đạo INFP: Cần học cách đưa ra phản
                          hồi mang tính xây dựng khi cần thiết. Đôi khi cần cứng
                          rắn hơn để đảm bảo hiệu quả công việc và duy trì kỷ
                          luật trong nhóm.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Path Section */}
                <div className="mt-10 bg-gradient-to-r from-blue-600 to-gray-700 p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-3">
                    Con đường sự nghiệp lý tưởng
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-gray-800 to-blue-600 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Sáng tạo & Nghệ thuật
                      </h4>
                      <p className="text-sm">
                        Nhà văn, Nhà thơ, Nhạc sĩ, Nghệ sĩ, Nhà thiết kế, Biên
                        tập viên
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-800 to-blue-600 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Tư vấn & Giúp đỡ</h4>
                      <p className="text-sm">
                        Tư vấn tâm lý, Công tác xã hội, Giáo viên, Nhân viên tư
                        vấn, Chuyên gia phát triển cá nhân
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-800 to-blue-600 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Nhân văn & Cộng đồng
                      </h4>
                      <p className="text-sm">
                        Nhà hoạt động xã hội, Nhà nghiên cứu văn hóa, Chuyên
                        viên quan hệ cộng đồng, Tình nguyện viên
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-blue-100 text-sm">
                    <p>
                      INFP phát triển mạnh trong môi trường làm việc có ý nghĩa,
                      nơi họ có thể thể hiện giá trị cá nhân và giúp đỡ người
                      khác. Họ cần công việc cho phép họ sáng tạo và duy trì sự
                      tự chủ trong công việc.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "compare" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-indigo-800 mb-6 border-b-2 border-indigo-100 pb-4">
                  SO SÁNH INFP VỚI ENFP VÀ INTP
                </h2>

                {/* Introduction */}
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    Khi so sánh INFP (Người lý tưởng hóa) với ENFP (Người truyền
                    cảm hứng) và INTP (Nhà tư duy), chúng ta thấy rõ hơn đặc
                    điểm riêng của từng nhóm tính cách. Cả ba đều thuộc nhóm
                    "Nhà ngoại giao" (NF) và "Nhà phân tích" (NT) với nhiều điểm
                    tương đồng nhưng cũng có những khác biệt thú vị.
                  </p>
                </div>

                {/* Similarities Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-green-700">
                      Điểm chung
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm mr-2">
                          N
                        </span>
                        Trực giác mạnh mẽ
                      </h4>
                      <p className="text-gray-700">
                        Cả INFP, ENFP và INTP đều có xu hướng tập trung vào ý
                        nghĩa và khả năng tiềm ẩn hơn là chi tiết cụ thể. Họ
                        thích suy nghĩ về tương lai và các khả năng có thể xảy
                        ra.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm mr-2">
                          P
                        </span>
                        Linh hoạt và tự do
                      </h4>
                      <p className="text-gray-700">
                        Cả ba nhóm đều đề cao sự tự do, linh hoạt và cởi mở với
                        những trải nghiệm mới. Họ không thích bị gò bó bởi các
                        quy tắc cứng nhắc và thích giữ các lựa chọn luôn mở.
                      </p>
                    </div>
                  </div>
                </div>

                {/* INFP vs ENFP Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-pink-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-pink-700">
                      INFP vs ENFP
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điểm tương đồng
                      </h4>
                      <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        <li>
                          Cùng có chức năng chính là Hướng nội Cảm xúc (Fi) và
                          Hướng ngoại Trực giác (Ne)
                        </li>
                        <li>
                          Đều có trí tưởng tượng phong phú và khả năng sáng tạo
                          cao
                        </li>
                        <li>Quan tâm đến giá trị cá nhân và sự chân thực</li>
                        <li>
                          Thích giúp đỡ người khác và làm việc vì lợi ích cộng
                          đồng
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Khác biệt chính
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-700">
                            Năng lượng
                          </h5>
                          <p className="text-gray-600 text-sm">
                            ENFP (hướng ngoại) được tiếp năng lượng từ tương tác
                            xã hội, trong khi INFP (hướng nội) cần thời gian một
                            mình để nạp năng lượng.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700">
                            Giao tiếp
                          </h5>
                          <p className="text-gray-600 text-sm">
                            ENFP thường bộc lộ cảm xúc ra ngoài và dễ dàng kết
                            nối với mọi người, trong khi INFP giữ cảm xúc bên
                            trong và kén chọn người để chia sẻ.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700">
                            Quyết định
                          </h5>
                          <p className="text-gray-600 text-sm">
                            ENFP có xu hướng cân nhắc tác động đến người khác
                            (Fe), trong khi INFP tập trung vào giá trị nội tâm
                            (Fi).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "Trong khi ENFP là ngọn lửa nhiệt huyết lan tỏa năng lượng
                      tích cực ra xung quanh, thì INFP lại giống như ngọn nến ấm
                      áp tỏa sáng trong im lặng."
                    </p>
                  </div>
                </div>

                {/* INFP vs INTP Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-teal-700">
                      INFP vs INTP
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điểm tương đồng
                      </h4>
                      <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        <li>
                          Cùng là kiểu người hướng nội, trực giác và linh hoạt
                        </li>
                        <li>
                          Đều có tư duy độc lập và không thích bị kiểm soát
                        </li>
                        <li>Thích nghiên cứu sâu về các chủ đề hứng thú</li>
                        <li>Có xu hướng trì hoãn và khó hoàn thành dự án</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Khác biệt chính
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-700">
                            Cách ra quyết định
                          </h5>
                          <p className="text-gray-600 text-sm">
                            INFP dựa trên cảm xúc và giá trị cá nhân (Fi), trong
                            khi INTP dựa trên logic và phân tích khách quan
                            (Ti).
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700">
                            Mối quan tâm
                          </h5>
                          <p className="text-gray-600 text-sm">
                            INFP tập trung vào con người và các vấn đề nhân văn,
                            trong khi INTP quan tâm đến hệ thống và lý thuyết.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700">
                            Biểu hiện cảm xúc
                          </h5>
                          <p className="text-gray-600 text-sm">
                            INFP có đời sống cảm xúc phong phú, trong khi INTP
                            thường gặp khó khăn trong việc hiểu và thể hiện cảm
                            xúc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "Nếu INFP là nhà thơ với trái tim đầy cảm xúc, thì INTP là
                      nhà khoa học với tâm trí luôn tìm kiếm sự thật."
                    </p>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Bảng so sánh chi tiết
                  </h3>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          Đặc điểm
                        </th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          ENFP
                        </th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          INFP
                        </th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          INTP
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700">
                          Năng lượng
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Hướng ngoại (E)
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Hướng nội (I)
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Hướng nội (I)
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700">
                          Quyết định
                        </td>
                        <td className="py-3 px-4 text-gray-600">Cảm xúc (F)</td>
                        <td className="py-3 px-4 text-gray-600">Cảm xúc (F)</td>
                        <td className="py-3 px-4 text-gray-600">Lý trí (T)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700">
                          Phong cách giao tiếp
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Nhiệt tình, biểu cảm
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Nhẹ nhàng, sâu lắng
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Logic, khách quan
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700">
                          Động lực làm việc
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Tạo ảnh hưởng xã hội
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Theo đuổi lý tưởng
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Khám phá tri thức
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-700">
                          Điểm mạnh
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Truyền cảm hứng, kết nối
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Đồng cảm, sáng tạo
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Phân tích, giải quyết vấn đề
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700">
                          Điểm yếu
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Thiếu tập trung, dễ phân tâm
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Quá nhạy cảm, tự nghi ngờ
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          Thiếu kiên nhẫn, xa cách
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Career Comparison */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    So sánh nghề nghiệp phù hợp
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-indigo-100">
                      <h4 className="font-bold text-indigo-700 mb-3">ENFP</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Nhà tâm lý học</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Diễn giả truyền cảm hứng</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Nhân viên marketing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Huấn luyện viên cá nhân</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-pink-100">
                      <h4 className="font-bold text-pink-700 mb-3">INFP</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span>Nhà văn/Nhà thơ</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span>Tư vấn tâm lý</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span>Nhân viên xã hội</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span>Giáo viên nghệ thuật</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-teal-100">
                      <h4 className="font-bold text-teal-700 mb-3">INTP</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Nhà khoa học/Nghiên cứu</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Lập trình viên</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Kỹ sư phần mềm</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Nhà triết học</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final Thoughts */}
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                    Kết luận
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Cả ba nhóm tính cách INFP, ENFP và INTP đều có điểm chung là
                    đánh giá cao sự tự do, sáng tạo và sử dụng trực giác làm
                    công cụ chính để hiểu thế giới. Tuy nhiên, cách họ tiếp cận
                    thông tin, xử lý cảm xúc và tương tác xã hội lại có sự khác
                    biệt rõ rệt.
                  </p>
                  <p className="text-gray-700">
                    INFP tập trung vào bức tranh toàn cảnh với lăng kính cảm
                    xúc, ENFP sử dụng trực giác để kết nối và truyền cảm hứng,
                    trong khi INTP áp dụng tư duy logic để phân tích và giải
                    quyết vấn đề. Sự đa dạng này tạo nên những thế mạnh riêng
                    biệt cho từng nhóm trong công việc và các mối quan hệ.
                  </p>
                </div>
              </div>
            )}
            {activeSection === "advice" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-blue-600 mb-8 border-b-2 border-blue-100 pb-4">
                  LỜI KHUYÊN DÀNH CHO CÁC INFP
                </h2>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-8 rounded-lg mb-10 text-white">
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Hành trình phát triển cho những tâm hồn sáng tạo
                    </h3>
                    <p className="text-blue-100">
                      Là những người giàu cảm xúc và lý tưởng, INFP cần học cách
                      cân bằng giữa thế giới nội tâm phong phú và cuộc sống thực
                      tế, giữa sự nhạy cảm và khả năng hành động để phát huy hết
                      tiềm năng của mình.
                    </p>
                  </div>
                </div>

                {/* Core Advice Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {/* Develop Strengths */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-6 h-6 text-purple-600"
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
                      <h3 className="text-xl font-semibold text-gray-800">
                        Phát huy thế mạnh
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tận dụng tối đa sự sáng tạo và lòng trắc ẩn của bạn:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Nuôi dưỡng trí tưởng tượng phong phú</li>
                      <li>Phát triển khả năng thấu hiểu người khác</li>
                      <li>Đề cao giá trị chân thực trong mọi việc</li>
                    </ul>
                  </div>

                  {/* Improve Weaknesses */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
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
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Khắc phục điểm yếu
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Những điều INFP cần lưu ý để phát triển:
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="italic text-gray-700">
                        "Sự hoàn hảo thực sự nằm ở việc chấp nhận không hoàn
                        hảo"
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Học cách tập trung vào một mục tiêu cụ thể</li>
                      <li>Dũng cảm bày tỏ cảm xúc của bản thân</li>
                      <li>Kiểm soát xu hướng suy nghĩ quá mức</li>
                    </ul>
                  </div>
                </div>

                {/* Key Advice Section */}
                <div className="mb-10 bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                        <svg
                          className="w-10 h-10 text-purple-600"
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
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                        Chiến lược phát triển then chốt
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                          <h4 className="font-semibold text-purple-700 mb-2">
                            Rèn luyện sự tập trung
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Xác định ưu tiên công việc rõ ràng</li>
                            <li>Lập kế hoạch và timeline cụ thể</li>
                            <li>
                              Hoàn thành từng việc một thay vì làm nhiều thứ
                              cùng lúc
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                          <h4 className="font-semibold text-purple-700 mb-2">
                            Bày tỏ cảm xúc
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Bắt đầu bằng những chia sẻ đơn giản</li>
                            <li>Dần mở lòng về cảm xúc sâu kín</li>
                            <li>Tạo cơ hội để người khác hiểu mình</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                          <h4 className="font-semibold text-purple-700 mb-2">
                            Kiểm soát suy nghĩ
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>
                              Đặt câu hỏi "Mình có thể làm gì ngay bây giờ?"
                            </li>
                            <li>Chấp nhận những điều chưa thể thay đổi</li>
                            <li>
                              Tập trung vào hiện tại thay vì lo lắng tương lai
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                          <h4 className="font-semibold text-purple-700 mb-2">
                            Nuôi dưỡng sáng tạo
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Dành thời gian cho hoạt động nghệ thuật</li>
                            <li>Khám phá ý tưởng mới mỗi ngày</li>
                            <li>
                              Biến sáng tạo thành công cụ cải thiện cuộc sống
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Self-Improvement Section */}
                <div className="mb-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 bg-purple-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm">
                          <svg
                            className="w-6 h-6 text-purple-600"
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
                        <h3 className="text-xl font-semibold text-purple-700">
                          Quản lý cảm xúc
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        INFP cần chú ý phát triển khả năng cân bằng cảm xúc:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Chia sẻ nhiều hơn
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Bày tỏ suy nghĩ thay vì giữ trong lòng</li>
                            <li>Tìm người đáng tin để tâm sự</li>
                            <li>Viết nhật ký như cách giải tỏa cảm xúc</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Tư duy thực tế
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Chấp nhận không có gì là hoàn hảo</li>
                            <li>Tập trung vào những gì có thể kiểm soát</li>
                            <li>Biến lý tưởng thành hành động cụ thể</li>
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
                            <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              1
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Tập trung công việc
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi ngày chọn 1 nhiệm vụ quan trọng nhất và hoàn
                                thành nó trước
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              2
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Chia sẻ cảm xúc
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi ngày chia sẻ ít nhất 1 suy nghĩ hoặc cảm
                                nhận với người khác
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              3
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Thực hành sáng tạo
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Dành 30 phút mỗi ngày cho hoạt động sáng tạo như
                                viết, vẽ
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Encouragement */}
                <div className="bg-gradient-to-r from-purple-800 to-blue-900 p-8 rounded-lg text-white">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Sức mạnh của những tâm hồn mơ mộng
                    </h3>
                    <p className="mb-4 text-purple-100">
                      Bạn được ban tặng trí tưởng tượng phong phú, sự đồng cảm
                      sâu sắc và khả năng nhìn thấy vẻ đẹp tiềm ẩn trong mọi
                      thứ. Khi học cách kết hợp những điểm mạnh này với sự tập
                      trung và hành động cụ thể, bạn sẽ trở thành phiên bản tốt
                      nhất của chính mình.
                    </p>
                    <div className="bg-gray-800 bg-opacity-30 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Thế giới cần những tâm hồn như bạn - những người biết
                        cảm nhận sâu sắc, truyền cảm hứng và tạo ra sự khác biệt
                        bằng sự chân thành. Hãy nhớ rằng giá trị thực sự nằm ở
                        việc biến lý tưởng thành hiện thực bằng cả trái tim và
                        hành động."
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
export default INFPPage;
