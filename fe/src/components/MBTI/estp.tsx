import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import handleCopyLink from "../helpers/HandleCopyLink";

const ESTPPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Tổng quan" },
    { id: "strengths-weaknesses", title: "Điểm mạnh và điểm yếu" },
    { id: "relationship", title: "Mối quan hệ" },
    { id: "how-to-be-close", title: "Làm sao để thân thiết với ESTP" },
    { id: "career-path", title: "Con đường sự nghiệp" },
    { id: "workplace-habits", title: "Thói quen nơi công sở" },
    { id: "compare", title: "So sánh ESTP VỚI ENTP, ISTP" },
    { id: "advice", title: "Lời khuyên dành cho ESTP" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="ESTP-page bg-gradient-to-b from-blue-50 to-purple-50">
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
                ESTP - Người thực thi
              </h1>
            </div>
            <div className="relative w-full">
              <img
                src="/mbti_icons/estp1.webp"
                alt="ESTP - Người thực thi"
                className="pointer w-full h-120 object-cover rounded-lg shadow "
              />
            </div>

            {/* Description */}
            <div className="text-lg text-gray-700 max-w-4xl text-center">
              Là những cá nhân năng động và hoạt bát, các ESTP rất yêu những
              hoạt động thể chất. Điều đó cũng được thể hiện rất rõ trong việc
              giải quyết vấn đề một cách dứt khoát và nhanh chóng của họ. Những
              Người thực thi luôn mang trong mình tinh thần lạc quan bất diệt,
              “always look on the bright side”.
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
                    TỔNG QUAN TÍNH CÁCH ESTP
                  </h2>
                  <div className="w-20 h-1 bg-orange-400 mx-auto"></div>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Là những cá nhân năng động và hoạt bát, các ESTP (Người thực
                    thi) rất yêu những hoạt động thể chất. Họ giải quyết vấn đề
                    một cách dứt khoát và nhanh chóng với tinh thần lạc quan bất
                    diệt, luôn nhìn vào mặt tích cực của cuộc sống. ESTP là
                    những người của hành động, sống trọn vẹn trong hiện tại và
                    tận hưởng mọi khoảnh khắc.
                  </p>
                </div>

                {/* MBTI Breakdown */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                    Ý NGHĨA 4 CHỮ CÁI ESTP
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "● E - Hướng ngoại (Extraverted)",
                        color: "bg-orange-100",
                        textColor: "text-orange-800",
                        content:
                          "ESTP lấy năng lượng từ thế giới bên ngoài. Họ thích tương tác với mọi người và luôn là trung tâm của các hoạt động sôi nổi.",
                      },
                      {
                        title: "● S - Giác quan (Sensing)",
                        color: "bg-amber-100",
                        textColor: "text-amber-800",
                        content:
                          "ESTP tập trung vào thực tế cụ thể mà họ có thể nhìn thấy, chạm vào và trải nghiệm. Họ sống trong hiện tại và tin vào những gì có thể kiểm chứng.",
                      },
                      {
                        title: "● T - Lý trí (Thinking)",
                        color: "bg-red-100",
                        textColor: "text-red-800",
                        content:
                          "ESTP đưa ra quyết định dựa trên logic và sự thật khách quan thay vì cảm xúc cá nhân. Họ phân tích tình huống một cách lý trí.",
                      },
                      {
                        title: "● P - Linh hoạt (Perceiving)",
                        color: "bg-yellow-100",
                        textColor: "text-yellow-800",
                        content:
                          "ESTP yêu thích sự tự do và linh hoạt. Họ thích ứng nhanh với thay đổi và luôn mở cửa cho những cơ hội mới xuất hiện.",
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
                      title: "Thẳng thắn, bộc trực",
                      icon: "💬",
                      content:
                        "ESTP nổi tiếng với tính cách thẳng thắn, không vòng vo. Họ ưu tiên hành động ngay lập tức và sống trọn cho hiện tại mà ít quan tâm đến hậu quả xa xôi.",
                    },
                    {
                      title: "Giỏi đọc vị người khác",
                      icon: "🔍",
                      content:
                        "ESTP có khả năng quan sát tinh tế, dễ dàng nhận biết tính cách người khác qua nét mặt và cử chỉ. Điều này giúp họ giao tiếp hiệu quả trong mọi tình huống.",
                    },
                    {
                      title: "Hoạt ngôn và hài hước",
                      icon: "🎤",
                      content:
                        "ESTP là những người giao tiếp xuất sắc với khiếu hài hước tự nhiên. Họ có thể làm bầu không khí trở nên sôi động chỉ với vài câu nói đùa.",
                    },
                    {
                      title: "Tinh thần phiêu lưu",
                      icon: "🏄",
                      content:
                        "ESTP luôn khao khát những trải nghiệm mới mẻ và mạo hiểm. Họ là người tiên phong dám thử thách giới hạn bản thân.",
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
                        <span>Khả năng ứng biến nhanh nhạy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Tinh thần lạc quan, tích cực</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Kỹ năng giao tiếp xuất sắc</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Dám nghĩ dám làm</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span>Giải quyết vấn đề thực tế</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-amber-700 mb-4">
                      ĐIỂM YẾU CẦN LƯU Ý
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">✗</span>
                        <span>Thiếu kiên nhẫn với lý thuyết</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">✗</span>
                        <span>Dễ chán nản với công việc lặp lại</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">✗</span>
                        <span>Đôi khi hành động thiếu suy nghĩ</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">✗</span>
                        <span>Khó tuân thủ quy tắc cứng nhắc</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">✗</span>
                        <span>Ít quan tâm đến cảm xúc người khác</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Career & Relationships */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-orange-700 mb-4">
                      ESTP TRONG CÔNG VIỆC
                    </h3>
                    <p className="text-gray-700 mb-4">
                      ESTP tỏa sáng trong môi trường năng động, nơi họ có thể
                      tận dụng kỹ năng thực tế và khả năng ứng biến:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Cơ hội hành động và ra quyết định nhanh</li>
                      <li>Môi trường không gò bó, nhiều thử thách mới</li>
                      <li>Công việc mang tính thực tiễn cao</li>
                      <li>Được giao tiếp với nhiều người</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Nghề nghiệp phù hợp: Doanh nhân, sales, marketing, thể
                      thao, cứu hộ, đầu bếp, tư vấn tài chính, nhà tổ chức sự
                      kiện.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-amber-700 mb-4">
                      ESTP TRONG QUAN HỆ
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Trong các mối quan hệ, ESTP là những người bạn thú vị
                      nhưng đôi khi thiếu tinh tế:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Thích những cuộc vui và trải nghiệm cùng nhau</li>
                      <li>Trung thành với bạn bè thân thiết</li>
                      <li>Đôi khi nói thẳng gây tổn thương</li>
                      <li>Không thích bị kiểm soát hay ràng buộc</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      ESTP cần học cách lắng nghe và thấu hiểu cảm xúc của người
                      khác để xây dựng mối quan hệ sâu sắc hơn.
                    </p>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold text-center text-orange-700 mb-6">
                    ESTP NỔI TIẾNG
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Donald Trump",
                        role: "Cựu Tổng thống Mỹ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg/1200px-Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg",
                      },
                      {
                        name: "Angelina Jolie",
                        role: "Diễn viên",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Angelina_Jolie_%2848462664366%29_%28cropped%29.jpg/960px-Angelina_Jolie_%2848462664366%29_%28cropped%29.jpg",
                      },
                      {
                        name: "Ernest Hemingway",
                        role: "Nhà văn",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ernest_Hemingway_1923_passport_photo.jpg/800px-Ernest_Hemingway_1923_passport_photo.jpg",
                      },
                      {
                        name: "Samuel L. Jackson",
                        role: "Diễn viên",
                        image:
                          "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
                      },
                      {
                        name: "Eddie Murphy",
                        role: "Diễn viên, danh hài",
                        image:
                          "https://m.media-amazon.com/images/M/MV5BMTc0NDQzODAwNF5BMl5BanBnXkFtZTYwMzUzNTk3._V1_FMjpg_UX1000_.jpg",
                      },
                      {
                        name: "Madonna",
                        role: "Ca sĩ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/b/b1/Madonna_Rebel_Heart_Tour_2015_-_Stockholm_%2823051472299%29_%28cropped%29.jpg",
                      },
                      {
                        name: "Bruce Willis",
                        role: "Diễn viên",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Bruce_Willis_by_Gage_Skidmore.jpg/1200px-Bruce_Willis_by_Gage_Skidmore.jpg",
                      },
                      {
                        name: "Floyd Mayweather Jr.",
                        role: "Võ sĩ quyền anh",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/d/d9/Floyd_Mayweather_Jr_2011.jpg",
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
                    "ESTP là những người của hành động, luôn mang đến năng lượng
                    tích cực và tinh thần phiêu lưu cho thế giới xung quanh. Họ
                    sống hết mình cho hiện tại và truyền cảm hứng cho người khác
                    bằng lối sống không ngại thử thách. Dù đôi khi bồng bột,
                    ESTP luôn biết cách biến cuộc sống thành một chuyến phiêu
                    lưu đáng nhớ."
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
                    <span className="text-indigo-600">
                      NHÓM TÍNH CÁCH ESTP (NGƯỜI THỰC THI)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ESTP - Nhóm tính cách "Người thực thi" với năng lượng dồi
                    dào, tư duy thực tế và phong cách sống mạo hiểm
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
                            Tràn đầy nhiệt huyết
                          </h4>
                          <p className="text-gray-700">
                            Những người ESTP luôn tràn đầy năng lượng và sức
                            sống. Họ dám vượt qua giới hạn, khám phá và áp dụng
                            những ý tưởng mới vào công việc và cuộc sống hàng
                            ngày.
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-green-700 italic">
                          "ESTP mang đến nguồn năng lượng tích cực và tinh thần
                          dám nghĩ dám làm cho mọi người xung quanh"
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
                            Lý tính và thực tế
                          </h4>
                          <p className="text-gray-700">
                            ESTP là những người lý trí và sống theo quan điểm
                            thực tiễn. Họ quan tâm tới những điều đã và đang
                            thực sự xảy ra thay vì tốn thời gian vào những cuộc
                            tranh luận đầy cảm tính.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Thực tế
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Khách quan
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Lý trí
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
                            Sáng tạo đột phá
                          </h4>
                          <p className="text-gray-700">
                            Kết hợp giữa tính táo bạo và tính thực tế, ESTP
                            thích thử nghiệm những ý tưởng độc đáo mà bạn sẽ
                            không thể nào đoán trước được. Đây là yếu tố giúp họ
                            tạo nên những bước đột phá.
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
                          <span>Khả năng sáng tạo</span>
                          <span>85% ESTP có ý tưởng đột phá</span>
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
                            Phán đoán nhạy bén
                          </h4>
                          <p className="text-gray-700">
                            ESTP có thể nhận ra khi nào có sự thay đổi và khi
                            nào cần thay đổi. Họ phát hiện cả những thay đổi nhỏ
                            nhất thông qua những biến đổi trong hành động thường
                            nhật.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Biểu hiện:</span>
                          Nhạy bén với thay đổi, ra quyết định nhanh, xử lý tình
                          huống tốt
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
                      ĐIỂM YẾU CẦN LƯU Ý
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu đồng cảm
                          </h4>
                          <p className="text-gray-700">
                            Đối với ESTP, cảm xúc luôn bị xếp sau những điều
                            thực tế. Sự thẳng thắn và bộc trực của họ đôi khi
                            không phù hợp trong những vấn đề liên quan tới tình
                            cảm.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Gợi ý:</span>
                          Học cách lắng nghe và thấu hiểu cảm xúc của người khác
                          trước khi đưa ra giải pháp thực tế
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu kiên nhẫn
                          </h4>
                          <p className="text-gray-700">
                            ESTP sống nhanh và luôn tràn đầy năng lượng. Họ
                            thường nóng lòng bắt tay vào hành động mà không cân
                            nhắc kỹ hậu quả, dẫn đến những sai lầm không đáng
                            có.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-700 italic">
                          "ESTP cần học cách kiềm chế sự bốc đồng và dành thời
                          gian suy nghĩ trước khi hành động"
                        </p>
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
                              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Bỏ qua bức tranh tổng thể
                          </h4>
                          <p className="text-gray-700">
                            ESTP có thể quá tập trung vào chi tiết nhỏ mà bỏ lỡ
                            tổng thể. Họ giải quyết từng giai đoạn hoàn hảo
                            nhưng có thể thất bại nếu các phần không ăn khớp với
                            mục tiêu chung.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Cải thiện:</span>
                          Rèn luyện tư duy chiến lược, luôn xem xét mục tiêu
                          tổng thể trước khi hành động
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tính nổi loạn
                          </h4>
                          <p className="text-gray-700">
                            ESTP không thích bị gò bó trong khuôn khổ. Họ chán
                            nản với công việc lặp đi lặp lại, quy tắc cứng nhắc,
                            thích hành động hơn lý thuyết. Điều này khiến họ khó
                            thích nghi với môi trường có kỷ luật.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Giải pháp:</span>
                          Học cách chấp nhận một số quy tắc cần thiết để đạt
                          được mục tiêu lớn hơn
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-xl text-white">
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
                      CÂN BẰNG CUỘC SỐNG ESTP
                    </h3>
                    <p className="mb-4 text-blue-100">
                      Sức mạnh thực sự của ESTP nằm ở khả năng kết hợp năng
                      lượng dồi dào với tư duy thực tế. Khi học được cách cân
                      bằng giữa hành động nhanh và suy nghĩ chiến lược, giữa sự
                      thẳng thắn và sự đồng cảm, họ có thể trở thành những nhà
                      lãnh đạo xuất sắc.
                    </p>
                    <div className="bg-opacity-20 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Một ESTP trưởng thành hiểu rằng đôi khi cần chậm lại để
                        suy nghĩ kỹ lưỡng, và rằng sự đồng cảm cũng quan trọng
                        không kém hiệu quả công việc. Đây là chìa khóa để họ
                        phát huy tối đa tiềm năng."
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
                    MỐI QUAN HỆ CỦA ESTP
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full"></div>
                  <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Các ESTP là những người bạn năng động và người yêu đầy nhiệt
                    huyết. Với nguồn năng lượng vô tận và tinh thần phiêu lưu,
                    họ mang đến những trải nghiệm không bao giờ nhàm chán trong
                    mọi mối quan hệ. ESTP yêu tự do nhưng cũng rất tận tâm với
                    những người họ quý mến.
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
                        <span>Luôn tràn đầy năng lượng và nhiệt huyết</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Giao tiếp thẳng thắn, không vòng vo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>
                          Yêu thích các hoạt động thể chất và mạo hiểm
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Không thích bị ràng buộc hay kiểm soát</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
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
                        { type: "ISFJ", desc: "Cân bằng cảm xúc" },
                        { type: "ISTJ", desc: "Ổn định, thực tế" },
                        { type: "ESFJ", desc: "Năng động xã hội" },
                        { type: "ENTP", desc: "Cùng đam mê phiêu lưu" },
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
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-2xl mb-12">
                  <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                      <div className="bg-white p-4 rounded-full shadow-lg">
                        <svg
                          className="w-16 h-16 text-orange-500"
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
                      <h3 className="text-2xl font-bold text-orange-700 mb-4">
                        ESTP TRONG TÌNH YÊU
                      </h3>
                      <p className="text-gray-700 mb-4">
                        ESTP yêu cuồng nhiệt và sống hết mình trong hiện tại. Họ
                        không thích những kế hoạch dài hạn về hôn nhân mà tập
                        trung tận hưởng những khoảnh khắc đẹp bên người mình
                        yêu. ESTP mang đến năng lượng tích cực và những trải
                        nghiệm thú vị trong tình yêu.
                      </p>
                      <div className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-orange-400 mb-4">
                        <p className="italic text-gray-700">
                          "Yêu ESTP là một chuyến phiêu lưu không bao giờ nhàm
                          chán. Họ luôn biết cách khiến đối phương ngạc nhiên
                          bằng những ý tưởng táo bạo và những chuyến đi bất
                          ngờ."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Cách thể hiện tình cảm",
                        icon: "💖",
                        content:
                          "ESTP thể hiện tình yêu qua những hành động thiết thực và những món quà ý nghĩa. Họ thích những cử chỉ thể chất như ôm ấp, nắm tay hơn là những lời nói ngọt ngào.",
                      },
                      {
                        title: "Thách thức",
                        icon: "⚠️",
                        content:
                          "ESTP dễ chán nản khi mối quan hệ trở nên nhàm chán. Họ cũng khó chia sẻ cảm xúc sâu sắc và đôi khi hành động thiếu suy nghĩ, gây tổn thương cho đối phương.",
                      },
                      {
                        title: "Lời khuyên",
                        icon: "💡",
                        content:
                          "ESTP cần học cách lắng nghe và thấu hiểu cảm xúc của người yêu. Đối tác nên tạo không gian tự do cho ESTP và cùng họ trải nghiệm những điều mới mẻ.",
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
                  <h3 className="text-2xl font-bold text-amber-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-amber-500"
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
                    ESTP TRONG TÌNH BẠN
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-start mb-6">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Bạn bè đa dạng
                          </h4>
                          <p className="text-gray-700">
                            ESTP kết bạn dễ dàng nhờ sự thân thiện và hòa đồng.
                            Họ thích những hoạt động thể thao, tiệc tùng và
                            những cuộc phiêu lưu cùng bạn bè. ESTP luôn là linh
                            hồn của các bữa tiệc.
                          </p>
                        </div>
                      </div>

                      <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400 mb-6">
                        <p className="italic text-gray-700">
                          "ESTP là người bạn luôn biết cách làm không khí trở
                          nên sôi động. Với khiếu hài hước tự nhiên và năng
                          lượng tích cực, họ khiến mọi người xung quanh luôn vui
                          vẻ."
                        </p>
                      </div>
                    </div>

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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Khó khăn trong tình bạn
                          </h4>
                          <p className="text-gray-700">
                            ESTP đôi khi quá thẳng thắn, dễ vô tình làm tổn
                            thương bạn bè. Họ cũng không kiên nhẫn với những
                            cuộc trò chuyện triết lý sâu xa hay những người bạn
                            quá nhạy cảm.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-yellow-100 p-2 rounded-lg mr-4">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tình bạn sâu sắc
                          </h4>
                          <p className="text-gray-700">
                            Khi đã coi ai là bạn thân, ESTP rất trung thành và
                            sẵn sàng giúp đỡ khi cần. Họ là người bạn đáng tin
                            cậy trong những tình huống khó khăn thực tế.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parenting Section */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-2xl">
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
                    ESTP KHI LÀM CHA MẸ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Phong cách nuôi dạy",
                          content:
                            "ESTP là những phụ huynh vui vẻ và thoải mái. Họ khuyến khích con cái khám phá thế giới thông qua các hoạt động thể chất và trải nghiệm thực tế. Môi trường gia đình luôn tràn ngập tiếng cười và những chuyến phiêu lưu.",
                        },
                        {
                          title: "Ưu điểm",
                          content:
                            "ESTP dạy con tính tự lập và can đảm đối mặt với thử thách. Họ là người đồng hành trong các hoạt động thể thao, giúp con phát triển kỹ năng thực tế và tinh thần phiêu lưu.",
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
                            <span>Khó khăn khi đặt ra kỷ luật và nề nếp</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span>
                              Ít quan tâm đến việc học hành lý thuyết của con
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span>
                              Đôi khi thiếu tinh tế trong việc thấu hiểu cảm xúc
                              con cái
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-orange-100 p-5 rounded-lg border-l-4 border-orange-500">
                        <p className="italic text-gray-700">
                          "Dù không phải mẫu phụ huynnguyên tắc nhất, ESTP mang
                          đến cho con cái tuổi thơ đầy ắp tiếng cười và những
                          trải nghiệm đáng nhớ. Họ dạy con cách sống mạnh mẽ và
                          không sợ thất bại."
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
                      "ESTP mang đến năng lượng tích cực và tinh thần phiêu lưu
                      trong mọi mối quan hệ. Họ yêu tự do nhưng cũng rất trung
                      thành với những người họ quý mến. Để hiểu ESTP, hãy cùng
                      họ khám phá thế giới và tận hưởng những khoảnh khắc đầy
                      màu sắc của cuộc sống."
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
                    <span className="text-blue-600">NGƯỜI THỰC THI (ESTP)</span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    ESTP - Nhóm tính cách năng động, thực tế với tinh thần phiêu
                    lưu và phong cách sống đầy nhiệt huyết
                  </p>
                </div>

                {/* Core Principles */}
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="bg-white p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-sm">
                        <svg
                          className="w-10 h-10 text-blue-600"
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
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">
                        Nguyên tắc vàng khi tiếp cận ESTP
                      </h3>
                      <p className="text-gray-700">
                        ESTP là những người thân thiện, hòa đồng và nhiệt tình.
                        Họ đề cao sự thẳng thắn, trung thực và những trải nghiệm
                        thực tế. Để xây dựng mối quan hệ với ESTP, điều quan
                        trọng nhất là:
                        <span className="font-medium block mt-2">
                          "Hãy cùng họ tận hưởng những khoảnh khắc thú vị trong
                          cuộc sống và luôn trung thực trong mọi tình huống"
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Giao tiếp xã hội tích cực
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Thiết kế những buổi hẹn tại nhà hàng/quán cà phê
                              họ thích
                            </li>
                            <li>
                              Chuẩn bị các chủ đề trò chuyện thực tế, gần gũi
                            </li>
                            <li>
                              Thể hiện sự hứng thú với những câu chuyện của họ
                            </li>
                            <li>
                              Tránh những chủ đề trừu tượng, triết lý sâu xa
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 2 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tạo bất ngờ thú vị
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Lên kế hoạch cho những chuyến đi khám phá mới lạ
                            </li>
                            <li>
                              Mời họ đến những địa điểm nổi tiếng họ chưa từng
                              đến
                            </li>
                            <li>Tổ chức các hoạt động thể thao, phiêu lưu</li>
                            <li>
                              Luôn mang đến những ý tưởng mới mẻ, sáng tạo
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 3 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
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
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Khen ngợi chân thành
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Dành lời khen về phong cách và khả năng của họ
                            </li>
                            <li>
                              Đánh giá cao sự nhanh nhạy trong xử lý tình huống
                            </li>
                            <li>
                              Rủ họ đi mua sắm và tham khảo ý kiến về thời trang
                            </li>
                            <li>
                              Tránh khen sáo rỗng, hãy cụ thể và chân thành
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 4 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
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
                            Thẳng thắn và không ràng buộc
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Thể hiện cảm xúc và yêu cầu một cách trực tiếp
                            </li>
                            <li>Không ép buộc họ chia sẻ khi chưa sẵn sàng</li>
                            <li>Duy trì không gian tự do trong mối quan hệ</li>
                            <li>Tránh kiểm soát hoặc đặt quá nhiều quy tắc</li>
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
                              Tổ chức các hoạt động ngoài trời, thể thao
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Thẳng thắn bày tỏ suy nghĩ và cảm xúc
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Khen ngợi khả năng và phong cách của họ
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Tôn trọng không gian tự do của họ
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
                              Bàn luận về các chủ đề triết lý, trừu tượng
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Ép buộc họ phải tuân theo nhiều quy tắc
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Che giấu cảm xúc thật hoặc nói vòng vo
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Tổ chức những hoạt động nhàm chán, lặp đi lặp lại
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Advice */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    Lời khuyên từ chuyên gia
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Xây dựng mối quan hệ với ESTP cần sự cởi mở và tôn trọng
                    tính cách tự do của họ. Một khi đã coi bạn là người thân
                    thiết, họ sẽ mang đến những trải nghiệm đầy thú vị và sự
                    trung thành tuyệt đối. Hãy trân trọng năng lượng tích cực và
                    tinh thần phiêu lưu mà họ mang đến cho cuộc sống của bạn.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="italic text-gray-700">
                      "Tình bạn với ESTP như một chuyến phiêu lưu không ngừng
                      nghỉ. Họ sẽ dẫn bạn đến những nơi thú vị, dạy bạn cách
                      sống trọn vẹn từng phút giây, và luôn là người bạn đáng
                      tin cậy trong mọi tình huống."
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
                      NGƯỜI THỰC THI (ESTP)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ESTP - Những người hành động với tư duy nhanh nhạy và khả
                    năng ứng biến xuất sắc
                  </p>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-8 rounded-lg mb-10 text-white">
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
                      "ESTP xây dựng sự nghiệp bằng hành động quyết đoán và tinh
                      thần mạo hiểm"
                    </h3>
                    <p className="text-orange-100">
                      Những người thực thi này luôn tìm kiếm công việc cho phép
                      họ được tự do hành động và giải quyết vấn đề thực tế
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
                          Giai đoạn khởi đầu: Thử thách bản thân
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Khi mới bước vào sự nghiệp, ESTP thử sức với nhiều
                          lĩnh vực khác nhau để tìm ra môi trường phù hợp. Họ
                          xuất sắc trong các vị trí đòi hỏi phản ứng nhanh và
                          làm việc dưới áp lực.
                        </p>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <p className="italic text-gray-700">
                            "ESTP cần môi trường làm việc năng động để phát
                            triển. Họ học qua trải nghiệm thực tế và thử-sai hơn
                            là lý thuyết sách vở"
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
                          Giai đoạn bứt phá: Khẳng định năng lực
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Sau khi tích lũy kinh nghiệm, ESTP chứng minh được khả
                          năng giải quyết vấn đề thực tế. Họ được đánh giá cao
                          nhờ tư duy nhanh nhạy và cách tiếp cận thẳng vào trọng
                          tâm.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                            Phản ứng nhanh
                          </span>
                          <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                            Quyết đoán
                          </span>
                          <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                            Kỹ năng đàm phán
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
                          Giai đoạn chín muồi: Dẫn dắt đội nhóm
                        </h4>
                        <p className="text-gray-700">
                          Ở đỉnh cao sự nghiệp, ESTP trở thành người dẫn dắt các
                          đội nhóm hành động. Họ tạo ra môi trường làm việc linh
                          hoạt, khuyến khích nhân viên dám nghĩ dám làm.
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Hành động quyết đoán
                          </h4>
                          <p className="text-gray-700">
                            Khả năng đưa ra quyết định nhanh chóng và dám chịu
                            trách nhiệm
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
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Kỹ năng đàm phán
                          </h4>
                          <p className="text-gray-700">
                            Khả năng thuyết phục và đạt được thỏa thuận có lợi
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Giao tiếp xuất sắc
                          </h4>
                          <p className="text-gray-700">
                            Khả năng kết nối và xây dựng mạng lưới quan hệ rộng
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
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Giải quyết khủng hoảng
                          </h4>
                          <p className="text-gray-700">
                            Bình tĩnh và hiệu quả trong các tình huống khẩn cấp
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-orange-700">
                          Kinh doanh & Đàm phán
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Nhân
                          viên kinh doanh
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Chuyên
                          viên đàm phán
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Nhà
                          đầu tư
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Doanh
                          nhân
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-orange-700">
                          An ninh & Cứu hộ
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Cảnh
                          sát
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Lính
                          cứu hỏa
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Nhân
                          viên cứu hộ
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Quân
                          nhân
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-orange-700">
                          Thể thao & Giải trí
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Vận
                          động viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Huấn
                          luyện viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> MC/Dẫn
                          chương trình
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Diễn
                          viên
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
                    ESTP nên tránh những môi trường công việc:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Có cấu trúc cứng nhắc và quy trình phức tạp</li>
                    <li>Đòi hỏi làm việc độc lập với ít tương tác xã hội</li>
                    <li>Yêu cầu nghiên cứu lý thuyết dài hạn</li>
                    <li>Thiếu thử thách và cơ hội hành động</li>
                  </ul>
                </div>

                {/* Career Development */}
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-700 mb-4">
                    Lộ trình phát triển
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-orange-500 font-bold">
                        1.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn khám phá (0-5 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Thử nghiệm nhiều lĩnh vực thực tế, xây dựng mạng lưới
                          quan hệ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-orange-500 font-bold">
                        2.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn chuyên môn hóa (5-10 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Phát triển kỹ năng chuyên sâu và xây dựng thương hiệu
                          cá nhân
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-orange-500 font-bold">
                        3.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn lãnh đạo (10+ năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Dẫn dắt đội nhóm hành động và truyền cảm hứng cho thế
                          hệ sau
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
                <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-2 border-blue-100 pb-4">
                  THÓI QUEN NƠI CÔNG SỞ CỦA ESTP
                </h2>

                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    ESTP tỏa sáng trong môi trường làm việc năng động, nơi họ có
                    thể ứng dụng khả năng giải quyết vấn đề nhanh nhạy và tận
                    hưởng sự đa dạng của các thử thách. Với tinh thần thực tế và
                    phong cách giao tiếp thẳng thắn, họ xuất sắc trong các vai
                    trò đòi hỏi hành động nhanh, tư duy linh hoạt và khả năng
                    thích ứng cao.
                  </p>
                </div>

                {/* As Employees Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-600">
                      ESTP khi là nhân viên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điểm mạnh nổi bật
                      </h4>
                      <p className="text-gray-700">
                        Giải quyết vấn đề nhanh chóng và hiệu quả. Làm việc tốt
                        dưới áp lực. Khả năng thích ứng cao với thay đổi. Tư duy
                        thực tế và hướng đến kết quả. Mang lại năng lượng tích
                        cực cho nhóm.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thách thức
                      </h4>
                      <p className="text-gray-700">
                        Khó chịu với các quy trình cứng nhắc. Thiếu kiên nhẫn
                        với công việc hành chính. Có thể bỏ qua chi tiết quan
                        trọng vì quá tập trung vào kết quả. Thích rủi ro đôi khi
                        dẫn đến sai lầm không đáng có.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "ESTP là nhân viên năng động nhưng cần không gian tự do.
                      Họ làm việc tốt nhất khi được trao quyền và tin tưởng để
                      giải quyết vấn đề theo cách của mình."
                    </p>
                  </div>
                </div>

                {/* As Colleagues Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-600">
                      ESTP khi là đồng nghiệp
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Giá trị mang lại
                      </h4>
                      <p className="text-gray-700">
                        Luôn mang lại năng lượng tích cực cho nhóm. Giỏi xử lý
                        khủng hoảng. Có góc nhìn thực tế và hướng giải pháp.
                        Giao tiếp thẳng thắn, rõ ràng. Dễ dàng kết nối với mọi
                        người.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điều cần lưu ý
                      </h4>
                      <p className="text-gray-700">
                        Có thể thiếu kiên nhẫn với đồng nghiệp chậm chạp. Đôi
                        khi quá thẳng thắn gây mất lòng. Không thích những cuộc
                        họp dài dòng. Cần được công nhận đóng góp cụ thể.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1 mr-3 text-blue-500 text-xl">
                      ⚡
                    </div>
                    <div>
                      <p className="text-gray-700">
                        "Đồng nghiệp ESTP giống như 'người giải cứu' của nhóm -
                        luôn sẵn sàng hành động và mang lại giải pháp nhanh
                        chóng cho mọi vấn đề phát sinh."
                      </p>
                    </div>
                  </div>
                </div>

                {/* As Managers Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-600">
                      ESTP khi làm quản lý
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách lãnh đạo
                      </h4>
                      <p className="text-gray-700">
                        Quản lý bằng kết quả cụ thể. Khuyến khích nhân viên dám
                        nghĩ dám làm. Tạo môi trường làm việc năng động, không
                        gò bó. Ra quyết định nhanh chóng. Ưu tiên hiệu quả hơn
                        quy trình.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Ưu tiên
                      </h4>
                      <p className="text-gray-700">
                        Đánh giá cao sự trung thực và thẳng thắn. Chú trọng hiệu
                        suất công việc. Khuyến khích nhân viên chủ động và sáng
                        tạo. Đặt mục tiêu ngắn hạn, khả thi.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 text-blue-500">💡</div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Lời khuyên cho lãnh đạo ESTP: Đừng quên lắng nghe ý
                          kiến nhân viên trước khi hành động. Sự cân bằng giữa
                          tốc độ và chất lượng sẽ giúp đội nhóm phát triển bền
                          vững hơn.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Path Section */}
                <div className="mt-10 bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-3">
                    Con đường sự nghiệp lý tưởng
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Kinh doanh & Khởi nghiệp
                      </h4>
                      <p className="text-sm">
                        Doanh nhân, Nhà đầu tư, Tư vấn kinh doanh, Bán hàng,
                        Marketing
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Hành động & Thể thao
                      </h4>
                      <p className="text-sm">
                        Vận động viên, Huấn luyện viên, Quản lý sự kiện, Nhân
                        viên cứu hộ
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Kỹ thuật & Công nghệ
                      </h4>
                      <p className="text-sm">
                        Kỹ sư, Kỹ thuật viên, Quản lý dự án, Nhà phát triển phần
                        mềm
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-blue-100 text-sm">
                    <p>
                      ESTP phát triển mạnh trong môi trường năng động, có tính
                      cạnh tranh và cho phép họ được tự do hành động, nơi họ có
                      thể thấy kết quả công việc một cách rõ ràng và nhanh
                      chóng.
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
                      NGƯỜI THỰC THI (ESTP)
                    </span>{" "}
                    VỚI
                    <span className="text-blue-600">
                      {" "}
                      NGƯỜI NHÌN XA (ENTP)
                    </span>{" "}
                    VÀ
                    <span className="text-amber-600"> NHÀ KỸ THUẬT (ISTP)</span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Phân tích sâu về 3 nhóm tính cách thuộc nhóm "Thực thi - Lý
                    trí" - những người sống bằng logic và hành động
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
                    Điểm chung cốt lõi của bộ ba Thực thi - Lý trí (TP)
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          T
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Tư duy lý trí
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Cả ba đều đưa ra quyết định dựa trên logic và phân tích
                        khách quan thay vì cảm xúc
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          P
                        </div>
                        <h4 className="font-bold text-gray-800">Linh hoạt</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Thích ứng nhanh với thay đổi, không thích bị ràng buộc
                        bởi kế hoạch cứng nhắc
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 text-orange-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          ⚡
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Tư duy nhanh nhạy
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Có khả năng phân tích và phản ứng nhanh trong các tình
                        huống
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pair Comparisons */}
                <div className="space-y-10">
                  {/* ESTP vs ENTP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-orange-500 to-blue-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-orange-600">ESTP</span> vs{" "}
                        <span className="text-blue-600">ENTP</span>:
                        <span className="text-sm font-normal ml-2">
                          Người thực thi vs Người nhìn xa
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
                          <li>Đều là người hướng ngoại và năng động</li>
                          <li>Có tư duy phản biện và logic mạnh mẽ</li>
                          <li>Thích thử thách và phiêu lưu</li>
                          <li>Đề cao sự tự do cá nhân</li>
                          <li>Giỏi giao tiếp và thuyết phục</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-blue-500 mr-2"
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
                              Cách tiếp nhận thông tin
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESTP (S) tập trung vào thực tế cụ thể, ENTP (N)
                              thiên về các khả năng và ý tưởng trừu tượng
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách làm việc
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESTP thích hành động ngay lập tức, ENTP thích thảo
                              luận và phát triển ý tưởng
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Sở thích nghề nghiệp
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESTP thiên về thể thao và kinh doanh, ENTP thiên
                              về chiến lược và đổi mới
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ESTP như một vận động viên hành động trên sân cỏ, ENTP
                        như một nhà chiến lược phát triển ý tưởng. Cả hai đều
                        giỏi trong lĩnh vực của mình nhưng với cách tiếp cận
                        khác biệt."
                      </p>
                    </div>
                  </div>

                  {/* ESTP vs ISTP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-orange-600">ESTP</span> vs{" "}
                        <span className="text-amber-600">ISTP</span>:
                        <span className="text-sm font-normal ml-2">
                          Người thực thi năng động vs Nhà kỹ thuật trầm lắng
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
                          <li>Đều có tư duy logic và thực tế</li>
                          <li>Giỏi xử lý các tình huống khẩn cấp</li>
                          <li>Thích làm việc độc lập</li>
                          <li>Đề cao sự tự do cá nhân</li>
                          <li>Học hỏi tốt nhất qua thực hành</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-amber-500 mr-2"
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
                              ESTP (E) được tiếp năng lượng từ giao tiếp xã hội,
                              ISTP (I) cần thời gian một mình
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách giao tiếp
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESTP hoạt ngôn và thích làm trung tâm, ISTP trầm
                              lắng và kín đáo
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Sở thích nghề nghiệp
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESTP thiên về kinh doanh và thể thao, ISTP thiên
                              về kỹ thuật và cơ khí
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ESTP như một doanh nhân năng động trong các bữa tiệc
                        networking, ISTP như một kỹ sư tập trung trong xưởng
                        máy. Cả hai đều giỏi giải quyết vấn đề nhưng với phong
                        cách khác nhau."
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
                            ESTP
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ENTP
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ISTP
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
                            Cảm nhận ngoại hướng (Se) + Tư duy nội tâm (Ti)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Trực giác ngoại hướng (Ne) + Tư duy nội tâm (Ti)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tư duy nội tâm (Ti) + Cảm nhận ngoại hướng (Se)
                          </td>
                        </tr>
                        {/* Row 2 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Phong cách làm việc
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Hành động nhanh, thích rủi ro, giỏi đàm phán
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Sáng tạo ý tưởng, thích tranh luận, đổi mới
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-amber-50">
                            Tập trung cao độ, giải quyết vấn đề kỹ thuật
                          </td>
                        </tr>
                        {/* Row 3 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Trong quan hệ
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Hòa đồng, hài hước, thích làm trung tâm
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Thích tranh luận, kích thích tư duy
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Kín đáo, độc lập, ít bày tỏ cảm xúc
                          </td>
                        </tr>
                        {/* Row 4 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Ưu thế nghề nghiệp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Kinh doanh, thể thao, cứu hộ
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Chiến lược, khởi nghiệp, tư vấn
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-amber-50">
                            Kỹ thuật, cơ khí, lập trình
                          </td>
                        </tr>
                        {/* Row 5 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Điểm mạnh
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Nhanh nhạy, dám nghĩ dám làm
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Sáng tạo, tư duy đột phá
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Bình tĩnh, khéo léo, kỹ thuật tốt
                          </td>
                        </tr>
                        {/* Row 6 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Điểm yếu
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Thiếu kiên nhẫn, dễ mạo hiểm
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Hay tranh cãi, khó hoàn thành
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-amber-50">
                            Khó bày tỏ cảm xúc, dễ chán nản
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
                    {/* ESTP Column */}
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-orange-700">ESTP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Doanh
                          nhân
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Nhân
                          viên kinh doanh
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Vận
                          động viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Cảnh
                          sát
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> MC/Dẫn
                          chương trình
                        </li>
                      </ul>
                    </div>

                    {/* ENTP Column */}
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
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-blue-700">ENTP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Nhà
                          chiến lược
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Luật sư
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Nhà sáng
                          tạo nội dung
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Nhà phát
                          minh
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Chuyên
                          viên marketing
                        </li>
                      </ul>
                    </div>

                    {/* ISTP Column */}
                    <div className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-amber-700">ISTP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Kỹ sư
                          cơ khí
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Lập
                          trình viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Thợ sửa
                          chữa
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Phi
                          công
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span> Kỹ
                          thuật viên IT
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
                    ESTP, ENTP và ISTP đều là những nhóm tính cách lý trí và
                    linh hoạt, nhưng mỗi nhóm có thế mạnh riêng:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                    <li>
                      <span className="font-medium">ESTP</span> - Người thực thi
                      nhanh nhạy với khả năng hành động tức thì
                    </li>
                    <li>
                      <span className="font-medium">ENTP</span> - Nhà chiến lược
                      sáng tạo với tầm nhìn đổi mới
                    </li>
                    <li>
                      <span className="font-medium">ISTP</span> - Nhà kỹ thuật
                      tài ba với khả năng giải quyết vấn đề
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Sự khác biệt chính nằm ở cách họ tiếp cận thế giới: ESTP với
                    hành động thực tế, ENTP với ý tưởng đổi mới, ISTP với giải
                    pháp kỹ thuật. Hiểu rõ những khác biệt này giúp mỗi nhóm
                    phát huy tối đa tiềm năng của mình.
                  </p>
                </div>
              </div>
            )}
            {activeSection === "advice" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-blue-600 mb-8 border-b-2 border-blue-100 pb-4">
                  LỜI KHUYÊN PHÁT TRIỂN DÀNH CHO NGƯỜI THỰC THI (ESTP)
                </h2>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 rounded-lg mb-10 text-white">
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
                      Hành trình phát triển cho người hành động
                    </h3>
                    <p className="text-blue-200">
                      Là những người năng động và thực tế, ESTP cần học cách cân
                      bằng giữa hành động và suy nghĩ, giữa sự độc lập và kết
                      nối để phát huy tối đa tiềm năng của mình.
                    </p>
                  </div>
                </div>

                {/* Core Advice Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {/* Develop Strengths */}
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Phát huy điểm mạnh
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tận dụng tối đa khả năng hành động và giải quyết vấn đề
                      của bạn:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Ứng dụng tư duy nhanh nhạy vào các tình huống thực tế
                      </li>
                      <li>Phát huy khả năng thích ứng với thay đổi</li>
                      <li>Tận dụng sự can đảm để khám phá cơ hội mới</li>
                    </ul>
                  </div>

                  {/* Improve Weaknesses */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
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
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Cải thiện điểm yếu
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Những điều ESTP cần lưu ý để phát triển:
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="italic text-gray-700">
                        "Hành động là sức mạnh, nhưng suy nghĩ chiến lược là
                        chìa khóa thành công lâu dài"
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Học cách lắng nghe trước khi hành động</li>
                      <li>Phát triển kỹ năng lập kế hoạch dài hạn</li>
                      <li>Chú ý đến cảm xúc của người khác</li>
                    </ul>
                  </div>
                </div>

                {/* Emotional & Social Skills Section */}
                <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                        <svg
                          className="w-10 h-10 text-blue-600"
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
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                        Phát triển kỹ năng xã hội & cảm xúc
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <h4 className="font-semibold text-blue-700 mb-2">
                            Thể hiện cảm xúc
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Chia sẻ suy nghĩ và quan điểm cá nhân</li>
                            <li>Bày tỏ cảm xúc với người đáng tin cậy</li>
                            <li>Đừng ngại thể hiện sự đánh giá cao</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <h4 className="font-semibold text-blue-700 mb-2">
                            Hiểu người khác
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Nhận ra sự khác biệt ở mỗi người</li>
                            <li>Học cách lắng nghe trước khi phản ứng</li>
                            <li>Tôn trọng quan điểm đa dạng</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Self-Care Section */}
                <div className="mb-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 bg-blue-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm">
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
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-blue-700">
                          Phát triển bản thân
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        ESTP cần chú ý phát triển toàn diện:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Vượt khỏi vùng an toàn
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Thử thách bản thân với ý tưởng mới</li>
                            <li>Đón nhận những trải nghiệm không quen thuộc</li>
                            <li>Học cách chấp nhận thất bại như cơ hội</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Cân bằng cuộc sống
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Dành thời gian suy ngẫm và tự đánh giá</li>
                            <li>Tìm kiếm hoạt động giúp thư giãn</li>
                            <li>Học cách kiên nhẫn hơn</li>
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
                                Chia sẻ quan điểm
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi tuần chia sẻ một suy nghĩ/ý tưởng với người
                                khác
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              2
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Lắng nghe tích cực
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Dành 5 phút mỗi ngày lắng nghe mà không ngắt lời
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              3
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Suy ngẫm cuối ngày
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Viết ra 3 điều bạn học được mỗi ngày
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Encouragement */}
                <div className="bg-gradient-to-r from-blue-800 to-indigo-700 p-8 rounded-lg text-white">
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
                      Sức mạnh của Người thực thi
                    </h3>
                    <p className="mb-4 text-blue-100">
                      Bạn được ban tặng khả năng hành động nhanh nhạy, tư duy
                      thực tế và tinh thần dám nghĩ dám làm. Khi học cách kết
                      hợp những điểm mạnh này với sự tự nhận thức và đồng cảm,
                      bạn sẽ trở thành phiên bản tốt nhất của chính mình.
                    </p>
                    <div className="bg-indigo-800 bg-opacity-30 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Thế giới cần những người hành động như bạn - những
                        người dám thử thách hiện trạng, dẫn đầu trong khủng
                        hoảng và biến ý tưởng thành hiện thực. Hãy nhớ rằng sự
                        vĩ đại thực sự đến từ việc cân bằng giữa hành động và
                        suy nghĩ, giữa độc lập và kết nối."
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
export default ESTPPage;
