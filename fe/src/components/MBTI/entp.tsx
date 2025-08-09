import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import handleCopyLink from "../helpers/HandleCopyLink";

const ENTPPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Tổng quan" },
    { id: "strengths-weaknesses", title: "Điểm mạnh và điểm yếu" },
    { id: "relationship", title: "Mối quan hệ" },
    { id: "how-to-be-close", title: "Làm sao để thân thiết với ENTP" },
    { id: "career-path", title: "Con đường sự nghiệp" },
    { id: "workplace-habits", title: "Thói quen nơi công sở" },
    { id: "compare", title: "So sánh ENTP với INTP, ESTP" },
    { id: "advice", title: "Lời khuyên dành cho ENTP" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="ENTP-page bg-gradient-to-b from-blue-50 to-purple-50">
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
                ENTP - Người nhìn xa
              </h1>
            </div>
            <div className="relative w-full">
              <img
                src="/mbti_icons/entp1.png"
                alt="ENTP - Người nhìn xa"
                className="pointer w-full h-120 object-cover rounded-lg shadow "
              />
            </div>

            {/* Description */}
            <div className="text-lg text-gray-700 max-w-4xl text-center">
              Nhóm tính cách ENTP là những cá nhân cởi mở, ham học hỏi, thích
              khám phá và thử thách bản thân với những điều mới. ENTP là những
              người thân thiện đầy cuốn hút, hoạt ngôn, thích tranh luận, góp
              phần tạo nên bầu không khí đầy hứng khởi cho những người xung
              quanh. ENTP cũng xởi lởi và rất dễ kết giao bạn bè, tuy nhiên để
              đi tới mức độ gắn kết sâu sắc thì còn tùy thuộc vào mỗi cá nhân.
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
                  <h2 className="text-3xl font-bold text-green-600 mb-4">
                    TỔNG QUAN TÍNH CÁCH ENTP
                  </h2>
                  <div className="w-20 h-1 bg-purple-400 mx-auto"></div>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    ENTP (Người nhìn xa) là nhóm tính cách sáng tạo và chiến
                    lược, chiếm khoảng 3% dân số. Họ là những nhà phát minh bẩm
                    sinh với trí thông minh sắc bén và khả năng giải quyết vấn
                    đề đặc biệt. Với tầm nhìn xa trông rộng và tư duy phản biện,
                    ENTP mang đến những ý tưởng đột phá thách thức hiện trạng.
                  </p>
                </div>

                {/* MBTI Breakdown */}
                <div className="bg-gradient-to-r from-green-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">
                    Ý NGHĨA 4 CHỮ CÁI ENTP
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "● E - Hướng ngoại (Extraverted)",
                        color: "bg-green-100",
                        textColor: "text-green-800",
                        content:
                          "ENTP tương tác mạnh mẽ với thế giới bên ngoài. Họ thích thảo luận ý tưởng và thách thức quan điểm của người khác để tìm ra giải pháp tối ưu.",
                      },
                      {
                        title: "● N - Trực giác (Intuitive)",
                        color: "bg-purple-100",
                        textColor: "text-purple-800",
                        content:
                          "ENTP tập trung vào các khả năng và ý tưởng trừu tượng. Họ nhìn thấy các mẫu hình và kết nối mà người khác có thể bỏ qua.",
                      },
                      {
                        title: "● T - Lý trí (Thinking)",
                        color: "bg-teal-100",
                        textColor: "text-teal-800",
                        content:
                          "ENTP đưa ra quyết định dựa trên logic và phân tích khách quan. Họ đánh giá cao sự thông minh và năng lực trí tuệ.",
                      },
                      {
                        title: "● P - Linh hoạt (Perceiving)",
                        color: "bg-indigo-100",
                        textColor: "text-indigo-800",
                        content:
                          "ENTP thích sự tự do và linh hoạt. Họ luôn cởi mở với các khả năng mới và thích ứng nhanh với thay đổi.",
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
                      title: "Nhà sáng tạo không mệt mỏi",
                      icon: "💡",
                      content:
                        "ENTP luôn tràn đầy ý tưởng đột phá. Họ có khả năng nhìn thấy giải pháp mà người khác không thấy và liên tục tìm cách cải tiến hệ thống hiện có.",
                    },
                    {
                      title: "Bậc thầy tranh luận",
                      icon: "🗣️",
                      content:
                        "ENTP thích thách thức quan điểm và thường tranh luận chỉ để rèn luyện tư duy. Họ có thể đổi phe trong cuộc tranh luận chỉ để thử thách bản thân.",
                    },
                    {
                      title: "Tư duy chiến lược",
                      icon: "🧠",
                      content:
                        "ENTP phân tích vấn đề từ nhiều góc độ và dự đoán các kịch bản tương lai. Họ giỏi trong việc phát hiện điểm yếu trong lập luận của người khác.",
                    },
                    {
                      title: "Thích ứng nhanh",
                      icon: "🔄",
                      content:
                        "ENTP xử lý thông tin nhanh chóng và điều chỉnh chiến lược khi cần thiết. Họ coi thay đổi là cơ hội chứ không phải mối đe dọa.",
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-300"
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
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-700 mb-4">
                      ĐIỂM MẠNH NỔI BẬT
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Trí thông minh sắc bén và tư duy nhanh nhạy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Khả năng giải quyết vấn đề sáng tạo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Giao tiếp thuyết phục và hùng biện xuất sắc</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Tầm nhìn chiến lược dài hạn</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Khả năng thích ứng với thay đổi</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                      ĐIỂM YẾU CẦN LƯU Ý
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✗</span>
                        <span>Thiếu kiên nhẫn với chi tiết và thủ tục</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✗</span>
                        <span>Khó hoàn thành dự án đã bắt đầu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✗</span>
                        <span>
                          Đôi khi thiếu nhạy cảm với cảm xúc người khác
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✗</span>
                        <span>Dễ chán với công việc thường nhật</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✗</span>
                        <span>Có xu hướng thách thức quyền lực quá mức</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Career & Relationships */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-green-700 mb-4">
                      ENTP TRONG CÔNG VIỆC
                    </h3>
                    <p className="text-gray-700 mb-4">
                      ENTP tỏa sáng trong môi trường đòi hỏi sáng tạo và chiến
                      lược:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Cơ hội giải quyết vấn đề phức tạp</li>
                      <li>Môi trường thách thức trí tuệ</li>
                      <li>Tự do phát triển ý tưởng mới</li>
                      <li>Ít quy trình cứng nhắc</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Nghề nghiệp phù hợp: Doanh nhân, nhà phát minh, luật sư,
                      nhà chiến lược, nhà báo, nhà khoa học, nhà tư vấn, nhà
                      phát triển phần mềm.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                      ENTP TRONG QUAN HỆ
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Trong các mối quan hệ, ENTP là những người bạn thú vị và
                      kích thích tư duy:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Luôn mang đến những cuộc trò chuyện sâu sắc</li>
                      <li>Khuyến khích người khác phát triển bản thân</li>
                      <li>Có thể thiếu nhạy cảm với cảm xúc đối phương</li>
                      <li>Thích tự do và không thích bị ràng buộc</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      ENTP cần học cách cân bằng giữa lý trí và cảm xúc để xây
                      dựng mối quan hệ bền vững.
                    </p>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-gradient-to-r from-green-50 to-purple-50 p-6 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold text-center text-green-700 mb-6">
                    ENTP NỔI TIẾNG
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Thomas Edison",
                        role: "Nhà phát minh",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/1200px-Thomas_Edison2.jpg",
                      },
                      {
                        name: "Richard Feynman",
                        role: "Nhà vật lý",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Richard_Feynman_1959.png/1200px-Richard_Feynman_1959.png",
                      },
                      {
                        name: "Mark Twain",
                        role: "Nhà văn",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/MarkTwain.LOC.jpg/1200px-MarkTwain.LOC.jpg",
                      },
                      {
                        name: "Steve Jobs",
                        role: "Nhà sáng lập Apple",
                        image:
                          "https://hips.hearstapps.com/hmg-prod/images/apple-ceo-steve-jobs-speaks-during-an-apple-special-event-news-photo-1683661736.jpg?crop=0.800xw:0.563xh;0.0657xw,0.0147xh&resize=1200:*",
                      },
                      {
                        name: "Mark Cuban",
                        role: "Doanh nhân, nhà đầu tư",
                        image:
                          "https://cdn1.edgedatg.com/aws/v2/abc/SharkTank/person/942357/658ffd051a71b2cb8bcae612645a957d/330x330-Q90_658ffd051a71b2cb8bcae612645a957d.jpg",
                      },
                      {
                        name: "Benedict Cumberbatch",
                        role: "Diễn viên",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Benedict_Cumberbatch_filming_Sherlock_cropped.jpg/250px-Benedict_Cumberbatch_filming_Sherlock_cropped.jpg",
                      },
                      {
                        name: "Tom Hanks",
                        role: "Diễn viên",
                        image:
                          "https://cdn-media.sforum.vn/storage/app/media/huynhuy/C%C3%A1c%20t%E1%BA%ADp%20phim%20c%C3%B3%20s%E1%BB%B1%20tham%20gia%20c%E1%BB%A7a%20Tom%20Hanks/cac-tap-phim-co-su-tham-gia-cua-tom-hanks-thumbail.jpg",
                      },
                      {
                        name: "Sacha Baron Cohen",
                        role: "Diễn viên, danh hài",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/d/db/Sacha_Baron_Cohen_%282024%29_03.jpg",
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
                <div className="bg-green-100 p-6 rounded-lg mt-8 text-center">
                  <p className="text-green-800 italic font-medium">
                    "ENTP là những nhà cách mạng tư duy, không ngừng thách thức
                    hiện trạng và tìm kiếm giải pháp đột phá. Với trí tuệ sắc
                    bén và tầm nhìn xa, họ có khả năng biến ý tưởng táo bạo
                    thành hiện thực. Dù đôi khi bị coi là người phá vỡ quy tắc,
                    ENTP chính là động lực thúc đẩy xã hội tiến lên phía trước."
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
                    <span className="text-green-600">
                      NHÓM TÍNH CÁCH ENTP (NGƯỜI NHÌN XA)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ENTP - Nhóm tính cách "Người nhìn xa" với trí tuệ sắc bén,
                    khả năng sáng tạo vô tận và tư duy chiến lược
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
                      ĐIỂM MẠNH ĐẶC TRƯNG
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
                            Thông thái
                          </h4>
                          <p className="text-gray-700">
                            ENTP không bỏ lỡ bất cứ cơ hội để học hỏi và khám
                            phá kiến thức mới, đặc biệt về lĩnh vực trừu tượng.
                            Họ học không phải để nghiên cứu chuyên sâu mà đơn
                            giản vì đó là sở thích.
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-green-700 italic">
                          "ENTP có khả năng tiếp thu kiến thức đa dạng và liên
                          kết các lĩnh vực khác nhau một cách độc đáo"
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
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Nhanh nhạy
                          </h4>
                          <p className="text-gray-700">
                            ENTP có khả năng chuyển đổi giữa các luồng suy nghĩ
                            trong tích tắc. Kho kiến thức đa dạng giúp họ tranh
                            luận hiệu quả và đưa ra phản biện sắc bén.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Linh hoạt
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Phản biện
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Đa nhiệm
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Sáng tạo không ngừng
                          </h4>
                          <p className="text-gray-700">
                            ENTP không đi theo lối mòn. Họ kết hợp kiến thức với
                            óc sáng tạo để tạo ra những ý tưởng táo bạo, đột phá
                            mà ít ai nghĩ tới.
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
                          <span>Khả năng đổi mới</span>
                          <span>85% ENTP có ý tưởng độc đáo</span>
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Lôi cuốn
                          </h4>
                          <p className="text-gray-700">
                            ENTP có phong cách giao tiếp dí dỏm, tự tin và hấp
                            dẫn. Khả năng kết nối ý tưởng sáng tạo giúp họ dễ
                            dàng thu hút sự chú ý và tạo thiện cảm.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Biểu hiện:</span>
                          Tự tin, hài hước, tư duy liên kết độc đáo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weaknesses Section */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-purple-600 flex items-center">
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
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Weakness 1 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Hay tranh luận
                          </h4>
                          <p className="text-gray-700">
                            ENTP thường xuyên tranh luận đến mức có thể gây căng
                            thẳng với người khác. Nhiều người không thích tranh
                            luận như ENTP dễ cảm thấy mệt mỏi.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Gợi ý:</span>
                          Học cách lựa chọn thời điểm và đối tượng tranh luận
                          phù hợp
                        </div>
                      </div>
                    </div>

                    {/* Weakness 2 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu đồng cảm
                          </h4>
                          <p className="text-gray-700">
                            Trong tranh luận, ENTP có thể thẳng thắn quá mức và
                            vô tình làm tổn thương người khác. Họ thường coi
                            trọng lý lẽ hơn cảm xúc.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-purple-700 italic">
                          "ENTP cần phát triển trí tuệ cảm xúc để cân bằng giữa
                          lý trí và sự thấu hiểu trong giao tiếp"
                        </p>
                      </div>
                    </div>

                    {/* Weakness 3 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Không khoan nhượng
                          </h4>
                          <p className="text-gray-700">
                            ENTP không chỉ bác bỏ ý kiến trái chiều mà đôi khi
                            còn phủ nhận cả người đưa ra ý kiến đó. Họ chỉ coi
                            trọng những ý tưởng hợp lý và hữu ích.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Cải thiện:</span>
                          Học cách tôn trọng quan điểm khác biệt và người trình
                          bày
                        </div>
                      </div>
                    </div>

                    {/* Weakness 4 */}
                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu kiên định
                          </h4>
                          <p className="text-gray-700">
                            ENTP dễ chán nản khi theo đuổi một vấn đề lâu dài.
                            Họ thường bỏ dở để tìm kiếm điều mới mẻ, thú vị hơn
                            - đây là điểm yếu đáng kể.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Giải pháp:</span>
                          Rèn luyện tính kiên trì và cam kết hoàn thành mục tiêu
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="mt-12 bg-gradient-to-r from-green-500 to-purple-500 p-8 rounded-xl text-white">
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
                      CÂN BẰNG CUỘC SỐNG ENTP
                    </h3>
                    <p className="mb-4 text-green-100">
                      Sức mạnh thực sự của ENTP nằm ở khả năng kết hợp trí tuệ
                      sắc bén với tư duy sáng tạo. Khi học được cách cân bằng
                      giữa tranh luận và lắng nghe, giữa đổi mới và kiên định,
                      họ có thể trở thành những nhà lãnh đạo tầm nhìn xuất sắc.
                    </p>
                    <div className="bg-opacity-20 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Một ENTP trưởng thành hiểu rằng đôi khi cần chậm lại để
                        lắng nghe, và rằng cảm xúc cũng quan trọng không kém lý
                        lẽ. Đây là chìa khóa để họ phát huy tối đa tiềm năng
                        sáng tạo."
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
                  <h2 className="text-3xl font-bold text-green-600 mb-3">
                    MỐI QUAN HỆ CỦA ENTP
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-purple-500 mx-auto rounded-full"></div>
                  <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    ENTP là những người bạn tranh luận sôi nổi và người yêu đầy
                    ý tưởng. Với trí tuệ sắc bén và tinh thần tự do, họ mang đến
                    những cuộc trò chuyện kích thích tư duy trong mọi mối quan
                    hệ. ENTP yêu thích sự độc lập nhưng cũng rất trân trọng
                    những người có thể theo kịp tư duy của họ.
                  </p>
                </div>

                {/* General Relationship Traits */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
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
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Đặc điểm nổi bật
                      </h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Giao tiếp thông minh và hài hước</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>
                          Yêu thích tranh luận và thách thức quan điểm
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Tràn đầy ý tưởng sáng tạo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Đề cao sự độc lập và tự do cá nhân</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
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
                        { type: "INFJ", desc: "Sâu sắc, tư duy" },
                        { type: "INTJ", desc: "Chiến lược, logic" },
                        { type: "ENTJ", desc: "Năng động, quyết đoán" },
                        { type: "ENFP", desc: "Sáng tạo, nhiệt huyết" },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-bold text-green-600">
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
                <div className="bg-gradient-to-r from-green-50 to-purple-50 p-8 rounded-2xl mb-12">
                  <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                      <div className="bg-white p-4 rounded-full shadow-lg">
                        <svg
                          className="w-16 h-16 text-purple-500"
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
                      <h3 className="text-2xl font-bold text-purple-700 mb-4">
                        ENTP TRONG TÌNH YÊU
                      </h3>
                      <p className="text-gray-700 mb-4">
                        ENTP yêu bằng trí tuệ và sự sáng tạo. Họ không ngừng tìm
                        cách làm mới mối quan hệ bằng những ý tưởng độc đáo. Tuy
                        nhiên, ENTP thường gặp khó khăn trong việc thể hiện cảm
                        xúc sâu sắc và có thể vô tình làm tổn thương đối phương
                        bằng lời nói thẳng thắn.
                      </p>
                      <div className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-green-400 mb-4">
                        <p className="italic text-gray-700">
                          "Tình yêu của ENTP là một cuộc phiêu lưu trí tuệ không
                          ngừng nghỉ. Họ cần người có thể theo kịp dòng tư duy
                          nhanh như chớp và cùng họ khám phá những chân trời
                          mới."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Cách thể hiện tình cảm",
                        icon: "💡",
                        content:
                          "ENTP thể hiện tình yêu qua việc chia sẻ ý tưởng và thách thức tư duy của đối phương. Họ thích những cuộc trò chuyện sâu sắc hơn là những cử chỉ lãng mạn thông thường.",
                      },
                      {
                        title: "Thách thức",
                        icon: "⚠️",
                        content:
                          "ENTP dễ chán nản khi mối quan hệ trở nên quá ổn định. Họ cũng thường thiếu nhạy cảm với cảm xúc của đối phương và có thể quá thẳng thắn trong giao tiếp.",
                      },
                      {
                        title: "Lời khuyên",
                        icon: "✨",
                        content:
                          "ENTP cần học cách lắng nghe và thấu hiểu cảm xúc của người yêu. Đối tác nên chấp nhận sự độc lập của ENTP và cùng họ khám phá những ý tưởng mới.",
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
                  <h3 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-purple-500"
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
                    ENTP TRONG TÌNH BẠN
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-start mb-6">
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
                            Bạn bè tri kỷ
                          </h4>
                          <p className="text-gray-700">
                            ENTP kết bạn với những người có thể tham gia vào các
                            cuộc tranh luận sôi nổi. Họ đánh giá cao bạn bè
                            thông minh, có chính kiến và không ngại thách thức
                            quan điểm của họ.
                          </p>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-green-400 mb-6">
                        <p className="italic text-gray-700">
                          "ENTP là người bạn luôn biết cách làm mọi cuộc trò
                          chuyện trở nên thú vị. Với kiến thức uyên bác và khiếu
                          hài hước, họ khiến bạn bè không bao giờ cảm thấy nhàm
                          chán."
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
                            Khó khăn trong tình bạn
                          </h4>
                          <p className="text-gray-700">
                            ENTP đôi khi quá thẳng thắn, dễ vô tình làm tổn
                            thương bạn bè. Họ cũng không kiên nhẫn với những
                            người quá nhạy cảm hoặc không theo kịp tốc độ tư duy
                            của họ.
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
                            Tình bạn sâu sắc
                          </h4>
                          <p className="text-gray-700">
                            Khi đã coi ai là bạn thân, ENTP rất trung thành với
                            những cuộc trò chuyện tri thức. Họ là người bạn đáng
                            tin cậy trong việc giải quyết vấn đề logic, dù không
                            phải là chỗ dựa tinh thần lý tưởng.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parenting Section */}
                <div className="bg-gradient-to-r from-green-50 to-purple-50 p-8 rounded-2xl">
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
                    ENTP KHI LÀM CHA MẸ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Phong cách nuôi dạy",
                          content:
                            "ENTP là những phụ huynh đề cao tư duy độc lập. Họ khuyến khích con cái đặt câu hỏi, thử nghiệm ý tưởng mới và phát triển khả năng tư duy phản biện. Môi trường gia đình luôn tràn ngập những cuộc thảo luận sôi nổi.",
                        },
                        {
                          title: "Ưu điểm",
                          content:
                            "ENTP dạy con tính tự lập và tư duy logic. Họ là người đồng hành trong các hoạt động khám phá, giúp con phát triển trí tuệ và sự sáng tạo. Con cái được khuyến khích thể hiện quan điểm cá nhân.",
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
                              Khó khăn khi đặt ra kỷ luật và nề nếp nhất quán
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Thiếu kiên nhẫn với những cảm xúc phức tạp của con
                              cái
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Đôi khi quá tập trung vào phát triển trí tuệ mà bỏ
                              qua nhu cầu tình cảm
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-100 p-5 rounded-lg border-l-4 border-purple-500">
                        <p className="italic text-gray-700">
                          "Dù không phải mẫu phụ huynchỉ cảm xúc nhất, ENTP mang
                          đến cho con cái môi trường phát triển tư duy độc lập
                          và sáng tạo. Họ dạy con cách tư duy phản biện và không
                          ngại thách thức hiện trạng - những kỹ năng quý giá cho
                          tương lai."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Quote */}
                <div className="text-center mt-12">
                  <div className="bg-green-100 p-6 rounded-xl inline-block max-w-2xl">
                    <svg
                      className="w-10 h-10 text-green-500 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl font-medium text-green-800 mb-2">
                      "ENTP mang đến những cuộc trò chuyện kích thích trí tuệ và
                      góc nhìn độc đáo trong mọi mối quan hệ. Họ yêu tự do tư
                      tưởng nhưng cũng trân trọng những người có thể thách thức
                      họ về mặt trí tuệ. Để hiểu ENTP, hãy sẵn sàng cho những
                      cuộc tranh luận không hồi kết và những ý tưởng phá cách."
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
                    <span className="text-green-600">NGƯỜI NHÌN XA (ENTP)</span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    ENTP - Nhóm tính cách sáng tạo, thông minh với tư duy chiến
                    lược và khả năng tranh luận sắc bén
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
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-green-800 mb-3">
                        Nguyên tắc vàng khi tiếp cận ENTP
                      </h3>
                      <p className="text-gray-700">
                        "Lắng nghe" chính là chìa khóa vàng để trở nên thân
                        thiết với ENTP - nhóm tính cách cực kỳ thích tranh luận.
                        Để xây dựng mối quan hệ bền chặt với ENTP:
                        <span className="font-medium block mt-2">
                          "Hãy thể hiện sự quan tâm thực sự đến những suy nghĩ
                          độc đáo của họ và để họ tự do thể hiện khả năng sáng
                          tạo"
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Công nhận năng lực
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Thẳng thắn khen ngợi trí thông minh và sự sáng tạo
                              của họ
                            </li>
                            <li>Đánh giá cao những ý tưởng độc đáo</li>
                            <li>
                              Thể hiện sự tôn trọng năng lực hơn là sự yêu thích
                            </li>
                            <li>Ghi nhận những đóng góp trí tuệ của họ</li>
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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tạo không gian tranh luận
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Khuyến khích họ chia sẻ quan điểm và ý tưởng
                            </li>
                            <li>
                              Đặt câu hỏi "Tại sao lại có suy nghĩ như vậy?"
                            </li>
                            <li>Tham gia thảo luận với tinh thần cởi mở</li>
                            <li>Tránh phán xét những ý tưởng khác biệt</li>
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
                              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tôn trọng sự tự do
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Không áp đặt hay can thiệp quá mức</li>
                            <li>Cho phép họ tự do phát triển ý tưởng</li>
                            <li>Tạo điều kiện để họ thể hiện khả năng</li>
                            <li>Tránh kiểm soát hoặc ra lệnh</li>
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
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Khuyến khích sáng tạo
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Cho họ thời gian riêng để mơ mộng</li>
                            <li>Không chê bai ý tưởng dù có vẻ "viển vông"</li>
                            <li>Cùng khám phá những chủ đề mới lạ</li>
                            <li>Ủng hộ những dự án sáng tạo của họ</li>
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
                              Tham gia tranh luận với tinh thần cởi mở
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Đặt câu hỏi khơi gợi tư duy
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Công nhận trí thông minh và sáng tạo
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Tôn trọng không gian và sự tự do của họ
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
                              Áp đặt hoặc kiểm soát quá mức
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Phủ nhận ý tưởng mà không tranh luận
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Bảo thủ trong quan điểm cá nhân
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Giới hạn sự sáng tạo của họ
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Advice */}
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">
                    Lời khuyên từ chuyên gia
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Xây dựng mối quan hệ với ENTP đòi hỏi sự tôn trọng trí tuệ
                    và sáng tạo của họ. Một khi đã coi bạn là người thân thiết,
                    họ sẽ mang đến những cuộc trò chuyện đầy trí tuệ và những ý
                    tưởng đột phá. Hãy trân trọng tư duy độc đáo và tinh thần
                    khám phá mà họ mang đến cho cuộc sống của bạn.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="italic text-gray-700">
                      "Tình bạn với ENTP như một phòng thí nghiệm ý tưởng không
                      ngừng nghỉ. Họ sẽ thách thức tư duy của bạn, dẫn dắt bạn
                      khám phá những chân trời mới, và luôn là người bạn trung
                      thực nhất bạn từng có."
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
                    <span className="text-green-600">NGƯỜI NHÌN XA (ENTP)</span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ENTP - Những nhà chiến lược sáng tạo với tư duy đột phá và
                    khả năng giải quyết vấn đề xuất sắc
                  </p>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-green-500 to-purple-600 p-8 rounded-lg mb-10 text-white">
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
                      "ENTP xây dựng sự nghiệp bằng trí tuệ sắc bén và tầm nhìn
                      chiến lược"
                    </h3>
                    <p className="text-green-100">
                      Những người nhìn xa luôn tìm kiếm công việc cho phép họ
                      được thách thức trí tuệ và đổi mới tư duy
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
                        <div className="bg-green-100 text-green-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          1
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn khởi đầu: Thử nghiệm đa dạng
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Khi mới bước vào sự nghiệp, ENTP thử sức với nhiều
                          lĩnh vực khác nhau để tìm ra môi trường phù hợp. Họ
                          xuất sắc trong các vị trí đòi hỏi tư duy chiến lược và
                          giải quyết vấn đề phức tạp.
                        </p>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="italic text-gray-700">
                            "ENTP cần môi trường làm việc năng động, sáng tạo để
                            phát triển. Họ học qua thách thức trí tuệ và cơ hội
                            đổi mới"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-green-100 text-green-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          2
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn bứt phá: Chuyên môn hóa
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Sau khi tích lũy kinh nghiệm, ENTP chứng minh được khả
                          năng phân tích và tư duy hệ thống. Họ được đánh giá
                          cao nhờ óc sáng tạo và khả năng nhìn thấy giải pháp mà
                          người khác không thấy.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            Tư duy chiến lược
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            Giải quyết vấn đề
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            Đổi mới sáng tạo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-green-100 text-green-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          3
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn chín muồi: Dẫn dắt đổi mới
                        </h4>
                        <p className="text-gray-700">
                          Ở đỉnh cao sự nghiệp, ENTP trở thành người tiên phong
                          trong lĩnh vực của mình. Họ tạo ra những giải pháp đột
                          phá và truyền cảm hứng cho cộng đồng bằng tầm nhìn xa
                          trông rộng.
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
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tư duy chiến lược
                          </h4>
                          <p className="text-gray-700">
                            Khả năng phân tích vấn đề đa chiều và đưa ra giải
                            pháp đột phá
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
                          <h4 className="font-bold text-gray-800 mb-2">
                            Sáng tạo không giới hạn
                          </h4>
                          <p className="text-gray-700">
                            Khả năng nghĩ ra những ý tưởng mới lạ và cách tiếp
                            cận độc đáo
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
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Thuyết phục xuất sắc
                          </h4>
                          <p className="text-gray-700">
                            Khả năng trình bày ý tưởng logic và thuyết phục
                            người khác
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
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Thích ứng nhanh
                          </h4>
                          <p className="text-gray-700">
                            Khả năng xoay chuyển tình thế và thích ứng với thay
                            đổi
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
                        <div className="bg-green-100 p-3 rounded-lg mr-4">
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
                        <h4 className="font-bold text-green-700">
                          Kinh doanh & Khởi nghiệp
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Doanh
                          nhân
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Chiến
                          lược gia
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Tư vấn
                          quản lý
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Nhân
                          viên kinh doanh
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
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
                          Khoa học & Công nghệ
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhà
                          khoa học
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Kỹ sư
                          phần mềm
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Phân
                          tích dữ liệu
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhà
                          phát minh
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-teal-700">
                          Sáng tạo & Pháp lý
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Luật sư
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Nhà tâm
                          lý học
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Nhà báo
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span> Chuyên
                          gia marketing
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Career Warnings */}
                <div className="mb-12 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">
                    Cảnh báo nghề nghiệp
                  </h3>
                  <p className="text-gray-700 mb-4">
                    ENTP nên tránh những môi trường công việc:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>
                      Có cấu trúc cứng nhắc và quy trình hành chính phức tạp
                    </li>
                    <li>Đòi hỏi làm việc độc lập với ít tương tác xã hội</li>
                    <li>Lặp đi lặp lại các công việc giống nhau hàng ngày</li>
                    <li>Không có cơ hội phát triển và học hỏi điều mới</li>
                  </ul>
                </div>

                {/* Career Development */}
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">
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
                          Thử nghiệm nhiều lĩnh vực khác nhau, phát triển kỹ
                          năng phân tích và xây dựng mạng lưới quan hệ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-purple-500 font-bold">
                        2.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn chuyên môn hóa (5-10 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Tập trung vào lĩnh vực thế mạnh, phát triển chuyên môn
                          sâu và khả năng lãnh đạo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-purple-500 font-bold">
                        3.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn đổi mới (10+ năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Dẫn dắt các dự án đột phá, truyền cảm hứng cho thế hệ
                          sau bằng tầm nhìn chiến lược
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Quote */}
                <div className="text-center mt-12">
                  <div className="bg-green-100 p-6 rounded-xl inline-block max-w-2xl">
                    <svg
                      className="w-10 h-10 text-green-500 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl font-medium text-green-800 mb-2">
                      "ENTP xây dựng sự nghiệp bằng trí tuệ sắc bén và tầm nhìn
                      xa. Họ là những nhà đổi mới không ngừng nghỉ, luôn tìm
                      kiếm thách thức trí tuệ và cơ hội phá vỡ hiện trạng. Để
                      phát huy hết tiềm năng, ENTP cần môi trường tự do sáng tạo
                      và những đồng nghiệp có thể thách thức họ về mặt trí tuệ."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Workplace Habits Section */}
            {activeSection === "workplace-habits" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-green-600 mb-6 border-b-2 border-green-100 pb-4">
                  THÓI QUEN NƠI CÔNG SỞ CỦA ENTP
                </h2>

                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    ENTP tỏa sáng trong môi trường làm việc đầy thử thách trí
                    tuệ, nơi họ có thể tự do tranh luận và đổi mới. Với tư duy
                    chiến lược và khả năng phân tích sắc bén, họ xuất sắc trong
                    các vai trò đòi hỏi sáng tạo, giải quyết vấn đề phức tạp và
                    thách thức hiện trạng.
                  </p>
                </div>

                {/* As Employees Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-green-600">
                      ENTP khi là nhân viên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điểm mạnh nổi bật
                      </h4>
                      <p className="text-gray-700">
                        Giải quyết vấn đề đột phá. Tư duy chiến lược dài hạn.
                        Khả năng tranh luận logic. Sáng tạo không ngừng. Truyền
                        cảm hứng cho đồng nghiệp bằng ý tưởng mới.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thách thức
                      </h4>
                      <p className="text-gray-700">
                        Khó chịu với quy trình cứng nhắc. Thiếu kiên nhẫn với
                        công việc lặp đi lặp lại. Có thể bỏ qua chi tiết vì quá
                        tập trung vào bức tranh lớn. Thường thách thức cấp trên
                        và hiện trạng.
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "ENTP là nhân viên sáng tạo nhưng cần môi trường cởi mở.
                      Họ làm việc tốt nhất khi được tự do thử nghiệm ý tưởng mới
                      và thách thức các giả định hiện có."
                    </p>
                  </div>
                </div>

                {/* As Colleagues Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-green-600">
                      ENTP khi là đồng nghiệp
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Giá trị mang lại
                      </h4>
                      <p className="text-gray-700">
                        Luôn đưa ra góc nhìn độc đáo. Kích thích tư duy phản
                        biện. Giải pháp sáng tạo cho vấn đề phức tạp. Giao tiếp
                        thẳng thắn, logic. Truyền cảm hứng đổi mới cho nhóm.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điều cần lưu ý
                      </h4>
                      <p className="text-gray-700">
                        Có thể quá thẳng thắn trong phản biện. Ít kiên nhẫn với
                        quy trình chậm chạp. Thường xuyên thách thức ý kiến đồng
                        nghiệp. Cần được công nhận trí tuệ.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1 mr-3 text-green-500 text-xl">
                      💡
                    </div>
                    <div>
                      <p className="text-gray-700">
                        "Đồng nghiệp ENTP giống như 'nhà tư tưởng' của nhóm -
                        luôn biết cách kích thích tư duy và đưa ra những giải
                        pháp không ai ngờ tới."
                      </p>
                    </div>
                  </div>
                </div>

                {/* As Managers Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-green-600">
                      ENTP khi làm quản lý
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách lãnh đạo
                      </h4>
                      <p className="text-gray-700">
                        Khuyến khích tư duy phản biện. Tạo môi trường cởi mở cho
                        ý tưởng mới. Đánh giá cao sự thông minh và sáng tạo. Ưu
                        tiên đổi mới và cải tiến. Trao quyền tự chủ cho nhân
                        viên.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Ưu tiên
                      </h4>
                      <p className="text-gray-700">
                        Đánh giá cao trí tuệ và năng lực. Chú trọng tầm nhìn dài
                        hạn. Khuyến khích nhân viên thách thức hiện trạng. Tập
                        trung vào giải pháp đột phá hơn là quy trình cứng nhắc.
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 text-purple-500">
                        ⚠️
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Lời khuyên cho lãnh đạo ENTP: Cần cân bằng giữa đổi
                          mới và ổn định. Đừng quá tập trung vào ý tưởng mới mà
                          bỏ qua việc hoàn thành dự án hiện tại. Lắng nghe ý
                          kiến nhân viên dù nó có vẻ "truyền thống".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Path Section */}
                <div className="mt-10 bg-gradient-to-r from-green-500 to-purple-500 p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-3">
                    Con đường sự nghiệp lý tưởng
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-purple-600 to-green-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Chiến lược & Đổi mới
                      </h4>
                      <p className="text-sm">
                        Nhà chiến lược, Tư vấn quản lý, Khởi nghiệp, Đổi mới sản
                        phẩm
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-green-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Tư duy & Phân tích</h4>
                      <p className="text-sm">
                        Phân tích hệ thống, Nhà nghiên cứu, Phát triển phần mềm,
                        Kỹ sư
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-green-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Truyền thông & Thuyết phục
                      </h4>
                      <p className="text-sm">
                        Luật sư, Chính trị gia, Nhà báo, Diễn giả, Nhà marketing
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-green-100 text-sm">
                    <p>
                      ENTP phát triển mạnh trong môi trường trí tuệ, nơi họ có
                      thể thách thức hiện trạng, đưa ra ý tưởng đột phá và được
                      công nhận năng lực. Họ cần không gian để sáng tạo và tự do
                      phát triển tầm nhìn.
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
                    <span className="text-green-600">NGƯỜI NHÌN XA (ENTP)</span>{" "}
                    VỚI
                    <span className="text-indigo-600">
                      {" "}
                      NHÀ TƯ DUY (INTP)
                    </span>{" "}
                    VÀ
                    <span className="text-purple-500">
                      {" "}
                      NGƯỜI THỰC THI (ESTP)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Phân tích sâu về 3 nhóm tính cách thuộc nhóm "Nhà phát minh"
                    - những người lý trí và linh hoạt
                  </p>
                </div>

                {/* Core Similarities */}
                <div className="bg-gray-50 p-6 rounded-lg mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2"
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
                    Điểm chung cốt lõi của bộ ba Nhà phát minh (NTP/STP)
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-100 text-green-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          T
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Tư duy logic
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Cả ba đều đưa ra quyết định dựa trên phân tích khách
                        quan thay vì cảm xúc
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-100 text-green-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          P
                        </div>
                        <h4 className="font-bold text-gray-800">Linh hoạt</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Ưa thích sự tự do, ghét bị ràng buộc bởi quy tắc cứng
                        nhắc
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-100 text-green-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          💡
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Thiên hướng đổi mới
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Có khả năng tư duy phản biện và đưa ra giải pháp sáng
                        tạo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pair Comparisons */}
                <div className="space-y-10">
                  {/* ENTP vs INTP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-green-500 to-indigo-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-green-600">ENTP</span> vs{" "}
                        <span className="text-indigo-600">INTP</span>:
                        <span className="text-sm font-normal ml-2">
                          Nhà tranh luận sắc bén vs Nhà tư duy trầm lắng
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>
                            Đều có tư duy trừu tượng và khả năng phân tích sâu
                            sắc
                          </li>
                          <li>
                            Ham học hỏi và không ngừng tìm kiếm kiến thức mới
                          </li>
                          <li>Đề cao sự tự do trong suy nghĩ và hành động</li>
                          <li>Có nhiều ý tưởng sáng tạo và đột phá</li>
                          <li>Không thích làm việc theo quy trình cứng nhắc</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-indigo-500 mr-2"
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
                              ENTP (E) hướng ngoại và thích tranh luận, INTP (I)
                              hướng nội và thích suy ngẫm
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Cách thể hiện
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ENTP thích thử nghiệm ý tưởng qua hành động, INTP
                              thích phát triển ý tưởng trong tâm trí
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Mục tiêu
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ENTP hướng đến thay đổi thế giới, INTP hướng đến
                              hiểu biết thế giới
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ENTP như một nhà cách mạng không ngừng thách thức hiện
                        trạng, INTP như một triết gia âm thầm khám phá bản chất
                        sự việc. Cả hai đều có trí tuệ sắc bén nhưng với cách
                        tiếp cận khác biệt."
                      </p>
                    </div>
                  </div>

                  {/* ENTP vs ESTP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-green-500 to-purple-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-green-600">ENTP</span> vs{" "}
                        <span className="text-purple-500">ESTP</span>:
                        <span className="text-sm font-normal ml-2">
                          Nhà chiến lược tầm xa vs Người hành động tức thì
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Đều là người hướng ngoại và năng động</li>
                          <li>Có khả năng thích nghi cao với môi trường mới</li>
                          <li>Thích thử thách và mạo hiểm</li>
                          <li>Giỏi giải quyết vấn đề thực tế</li>
                          <li>Ghét sự ràng buộc và quy tắc không cần thiết</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-purple-500 mr-2"
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
                              Cách tiếp cận
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ENTP (N) tập trung vào ý tưởng và khả năng, ESTP
                              (S) tập trung vào thực tế và hành động
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Tầm nhìn
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ENTP có tầm nhìn dài hạn, ESTP tập trung vào hiện
                              tại
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Sở thích
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ENTP thích tranh luận lý thuyết, ESTP thích trải
                              nghiệm thực tế
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ENTP như một nhà chiến lược luôn nghĩ đến các khả năng
                        tương lai, ESTP như một vận động viên tập trung vào hành
                        động tức thì. Cả hai đều giỏi xử lý tình huống nhưng với
                        góc nhìn khác nhau."
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
                      <thead className="bg-green-600 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold">
                            Đặc điểm
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            INTP
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ENTP
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ESTP
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
                            Tư duy nội tâm (Ti) + Trực giác ngoại hướng (Ne)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Trực giác ngoại hướng (Ne) + Tư duy nội tâm (Ti)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Cảm nhận ngoại hướng (Se) + Tư duy nội tâm (Ti)
                          </td>
                        </tr>
                        {/* Row 2 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Phong cách làm việc
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-indigo-50">
                            Độc lập, tập trung vào lý thuyết, phát triển ý tưởng
                            phức tạp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-green-50">
                            Năng động, thích tranh luận, đưa ra nhiều giải pháp
                            sáng tạo
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Thực tế, nhanh nhẹn, tập trung vào hành động tức thì
                          </td>
                        </tr>
                        {/* Row 3 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Trong quan hệ
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Kín đáo, ít bạn bè, thích thảo luận ý tưởng
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Hòa đồng, thích tranh luận, có nhiều mối quan hệ
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Thân thiện, thẳng thắn, thích các hoạt động xã hội
                          </td>
                        </tr>
                        {/* Row 4 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Ưu thế nghề nghiệp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-indigo-50">
                            Nhà khoa học, lập trình viên, nhà triết học
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-green-50">
                            Doanh nhân, luật sư, nhà chiến lược
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Vận động viên, nhân viên bán hàng, nhà thám hiểm
                          </td>
                        </tr>
                        {/* Row 5 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Điểm mạnh
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Phân tích sâu, tư duy logic, độc lập
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Sáng tạo, thuyết phục, tầm nhìn xa
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Thực tế, nhanh nhẹn, xử lý khủng hoảng tốt
                          </td>
                        </tr>
                        {/* Row 6 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Điểm yếu
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-indigo-50">
                            Thiếu thực tế, khó diễn đạt ý tưởng
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-green-50">
                            Thiếu kiên nhẫn, dễ chán, hay tranh cãi
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Bốc đồng, thiếu tầm nhìn dài hạn
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
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-indigo-700">INTP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          khoa học
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Lập
                          trình viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Kỹ sư
                          hệ thống
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          toán học
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span> Nhà
                          triết học
                        </li>
                      </ul>
                    </div>

                    {/* ENTP Column */}
                    <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-lg mr-4">
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
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-green-700">ENTP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Doanh
                          nhân
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Luật sư
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Nhà
                          chiến lược
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Nhà báo
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Nhà
                          phát minh
                        </li>
                      </ul>
                    </div>

                    {/* ESTP Column */}
                    <div className="bg-white p-6 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-purple-700">ESTP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Vận
                          động viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhân
                          viên bán hàng
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhà
                          thám hiểm
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Cảnh
                          sát
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Diễn
                          viên
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final Thoughts */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">
                    Nhận định cuối
                  </h3>
                  <p className="text-gray-700 mb-3">
                    ENTP, INTP và ESTP đều là những nhóm tính cách lý trí và
                    linh hoạt, nhưng mỗi nhóm có thế mạnh riêng:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                    <li>
                      <span className="font-medium">INTP</span> - Nhà tư duy sâu
                      sắc với khả năng phân tích hệ thống
                    </li>
                    <li>
                      <span className="font-medium">ENTP</span> - Nhà chiến lược
                      sáng tạo với tầm nhìn xa
                    </li>
                    <li>
                      <span className="font-medium">ESTP</span> - Người hành
                      động nhanh nhẹn với khả năng xử lý tình huống
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Sự khác biệt chính nằm ở cách họ tiếp cận thế giới: INTP với
                    tư duy trừu tượng, ENTP với tầm nhìn chiến lược, ESTP với
                    hành động thực tế. Hiểu rõ những khác biệt này giúp mỗi nhóm
                    phát huy tối đa tiềm năng của mình.
                  </p>
                </div>
              </div>
            )}
            {activeSection === "advice" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-green-600 mb-8 border-b-2 border-green-100 pb-4">
                  LỜI KHUYÊN PHÁT TRIỂN DÀNH CHO NGƯỜI NHÌN XA (ENTP)
                </h2>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-green-700 to-purple-800 p-8 rounded-lg mb-10 text-white">
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
                      Hành trình phát triển cho nhà tư tưởng
                    </h3>
                    <p className="text-green-200">
                      Là những người thông minh và sáng tạo, ENTP cần học cách
                      cân bằng giữa tranh luận và lắng nghe, giữa ý tưởng và
                      hành động để phát huy tối đa tiềm năng của mình.
                    </p>
                  </div>
                </div>

                {/* Core Advice Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {/* Develop Strengths */}
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Phát huy điểm mạnh
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tận dụng tối đa khả năng phân tích và sáng tạo của bạn:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Ứng dụng tư duy chiến lược vào giải quyết vấn đề phức
                        tạp
                      </li>
                      <li>Phát huy khả năng nhìn nhận đa chiều các vấn đề</li>
                      <li>
                        Tận dụng sự thông minh để truyền cảm hứng cho người khác
                      </li>
                    </ul>
                  </div>

                  {/* Improve Weaknesses */}
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
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Cải thiện điểm yếu
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Những điều ENTP cần lưu ý để phát triển:
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="italic text-gray-700">
                        "Trí tuệ là sức mạnh, nhưng sự kiên trì là chìa khóa
                        thành công lâu dài"
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Học cách lắng nghe thay vì chỉ tranh luận</li>
                      <li>Rèn luyện tính kiên định với mục tiêu</li>
                      <li>Chú ý đến chi tiết và thực thi ý tưởng</li>
                    </ul>
                  </div>
                </div>

                {/* Key Advice Section */}
                <div className="mb-10 bg-gradient-to-r from-green-50 to-purple-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
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
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold text-green-800 mb-4">
                        Lời khuyên then chốt
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                          <h4 className="font-semibold text-green-700 mb-2">
                            Học cách lắng nghe
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Tránh ngắt lời hoặc nói lấn át người khác</li>
                            <li>Tiếp thu quan điểm khác biệt</li>
                            <li>Xây dựng mối quan hệ tích cực hơn</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                          <h4 className="font-semibold text-green-700 mb-2">
                            Thực thi ý tưởng
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Biến ý tưởng thành hành động cụ thể</li>
                            <li>Lên kế hoạch thực hiện rõ ràng</li>
                            <li>Theo đuổi đến khi hoàn thành</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                          <h4 className="font-semibold text-green-700 mb-2">
                            Quản lý thời gian
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Đặt mục tiêu rõ ràng cho từng việc</li>
                            <li>Ưu tiên công việc quan trọng</li>
                            <li>Tránh "đứng núi này trông núi nọ"</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                          <h4 className="font-semibold text-green-700 mb-2">
                            Khiêm tốn và cởi mở
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Thừa nhận hạn chế của bản thân</li>
                            <li>Tôn trọng quan điểm người khác</li>
                            <li>Tạo môi trường hợp tác, học hỏi</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Self-Improvement Section */}
                <div className="mb-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 bg-green-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm">
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
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-green-700">
                          Cải thiện bản thân
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        ENTP cần chú ý phát triển toàn diện:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Tập trung và kiên định
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>
                              Hoàn thành dự án hiện tại trước khi chuyển sang ý
                              tưởng mới
                            </li>
                            <li>Đặt deadline cụ thể cho các mục tiêu</li>
                            <li>Rèn luyện tính kỷ luật cá nhân</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Phát triển EQ
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Nhận biết và kiểm soát cảm xúc tốt hơn</li>
                            <li>Thấu hiểu cảm xúc người khác</li>
                            <li>Giao tiếp khéo léo hơn</li>
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
                            <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              1
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Lắng nghe chủ động
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Trong cuộc họp, đếm đến 5 trước khi phản biện
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              2
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Kế hoạch hành động
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi tuần chọn 1 ý tưởng và lập kế hoạch thực
                                hiện
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              3
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Nhật ký tự phản biện
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi tối ghi lại 1 quan điểm khác biệt đã học
                                được
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Encouragement */}
                <div className="bg-gradient-to-r from-green-800 to-purple-700 p-8 rounded-lg text-white">
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
                      Sức mạnh của Người nhìn xa
                    </h3>
                    <p className="mb-4 text-green-100">
                      Bạn được ban tặng trí tuệ sắc bén, tư duy đổi mới và khả
                      năng tranh luận xuất sắc. Khi học cách kết hợp những điểm
                      mạnh này với sự kiên nhẫn và cởi mở, bạn sẽ trở thành
                      phiên bản tốt nhất của chính mình.
                    </p>
                    <div className="bg-purple-800 bg-opacity-30 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Thế giới cần những nhà tư tưởng như bạn - những người
                        dám thách thức hiện trạng, đưa ra giải pháp đột phá và
                        truyền cảm hứng cho người khác. Hãy nhớ rằng thành công
                        thực sự đến từ sự cân bằng giữa trí tuệ và cảm xúc, giữa
                        ý tưởng và hành động."
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
export default ENTPPage;
