import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import handleCopyLink from "../helpers/HandleCopyLink";

const ESFJPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Tổng quan" },
    { id: "strengths-weaknesses", title: "Điểm mạnh và điểm yếu" },
    { id: "relationship", title: "Mối quan hệ" },
    { id: "how-to-be-close", title: "Làm sao để thân thiết với ESFJ" },
    { id: "career-path", title: "Con đường sự nghiệp" },
    { id: "workplace-habits", title: "Thói quen nơi công sở" },
    { id: "compare", title: "So sánh ESFJ với INFJ, ESFJ" },
    { id: "advice", title: "Lời khuyên dành cho ESFJ" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="ESFJ-page bg-gradient-to-b from-blue-50 to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}

        {/* Header */}
        <div className="mbti-result-header bg-white rounded-xl shadow-md p-6 mb-8 relative ">
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
                ESFJ - Người quan tâm
              </h1>
            </div>
            <div className="relative w-full">
              <img
                src="/mbti_icons/esfj1.webp"
                alt="ESFJ - Người quan tâm"
                className="pointer w-full h-120 object-cover rounded-lg shadow "
              />
            </div>

            {/* Description */}
            <div className="text-lg text-gray-700 max-w-4xl text-center">
              ESFJ là nhóm tính cách nổi tiếng hòa đồng, thân thiện, hào phóng
              và tận tâm. Họ sẵn sàng giúp đỡ những người xung quanh như thể đó
              là vấn đề của chính bản thân họ. ESFJ là những người coi trọng
              nguyên tắc và những giá trị truyền thống, có nề nếp và yêu thương
              gia đình hết mực.
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
                  <h2 className="text-3xl font-bold text-orange-600 mb-4">
                    TỔNG QUAN TÍNH CÁCH ESFJ
                  </h2>
                  <div className="w-20 h-1 bg-brown-400 mx-auto"></div>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    ESFJ (Người quan tâm) là nhóm tính cách thực tế, vị tha và
                    hòa đồng, chiếm khoảng 12% dân số. Họ là những người chu
                    đáo, luôn muốn phục vụ người khác và nghiêm túc trong mọi
                    cam kết. Với tấm lòng ấm áp và tinh thần trách nhiệm cao,
                    ESFJ là chỗ dựa đáng tin cậy trong cộng đồng.
                  </p>
                </div>

                {/* MBTI Breakdown */}
                <div className="bg-gradient-to-r from-orange-50 to-brown-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                    Ý NGHĨA 4 CHỮ CÁI ESFJ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "● E - Hướng ngoại (Extraverted)",
                        color: "bg-orange-100",
                        textColor: "text-orange-800",
                        content:
                          "ESFJ tương tác tích cực với thế giới bên ngoài. Họ tràn đầy năng lượng khi được giao tiếp và quan tâm đến nhu cầu của người khác.",
                      },
                      {
                        title: "● S - Giác quan (Sensing)",
                        color: "bg-amber-100",
                        textColor: "text-amber-800",
                        content:
                          "ESFJ tập trung vào thực tế và những gì cụ thể. Họ quan sát tỉ mỉ bằng các giác quan và chú trọng đến chi tiết thực tế.",
                      },
                      {
                        title: "● F - Cảm xúc (Feeling)",
                        color: "bg-amber-100",
                        textColor: "text-amber-900",
                        content:
                          "ESFJ đưa ra quyết định dựa trên giá trị cá nhân và sự hòa hợp. Họ nhạy cảm với cảm xúc của người khác và luôn mong muốn giúp đỡ.",
                      },
                      {
                        title: "● J - Nguyên tắc (Judging)",
                        color: "bg-orange-200",
                        textColor: "text-orange-900",
                        content:
                          "ESFJ thích sự ổn định và có tổ chức. Họ lập kế hoạch cẩn thận và tuân thủ các quy tắc, cam kết đã đặt ra.",
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
                      title: "Trái tim ấm áp",
                      icon: "❤️",
                      content:
                        "ESFJ luôn quan tâm đến người khác với tấm lòng chân thành. Họ nhạy cảm với nhu cầu của mọi người và sẵn sàng giúp đỡ không điều kiện.",
                    },
                    {
                      title: "Người tổ chức tài ba",
                      icon: "📋",
                      content:
                        "ESFJ có năng khiếu trong việc sắp xếp và duy trì trật tự. Họ giỏi lập kế hoạch và đảm bảo mọi việc diễn ra suôn sẻ.",
                    },
                    {
                      title: "Tinh thần trách nhiệm cao",
                      icon: "🏆",
                      content:
                        "ESFJ nghiêm túc với mọi cam kết và luôn hoàn thành nhiệm vụ xuất sắc. Họ được tin tưởng nhờ sự đáng tin cậy và chăm chỉ.",
                    },
                    {
                      title: "Giá trị truyền thống",
                      icon: "🏛️",
                      content:
                        "ESFJ tôn trọng các quy tắc xã hội và giá trị đạo đức truyền thống. Họ mong muốn duy trì sự ổn định và hài hòa trong cộng đồng.",
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-300"
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

                {/* Strengths & Weaknesses */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-orange-700 mb-4">
                      ĐIỂM MẠNH NỔI BẬT
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Ấm áp, chu đáo và giàu lòng trắc ẩn</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Tổ chức và quản lý công việc xuất sắc</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Đáng tin cậy và có trách nhiệm cao</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Giao tiếp khéo léo và hòa đồng</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>
                          Thực tế và thiết thực trong giải quyết vấn đề
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-brown-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-brown-700 mb-4">
                      ĐIỂM YẾU CẦN LƯU Ý
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-brown-500 mr-2">✗</span>
                        <span>Quá quan tâm đến ý kiến người khác</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brown-500 mr-2">✗</span>
                        <span>Khó chấp nhận sự thay đổi và mạo hiểm</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brown-500 mr-2">✗</span>
                        <span>Có xu hướng áp đặt sự giúp đỡ</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brown-500 mr-2">✗</span>
                        <span>Thiếu linh hoạt với các quan điểm mới</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brown-500 mr-2">✗</span>
                        <span>Dễ bị tổn thương khi bị từ chối</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Career & Relationships */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-orange-700 mb-4">
                      ESFJ TRONG CÔNG VIỆC
                    </h3>
                    <p className="text-gray-700 mb-4">
                      ESFJ tỏa sáng trong môi trường có cấu trúc rõ ràng và được
                      giúp đỡ người khác:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Cơ hội chăm sóc và hỗ trợ người khác</li>
                      <li>Môi trường làm việc có tổ chức</li>
                      <li>Công việc thực tế, cụ thể</li>
                      <li>Được công nhận và đánh giá cao</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Nghề nghiệp phù hợp: Y tá, giáo viên, nhân viên xã hội,
                      quản lý văn phòng, tổ chức sự kiện, chăm sóc khách hàng,
                      tư vấn.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-brown-700 mb-4">
                      ESFJ TRONG QUAN HỆ
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Trong các mối quan hệ, ESFJ là người chu đáo và tận tâm:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Luôn quan tâm đến nhu cầu người thân</li>
                      <li>Thể hiện tình cảm qua hành động thiết thực</li>
                      <li>Mong muốn sự công nhận và đáp lại</li>
                      <li>Có thể quá nhạy cảm với xung đột</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      ESFJ cần học cách đặt ranh giới lành mạnh và chấp nhận sự
                      khác biệt trong mối quan hệ.
                    </p>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-gradient-to-r from-orange-50 to-brown-50 p-6 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold text-center text-orange-700 mb-6">
                    ESFJ NỔI TIẾNG
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Bill Clinton",
                        role: "Cựu Tổng thống Hoa Kỳ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Bill_Clinton.jpg",
                      },
                      {
                        name: "Barbara Walters",
                        role: "Nhà báo, người dẫn chương trình",
                        image:
                          "https://image.thanhnien.vn/Uploaded/dotuan/2022_12_31/1-378.jpg",
                      },
                      {
                        name: "Hugh Jackman",
                        role: "Diễn viên",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/7/77/Logan_Japan_Premiere_Red_Carpet-_Hugh_Jackman_%2838445328406%29_%28rotated%29.jpg",
                      },
                      {
                        name: "Maria Menounos",
                        role: "Người dẫn chương trình",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/1/14/Maria_Menounos_2014_Kaleidoscope_Ball_%28cropped%29.jpg",
                      },
                      {
                        name: "Sam Walton",
                        role: "Nhà sáng lập Walmart",
                        image:
                          "https://dnsg.1cdn.vn/2020/03/03/i.doanhnhansaigon.vn-2018-03-29-_samwaltondoanhnhansaigon1-1522298272.jpg",
                      },
                      {
                        name: "Taylor Swift",
                        role: "Ca sĩ, nhạc sĩ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png",
                      },
                      {
                        name: "Danny Glover",
                        role: "Diễn viên",
                        image:
                          "https://cdn.britannica.com/78/216778-050-E6ACD018/American-actor-Danny-Glover-1999.jpg",
                      },
                      {
                        name: "Tyra Banks",
                        role: "Người mẫu, MC, doanh nhân",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/a/aa/Tyra_Banks_2011.jpg",
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
                <div className="bg-orange-100 p-6 rounded-lg mt-8 text-center">
                  <p className="text-orange-800 italic font-medium">
                    "ESFJ là những người nuôi dưỡng cộng đồng bằng trái tim ấm
                    áp và đôi bàn tay chăm chỉ. Với tinh thần trách nhiệm cao và
                    sự chu đáo không ngừng nghỉ, họ tạo nên sự ổn định và hài
                    hòa trong thế giới xung quanh. Dù đôi khi quá quan tâm đến
                    kỳ vọng xã hội, ESFJ luôn là chỗ dựa đáng tin cậy cho những
                    ai cần sự giúp đỡ và quan tâm chân thành."
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
                    <span className="text-orange-600">
                      NHÓM TÍNH CÁCH ESFJ (NGƯỜI QUAN TÂM)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ESFJ - Nhóm tính cách "Người quan tâm" với tinh thần trách
                    nhiệm cao, sự ấm áp và khả năng tổ chức tuyệt vời
                  </p>
                </div>

                {/* Strengths Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-orange-600 flex items-center">
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
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Strength 1 */}
                    <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Gọn gàng, ngăn nắp
                          </h4>
                          <p className="text-gray-700">
                            ESFJ rất giỏi trong việc sắp xếp và thực hiện công
                            việc mỗi ngày. Họ lên lịch trình và phân chia trình
                            tự trong công việc và trong cuộc sống thường ngày
                            một cách ngăn nắp, có khoa học.
                          </p>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-orange-700 italic">
                          "Khả năng tổ chức của ESFJ giúp mọi việc luôn được
                          hoàn thành đúng hạn và hiệu quả"
                        </p>
                      </div>
                    </div>

                    {/* Strength 2 */}
                    <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tinh thần trách nhiệm cao
                          </h4>
                          <p className="text-gray-700">
                            ESFJ sống rất trách nhiệm và luôn nỗ lực để làm trọn
                            bổn phận của mình, cho dù đôi khi đó là trách nhiệm
                            đến từ xã hội hơn là từ chính bản thân họ.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                          Đáng tin cậy
                        </span>
                        <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                          Tận tâm
                        </span>
                        <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                          Chu đáo
                        </span>
                      </div>
                    </div>

                    {/* Strength 3 */}
                    <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                          <h4 className="font-bold text-gray-800 mb-1">
                            Trung thành tuyệt đối
                          </h4>
                          <p className="text-gray-700">
                            ESFJ đánh giá cao sự an toàn và luôn "một lòng" với
                            những điều quen thuộc. Họ là những người đồng nghiệp
                            và bạn đời đáng tin cậy, luôn là "trụ cột" để mọi
                            người tin tưởng.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-orange-500 rounded-full"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>Mức độ trung thành</span>
                          <span>90% ESFJ được đánh giá cao về sự đáng tin</span>
                        </div>
                      </div>
                    </div>

                    {/* Strength 4 */}
                    <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Ấm áp và đồng cảm
                          </h4>
                          <p className="text-gray-700">
                            ESFJ biết lắng nghe cảm xúc của người khác và rất
                            khéo léo trong giao tiếp. Họ giỏi kết nối mọi người
                            và thường được yêu mến nhờ sự chân thành, ấm áp của
                            mình.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Biểu hiện:</span>
                          Lắng nghe, thấu hiểu, giao tiếp khéo léo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weaknesses Section */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-brown-600 flex items-center">
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
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-brown-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Weakness 1 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-brown-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-brown-600"
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
                            Thiếu tự tin
                          </h4>
                          <p className="text-gray-700">
                            ESFJ quá chú trọng tới cái nhìn của người khác và dễ
                            dao động bởi ngoại cảnh. Điều này hạn chế khả năng
                            sáng tạo và ra quyết định độc lập của họ.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Gợi ý:</span>
                          Tập trung vào giá trị bản thân thay vì quá quan tâm
                          đánh giá bên ngoài
                        </div>
                      </div>
                    </div>

                    {/* Weakness 2 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-brown-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-brown-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu linh hoạt
                          </h4>
                          <p className="text-gray-700">
                            ESFJ đề cao giá trị truyền thống và thường ép mình
                            vào khuôn khổ. Họ không thích sự khác biệt và ngại
                            thay đổi, điều này có thể hạn chế sự phát triển cá
                            nhân.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-brown-50 p-3 rounded-lg">
                        <p className="text-sm text-brown-700 italic">
                          "ESFJ cần học cách chấp nhận sự đa dạng và mở lòng với
                          những quan điểm mới"
                        </p>
                      </div>
                    </div>

                    {/* Weakness 3 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-brown-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-brown-600"
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
                            Bảo thủ
                          </h4>
                          <p className="text-gray-700">
                            ESFJ né tránh việc ra khỏi vùng an toàn vì sợ lời dị
                            nghị. Họ không muốn trở nên khác biệt và thường tuân
                            theo những quy tắc đã được định sẵn.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Cải thiện:</span>
                          Dần mở rộng giới hạn bản thân và thử nghiệm những điều
                          mới
                        </div>
                      </div>
                    </div>

                    {/* Weakness 4 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-brown-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-brown-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Khát khao được ghi nhận
                          </h4>
                          <p className="text-gray-700">
                            ESFJ luôn mong muốn sự đóng góp của mình được công
                            nhận. Đôi khi họ quá chú trọng vào việc được khen
                            ngợi, điều này có thể gây khó chịu cho người khác.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Giải pháp:</span>
                          Học cách cho đi mà không mong nhận lại, tận hưởng niềm
                          vui từ việc giúp đỡ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="mt-12 bg-gradient-to-l from-orange-400 to-amber-500 to-brown-500 p-8 rounded-xl text-white">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      CÂN BẰNG CUỘC SỐNG ESFJ
                    </h3>
                    <p className="mb-4 text-orange-100">
                      Sức mạnh thực sự của ESFJ nằm ở khả năng kết hợp tinh thần
                      trách nhiệm với sự ấm áp chân thành. Khi học được cách cân
                      bằng giữa nhu cầu của người khác và bản thân, giữa truyền
                      thống và đổi mới, họ có thể trở thành những người đồng
                      hành tuyệt vời.
                    </p>
                    <div className="bg-opacity-20 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Một ESFJ trưởng thành hiểu rằng hạnh phúc thực sự đến
                        từ việc chấp nhận bản thân chứ không phải từ sự công
                        nhận bên ngoài. Đây là chìa khóa để họ sống trọn vẹn với
                        giá trị của mình."
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
                  <h2 className="text-3xl font-bold text-orange-600 mb-3">
                    MỐI QUAN HỆ CỦA ESFJ
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-brown-500 mx-auto rounded-full"></div>
                  <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    ESFJ là những người bạn trung thành và người yêu tận tâm.
                    Với trái tim ấm áp và tinh thần trách nhiệm cao, họ mang đến
                    sự ổn định và hài hòa trong mọi mối quan hệ. ESFJ yêu thích
                    được chăm sóc người khác và luôn mong muốn xây dựng những
                    kết nối bền vững.
                  </p>
                </div>

                {/* General Relationship Traits */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-orange-600"
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
                        Đặc điểm nổi bật
                      </h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Trung thành và đáng tin cậy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Chu đáo, quan tâm đến nhu cầu người khác</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Giỏi lắng nghe và thấu hiểu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Đề cao các giá trị truyền thống</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-brown-100 p-3 rounded-full mr-4">
                        <svg
                          className="w-6 h-6 text-brown-600"
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
                        { type: "ISFP", desc: "Nhạy cảm, tận tâm" },
                        { type: "ISTP", desc: "Thực tế, độc lập" },
                        { type: "ESTP", desc: "Năng động, vui vẻ" },
                        { type: "ENFJ", desc: "Ấm áp, truyền cảm hứng" },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-bold text-orange-600">
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
                <div className="bg-gradient-to-r from-orange-50 to-brown-50 p-8 rounded-2xl mb-12">
                  <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                      <div className="bg-white p-4 rounded-full shadow-lg">
                        <svg
                          className="w-16 h-16 text-pink-700"
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
                      <h3 className="text-2xl font-bold text-brown-700 mb-4">
                        ESFJ TRONG TÌNH YÊU
                      </h3>
                      <p className="text-gray-700 mb-4">
                        ESFJ yêu bằng cả trái tim và sự tận tâm. Họ mong muốn
                        xây dựng một mối quan hệ ổn định, hướng tới hôn nhân và
                        gia đình. Tuy nhiên, ESFJ có thể quá nhạy cảm với xung
                        đột và đôi khi hy sinh bản thân vì người yêu.
                      </p>
                      <div className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-orange-400 mb-4">
                        <p className="italic text-gray-700">
                          "Tình yêu của ESFJ là sự chăm sóc chu đáo và cam kết
                          bền vững. Họ cần người biết trân trọng sự quan tâm của
                          mình và cùng họ xây dựng tổ ấm hạnh phúc theo các giá
                          trị truyền thống."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Cách thể hiện tình cảm",
                        icon: "💝",
                        content:
                          "ESFJ thể hiện tình yêu qua hành động chăm sóc thiết thực. Họ nhớ mọi ngày kỷ niệm và luôn chuẩn bị những món quà ý nghĩa.",
                      },
                      {
                        title: "Thách thức",
                        icon: "⚠️",
                        content:
                          "ESFJ dễ tổn thương khi bị chỉ trích. Họ có thể quá phụ thuộc vào sự công nhận từ người yêu và đánh mất bản thân trong mối quan hệ.",
                      },
                      {
                        title: "Lời khuyên",
                        icon: "✨",
                        content:
                          "ESFJ cần học cách đặt ranh giới lành mạnh. Đối tác nên trân trọng sự tận tâm của họ và giúp họ cảm thấy an toàn trong tình yêu.",
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
                  <h3 className="text-2xl font-bold text-brown-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-brown-500"
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
                    ESFJ TRONG TÌNH BẠN
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-start mb-6">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                            Bạn bè tri kỷ
                          </h4>
                          <p className="text-gray-700">
                            ESFJ kết bạn với những người có cùng giá trị sống.
                            Họ là người bạn luôn sẵn sàng lắng nghe, giúp đỡ và
                            tạo động lực cho bạn bè vượt qua khó khăn.
                          </p>
                        </div>
                      </div>

                      <div className="bg-brown-50 p-5 rounded-lg border-l-4 border-orange-400 mb-6">
                        <p className="italic text-gray-700">
                          "ESFJ là người bạn luôn xuất hiện đúng lúc bạn cần
                          nhất. Với sự chu đáo và tấm lòng rộng mở, họ khiến bạn
                          bè cảm thấy được trân trọng và yêu thương."
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start mb-6">
                        <div className="bg-brown-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-brown-600"
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
                            Khó khăn trong tình bạn
                          </h4>
                          <p className="text-gray-700">
                            ESFJ khó chấp nhận bạn bè có quan điểm sống khác
                            biệt. Họ cũng dễ buồn khi không nhận được sự quan
                            tâm tương xứng từ phía bạn bè.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-amber-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-amber-600"
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
                            Tình bạn sâu sắc
                          </h4>
                          <p className="text-gray-700">
                            Khi đã coi ai là bạn thân, ESFJ sẽ bảo vệ và ủng hộ
                            họ vô điều kiện. Họ là chỗ dựa tinh thần vững chắc
                            và luôn tìm cách giúp bạn bè hạnh phúc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parenting Section */}
                <div className="bg-gradient-to-r from-orange-50 to-brown-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-orange-500"
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
                    ESFJ KHI LÀM CHA MẸ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Phong cách nuôi dạy",
                          content:
                            "ESFJ là những phụ huynh tận tâm và chu đáo. Họ tạo ra môi trường gia đình ấm áp, an toàn và đầy tình yêu thương. Con cái luôn được khuyến khích phát triển theo các giá trị đạo đức tốt đẹp.",
                        },
                        {
                          title: "Ưu điểm",
                          content:
                            "ESFJ dạy con cách sống hòa nhã và quan tâm đến người khác. Họ là tấm gương về sự trách nhiệm, chu đáo và kiên nhẫn. Con cái luôn cảm nhận được tình yêu vô điều kiện từ họ.",
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
                            <span className="text-orange-500 mr-2">•</span>
                            <span>Có xu hướng bao bọc con quá mức</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span>
                              Khó chấp nhận khi con có quan điểm khác biệt
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span>
                              Đặt nhiều kỳ vọng vào việc con tuân theo các quy
                              tắc
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-orange-100 p-5 rounded-lg border-l-4 border-brown-500">
                        <p className="italic text-gray-700">
                          "Dù đôi khi quá nghiêm khắc, ESFJ là những bậc cha mẹ
                          yêu thương vô điều kiện. Họ dành cả cuộc đời để xây
                          dựng tổ ấm hạnh phúc và chuẩn bị cho con hành trang
                          vững vàng vào đời."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Quote */}
                <div className="text-center mt-12">
                  <div className="bg-orange-100 p-6 rounded-xl inline-block max-w-2xl">
                    <svg
                      className="w-10 h-10 text-orange-500 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl font-medium text-orange-800 mb-2">
                      "ESFJ mang đến sự ấm áp và ổn định trong mọi mối quan hệ.
                      Với tấm lòng rộng mở và tinh thần trách nhiệm cao, họ là
                      chỗ dựa vững chắc cho người thân và bạn bè. Để hiểu ESFJ,
                      hãy trân trọng sự quan tâm chu đáo của họ và cùng họ xây
                      dựng những kết nối bền vững theo giá trị truyền thống."
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
                    <span className="text-orange-600">
                      NGƯỜI QUAN TÂM (ESFJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    ESFJ - Nhóm tính cách ấm áp, chu đáo với tinh thần trách
                    nhiệm cao và khả năng chăm sóc người khác tuyệt vời
                  </p>
                </div>

                {/* Core Principles */}
                <div className="bg-orange-50 p-6 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="bg-white p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-sm">
                        <svg
                          className="w-10 h-10 text-orange-600"
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
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-orange-800 mb-3">
                        Nguyên tắc vàng khi tiếp cận ESFJ
                      </h3>
                      <p className="text-gray-700">
                        "Sự chân thành" là chìa khóa để trở nên thân thiết với
                        ESFJ - nhóm tính cách coi trọng các mối quan hệ bền
                        vững. Để xây dựng tình bạn với ESFJ:
                        <span className="font-medium block mt-2">
                          "Hãy thể hiện sự quan tâm thực sự đến cảm xúc của họ
                          và tạo cho họ cảm giác an toàn, được trân trọng trong
                          mối quan hệ"
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
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                            Lắng nghe tích cực
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Tập trung khi trò chuyện và tương tác thường xuyên
                            </li>
                            <li>Thể hiện sự quan tâm qua ánh mắt và nét mặt</li>
                            <li>Đặt câu hỏi để thể hiện bạn đang lắng nghe</li>
                            <li>
                              Tránh làm việc riêng khi nói chuyện với ESFJ
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 2 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Bày tỏ lòng biết ơn
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Ghi nhận sự quan tâm và chăm sóc của họ</li>
                            <li>Nói lời cảm ơn chân thành và cụ thể</li>
                            <li>Đáp lại sự tử tế bằng hành động thiết thực</li>
                            <li>Khen ngợi những đóng góp của họ</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 3 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Duy trì liên lạc
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Thường xuyên hỏi thăm dù không có việc gì</li>
                            <li>Nhớ các ngày quan trọng của họ</li>
                            <li>Chia sẻ về cuộc sống hàng ngày</li>
                            <li>Đề nghị gặp mặt định kỳ</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 4 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                            Thể hiện trách nhiệm
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Giữ lời hứa và cam kết</li>
                            <li>Thông báo trước khi hủy hẹn</li>
                            <li>Tuân thủ các quy tắc xã hội</li>
                            <li>Thể hiện sự đáng tin cậy</li>
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
                            className="w-5 h-5 text-orange-500 mr-2"
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
                            <div className="flex-shrink-0 mt-1 mr-2 text-orange-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Thể hiện sự quan tâm chân thành
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-orange-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Ghi nhận và cảm ơn sự giúp đỡ của họ
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-orange-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Giữ liên lạc thường xuyên
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-orange-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Tôn trọng các giá trị truyền thống
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
                              Thờ ơ hoặc không phản hồi khi họ chia sẻ
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Cãi lý khi họ đang buồn bực
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Hủy hẹn vào phút chót
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Phớt lờ các quy tắc xã hội
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Advice */}
                <div className="bg-brown-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-brown-800 mb-3">
                    Lời khuyên từ chuyên gia
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Xây dựng mối quan hệ với ESFJ đòi hỏi sự kiên nhẫn và chân
                    thành. Một khi đã coi bạn là người thân thiết, họ sẽ dành
                    trọn sự quan tâm và chăm sóc cho bạn. Hãy trân trọng sự ấm
                    áp và tấm lòng mà họ mang đến cho cuộc sống của bạn.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="italic text-gray-700">
                      "Tình bạn với ESFJ như một ngôi nhà ấm áp luôn mở cửa đón
                      bạn. Họ sẽ là người luôn lắng nghe, thấu hiểu và sẵn sàng
                      giúp đỡ bạn bất cứ khi nào bạn cần."
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
                    <span className="text-orange-600">
                      NGƯỜI QUAN TÂM (ESFJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ESFJ - Những người tổ chức tận tâm với kỹ năng giao tiếp
                    xuất sắc và tinh thần trách nhiệm cao
                  </p>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-l from-orange-300 to-amber-400 p-8 rounded-lg mb-10 text-white">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      "ESFJ xây dựng sự nghiệp bằng sự tận tâm và khả năng tổ
                      chức xuất sắc"
                    </h3>
                    <p className="text-orange-100">
                      Những người quan tâm phát triển mạnh trong môi trường có
                      cấu trúc rõ ràng và được giúp đỡ người khác
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
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          1
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn khởi đầu: Học hỏi và hỗ trợ
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Khi mới bắt đầu sự nghiệp, ESFJ thể hiện tốt trong các
                          vị trí hỗ trợ và chăm sóc người khác. Họ xuất sắc
                          trong việc tuân thủ quy trình và tạo ra môi trường làm
                          việc hài hòa.
                        </p>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <p className="italic text-gray-700">
                            "ESFJ cần môi trường làm việc có tổ chức, nơi họ có
                            thể phát huy khả năng chăm sóc và hỗ trợ đồng
                            nghiệp"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          2
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn bứt phá: Quản lý và điều phối
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Sau khi tích lũy kinh nghiệm, ESFJ chứng minh được khả
                          năng quản lý và điều phối công việc hiệu quả. Họ được
                          đánh giá cao nhờ sự chu đáo và khả năng tạo động lực
                          cho team.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                            Tổ chức công việc
                          </span>
                          <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                            Giao tiếp tốt
                          </span>
                          <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                            Tinh thần trách nhiệm
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          3
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn chín muồi: Lãnh đạo và cố vấn
                        </h4>
                        <p className="text-gray-700">
                          Ở đỉnh cao sự nghiệp, ESFJ trở thành những nhà lãnh
                          đạo tận tâm và người cố vấn đáng tin cậy. Họ xây dựng
                          môi trường làm việc tích cực và truyền cảm hứng bằng
                          sự quan tâm chân thành.
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
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tổ chức xuất sắc
                          </h4>
                          <p className="text-gray-700">
                            Khả năng sắp xếp công việc khoa học và duy trì hệ
                            thống hiệu quả
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                            Giao tiếp tốt
                          </h4>
                          <p className="text-gray-700">
                            Khả năng lắng nghe và truyền đạt thông tin rõ ràng,
                            thuyết phục
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                            Tinh thần trách nhiệm
                          </h4>
                          <p className="text-gray-700">
                            Luôn hoàn thành công việc đúng hạn và đạt chất lượng
                            cao
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                            Chăm sóc người khác
                          </h4>
                          <p className="text-gray-700">
                            Khả năng thấu hiểu và đáp ứng nhu cầu của đồng
                            nghiệp, khách hàng
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
                        <div className="bg-amber-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-amber-600"
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
                        <h4 className="font-bold text-orange-700">
                          Chăm sóc & Y tế
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Y tá
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Nhân
                          viên xã hội
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Chăm
                          sóc người già
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Tư vấn
                          viên
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-amber-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-amber-600"
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
                        <h4 className="font-bold text-orange-700">
                          Giáo dục & Đào tạo
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Giáo
                          viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Quản lý
                          trường học
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Huấn
                          luyện viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Thủ thư
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-amber-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-amber-600"
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
                        <h4 className="font-bold text-amber-700">
                          Quản trị & Hành chính
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Quản lý
                          văn phòng
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Trợ lý
                          giám đốc
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Nhân sự
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Kế toán
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Career Warnings */}
                <div className="mb-12 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-orange-700 mb-3">
                    Cảnh báo nghề nghiệp
                  </h3>
                  <p className="text-gray-700 mb-4">
                    ESFJ nên tránh những môi trường công việc:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Đòi hỏi làm việc độc lập với ít tương tác xã hội</li>
                    <li>Thường xuyên thay đổi và không có quy trình rõ ràng</li>
                    <li>Không được công nhận và đánh giá cao</li>
                    <li>
                      Phải đưa ra những quyết định khắc nghiệt ảnh hưởng đến
                      người khác
                    </li>
                  </ul>
                </div>

                {/* Career Development */}
                <div className="bg-brown-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-brown-700 mb-4">
                    Lộ trình phát triển
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-brown-500 font-bold">
                        1.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn học việc (0-5 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Phát triển kỹ năng chuyên môn, học cách làm việc nhóm
                          hiệu quả và xây dựng mối quan hệ nghề nghiệp
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-brown-500 font-bold">
                        2.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn chuyên gia (5-10 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Trở thành chuyên gia trong lĩnh vực, phát triển kỹ
                          năng quản lý và đào tạo người khác
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-brown-500 font-bold">
                        3.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn lãnh đạo (10+ năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Dẫn dắt team/department, xây dựng văn hóa doanh nghiệp
                          và đào tạo thế hệ kế cận
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Quote */}
                <div className="text-center mt-12">
                  <div className="bg-orange-100 p-6 rounded-xl inline-block max-w-2xl">
                    <svg
                      className="w-10 h-10 text-orange-500 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl font-medium text-orange-800 mb-2">
                      "ESFJ xây dựng sự nghiệp bằng sự tận tâm và tinh thần
                      trách nhiệm cao. Họ là những người tổ chức xuất sắc, luôn
                      quan tâm đến đồng nghiệp và tạo ra môi trường làm việc hài
                      hòa. Để phát huy hết tiềm năng, ESFJ cần môi trường ổn
                      định, được công nhận và có cơ hội giúp đỡ người khác."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Workplace Habits Section */}
            {activeSection === "workplace-habits" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b-2 border-orange-100 pb-4">
                  THÓI QUEN NƠI CÔNG SỞ CỦA ESFJ
                </h2>

                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    ESFJ tỏa sáng trong môi trường làm việc có tổ chức, nơi họ
                    có thể xây dựng các mối quan hệ hài hòa và đóng góp một cách
                    có trật tự. Với tinh thần trách nhiệm cao và khả năng chăm
                    sóc người khác, họ xuất sắc trong các vai trò đòi hỏi sự hợp
                    tác, tổ chức và hỗ trợ đồng nghiệp.
                  </p>
                </div>

                {/* As Employees Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-orange-600">
                      ESFJ khi là nhân viên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điểm mạnh nổi bật
                      </h4>
                      <p className="text-gray-700">
                        Làm việc có trách nhiệm và đáng tin cậy. Tổ chức công
                        việc hiệu quả. Hỗ trợ đồng nghiệp nhiệt tình. Tuân thủ
                        quy trình và nguyên tắc. Duy trì không khí làm việc hài
                        hòa.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thách thức
                      </h4>
                      <p className="text-gray-700">
                        Khó thích nghi với thay đổi đột ngột. Dễ tổn thương khi
                        bị chỉ trích. Có thể quá tập trung vào chi tiết. Khó
                        chấp nhận ý kiến trái chiều. Cần được công nhận và đánh
                        giá cao.
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "ESFJ là nhân viên chăm chỉ và tận tâm nhưng cần môi
                      trường ổn định. Họ làm việc tốt nhất khi được hướng dẫn rõ
                      ràng và cảm thấy được trân trọng."
                    </p>
                  </div>
                </div>

                {/* As Colleagues Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-orange-600">
                      ESFJ khi là đồng nghiệp
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Giá trị mang lại
                      </h4>
                      <p className="text-gray-700">
                        Luôn sẵn sàng giúp đỡ đồng nghiệp. Duy trì không khí làm
                        việc tích cực. Tổ chức các hoạt động team building. Ghi
                        nhớ các ngày quan trọng. Là cầu nối giữa các thành viên.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điều cần lưu ý
                      </h4>
                      <p className="text-gray-700">
                        Dễ buồn khi bị từ chối giúp đỡ. Có thể quá quan tâm đến
                        đời tư đồng nghiệp. Khó chấp nhận xung đột. Cần được cảm
                        ơn và công nhận. Khó thích nghi với đồng nghiệp quá cá
                        tính.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1 mr-3 text-orange-500 text-xl">
                      💡
                    </div>
                    <div>
                      <p className="text-gray-700">
                        "Đồng nghiệp ESFJ giống như 'người giữ lửa' của nhóm -
                        luôn quan tâm đến mọi người và tạo ra môi trường làm
                        việc ấm áp, gắn kết."
                      </p>
                    </div>
                  </div>
                </div>

                {/* As Managers Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-orange-600">
                      ESFJ khi làm quản lý
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách lãnh đạo
                      </h4>
                      <p className="text-gray-700">
                        Xây dựng văn hóa hỗ trợ lẫn nhau. Quan tâm đến phúc lợi
                        nhân viên. Thiết lập quy trình rõ ràng. Ghi nhận và khen
                        thưởng kịp thời. Ưu tiên sự ổn định và hài hòa trong
                        team.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Ưu tiên
                      </h4>
                      <p className="text-gray-700">
                        Đánh giá cao sự trung thành và chăm chỉ. Chú trọng quan
                        hệ tốt với nhân viên. Duy trì trật tự và kỷ luật. Xây
                        dựng môi trường làm việc tích cực. Bảo vệ uy tín và vị
                        thế của mình.
                      </p>
                    </div>
                  </div>

                  <div className="bg-brown-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 text-brown-500">
                        ⚠️
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Lời khuyên cho lãnh đạo ESFJ: Cần cân bằng giữa sự
                          quan tâm và tính chuyên nghiệp. Đừng quá dễ dãi trong
                          quản lý. Học cách chấp nhận phê bình xây dựng và cởi
                          mở hơn với sự thay đổi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Path Section */}
                <div className="mt-10 bg-gradient-to-r from-orange-500 to-brown-500 p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-3">
                    Con đường sự nghiệp lý tưởng
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-brown-600 to-orange-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Chăm sóc & Hỗ trợ</h4>
                      <p className="text-sm">
                        Y tá, Giáo viên, Nhân viên xã hội, Tư vấn tâm lý, Chăm
                        sóc khách hàng
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-brown-600 to-orange-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Tổ chức & Quản lý</h4>
                      <p className="text-sm">
                        Quản lý văn phòng, Hành chính nhân sự, Sự kiện, Quản lý
                        cơ sở vật chất
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-brown-600 to-orange-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Dịch vụ & Cộng đồng
                      </h4>
                      <p className="text-sm">
                        Quản lý nhà hàng/khách sạn, Tổ chức cộng đồng, Nhân viên
                        y tế, Công tác xã hội
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-orange-100 text-sm">
                    <p>
                      ESFJ phát triển mạnh trong môi trường ổn định, nơi họ có
                      thể hỗ trợ người khác và xây dựng các mối quan hệ bền
                      chặt. Họ cần công việc có cấu trúc rõ ràng và được ghi
                      nhận đóng góp.
                    </p>
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
                    <span className="text-orange-600">
                      NGƯỜI QUAN TÂM (ESFJ)
                    </span>{" "}
                    VỚI
                    <span className="text-yellow-500">
                      {" "}
                      NGƯỜI TRÌNH DIỄN (ESFP)
                    </span>{" "}
                    VÀ
                    <span className="text-brown-500"> NGƯỜI BẢO VỆ (ISFJ)</span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Phân tích sâu về 3 nhóm tính cách thuộc nhóm "Người chăm
                    sóc" - những người chu đáo và tận tâm
                  </p>
                </div>

                {/* Core Similarities */}
                <div className="bg-gray-50 p-6 rounded-lg mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 text-orange-500 mr-2"
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
                    Điểm chung cốt lõi của bộ ba Người chăm sóc (SFJ/SFP)
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          S
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Giác quan thực tế
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Cả ba đều tập trung vào thực tế và chi tiết cụ thể thay
                        vì lý thuyết trừu tượng
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          F
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Quyết định cảm tính
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Đưa ra quyết định dựa trên giá trị cá nhân và cảm xúc
                        của bản thân/người khác
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          ❤️
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Thiên hướng chăm sóc
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Có xu hướng quan tâm, hỗ trợ và đáp ứng nhu cầu của
                        người khác
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pair Comparisons */}
                <div className="space-y-10">
                  {/* ESFJ vs ESFP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-orange-600">ESFJ</span> vs{" "}
                        <span className="text-yellow-500">ESFP</span>:
                        <span className="text-sm font-normal ml-2">
                          Người tổ chức chu đáo vs Người vui vẻ hướng ngoại
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-orange-500 mr-2"
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
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>
                            Đều là người hướng ngoại và thích tương tác xã hội
                          </li>
                          <li>Có khả năng kết nối với mọi người dễ dàng</li>
                          <li>Quan tâm đến nhu cầu của người khác</li>
                          <li>Thích những hoạt động thực tế, cụ thể</li>
                          <li>Không thích môi trường quá lý thuyết</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-yellow-500 mr-2"
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
                              Tính cách
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFJ (J) có tổ chức và nguyên tắc, ESFP (P) linh
                              hoạt và tự phát
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Ưu tiên
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFJ chú trọng trách nhiệm xã hội, ESFP tập trung
                              vào trải nghiệm hiện tại
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFJ thích ổn định và truyền thống, ESFP thích
                              phiêu lưu và mới lạ
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ESFJ như một người tổ chức chu đáo luôn quan tâm đến
                        trật tự và trách nhiệm, ESFP như một người bạn vui vẻ
                        luôn mang đến năng lượng tích cực. Cả hai đều ấm áp
                        nhưng với cách thể hiện khác biệt."
                      </p>
                    </div>
                  </div>

                  {/* ESFJ vs ISFJ */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-orange-500 to-brown-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-orange-600">ESFJ</span> vs{" "}
                        <span className="text-brown-500">ISFJ</span>:
                        <span className="text-sm font-normal ml-2">
                          Người quan tâm hướng ngoại vs Người bảo vệ hướng nội
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-orange-500 mr-2"
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
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Đều có tinh thần trách nhiệm cao</li>
                          <li>Quan tâm sâu sắc đến nhu cầu người khác</li>
                          <li>Ưa thích sự ổn định và an toàn</li>
                          <li>Làm việc có tổ chức và kỷ luật</li>
                          <li>Tôn trọng truyền thống và quy tắc xã hội</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-brown-500 mr-2"
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
                              Hướng năng lượng
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFJ (E) thích tương tác xã hội, ISFJ (I) thích
                              không gian yên tĩnh
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Cách thể hiện
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFJ chủ động trong giao tiếp, ISFJ thể hiện sự
                              quan tâm qua hành động
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Mục tiêu
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFJ hướng đến hài hòa xã hội, ISFJ hướng đến bảo
                              vệ người thân
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-brown-50 border-l-4 border-brown-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ESFJ như một người chủ nhà chu đáo luôn quan tâm đến
                        mọi người, ISFJ như một người bảo vệ âm thầm chăm sóc
                        người thân. Cả hai đều tận tâm nhưng với cách thể hiện
                        khác biệt."
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
                      <thead className="bg-orange-600 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold">
                            Đặc điểm
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ESFP
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ESFJ
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ISFJ
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {/* Row 1 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Chức năng nhận thức chính
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-yellow-50">
                            Cảm nhận ngoại hướng (Se) + Cảm xúc nội tâm (Fi)
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Cảm xúc ngoại hướng (Fe) + Cảm nhận nội tâm (Si)
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-brown-50">
                            Cảm nhận nội tâm (Si) + Cảm xúc ngoại hướng (Fe)
                          </td>
                        </tr>
                        {/* Row 2 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Phong cách làm việc
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tự phát, linh hoạt, tập trung vào hiện tại, thích
                            hành động
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Có tổ chức, nguyên tắc, tập trung vào nhu cầu nhóm
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tỉ mỉ, cẩn thận, tập trung vào trách nhiệm
                          </td>
                        </tr>
                        {/* Row 3 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Trong quan hệ
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-yellow-50">
                            Vui vẻ, cởi mở, thích giao tiếp xã hội
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Chu đáo, quan tâm, thích chăm sóc người khác
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-brown-50">
                            Âm thầm, trung thành, quan tâm sâu sắc
                          </td>
                        </tr>
                        {/* Row 4 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Ưu thế nghề nghiệp
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Nghệ thuật, giải trí, bán hàng, dịch vụ khách hàng
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Giáo dục, y tế, quản lý văn phòng, nhân sự
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Chăm sóc sức khỏe, thư viện, hành chính, kế toán
                          </td>
                        </tr>
                        {/* Row 5 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Điểm mạnh
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-yellow-50">
                            Linh hoạt, nhiệt tình, khả năng ứng biến tốt
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Tổ chức tốt, tận tâm, khả năng gắn kết mọi người
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-brown-50">
                            Đáng tin cậy, kiên nhẫn, chú ý chi tiết
                          </td>
                        </tr>
                        {/* Row 6 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Điểm yếu
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Thiếu kiên nhẫn, dễ sao nhãng, không thích kế hoạch
                            dài hạn
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Quá quan tâm đến ý kiến người khác, khó thích nghi
                            với thay đổi
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Khó nói lên nhu cầu bản thân, dễ kiệt sức vì giúp đỡ
                            người khác
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Career Comparison */}
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-b-gray-300 pb-2">
                    So sánh nghề nghiệp phù hợp
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* ESFP Column */}
                    <div className="bg-white p-6 rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-yellow-600"
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
                        <h4 className="font-bold text-yellow-700">ESFP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span> Diễn
                          viên/Nghệ sĩ
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span> Nhân
                          viên bán hàng
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span> Tổ
                          chức sự kiện
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span> Hướng
                          dẫn viên du lịch
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span> Nhân
                          viên chăm sóc khách hàng
                        </li>
                      </ul>
                    </div>

                    {/* ESFJ Column */}
                    <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                        <h4 className="font-bold text-orange-700">ESFJ</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Giáo
                          viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Y
                          tá/Điều dưỡng
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Quản
                          lý văn phòng
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Nhân
                          sự
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Công
                          tác xã hội
                        </li>
                      </ul>
                    </div>

                    {/* ISFJ Column */}
                    <div className="bg-white p-6 rounded-xl border border-orange-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-200 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-orange-800"
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
                        <h4 className="font-bold text-orange-700">ISFJ</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-700 mr-2">•</span> Thủ thư
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-700 mr-2">•</span> Kế toán
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-700 mr-2">•</span> Dược sĩ
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-700 mr-2">•</span> Nha sĩ
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-700 mr-2">•</span> Hành
                          chính
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final Thoughts */}
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">
                    Nhận định cuối
                  </h3>
                  <p className="text-gray-700 mb-3">
                    ESFJ, ESFP và ISFJ đều là những nhóm tính cách chu đáo và
                    tận tâm, nhưng mỗi nhóm có thế mạnh riêng:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                    <li>
                      <span className="font-medium">ESFP</span> - Người mang lại
                      niềm vui và năng lượng tích cực
                    </li>
                    <li>
                      <span className="font-medium">ESFJ</span> - Người tổ chức
                      và chăm sóc chu đáo
                    </li>
                    <li>
                      <span className="font-medium">ISFJ</span> - Người bảo vệ
                      âm thầm và đáng tin cậy
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Sự khác biệt chính nằm ở cách họ tương tác với thế giới:
                    ESFP với sự tự phát và vui vẻ, ESFJ với sự chu đáo và tổ
                    chức, ISFJ với sự ân cần và trách nhiệm. Hiểu rõ những khác
                    biệt này giúp mỗi nhóm phát huy tối đa tiềm năng của mình.
                  </p>
                </div>
              </div>
            )}
            {activeSection === "advice" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-orange-600 mb-8 border-b-2 border-orange-100 pb-4">
                  LỜI KHUYÊN PHÁT TRIỂN DÀNH CHO NGƯỜI QUAN TÂM (ESFJ)
                </h2>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-8 rounded-lg mb-10 text-white">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Hành trình phát triển cho người chu đáo
                    </h3>
                    <p className="text-orange-200">
                      Là những người tận tâm và có trách nhiệm, ESFJ cần học
                      cách cân bằng giữa việc chăm sóc người khác và chăm sóc
                      bản thân, giữa truyền thống và đổi mới để phát huy tối đa
                      tiềm năng của mình.
                    </p>
                  </div>
                </div>

                {/* Core Advice Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {/* Develop Strengths */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-6 h-6 text-orange-600"
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
                        Phát huy điểm mạnh
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tận dụng tối đa khả năng quan tâm và tổ chức của bạn:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Ứng dụng sự chu đáo vào xây dựng mối quan hệ tích cực
                      </li>
                      <li>Phát huy khả năng tạo môi trường làm việc hài hòa</li>
                      <li>
                        Tận dụng tinh thần trách nhiệm để hoàn thành xuất sắc
                        công việc
                      </li>
                    </ul>
                  </div>

                  {/* Improve Weaknesses */}
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
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Cải thiện điểm yếu
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Những điều ESFJ cần lưu ý để phát triển:
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="italic text-gray-700">
                        "Chăm sóc người khác là đức tính tốt, nhưng chăm sóc bản
                        thân mới là nền tảng bền vững"
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Học cách nói "không" khi cần thiết</li>
                      <li>
                        Giảm bớt sự phụ thuộc vào sự công nhận từ người khác
                      </li>
                      <li>Cởi mở hơn với những quan điểm khác biệt</li>
                    </ul>
                  </div>
                </div>

                {/* Key Advice Section */}
                <div className="mb-10 bg-gradient-to-r from-orange-50 to-brown-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                        <svg
                          className="w-10 h-10 text-orange-600"
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
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold text-orange-800 mb-4">
                        Lời khuyên then chốt
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
                          <h4 className="font-semibold text-orange-700 mb-2">
                            Đặt ranh giới lành mạnh
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Học cách từ chối khi cần thiết</li>
                            <li>Dành thời gian cho bản thân</li>
                            <li>Không hy sinh quá mức vì người khác</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
                          <h4 className="font-semibold text-orange-700 mb-2">
                            Cởi mở với cái mới
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Tiếp thu quan điểm khác biệt</li>
                            <li>Thử nghiệm phương pháp mới</li>
                            <li>Chấp nhận sự thay đổi</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
                          <h4 className="font-semibold text-orange-700 mb-2">
                            Bày tỏ nhu cầu
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Mạnh dạn chia sẻ mong muốn cá nhân</li>
                            <li>Yêu cầu sự giúp đỡ khi cần</li>
                            <li>Không ngại thể hiện quan điểm riêng</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
                          <h4 className="font-semibold text-orange-700 mb-2">
                            Phát triển bản thân
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Không ngừng học hỏi kỹ năng mới</li>
                            <li>Bước ra khỏi vùng an toàn</li>
                            <li>Chăm sóc sức khỏe tinh thần</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Self-Improvement Section */}
                <div className="mb-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 bg-orange-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm">
                          <svg
                            className="w-6 h-6 text-orange-600"
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
                        <h3 className="text-xl font-semibold text-orange-700">
                          Cải thiện bản thân
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        ESFJ cần chú ý phát triển toàn diện:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Tự tin vào bản thân
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>
                              Giảm bớt sự phụ thuộc vào đánh giá người khác
                            </li>
                            <li>Tin tưởng vào quyết định của mình</li>
                            <li>Nhận ra giá trị bản thân</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Linh hoạt hơn
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Chấp nhận sự thay đổi</li>
                            <li>Thích nghi với hoàn cảnh mới</li>
                            <li>Mở lòng với những ý tưởng khác biệt</li>
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
                            <div className="flex-shrink-0 bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              1
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Tự chăm sóc bản thân
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi ngày dành 30 phút làm điều mình yêu thích
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              2
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Thử điều mới
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi tuần thử một hoạt động ngoài vùng an toàn
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              3
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Nhật ký biết ơn
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi tối ghi lại 3 điều tích cực về bản thân
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Encouragement */}
                <div className="bg-gradient-to-r from-orange-800 to-purple-800 p-8 rounded-lg text-white">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Sức mạnh của Người quan tâm
                    </h3>
                    <p className="mb-4 text-orange-100">
                      Bạn được ban tặng trái tim ấm áp, tinh thần trách nhiệm và
                      khả năng tạo dựng mối quan hệ tuyệt vời. Khi học cách kết
                      hợp những điểm mạnh này với sự tự tin và cởi mở, bạn sẽ
                      trở thành phiên bản tốt nhất của chính mình.
                    </p>
                    <div className="bg-brown-700 bg-opacity-30 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Thế giới cần những người như bạn - những người biết
                        quan tâm, tạo ra sự ổn định và mang lại hạnh phúc cho
                        người khác. Hãy nhớ rằng thành công thực sự đến từ sự
                        cân bằng giữa cho đi và nhận lại, giữa chăm sóc người
                        khác và chăm sóc bản thân."
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
export default ESFJPage;
