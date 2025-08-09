import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import handleCopyLink from "../helpers/HandleCopyLink";

const ESFPPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Tổng quan" },
    { id: "strengths-weaknesses", title: "Điểm mạnh và điểm yếu" },
    { id: "relationship", title: "Mối quan hệ" },
    { id: "how-to-be-close", title: "Làm sao để thân thiết với ESFP" },
    { id: "career-path", title: "Con đường sự nghiệp" },
    { id: "workplace-habits", title: "Thói quen nơi công sở" },
    { id: "compare", title: "So sánh ESFP, ISFP và ESTP" },
    { id: "advice", title: "Lời khuyên dành cho ESFP" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="ESFP-page bg-gradient-to-b from-blue-50 to-purple-50">
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
                ESFP - Người trình diễn
              </h1>
            </div>
            <div className="relative w-full">
              <img
                src="/mbti_icons/esfp1.webp"
                alt="ESFP - Người trình diễn"
                className="pointer w-full h-120 object-cover rounded-lg shadow "
              />
            </div>

            {/* Description */}
            <div className="text-lg text-gray-700 max-w-4xl text-center">
              Đối với các ESFP, cuộc sống là sàn catwalk và họ chính là tâm điểm
              chú ý của mọi cuộc vui. Tuy ham vui là vậy nhưng bản chất của các
              ESFP vẫn là những người có trái tim ấm áp, biết quan tâm và giúp
              đỡ người khác. Họ biết lắng nghe và đồng cảm với vấn đề của những
              người xung quanh.{" "}
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
                  <h2 className="text-3xl font-bold text-purple-600 mb-4">
                    TỔNG QUAN TÍNH CÁCH ESFP
                  </h2>
                  <div className="w-20 h-1 bg-pink-400 mx-auto"></div>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    ESFP (Người trình diễn) là nhóm tính cách tích cực và lạc
                    quan nhất, chiếm khoảng 7.5% dân số. Họ là linh hồn của mọi
                    bữa tiệc, luôn tràn đầy năng lượng và muốn trở thành tâm
                    điểm của sự chú ý. Với trái tim ấm áp và tinh thần đồng cảm,
                    ESFP mang đến niềm vui và sự gắn kết cho mọi người xung
                    quanh.
                  </p>
                </div>

                {/* MBTI Breakdown */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-purple-600 mb-6 text-center">
                    Ý NGHĨA 4 CHỮ CÁI ESFP
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "● E - Hướng ngoại (Extraverted)",
                        color: "bg-purple-100",
                        textColor: "text-purple-800",
                        content:
                          "ESFP lấy năng lượng từ tương tác xã hội. Họ yêu thích ở trung tâm của sự chú ý và luôn là người khơi mào cho các hoạt động vui vẻ.",
                      },
                      {
                        title: "● S - Giác quan (Sensing)",
                        color: "bg-pink-100",
                        textColor: "text-pink-800",
                        content:
                          "ESFP tập trung vào thực tế cụ thể, những gì họ có thể cảm nhận bằng giác quan. Họ sống trọn vẹn trong hiện tại và đánh giá cao vẻ đẹp vật chất.",
                      },
                      {
                        title: "● F - Cảm xúc (Feeling)",
                        color: "bg-fuchsia-100",
                        textColor: "text-fuchsia-800",
                        content:
                          "ESFP đưa ra quyết định dựa trên cảm xúc và giá trị cá nhân. Họ có khả năng đồng cảm tuyệt vời và luôn quan tâm đến cảm xúc người khác.",
                      },
                      {
                        title: "● P - Linh hoạt (Perceiving)",
                        color: "bg-rose-100",
                        textColor: "text-rose-800",
                        content:
                          "ESFP yêu thích sự tự do và ngẫu hứng. Họ thích ứng nhanh với thay đổi và luôn mở cửa cho những trải nghiệm mới.",
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
                      title: "Tâm điểm của sự chú ý",
                      icon: "🌟",
                      content:
                        "ESFP luôn là người khơi mào cho các hoạt động vui vẻ. Trong bữa tiệc, họ biết cách khuấy động không khí và thường là người ở lại cuối cùng.",
                    },
                    {
                      title: "Trái tim đồng cảm",
                      icon: "💖",
                      content:
                        "ESFP có khả năng đọc cảm xúc tinh tế qua nét mặt và cử chỉ. Họ luôn sẵn sàng dang rộng vòng tay an ủi và đưa ra giải pháp thực tế cho người gặp khó khăn.",
                    },
                    {
                      title: "Tinh thần lạc quan",
                      icon: "😊",
                      content:
                        "ESFP mang năng lượng tích cực đến mọi nơi họ đến. Họ có khả năng nhìn thấy mặt tươi sáng trong mọi tình huống và truyền cảm hứng cho người khác.",
                    },
                    {
                      title: "Giỏi thực hành",
                      icon: "✋",
                      content:
                        "ESFP học tập tốt nhất qua trải nghiệm thực tế. Họ thường né tránh các lý thuyết trừu tượng và thể hiện xuất sắc trong các môn học thực hành.",
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-300"
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
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                      ĐIỂM MẠNH NỔI BẬT
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        <span>Giao tiếp xuất sắc và hài hước</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        <span>Khả năng đồng cảm và thấu hiểu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        <span>Tinh thần lạc quan, tích cực</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        <span>Kỹ năng ứng biến linh hoạt</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        <span>Khiếu thẩm mỹ và nghệ thuật</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-pink-700 mb-4">
                      ĐIỂM YẾU CẦN LƯU Ý
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✗</span>
                        <span>Khó tập trung vào lý thuyết trừu tượng</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✗</span>
                        <span>Dễ chán nản với công việc lặp lại</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✗</span>
                        <span>Đôi khi quá quan tâm đến hình ảnh bản thân</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✗</span>
                        <span>Khó tuân thủ kế hoạch dài hạn</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✗</span>
                        <span>Dễ bị ảnh hưởng bởi ý kiến người khác</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Career & Relationships */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                      ESFP TRONG CÔNG VIỆC
                    </h3>
                    <p className="text-gray-700 mb-4">
                      ESFP tỏa sáng trong môi trường năng động, nơi họ có thể
                      tận dụng kỹ năng giao tiếp và khiếu nghệ thuật:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Cơ hội tương tác với nhiều người</li>
                      <li>Môi trường sáng tạo, không gò bó</li>
                      <li>Công việc đa dạng, không lặp lại</li>
                      <li>Được thể hiện cá tính và năng khiếu</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Nghề nghiệp phù hợp: Nghệ sĩ biểu diễn, tổ chức sự kiện,
                      thiết kế thời trang, giáo viên mầm non, nhân viên quan hệ
                      công chúng, chuyên gia chăm sóc khách hàng.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-pink-700 mb-4">
                      ESFP TRONG QUAN HỆ
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Trong các mối quan hệ, ESFP là những người bạn nhiệt tình
                      và tràn đầy yêu thương:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Luôn mang lại niềm vui và năng lượng tích cực</li>
                      <li>Quan tâm chu đáo đến bạn bè và người thân</li>
                      <li>Thích tổ chức các hoạt động vui chơi cùng nhau</li>
                      <li>Đôi khi quá nhạy cảm với chỉ trích</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      ESFP cần học cách cân bằng giữa nhu cầu được chú ý và lắng
                      nghe người khác để xây dựng mối quan hệ sâu sắc hơn.
                    </p>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold text-center text-purple-700 mb-6">
                    ESFP NỔI TIẾNG
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Justin Bieber",
                        role: "Ca sĩ",
                        image:
                          "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785e4fda8565a3853aab00c7ac4edf2b321097fc6b246b793b749b23e607c5f62094f9efb0c8972265f49d8f86164867992/Justin_Bieber.jpg",
                      },
                      {
                        name: "Bruno Mars",
                        role: "Ca sĩ, nhạc sĩ",
                        image:
                          "https://vanhoaduongpho.com/storage/news/nhin-lai-su-nghiep-su-thinh-vuong-va-loi-song-cua-bieu-tuong-nhac-pop-bruno-mars_2646.jpg",
                      },
                      {
                        name: "Jamie Oliver",
                        role: "Đầu bếp, người dẫn chương trình",
                        image:
                          "https://chefjob.vn/wp-content/uploads/2020/07/dau-be-jamie-oliver-lon-len-trong-cai-noi-am-thuc-cua-nhan-loai.jpg",
                      },
                      {
                        name: "Will Smith",
                        role: "Diễn viên, rapper",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg",
                      },
                      {
                        name: "Zendaya",
                        role: "Diễn viên, ca sĩ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zendaya_-_2019_by_Glenn_Francis.jpg/1200px-Zendaya_-_2019_by_Glenn_Francis.jpg",
                      },
                      {
                        name: "Adele",
                        role: "Ca sĩ, nhạc sĩ",
                        image:
                          "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c8078575170c1e131f7837f93e8d8d2669f50524ae439cc1e9432daeb417246445ea9b/Adele.jpg",
                      },
                      {
                        name: "Jennifer Lopez",
                        role: "Ca sĩ, diễn viên, vũ công",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Jennifer_Lopez_at_the_2025_Sundance_Film_Festival_%28cropped_3%29.jpg/1200px-Jennifer_Lopez_at_the_2025_Sundance_Film_Festival_%28cropped_3%29.jpg",
                      },
                      {
                        name: "Katy Perry",
                        role: "Ca sĩ, nhạc sĩ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Katy_Perry_UNICEF_2012.jpg/250px-Katy_Perry_UNICEF_2012.jpg",
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
                <div className="bg-purple-100 p-6 rounded-lg mt-8 text-center">
                  <p className="text-purple-800 italic font-medium">
                    "ESFP là những tia nắng ấm áp chiếu rọi vào cuộc đời người
                    khác, mang đến niềm vui và sự gắn kết bằng trái tim đồng cảm
                    và tinh thần lạc quan không gì dập tắt. Họ nhắc nhở chúng ta
                    rằng cuộc sống là một vũ hội muôn màu cần được tận hưởng
                    trọn vẹn. Dù đôi khi bồng bột, ESFP luôn biết cách làm thế
                    giới này trở nên tươi đẹp hơn bằng chính con người chân thật
                    của mình."
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
                      NHÓM TÍNH CÁCH ESFP (NGƯỜI TRÌNH DIỄN)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ESFP - Nhóm tính cách "Người trình diễn" với năng lượng tích
                    cực, tinh thần nhiệt huyết và khả năng kết nối mạnh mẽ
                  </p>
                </div>

                {/* Strengths Section */}
                <div>
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      ĐIỂM MẠNH ĐẶC TRƯNG
                    </h3>
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Strength 1 */}
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Ham học hỏi
                          </h4>
                          <p className="text-gray-700">
                            Các ESFP luôn tràn đầy năng lượng và nhiệt huyết, họ
                            không ngừng tìm tòi, khám phá và thử sức với những
                            điều mới lạ trong cuộc sống.
                          </p>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-purple-700 italic">
                          "ESFP mang đến nguồn năng lượng tích cực và tinh thần
                          học hỏi không ngừng cho mọi người xung quanh"
                        </p>
                      </div>
                    </div>

                    {/* Strength 2 */}
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
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thực tiễn
                          </h4>
                          <p className="text-gray-700">
                            ESFP yêu thích áp dụng kiến thức vào thực tế. Họ tập
                            trung vào những giải pháp hiệu quả có thể triển khai
                            ngay thay vì những lý thuyết suông.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          Ứng dụng
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          Hiệu quả
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          Thực hành
                        </span>
                      </div>
                    </div>

                    {/* Strength 3 */}
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Độc đáo
                          </h4>
                          <p className="text-gray-700">
                            ESFP có khả năng tìm ra những ý tưởng và giải pháp
                            sáng tạo, độc đáo mà chưa ai nghĩ tới nhờ sự kết hợp
                            giữa tính táo bạo và thực tiễn.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-purple-500 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>Khả năng sáng tạo</span>
                          <span>80% ESFP có ý tưởng độc đáo</span>
                        </div>
                      </div>
                    </div>

                    {/* Strength 4 */}
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
                            Quảng giao
                          </h4>
                          <p className="text-gray-700">
                            ESFP là những người hòa đồng, dễ kết nối và mở rộng
                            mối quan hệ. Họ luôn sẵn lòng tương tác và tạo năng
                            lượng tích cực cho mọi người.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Biểu hiện:</span>
                          Hòa đồng, dễ kết nối, tạo năng lượng tích cực
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weaknesses Section */}
                <div className="mt-12">
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
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      ĐIỂM YẾU CẦN LƯU Ý
                    </h3>
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 ml-4"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Weakness 1 */}
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu nhạy bén cảm xúc
                          </h4>
                          <p className="text-gray-700">
                            ESFP thường đề cao lý trí hơn cảm xúc. Họ có thể gặp
                            khó khăn khi phải đưa ra quyết định dựa trên cảm xúc
                            hoặc thấu hiểu cảm xúc của người khác.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Gợi ý:</span>
                          Rèn luyện trí thông minh cảm xúc (EQ) để cân bằng giữa
                          lý trí và tình cảm
                        </div>
                      </div>
                    </div>

                    {/* Weakness 2 */}
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu kiên nhẫn
                          </h4>
                          <p className="text-gray-700">
                            ESFP thường làm việc theo tốc độ của riêng mình và
                            khó chịu khi phải chờ đợi. Sự thiếu kiên nhẫn có thể
                            dẫn đến những quyết định vội vàng.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-pink-50 p-3 rounded-lg">
                        <p className="text-sm text-pink-700 italic">
                          "ESFP cần học cách kiềm chế sự nóng vội và dành thời
                          gian cân nhắc kỹ lưỡng trước khi hành động"
                        </p>
                      </div>
                    </div>

                    {/* Weakness 3 */}
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
                              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tầm nhìn hẹp
                          </h4>
                          <p className="text-gray-700">
                            ESFP có thể quá tập trung vào hiện tại mà bỏ qua bức
                            tranh tổng thể. Họ giải quyết tốt từng phần nhưng có
                            thể thất bại khi các phần không ăn khớp với mục tiêu
                            chung.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Cải thiện:</span>
                          Rèn luyện tư duy chiến lược, xem xét mục tiêu dài hạn
                          trước khi hành động
                        </div>
                      </div>
                    </div>

                    {/* Weakness 4 */}
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Không thích bị bó buộc
                          </h4>
                          <p className="text-gray-700">
                            ESFP không thích sự gò bó hay công việc lặp đi lặp
                            lại. Họ thích tự do và sự đa dạng, điều này có thể
                            khiến họ khó thích nghi với môi trường có kỷ luật
                            nghiêm ngặt.
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
                <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl text-white">
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
                      CÂN BẰNG CUỘC SỐNG ESFP
                    </h3>
                    <p className="mb-4 text-purple-100">
                      Sức mạnh thực sự của ESFP nằm ở khả năng kết hợp năng
                      lượng tích cực với tư duy thực tiễn. Khi học được cách cân
                      bằng giữa hành động nhanh và suy nghĩ chiến lược, giữa sự
                      thẳng thắn và sự đồng cảm, họ có thể trở thành những người
                      truyền cảm hứng xuất sắc.
                    </p>
                    <div className="bg-opacity-20 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Một ESFP trưởng thành hiểu rằng đôi khi cần chậm lại để
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
                  <h2 className="text-3xl font-bold text-purple-600 mb-3">
                    MỐI QUAN HỆ CỦA ESFP
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
                  <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    ESFP là những người bạn vui vẻ và người yêu đầy nhiệt huyết.
                    Với tính cách hòa đồng và trái tim ấm áp, họ mang đến niềm
                    vui và sự gắn kết trong mọi mối quan hệ. ESFP yêu cuộc sống
                    tự do nhưng cũng rất tận tâm với những người họ quý mến.
                  </p>
                </div>

                {/* General Relationship Traits */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
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
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Luôn tràn đầy năng lượng và nhiệt tình</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Giao tiếp cởi mở, chân thành</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>
                          Yêu thích các hoạt động vui chơi và sáng tạo
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Cần không gian tự do nhưng rất trung thành</span>
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
                        { type: "ISFJ", desc: "Chu đáo, ân cần" },
                        { type: "ISTJ", desc: "Ổn định, đáng tin" },
                        { type: "ENFJ", desc: "Nhiệt tình, gắn kết" },
                        { type: "ENTP", desc: "Cùng đam mê khám phá" },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-bold text-purple-600">
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
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl mb-12">
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
                        ESFP TRONG TÌNH YÊU
                      </h3>
                      <p className="text-gray-700 mb-4">
                        ESFP yêu cuồng nhiệt và sống trọn vẹn từng khoảnh khắc.
                        Họ không thích những kế hoạch dài hạn cứng nhắc mà tập
                        trung tận hưởng hiện tại. ESFP mang đến những bất ngờ
                        thú vị và năng lượng tích cực trong tình yêu.
                      </p>
                      <div className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-purple-400 mb-4">
                        <p className="italic text-gray-700">
                          "Chuyện tình của những Người trình diễn không bao giờ
                          nhàm chán. Với tính cách vui vẻ, năng động, ESFP luôn
                          biết cách hâm nóng tình cảm bằng những ý tưởng sáng
                          tạo."
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
                          "ESFP thể hiện tình yêu qua những cử chỉ ân cần và quà tặng ý nghĩa. Họ thích những khoảnh khắc lãng mạn tự nhiên hơn là những kịch bản có sẵn.",
                      },
                      {
                        title: "Thách thức",
                        icon: "⚠️",
                        content:
                          "ESFP dễ chán nản khi mối quan hệ trở nên đơn điệu. Họ cũng khó cam kết dài hạn và đôi khi thiếu tinh tế trong việc thấu hiểu nhu cầu tình cảm sâu sắc của đối phương.",
                      },
                      {
                        title: "Lời khuyên",
                        icon: "💡",
                        content:
                          "ESFP cần học cách lắng nghe và chia sẻ cảm xúc sâu hơn. Đối tác nên tạo không gian tự do cho ESFP và cùng họ khám phá những trải nghiệm mới mẻ.",
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
                  <h3 className="text-2xl font-bold text-pink-700 mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 mr-3 text-pink-500"
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
                    ESFP TRONG TÌNH BẠN
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-start mb-6">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Bạn bè đa dạng
                          </h4>
                          <p className="text-gray-700">
                            ESFP kết bạn dễ dàng nhờ sự thân thiện và cởi mở. Họ
                            là linh hồn của các bữa tiệc, luôn biết cách làm
                            không khí trở nên sôi động. Vòng bạn bè của ESFP rất
                            rộng nhưng cũng rất chất lượng.
                          </p>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-400 mb-6">
                        <p className="italic text-gray-700">
                          "ESFP là người bạn luôn biết cách làm mọi người cười.
                          Với khiếu hài hước tự nhiên và trái tim ấm áp, họ
                          khiến bạn bè cảm thấy được trân trọng và yêu thương."
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
                            ESFP đôi khi quá thẳng thắn, dễ vô tình làm tổn
                            thương bạn bè. Họ cũng không kiên nhẫn với những
                            cuộc trò chuyện triết lý sâu xa hay những người bạn
                            quá nhạy cảm, dễ tổn thương.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-fuchsia-100 p-2 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-fuchsia-600"
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
                            Khi đã coi ai là bạn thân, ESFP rất trung thành và
                            sẵn sàng giúp đỡ khi cần. Họ là người bạn đáng tin
                            cậy, luôn biết cách động viên và mang lại năng lượng
                            tích cực cho bạn bè.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parenting Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl">
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    ESFP KHI LÀM CHA MẸ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Phong cách nuôi dạy",
                          content:
                            "ESFP là những phụ huynh vui vẻ và thoải mái. Họ khuyến khích con cái khám phá thế giới thông qua các hoạt động thực tế và trải nghiệm sáng tạo. Môi trường gia đình luôn tràn ngập tiếng cười và những ý tưởng mới mẻ.",
                        },
                        {
                          title: "Ưu điểm",
                          content:
                            "ESFP dạy con tính tự lập và sự tự tin. Họ là người đồng hành trong các hoạt động vui chơi, giúp con phát triển kỹ năng xã hội và khả năng sáng tạo. Con cái luôn cảm thấy được lắng nghe và tôn trọng.",
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
                            <span className="text-purple-500 mr-2">•</span>
                            <span>
                              Khó khăn khi đặt ra kỷ luật và nề nếp cứng nhắc
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>
                              Ít quan tâm đến việc học hành lý thuyết của con
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>
                              Đôi khi thiếu kiên nhẫn với những cảm xúc phức tạp
                              của con cái
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-purple-100 p-5 rounded-lg border-l-4 border-purple-500">
                        <p className="italic text-gray-700">
                          "Dù không phải mẫu phụ huynh nguyên tắc nhất, ESFP
                          mang đến cho con cái tuổi thơ đầy ắp tiếng cười và sự
                          tự do sáng tạo. Họ dạy con cách sống vui vẻ và không
                          ngại thể hiện bản thân."
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
                      "ESFP mang đến năng lượng tích cực và trái tim ấm áp trong
                      mọi mối quan hệ. Họ yêu tự do nhưng cũng rất trân trọng
                      những người thân yêu. Để hiểu ESFP, hãy cùng họ tận hưởng
                      những khoảnh khắc vui vẻ và chân thành của cuộc sống."
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
                    <span className="text-purple-600">
                      NGƯỜI TRÌNH DIỄN (ESFP)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    ESFP - Nhóm tính cách năng động, vui vẻ với tinh thần lạc
                    quan và khả năng kết nối tuyệt vời
                  </p>
                </div>

                {/* Core Principles */}
                <div className="bg-purple-50 p-6 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="bg-white p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-sm">
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
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-purple-800 mb-3">
                        Nguyên tắc vàng khi tiếp cận ESFP
                      </h3>
                      <p className="text-gray-700">
                        ESFP là những người vui vẻ, ấm áp và luôn muốn lan tỏa
                        niềm vui. Họ đề cao sự chân thành, sẻ chia và những trải
                        nghiệm đáng nhớ. Để xây dựng mối quan hệ với ESFP, điều
                        quan trọng nhất là:
                        <span className="font-medium block mt-2">
                          "Hãy cùng họ tận hưởng những khoảnh khắc vui vẻ và
                          luôn chân thành trong mọi tình huống"
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
                          <h4 className="font-bold text-gray-800 mb-2">
                            Bày tỏ sự chân thành
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Thường xuyên hỏi han ân cần về cuộc sống của họ
                            </li>
                            <li>Thể hiện tấm lòng ấm áp và nồng nhiệt</li>
                            <li>Chia sẻ những câu chuyện cá nhân thú vị</li>
                            <li>
                              Tránh những hành động giả tạo hoặc tính toán
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 2 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Cho họ biết họ đặc biệt
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                              Nhấn mạnh sự hiện diện của họ làm buổi gặp mặt vui
                              hơn
                            </li>
                            <li>Chuẩn bị những món ăn vặt họ yêu thích</li>
                            <li>
                              Thể hiện sự trân trọng bằng hành động cụ thể
                            </li>
                            <li>Ghi nhớ những sở thích nhỏ của họ</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 3 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Khen ngợi gu thẩm mỹ
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Đánh giá cao phong cách thời trang của họ</li>
                            <li>Khen ngợi khả năng phối màu và trang trí</li>
                            <li>Nhờ họ tư vấn về các vấn đề thẩm mỹ</li>
                            <li>Thể hiện sự ngưỡng mộ chân thành</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 4 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M9.65 4.5c.9-.9 2.15-1.4 3.5-1.4 1.35 0 2.6.5 3.5 1.4 1.9 1.9 1.9 5.1 0 7l-3.5 3.5a1 1 0 01-1.4 0l-3.5-3.5c-1.9-1.9-1.9-5.1 0-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Rủ đi những nơi náo nhiệt
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Tổ chức các buổi tiệc, lễ hội ngoài trời</li>
                            <li>Đi xem các buổi biểu diễn, đại nhạc hội</li>
                            <li>Cùng tham gia các sự kiện thể thao</li>
                            <li>Khám phá những địa điểm mới lạ, thú vị</li>
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
                              Tổ chức các hoạt động vui chơi giải trí
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Thể hiện sự chân thành và ấm áp
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Khen ngợi phong cách và gu thẩm mỹ
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Tạo không khí vui vẻ, thoải mái
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
                              Bàn luận về các chủ đề quá nghiêm túc, nặng nề
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Tỏ ra quá nghiêm túc hoặc cứng nhắc
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Giấu diếm cảm xúc thật hoặc nói dối
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Tổ chức những hoạt động nhàm chán, đơn điệu
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
                    Xây dựng mối quan hệ với ESFP cần sự cởi mở và tôn trọng
                    tính cách vui vẻ của họ. Một khi đã coi bạn là người thân
                    thiết, họ sẽ mang đến những trải nghiệm đầy niềm vui và sự
                    trung thành tuyệt đối. Hãy trân trọng năng lượng tích cực và
                    tinh thần lạc quan mà họ mang đến cho cuộc sống của bạn.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="italic text-gray-700">
                      "Tình bạn với ESFP như một bữa tiệc không ngừng nghỉ. Họ
                      sẽ dẫn bạn đến những nơi thú vị, dạy bạn cách tận hưởng
                      cuộc sống, và luôn là người bạn đáng tin cậy trong mọi
                      tình huống."
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
                    <span className="text-purple-600">
                      NGƯỜI TRÌNH DIỄN (ESFP)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ESFP - Những người sáng tạo với năng lượng tràn đầy và khả
                    năng kết nối xuất sắc
                  </p>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-8 rounded-lg mb-10 text-white">
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      "ESFP xây dựng sự nghiệp bằng sự sáng tạo và khả năng kết
                      nối con người"
                    </h3>
                    <p className="text-purple-100">
                      Những người trình diễn này luôn tìm kiếm công việc cho
                      phép họ được thể hiện bản thân và tương tác với nhiều
                      người
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
                          Giai đoạn khởi đầu: Khám phá đam mê
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Khi mới bước vào sự nghiệp, ESFP thử sức với nhiều
                          lĩnh vực sáng tạo và giao tiếp để tìm ra môi trường
                          phù hợp. Họ xuất sắc trong các vị trí đòi hỏi tương
                          tác xã hội và ứng biến linh hoạt.
                        </p>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="italic text-gray-700">
                            "ESFP cần môi trường làm việc năng động, sáng tạo để
                            phát triển. Họ học qua trải nghiệm thực tế và tương
                            tác với con người"
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
                          Giai đoạn bứt phá: Tỏa sáng tài năng
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Sau khi tích lũy kinh nghiệm, ESFP chứng minh được khả
                          năng kết nối và sáng tạo độc đáo. Họ được đánh giá cao
                          nhờ phong cách cá tính và khả năng truyền cảm hứng.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                            Giao tiếp xuất sắc
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                            Sáng tạo không ngừng
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                            Truyền cảm hứng
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
                          Giai đoạn chín muồi: Dẫn dắt bằng cảm hứng
                        </h4>
                        <p className="text-gray-700">
                          Ở đỉnh cao sự nghiệp, ESFP trở thành người truyền cảm
                          hứng cho cộng đồng. Họ tạo ra môi trường làm việc vui
                          vẻ, khuyến khích sự sáng tạo và tự do thể hiện bản
                          thân.
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Kết nối con người
                          </h4>
                          <p className="text-gray-700">
                            Khả năng giao tiếp xuất sắc và xây dựng mạng lưới
                            quan hệ rộng
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Sáng tạo độc đáo
                          </h4>
                          <p className="text-gray-700">
                            Khả năng nghĩ ra những ý tưởng mới lạ và phong cách
                            cá tính
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
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Truyền cảm hứng
                          </h4>
                          <p className="text-gray-700">
                            Khả năng tạo động lực và lan tỏa năng lượng tích cực
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
                            Ứng biến linh hoạt
                          </h4>
                          <p className="text-gray-700">
                            Khả năng thích nghi nhanh và xử lý tình huống bất
                            ngờ
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-purple-700">
                          Giải trí & Nghệ thuật
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Diễn
                          viên/Người mẫu
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nghệ
                          sĩ biểu diễn
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> MC/Dẫn
                          chương trình
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhạc
                          sĩ/Ca sĩ
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-purple-700">
                          Dịch vụ & Chăm sóc
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Tư vấn
                          tâm lý
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Chăm
                          sóc khách hàng
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Giáo
                          viên mầm non
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhân
                          viên xã hội
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
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-purple-700">
                          Sáng tạo & Thời trang
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Thiết
                          kế thời trang
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhiếp
                          ảnh gia
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Trang
                          trí nội thất
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Tổ
                          chức sự kiện
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
                    ESFP nên tránh những môi trường công việc:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Có cấu trúc cứng nhắc và quy trình phức tạp</li>
                    <li>Đòi hỏi làm việc độc lập với ít tương tác xã hội</li>
                    <li>Yêu cầu nghiên cứu lý thuyết dài hạn</li>
                    <li>Lặp đi lặp lại các công việc giống nhau</li>
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
                          Thử nghiệm nhiều lĩnh vực sáng tạo, xây dựng mạng lưới
                          quan hệ và phong cách cá nhân
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
                          Phát triển thương hiệu cá nhân và tìm ra lĩnh vực thế
                          mạnh
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
                          Dẫn dắt cộng đồng và truyền cảm hứng cho thế hệ sau
                          bằng kinh nghiệm
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
                <h2 className="text-3xl font-bold text-purple-600 mb-6 border-b-2 border-purple-100 pb-4">
                  THÓI QUEN NƠI CÔNG SỞ CỦA ESFP
                </h2>

                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    ESFP tỏa sáng trong môi trường làm việc năng động, nơi họ có
                    thể kết nối với mọi người và tận hưởng sự đa dạng của các
                    trải nghiệm. Với tinh thần lạc quan và phong cách giao tiếp
                    cởi mở, họ xuất sắc trong các vai trò đòi hỏi sự sáng tạo,
                    khả năng thích ứng cao và tương tác xã hội.
                  </p>
                </div>

                {/* As Employees Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-purple-600">
                      ESFP khi là nhân viên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điểm mạnh nổi bật
                      </h4>
                      <p className="text-gray-700">
                        Giải quyết vấn đề sáng tạo. Làm việc tốt trong môi
                        trường đa nhiệm. Khả năng kết nối mọi người. Tư duy thực
                        tế và linh hoạt. Mang lại năng lượng tích cực cho nhóm.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thách thức
                      </h4>
                      <p className="text-gray-700">
                        Khó chịu với các quy trình cứng nhắc. Thiếu kiên nhẫn
                        với công việc giấy tờ. Có thể bỏ qua chi tiết vì quá tập
                        trung vào hiện tại. Không thích bị kiểm soát hoặc gò bó.
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "ESFP là nhân viên sáng tạo nhưng cần không gian tự do. Họ
                      làm việc tốt nhất khi được trao quyền tự chủ và cơ hội
                      tương tác với mọi người."
                    </p>
                  </div>
                </div>

                {/* As Colleagues Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-purple-600">
                      ESFP khi là đồng nghiệp
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Giá trị mang lại
                      </h4>
                      <p className="text-gray-700">
                        Luôn mang lại bầu không khí vui vẻ. Giỏi hòa giải xung
                        đột. Có góc nhìn thực tế và sáng tạo. Giao tiếp cởi mở,
                        chân thành. Kết nối mọi người trong nhóm.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Điều cần lưu ý
                      </h4>
                      <p className="text-gray-700">
                        Có thể thiếu kiên nhẫn với đồng nghiệp quá nghiêm túc.
                        Đôi khi quá thẳng thắn trong góp ý. Không thích những
                        cuộc họp dài dòng. Cần được công nhận đóng góp.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1 mr-3 text-purple-500 text-xl">
                      ✨
                    </div>
                    <div>
                      <p className="text-gray-700">
                        "Đồng nghiệp ESFP giống như 'linh hồn' của nhóm - luôn
                        biết cách tạo không khí vui vẻ và kết nối mọi người với
                        nhau."
                      </p>
                    </div>
                  </div>
                </div>

                {/* As Managers Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-purple-600">
                      ESFP khi làm quản lý
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách lãnh đạo
                      </h4>
                      <p className="text-gray-700">
                        Quản lý bằng sự truyền cảm hứng. Khuyến khích nhân viên
                        sáng tạo. Tạo môi trường làm việc thoải mái, không gò
                        bó. Ưu tiên sự hợp tác và kết nối. Đánh giá cao sự cống
                        hiến của nhân viên.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Ưu tiên
                      </h4>
                      <p className="text-gray-700">
                        Đánh giá cao sự chân thành và nhiệt tình. Chú trọng bầu
                        không khí làm việc. Khuyến khích nhân viên phát triển
                        điểm mạnh cá nhân. Đặt mục tiêu ngắn hạn, khả thi và thú
                        vị.
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 text-purple-500">
                        💡
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Lời khuyên cho lãnh đạo ESFP: Đừng quên lắng nghe ý
                          kiến nhân viên và cân bằng giữa niềm vui với hiệu quả
                          công việc. Sự ổn định về quy trình sẽ giúp đội nhóm
                          phát triển bền vững hơn.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Path Section */}
                <div className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-3">
                    Con đường sự nghiệp lý tưởng
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-pink-600 to-purple-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Giải trí & Nghệ thuật
                      </h4>
                      <p className="text-sm">
                        Nghệ sĩ biểu diễn, MC, Tổ chức sự kiện, Thiết kế sáng
                        tạo, PR
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-pink-600 to-purple-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Dịch vụ & Chăm sóc</h4>
                      <p className="text-sm">
                        Nhà hàng - Khách sạn, Huấn luyện viên, Tư vấn, Giáo dục
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-pink-600 to-purple-500 bg-opacity-20 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Kinh doanh & Bán hàng
                      </h4>
                      <p className="text-sm">
                        Bán hàng, Marketing, Khởi nghiệp, Quản lý nhãn hàng
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-purple-100 text-sm">
                    <p>
                      ESFP phát triển mạnh trong môi trường năng động, có tính
                      tương tác cao và cho phép họ được thể hiện bản thân, nơi
                      họ có thể kết nối với mọi người và thấy ngay kết quả công
                      việc.
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
                    <span className="text-purple-600">
                      NGƯỜI TRÌNH DIỄN (ESFP)
                    </span>{" "}
                    VỚI
                    <span className="text-pink-500"> NGHỆ SĨ (ISFP)</span> VÀ
                    <span className="text-orange-500">
                      {" "}
                      NGƯỜI THỰC THI (ESTP)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Phân tích sâu về 3 nhóm tính cách thuộc nhóm "Nghệ sĩ - Thực
                    tế" - những người sống bằng cảm xúc và giác quan
                  </p>
                </div>

                {/* Core Similarities */}
                <div className="bg-purple-50 p-6 rounded-lg mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 text-purple-500 mr-2"
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
                    Điểm chung cốt lõi của bộ ba Nghệ sĩ - Thực tế (SP)
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          S
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Giác quan nhạy bén
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Cả ba đều tập trung vào thực tế qua những gì có thể cảm
                        nhận được bằng giác quan
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          P
                        </div>
                        <h4 className="font-bold text-gray-800">Linh hoạt</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Thích ứng nhanh với thay đổi, không thích bị gò bó bởi
                        kế hoạch cứng nhắc
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          🎨
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Thiên hướng nghệ thuật
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Có gu thẩm mỹ tốt và khả năng sáng tạo trong nhiều lĩnh
                        vực
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pair Comparisons */}
                <div className="space-y-10">
                  {/* ESFP vs ISFP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-purple-600">ESFP</span> vs{" "}
                        <span className="text-pink-500">ISFP</span>:
                        <span className="text-sm font-normal ml-2">
                          Người trình diễn năng động vs Nghệ sĩ trầm lắng
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Đều giàu tình cảm và biết tận hưởng cuộc sống</li>
                          <li>
                            Bị thu hút bởi những điều mới mẻ và trải nghiệm
                          </li>
                          <li>Có gu thẩm mỹ và khả năng sáng tạo tốt</li>
                          <li>Đề cao sự tự do cá nhân</li>
                          <li>Ra quyết định dựa trên cảm xúc</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-pink-500 mr-2"
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
                              ESFP (E) hướng ngoại, thích giao tiếp xã hội; ISFP
                              (I) hướng nội, cần thời gian một mình
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách giao tiếp
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFP hoạt ngôn, thích làm trung tâm; ISFP trầm
                              lắng, kín đáo
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Cách thể hiện bản thân
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFP thể hiện qua hành động và phong cách; ISFP
                              thể hiện qua tác phẩm nghệ thuật
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ESFP như ngôi sao tỏa sáng trên sân khấu, ISFP như nghệ
                        sĩ âm thầm sáng tác. Cả hai đều tài năng nhưng với cách
                        thể hiện hoàn toàn khác biệt."
                      </p>
                    </div>
                  </div>

                  {/* ESFP vs ESTP */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-purple-500 to-orange-500 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-purple-600">ESFP</span> vs{" "}
                        <span className="text-orange-500">ESTP</span>:
                        <span className="text-sm font-normal ml-2">
                          Người trình diễn vs Người thực thi
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Đều hướng ngoại và năng động</li>
                          <li>Thích các hoạt động xã hội và tiệc tùng</li>
                          <li>Có hành động tự phát, sống cho hiện tại</li>
                          <li>Không thích bị ràng buộc bởi quy tắc</li>
                          <li>Giỏi ứng biến trong mọi tình huống</li>
                        </ul>
                      </div>

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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Khác biệt then chốt
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Cách ra quyết định
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFP (F) dựa trên cảm xúc; ESTP (T) dựa trên logic
                              và thực tế
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Mục tiêu công việc
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFP hướng đến niềm vui và kết nối; ESTP hướng đến
                              kết quả và thách thức
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách lãnh đạo
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ESFP truyền cảm hứng bằng năng lượng tích cực;
                              ESTP dẫn dắt bằng hành động quyết đoán
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ESFP như người dẫn chương trình truyền cảm hứng, ESTP
                        như vận động viên đầy quyết tâm. Cả hai đều năng động
                        nhưng với động lực khác biệt."
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
                      <thead className="bg-purple-600 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold">
                            Đặc điểm
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ESFP
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ISFP
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
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Cảm nhận ngoại hướng (Se) + Cảm xúc nội tâm (Fi)
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-pink-50">
                            Cảm xúc nội tâm (Fi) + Cảm nhận ngoại hướng (Se)
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Cảm nhận ngoại hướng (Se) + Tư duy nội tâm (Ti)
                          </td>
                        </tr>
                        {/* Row 2 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Phong cách giao tiếp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Hoạt ngôn, hài hước, thích làm trung tâm
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-pink-50">
                            Trầm lắng, chân thành, ít nói
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Thẳng thắn, bộc trực, thích tranh luận
                          </td>
                        </tr>
                        {/* Row 3 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Trong quan hệ
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Hòa đồng, nhiệt tình, thích giao tiếp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-pink-50">
                            Nhạy cảm, sâu sắc, trung thành
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Tự do, phiêu lưu, ít ràng buộc
                          </td>
                        </tr>
                        {/* Row 4 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Ưu thế nghề nghiệp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Diễn viên, MC, tổ chức sự kiện
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-pink-50">
                            Nghệ sĩ, nhà thiết kế, tư vấn tâm lý
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Kinh doanh, thể thao, cứu hộ
                          </td>
                        </tr>
                        {/* Row 5 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Điểm mạnh
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Truyền cảm hứng, năng lượng tích cực
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-pink-50">
                            Sáng tạo, đồng cảm, kiên nhẫn
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Quyết đoán, xử lý khủng hoảng tốt
                          </td>
                        </tr>
                        {/* Row 6 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Điểm yếu
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-purple-50">
                            Thiếu kiên nhẫn, dễ phân tâm
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-pink-50">
                            Dễ tổn thương, khó từ chối
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-orange-50">
                            Thiếu tinh tế, hành động bốc đồng
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
                    {/* ESFP Column */}
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
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-purple-700">ESFP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Diễn
                          viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> MC/Dẫn
                          chương trình
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Nhân
                          viên bán hàng
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Huấn
                          luyện viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span> Tổ
                          chức sự kiện
                        </li>
                      </ul>
                    </div>

                    {/* ISFP Column */}
                    <div className="bg-white p-6 rounded-xl border border-pink-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-pink-100 p-3 rounded-lg mr-4">
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
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-pink-700">ISFP</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span> Nghệ sĩ
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span> Nhà
                          thiết kế
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span> Nhiếp
                          ảnh gia
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span> Tư vấn
                          tâm lý
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span> Giáo
                          viên mỹ thuật
                        </li>
                      </ul>
                    </div>

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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
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
                          <span className="text-orange-500 mr-2">•</span> Vận
                          động viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Cảnh
                          sát
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Nhân
                          viên cứu hộ
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span> Chuyên
                          viên đàm phán
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final Thoughts */}
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">
                    Nhận định cuối
                  </h3>
                  <p className="text-gray-700 mb-3">
                    ESFP, ISFP và ESTP đều là những nhóm tính cách thực tế và
                    sáng tạo, nhưng mỗi nhóm có thế mạnh riêng:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                    <li>
                      <span className="font-medium">ESFP</span> - Người trình
                      diễn với năng lượng tích cực và khả năng kết nối
                    </li>
                    <li>
                      <span className="font-medium">ISFP</span> - Nghệ sĩ nhạy
                      cảm với trái tim ấm áp và tâm hồn sáng tạo
                    </li>
                    <li>
                      <span className="font-medium">ESTP</span> - Người thực thi
                      quyết đoán với tư duy nhanh nhạy
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Sự khác biệt chính nằm ở cách họ tiếp cận thế giới: ESFP với
                    năng lượng và sự nhiệt tình, ISFP với sự nhạy cảm và sáng
                    tạo, ESTP với logic và hành động. Hiểu rõ những khác biệt
                    này giúp mỗi nhóm phát huy tối đa tiềm năng của mình.
                  </p>
                </div>
              </div>
            )}
            {activeSection === "advice" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-purple-600 mb-8 border-b-2 border-purple-100 pb-4">
                  LỜI KHUYÊN PHÁT TRIỂN DÀNH CHO NGƯỜI TRÌNH DIỄN (ESFP)
                </h2>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-700 to-pink-800 p-8 rounded-lg mb-10 text-white">
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Hành trình phát triển cho người vui vẻ
                    </h3>
                    <p className="text-purple-200">
                      Là những người lạc quan và nhiệt tình, ESFP cần học cách
                      cân bằng giữa niềm vui và trách nhiệm, giữa sự tự do và
                      cam kết để phát huy tối đa tiềm năng của mình.
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
                        Phát huy điểm mạnh
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tận dụng tối đa khả năng kết nối và sáng tạo của bạn:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Ứng dụng khả năng giao tiếp vào các tình huống xã hội
                      </li>
                      <li>Phát huy khả năng thích ứng với môi trường mới</li>
                      <li>
                        Tận dụng sự lạc quan để truyền cảm hứng cho người khác
                      </li>
                    </ul>
                  </div>

                  {/* Improve Weaknesses */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
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
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Cải thiện điểm yếu
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Những điều ESFP cần lưu ý để phát triển:
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="italic text-gray-700">
                        "Niềm vui là sức mạnh, nhưng sự kiên nhẫn là chìa khóa
                        thành công lâu dài"
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Kiềm chế tính bốc đồng và nóng vội</li>
                      <li>Học cách lắng nghe góp ý từ người khác</li>
                      <li>Đối mặt với mặt tiêu cực thay vì né tránh</li>
                    </ul>
                  </div>
                </div>

                {/* Emotional & Social Skills Section */}
                <div className="mb-10 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg">
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                        Phát triển kỹ năng xã hội & cảm xúc
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                          <h4 className="font-semibold text-purple-700 mb-2">
                            Thể hiện cảm xúc
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>
                              Chia sẻ suy nghĩ chân thành với người tin cậy
                            </li>
                            <li>Đừng né tránh nỗi đau hay mặt tiêu cực</li>
                            <li>Biết cách yêu cầu giúp đỡ khi cần</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                          <h4 className="font-semibold text-purple-700 mb-2">
                            Hiểu người khác
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Lắng nghe góp ý mà không phản ứng ngay</li>
                            <li>
                              Nhận ra giá trị trong những quan điểm khác biệt
                            </li>
                            <li>Thấu hiểu cảm xúc của người xung quanh</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Self-Care Section */}
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
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-purple-700">
                          Phát triển bản thân
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        ESFP cần chú ý phát triển toàn diện:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Kiểm soát bốc đồng
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>
                              Suy nghĩ kỹ trước khi đưa ra quyết định quan trọng
                            </li>
                            <li>Đánh giá rủi ro trước khi hành động</li>
                            <li>Nhìn xa trông rộng thay vì chỉ hiện tại</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Cân bằng nội tâm
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Dành thời gian suy ngẫm về bản thân</li>
                            <li>Chấp nhận và đối mặt với mặt tiêu cực</li>
                            <li>Tin tưởng vào những điều tốt đẹp phía trước</li>
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
                                Đếm đến 10
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Trước khi quyết định, dành 10 giây suy nghĩ
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              2
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Nhật ký cảm xúc
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Viết ra 1 cảm xúc khó chịu mỗi ngày và phân tích
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              3
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Lắng nghe phản hồi
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi tuần xin 1 góp ý và không phản bác ngay
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Encouragement */}
                <div className="bg-gradient-to-r from-purple-800 to-pink-700 p-8 rounded-lg text-white">
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Sức mạnh của Người trình diễn
                    </h3>
                    <p className="mb-4 text-purple-100">
                      Bạn được ban tặng khả năng kết nối tuyệt vời, tinh thần
                      lạc quan và năng lượng tích cực. Khi học cách kết hợp
                      những điểm mạnh này với sự kiên nhẫn và tự nhận thức, bạn
                      sẽ trở thành phiên bản tốt nhất của chính mình.
                    </p>
                    <div className="bg-pink-800 bg-opacity-30 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Thế giới cần những người vui vẻ như bạn - những người
                        biết cách mang lại tiếng cười, kết nối mọi người và làm
                        cuộc sống tươi đẹp hơn. Hãy nhớ rằng hạnh phúc thực sự
                        đến từ việc cân bằng giữa niềm vui và trách nhiệm, giữa
                        tự do và cam kết."
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
export default ESFPPage;
