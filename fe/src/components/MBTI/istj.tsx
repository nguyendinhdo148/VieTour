import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import handleCopyLink from "../helpers/HandleCopyLink";

const ISTJPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Tổng quan" },
    { id: "strengths-weaknesses", title: "Điểm mạnh và điểm yếu" },
    { id: "relationship", title: "Mối quan hệ" },
    { id: "how-to-be-close", title: "Làm sao để thân thiết với ISTJ" },
    { id: "career-path", title: "Con đường sự nghiệp" },
    { id: "workplace-habits", title: "Thói quen nơi công sở" },
    { id: "compare", title: "So sánh ISTJ với ISFJ, ESTJ" },
    { id: "advice", title: "Lời khuyên dành cho ISTJ" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="ISTJ-page bg-gradient-to-b from-blue-50 to-purple-50">
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
                ISTJ - Người trách nhiệm
              </h1>
            </div>
            <div className="relative w-full">
              <img
                src="/mbti_icons/istj1.webp"
                alt="INTP - Nhà tư duy"
                className="pointer w-full h-120 object-cover rounded-lg shadow "
              />
            </div>

            {/* Description */}
            <div className="text-lg text-gray-700 max-w-4xl text-center">
              ISTJ nổi tiếng là những người cần mẫn và có trách nhiệm, một khi
              đã cam kết thì họ sẽ cố gắng làm cho đến cùng. Logic, thành thật
              và có nguyên tắc là ba đặc điểm nổi trội nhất chúng ta có thể bắt
              gặp ở các ISTJ. Trong đời sống thường nhật, ISTJ thường là tuýp
              người hướng nội nhưng họ sẵn sàng cho bạn những lời khuyên hữu ích
              khi bạn cần đến họ.
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
                    TỔNG QUAN TÍNH CÁCH ISTJ
                  </h2>
                  <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
                </div>

                {/* Introduction */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    ISTJ (Người trách nhiệm) là những người cần mẫn và có trách
                    nhiệm, một khi đã cam kết thì họ sẽ cố gắng làm cho đến
                    cùng. Logic, thành thật và có nguyên tắc là ba đặc điểm nổi
                    trội nhất chúng ta có thể bắt gặp ở các ISTJ. Trong đời sống
                    thường nhật, ISTJ thường là tuýp người hướng nội nhưng họ
                    sẵn sàng cho bạn những lời khuyên hữu ích khi bạn cần đến
                    họ.
                  </p>
                </div>

                {/* MBTI Breakdown */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                    Ý NGHĨA 4 CHỮ CÁI ISTJ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "● I - Hướng nội (Introverted)",
                        color: "bg-indigo-100",
                        textColor: "text-indigo-800",
                        content:
                          "Đối với những người thuộc nhóm tính cách ISTJ, thế giới ẩn sâu bên trong mỗi chúng ta mới là thế giới thật. Ngược lại, thế giới bên ngoài là nơi thuộc về những người E - Hướng ngoại.",
                      },
                      {
                        title: "● S - Giác quan (Sensing)",
                        color: "bg-blue-100",
                        textColor: "text-blue-800",
                        content:
                          "Bạn tập trung vào những gì mình quan sát được bằng năm giác quan (thính giác, khứu giác, thị giác, vị giác, xúc giác). N - Trực giác (hay còn gọi là giác quan thứ sáu) sẽ được sử dụng để diễn giải ý nghĩa của sự vật, sự việc.",
                      },
                      {
                        title: "● T - Lý trí (Thinking)",
                        color: "bg-teal-100",
                        textColor: "text-teal-800",
                        content:
                          "Bạn đưa ra quyết định dựa trên góc nhìn thực tế bằng số liệu và đo lường chính xác. Ngược lại, các F - Cảm xúc ưu tiên đưa ra quyết định dựa trên cảm nhận cá nhân.",
                      },
                      {
                        title: "● J - Nguyên tắc (Judging)",
                        color: "bg-purple-100",
                        textColor: "text-purple-800",
                        content:
                          "Bạn dựa vào cấu trúc sẵn có để thoải mái đưa ra quan điểm mà không phải mất công suy xét nhiều. Trong khi đó, những người thiên về tính cách P - Linh hoạt lại thích môi trường tự do và họ sẽ tự sắp đặt quy tắc bên trong cho mình.",
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
                      title: "Đề cao tính thực tế",
                      icon: "🌱",
                      content:
                        "Phương châm sống của các ISTJ là 'sự thực tế', họ tôn trọng sự thật, có xu hướng tiếp thu rất nhiều thông tin và ghi nhớ rất lâu. Một trong những yếu tố góp phần quan trọng làm cho ISTJ có khả năng phân tích các sự vật, hiện tượng, con người ở môi trường xung quanh rất tốt đó là nhờ đặc tính S (Giác quan).",
                    },
                    {
                      title: "Nhìn nhận từ nhiều góc độ",
                      icon: "🔍",
                      content:
                        "Do cách tiếp cận thẳng thắn và trực tiếp nên Người trách nhiệm có thể gặp khó khăn khi gặp phải những ý kiến trái chiều. Trong trường hợp đó, bằng kinh nghiệm và kiến thức của mình, những người thuộc nhóm tính cách ISTJ sẽ đánh giá kỹ càng trên nhiều góc độ.",
                    },
                    {
                      title: "Trung thành và tận tâm",
                      icon: "🤝",
                      content:
                        "Trong công việc, các ISTJ được đánh giá là những người rất trung thành và tận tâm. Tính chính xác, sự kiên nhẫn và khả năng tập trung cao khiến cho họ trở thành nhân viên lý tưởng trong nhiều ngành nghề.",
                    },
                    {
                      title: "Tinh thần trách nhiệm cao",
                      icon: "🏆",
                      content:
                        "ISTJ là người luôn nhận trách nhiệm về hành động của mình. Họ thường biết rất nhiều nghề vì vậy họ có thể thành công trong nhiều lĩnh vực - ISTJ là người minh bạch, hợp lý, thông thái, họ mong muốn có cuộc sống ổn định và an toàn.",
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
                      ISTJ trong công việc
                    </h3>
                    <p className="text-gray-700 mb-4">
                      ISTJ phát huy thế mạnh trong các lĩnh vực đòi hỏi sự chính
                      xác, tuân thủ quy trình như luật pháp, quân đội, kế toán,
                      quản lý. Họ là những nhân viên đáng tin cậy, luôn hoàn
                      thành nhiệm vụ đúng hạn. Môi trường làm việc lý tưởng của
                      ISTJ là nơi có cấu trúc rõ ràng, quy định minh bạch.
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-indigo-700 mb-4">
                      ISTJ trong quan hệ
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Trong các mối quan hệ, ISTJ thường kín đáo và nghiêm túc.
                      Họ thể hiện tình cảm qua hành động hơn là lời nói. ISTJ
                      đánh giá cao sự trung thực và cam kết dài lâu. Mặc dù
                      không phải là người lãng mạn nhất, nhưng họ rất đáng tin
                      cậy và luôn giữ lời hứa.
                    </p>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    ISTJ NỔI TIẾNG
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "George Washington",
                        role: "Tổng thống đầu tiên của Hoa Kỳ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
                      },
                      {
                        name: "Elizabeth II",
                        role: "Nữ hoàng Vương quốc Anh",
                        image:
                          "https://www.twulasso.com/wp-content/uploads/2022/09/Queen_Elizabeth_II_of_New_Zealand.jpg",
                      },
                      {
                        name: "Warren Buffett",
                        role: "Nhà đầu tư, doanh nhân",
                        image:
                          "https://media.vneconomy.vn/images/upload/2021/06/23/104864179-20150331-0014-1180.jpg",
                      },
                      {
                        name: "Condoleezza Rice",
                        role: "Cựu Ngoại trưởng Hoa Kỳ",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Condoleezza_Rice_cropped.jpg/1200px-Condoleezza_Rice_cropped.jpg",
                      },
                      {
                        name: "Jeff Bezos",
                        role: "Nhà sáng lập Amazon",
                        image:
                          "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785965eeae4617e03f16f874f447eb6b28335381c246a4e68546b973fe7d4e7fef54f9efb0c8972265f49d8f86164867992/Jeff_Bezos.jpg",
                      },
                      {
                        name: "Angela Merkel",
                        role: "Cựu thủ tướng Đức",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/0/0f/Angela_Merkel_2019_cropped.jpg",
                      },
                      {
                        name: "Denzel Washington",
                        role: "Diễn viên, đạo diễn",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Denzel_Washington_at_the_2025_Cannes_Film_Festival.jpg/1200px-Denzel_Washington_at_the_2025_Cannes_Film_Festival.jpg",
                      },
                      {
                        name: "Sigmund Freud",
                        role: "Nhà tâm lý học",
                        image:
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Sigmund_Freud_LIFE.jpg/960px-Sigmund_Freud_LIFE.jpg",
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
                    "ISTJ là những người đáng tin cậy với tinh thần trách nhiệm
                    cao. Họ luôn tuân thủ nguyên tắc và cam kết, là chỗ dựa vững
                    chắc cho gia đình và tổ chức. Sự kiên định và thực tế của họ
                    giúp xây dựng nền tảng ổn định cho xã hội."
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
                      NGƯỜI TRÁCH NHIỆM (ISTJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ISTJ - Nhóm tính cách đáng tin cậy (13% dân số) với tinh
                    thần trách nhiệm cao và cách tiếp cận thực tế
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Trung Thực và Đáng Tin Cậy
                          </h4>
                          <p className="text-gray-700">
                            ISTJ luôn giữ lời hứa và tuân thủ nguyên tắc. Họ
                            thẳng thắn trong giao tiếp và kiên định với các giá
                            trị đạo đức, khiến họ trở thành những đồng nghiệp và
                            đối tác đáng tin cậy.
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-green-700 italic">
                          "ISTJ được xếp hạng là một trong những nhóm tính cách
                          đáng tin cậy nhất theo các nghiên cứu về tính cách"
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tinh Thần Trách Nhiệm Cao
                          </h4>
                          <p className="text-gray-700">
                            ISTJ luôn hoàn thành nhiệm vụ đúng hạn với chất
                            lượng tốt nhất. Họ coi trọng cam kết và sẵn sàng làm
                            thêm giờ để đảm bảo công việc được hoàn thành đúng
                            như kế hoạch.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Đáng tin cậy
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Kiên định
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Tận tâm
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
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Tổ Chức và Kỷ Luật
                          </h4>
                          <p className="text-gray-700">
                            Khả năng tổ chức công việc xuất sắc với hệ thống rõ
                            ràng, logic. ISTJ duy trì kỷ luật cá nhân cao và
                            luôn có kế hoạch dự phòng cho mọi tình huống.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Ứng dụng:</span>
                          Quản lý dự án, điều phối công việc, xây dựng quy trình
                          hệ thống
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
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thực Tế và Thiết Thực
                          </h4>
                          <p className="text-gray-700">
                            ISTJ đưa ra quyết định dựa trên dữ liệu và kinh
                            nghiệm thực tế. Họ ưu tiên các giải pháp khả thi và
                            có tính ứng dụng cao thay vì những ý tưởng viển
                            vông.
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
                          <span>Độ thực tế</span>
                          <span>85% ISTJ ưu tiên giải pháp thiết thực</span>
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
                            Cứng Nhắc và Bảo Thủ
                          </h4>
                          <p className="text-gray-700">
                            ISTJ thường khó chấp nhận thay đổi và có xu hướng
                            bám vào các phương pháp truyền thống đã được chứng
                            minh. Họ có thể bỏ lỡ cơ hội vì không linh hoạt
                            thích ứng với tình hình mới.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Giải pháp:</span>
                          Thử nghiệm các cách tiếp cận mới trong phạm vi kiểm
                          soát, học hỏi từ người có tư duy mở
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
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Thiếu Nhạy Cảm Cảm Xúc
                          </h4>
                          <p className="text-gray-700">
                            Khi tập trung vào sự thật và logic, ISTJ có thể vô
                            tình làm tổn thương người khác bằng sự thẳng thắn
                            quá mức. Họ thường gặp khó khăn trong việc thấu hiểu
                            và thể hiện cảm xúc.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Mẹo:</span>
                          Lắng nghe nhiều hơn trước khi phản ứng, học cách diễn
                          đạt ý kiến một cách tế nhị
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
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Quá Nghiêm Khắc với Bản Thân
                          </h4>
                          <p className="text-gray-700">
                            ISTJ thường tự đặt ra tiêu chuẩn rất cao và tự trách
                            mình khi không đạt được. Họ có xu hướng ôm đồm nhiều
                            trách nhiệm và khó chấp nhận sự không hoàn hảo.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-700 italic">
                          "ISTJ cần học cách tha thứ cho bản thân và hiểu rằng
                          không ai có thể hoàn hảo 100%"
                        </p>
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">
                            Khó Thích Ứng với Thay Đổi
                          </h4>
                          <p className="text-gray-700">
                            ISTJ cảm thấy thoải mái với những gì quen thuộc và
                            có thể mất nhiều thời gian để điều chỉnh khi quy
                            trình hoặc môi trường thay đổi đột ngột. Họ thường
                            nghi ngờ các phương pháp mới chưa được kiểm chứng.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Cải thiện:</span>
                          Tiếp cận thay đổi từng bước nhỏ, tìm hiểu lợi ích cụ
                          thể của cái mới thay vì tập trung vào rủi ro
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-xl text-white">
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
                      PHÁT HUY TIỀM NĂNG ISTJ
                    </h3>
                    <p className="mb-4 text-blue-100">
                      Sức mạnh thực sự của ISTJ nằm ở khả năng kết hợp tính tổ
                      chức tuyệt vời với sự linh hoạt trong tư duy. Khi học được
                      cách cân bằng giữa nguyên tắc và thích nghi, giữa sự thật
                      và cảm xúc, họ có thể trở thành những nhà lãnh đạo vừa
                      hiệu quả vừa được yêu mến.
                    </p>
                    <div className="bg-opacity-20 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Một ISTJ trưởng thành hiểu rằng sự ổn định không có
                        nghĩa là bất biến, và giá trị cốt lõi có thể được bảo vệ
                        ngay cả khi tiếp nhận những cách làm mới hiệu quả hơn."
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
                    MỐI QUAN HỆ CỦA ISTJ
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
                  <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Trong các mối quan hệ, ISTJ có thể không hay thể hiện tình
                    cảm, nhưng họ chắc chắn sẽ rất trung thành và đáng tin cậy.
                    Những người có loại cá tính này thường tiếp cận mọi thứ một
                    cách chậm rãi và có phương pháp.
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
                        <span>Trung thành và đáng tin cậy tuyệt đối</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>
                          Tiếp cận mối quan hệ một cách chậm rãi, có phương pháp
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Thẳng thắn và trung thực trong giao tiếp</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Thể hiện tình cảm qua hành động hơn lời nói</span>
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
                        { type: "ESFJ", desc: "Bổ sung cảm xúc" },
                        { type: "ESTJ", desc: "Cùng chia sẻ giá trị" },
                        { type: "ISFJ", desc: "Hiểu được sự tận tâm" },
                        { type: "ISTP", desc: "Cân bằng logic và hành động" },
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
                        ISTJ TRONG TÌNH YÊU
                      </h3>
                      <p className="text-gray-700 mb-4">
                        ISTJ là những người đáng tin cậy trong tình yêu. Họ tiếp
                        cận mối quan hệ một cách nghiêm túc và tìm kiếm sự ổn
                        định lâu dài. Khi đã cam kết, họ sẽ làm mọi thứ để giữ
                        lời hứa và xây dựng mối quan hệ bền vững.
                      </p>
                      <div className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
                        <p className="italic text-gray-700">
                          "ISTJ không phải là người lãng mạn nhất, nhưng họ thể
                          hiện tình yêu qua sự tận tâm, ổn định và những hành
                          động thiết thực hàng ngày."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Tiêu chuẩn rõ ràng",
                        icon: "🎯",
                        content:
                          "ISTJ có tiêu chuẩn rõ ràng về người bạn đời lý tưởng, thường tìm kiếm người có cùng giá trị và quan điểm sống truyền thống.",
                      },
                      {
                        title: "Thể hiện tình cảm",
                        icon: "💌",
                        content:
                          "ISTJ không giỏi thể hiện tình cảm bằng lời, nhưng họ thể hiện qua việc chăm sóc, bảo vệ và chu toàn trách nhiệm trong mối quan hệ.",
                      },
                      {
                        title: "Thách thức",
                        icon: "⚠️",
                        content:
                          "ISTJ cần học cách thấu hiểu cảm xúc của đối phương và linh hoạt hơn trong các tình huống không theo kế hoạch.",
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
                    ISTJ TRONG TÌNH BẠN
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
                            ISTJ có vòng bạn bè nhỏ nhưng bền chặt. Họ đánh giá
                            cao bạn bè trung thực, đáng tin cậy và có chung quan
                            điểm sống. Một khi đã coi ai là bạn, họ sẽ trung
                            thành đến cùng.
                          </p>
                        </div>
                      </div>

                      <div className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-400 mb-6">
                        <p className="italic text-gray-700">
                          "ISTJ có thể không phải là người bạn vui vẻ nhất,
                          nhưng họ chắc chắn là người bạn đáng tin cậy nhất -
                          luôn sẵn sàng giúp đỡ khi bạn thực sự cần."
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
                            Giao tiếp thẳng thắn
                          </h4>
                          <p className="text-gray-700">
                            ISTJ thích những cuộc trò chuyện thực tế về công
                            việc, cuộc sống hơn là tán gẫu vô bổ. Họ đánh giá
                            cao sự trung thực và thẳng thắn trong giao tiếp với
                            bạn bè.
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
                            ISTJ cần không gian riêng và tôn trọng không gian
                            của người khác. Họ không thích sự gắn bó quá mức hay
                            những đòi hỏi về thời gian từ bạn bè.
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
                    ISTJ KHI LÀM CHA MẸ
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Phong cách nuôi dạy",
                          content:
                            "ISTJ là những cha mẹ nghiêm khắc nhưng công bằng. Họ dạy con tính kỷ luật, trách nhiệm và tôn trọng các quy tắc. Con cái của ISTJ thường được rèn luyện để trở nên độc lập và tự lập từ sớm.",
                        },
                        {
                          title: "Giá trị cốt lõi",
                          content:
                            "ISTJ coi trọng việc xây dựng nền tảng đạo đức vững chắc cho con. Họ muốn con trở thành người có ích cho xã hội, biết tôn trọng truyền thống và có trách nhiệm với bản thân.",
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
                              Khó thể hiện tình cảm bằng lời nói với con cái
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Quá nghiêm khắc trong việc áp dụng các quy tắc
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Thiếu linh hoạt trong cách tiếp cận vấn đề của con
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-100 p-5 rounded-lg border-l-4 border-green-500">
                        <p className="italic text-gray-700">
                          "Các bậc cha mẹ ISTJ cần học cách cân bằng giữa kỷ
                          luật và tình yêu thương, giữa truyền thống và sự đổi
                          mới để giúp con phát triển toàn diện."
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
                      "ISTJ là những người bạn trung thành, những người yêu đáng
                      tin cậy và những bậc cha mẹ có trách nhiệm. Họ có thể
                      không phải là người lãng mạn nhất hay cởi mở nhất, nhưng
                      chắc chắn họ sẽ luôn ở bên bạn khi bạn cần."
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
                    <span className="text-blue-600">
                      NGƯỜI TRÁCH NHIỆM (ISTJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    ISTJ - Nhóm tính cách đáng tin cậy (13% dân số) với tinh
                    thần trách nhiệm cao và cách tiếp cận thực tế
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">
                        Nguyên tắc vàng khi tiếp cận ISTJ
                      </h3>
                      <p className="text-gray-700">
                        ISTJ đánh giá cao sự đúng giờ, trung thực và tôn trọng
                        không gian cá nhân. Họ không thích sự bất ngờ hay những
                        cuộc trò chuyện phiếm vô nghĩa. Để xây dựng mối quan hệ
                        với ISTJ, bạn cần:
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
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tôn trọng nguyên tắc
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Luôn đúng giờ trong mọi cuộc hẹn</li>
                            <li>Thông báo trước khi muốn gặp mặt</li>
                            <li>Giữ lời hứa một cách tuyệt đối</li>
                            <li>Tuân thủ các thỏa thuận đã đặt ra</li>
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
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Tìm điểm chung thực tế
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Khám phá sở thích và đam mê chung</li>
                            <li>Thảo luận về các chủ đề thiết thực</li>
                            <li>Chia sẻ kinh nghiệm sống hữu ích</li>
                            <li>Tránh những cuộc trò chuyện phiếm vô nghĩa</li>
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
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Thể hiện sự đáng tin cậy
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Hoàn thành nhiệm vụ được giao đúng hạn</li>
                            <li>Giữ bí mật khi được tâm sự</li>
                            <li>Thể hiện sự nhất quán trong hành động</li>
                            <li>Tránh hứa hẹn suông</li>
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Kiên nhẫn xây dựng lòng tin
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Không vội vàng ép thân thiết</li>
                            <li>Tôn trọng tiến độ phát triển mối quan hệ</li>
                            <li>Thể hiện sự chân thành qua hành động</li>
                            <li>Cho họ thời gian riêng tư khi cần</li>
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
                              Nhờ họ giúp đỡ các vấn đề thực tiễn và lắng nghe
                              lời khuyên
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Sắp xếp cuộc hẹn trước và tuân thủ kế hoạch
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Tặng quà thiết thực, có giá trị sử dụng cao
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-green-500">
                              ✓
                            </div>
                            <span className="text-gray-700">
                              Nhắn tin báo đã về nhà an toàn sau cuộc hẹn
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
                              Gọi điện/ghé thăm đột xuất không báo trước
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Đưa đến những nơi ồn ào, tiệc tùng thâu đêm
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Tặng quà mang tính hình thức, không có giá trị sử
                              dụng
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                              ✗
                            </div>
                            <span className="text-gray-700">
                              Thay đổi kế hoạch đột ngột không có lý do chính
                              đáng
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
                    Lời khuyên cuối
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Xây dựng mối quan hệ với ISTJ cần thời gian và sự kiên nhẫn.
                    Họ có thể khép kín ban đầu, nhưng khi đã tin tưởng, họ sẽ là
                    những người bạn trung thành, đáng tin cậy và luôn sẵn sàng
                    giúp đỡ bạn trong mọi hoàn cảnh.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="italic text-gray-700">
                      "Đừng mong đợi một ISTJ thay đổi tính cách vì bạn. Thay
                      vào đó, hãy học cách trân trọng sự ổn định, đáng tin cậy
                      và thực tế mà họ mang đến cho mối quan hệ."
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
                    <span className="text-indigo-600">
                      NGƯỜI TRÁCH NHIỆM (ISTJ)
                    </span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    ISTJ - Nhóm tính cách đáng tin cậy với tinh thần trách nhiệm
                    cao và khả năng tổ chức xuất sắc
                  </p>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg mb-10 text-white">
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
                      "ISTJ xây dựng sự nghiệp trên nền tảng ổn định và bền
                      vững"
                    </h3>
                    <p className="text-blue-100">
                      Những người đáng tin cậy này luôn tìm kiếm công việc có
                      cấu trúc rõ ràng, nơi họ có thể áp dụng tư duy logic và tổ
                      chức xuất sắc của mình
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
                        <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          1
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn khởi đầu: Xây dựng nền tảng
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Khi mới bước vào sự nghiệp, ISTJ tập trung vào việc
                          học hỏi quy trình, quy tắc và xây dựng nền tảng vững
                          chắc. Họ ưu tiên những công việc có cấu trúc rõ ràng
                          và hướng dẫn cụ thể.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="italic text-gray-700">
                            "ISTJ cần thời gian để làm quen với công việc mới,
                            nhưng một khi đã nắm vững, họ sẽ trở thành nhân viên
                            đáng tin cậy nhất"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          2
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn bứt phá: Chuyên gia đáng tin cậy
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Sau khi tích lũy kinh nghiệm, ISTJ trở thành chuyên
                          gia trong lĩnh vực của mình. Họ được tin tưởng giao
                          những nhiệm vụ quan trọng nhờ sự chính xác và đáng tin
                          cậy.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            Chuyên môn sâu
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            Độ tin cậy cao
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            Quản lý hiệu quả
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                          3
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          Giai đoạn chín muồi: Lãnh đạo có nguyên tắc
                        </h4>
                        <p className="text-gray-700">
                          Ở đỉnh cao sự nghiệp, ISTJ trở thành những nhà lãnh
                          đạo mẫu mực với hệ thống quy tắc rõ ràng. Họ xây dựng
                          môi trường làm việc ổn định và hiệu quả cho tổ chức.
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
                            Tổ chức và kỷ luật
                          </h4>
                          <p className="text-gray-700">
                            Khả năng sắp xếp công việc hệ thống, tuân thủ quy
                            trình và đảm bảo mọi thứ hoạt động trơn tru.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Đáng tin cậy
                          </h4>
                          <p className="text-gray-700">
                            Luôn hoàn thành nhiệm vụ đúng hạn và giữ đúng lời
                            hứa, là chỗ dựa vững chắc cho đồng nghiệp.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Chi tiết và chính xác
                          </h4>
                          <p className="text-gray-700">
                            Khả năng chú ý đến từng chi tiết nhỏ và đảm bảo độ
                            chính xác cao trong công việc.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
                              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">
                            Thực tế và logic
                          </h4>
                          <p className="text-gray-700">
                            Ra quyết định dựa trên dữ liệu thực tế và phân tích
                            logic, không bị chi phối bởi cảm xúc.
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-blue-700">
                          Pháp luật & An ninh
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Thẩm
                          phán
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Luật sư
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Cảnh sát
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Quân
                          nhân
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-blue-700">
                          Tài chính & Quản trị
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Kế toán
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Kiểm
                          toán
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Quản lý
                          tài chính
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Quản trị
                          kinh doanh
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-blue-700">
                          Y tế & Kỹ thuật
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Bác sĩ
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Nha sĩ
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Kỹ sư
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Lập
                          trình viên
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
                    ISTJ nên tránh những môi trường công việc:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Thiếu cấu trúc rõ ràng và quy trình làm việc</li>
                    <li>Đòi hỏi phải thay đổi liên tục và ứng biến nhiều</li>
                    <li>
                      Quá tập trung vào lý thuyết mà không có ứng dụng thực tế
                    </li>
                    <li>Yêu cầu giao tiếp xã hội ở mức độ cao</li>
                  </ul>
                </div>

                {/* Career Development */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">
                    Lộ trình phát triển
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-blue-500 font-bold">
                        1.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn học việc (0-5 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Nắm vững quy trình và nguyên tắc công việc, xây dựng
                          nền tảng chuyên môn vững chắc
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-blue-500 font-bold">
                        2.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn chuyên gia (5-10 năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Trở thành chuyên gia trong lĩnh vực, đảm nhận vị trí
                          quản lý cấp trung
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-blue-500 font-bold">
                        3.
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Giai đoạn lãnh đạo (10+ năm)
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Đảm nhiệm vị trí lãnh đạo cấp cao, xây dựng hệ thống
                          và quy chuẩn cho tổ chức
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
                <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-2 border-blue-100 pb-4">
                  THÓI QUEN NƠI CÔNG SỞ CỦA ISTJ
                </h2>

                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    ISTJ phát triển mạnh trong môi trường làm việc có cấu trúc
                    rõ ràng và quy trình được xác định. Với tinh thần trách
                    nhiệm cao và cách tiếp cận thực tế, họ xuất sắc trong các
                    công việc đòi hỏi sự chính xác, đáng tin cậy, nhưng có thể
                    gặp khó khăn với sự thay đổi đột ngột và môi trường quá linh
                    hoạt.
                  </p>
                </div>

                {/* As Employees Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-700">
                      ISTJ khi là nhân viên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách làm việc
                      </h4>
                      <p className="text-gray-700">
                        ISTJ làm việc có phương pháp và kỷ luật. Họ tuân thủ quy
                        trình, đảm bảo công việc được hoàn thành đúng hạn với
                        chất lượng cao. Thích môi trường ổn định, rõ ràng về
                        nhiệm vụ và kỳ vọng.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Thách thức
                      </h4>
                      <p className="text-gray-700">
                        Khó thích ứng với thay đổi đột ngột hoặc phương pháp làm
                        việc mới chưa được kiểm chứng. Cần học cách linh hoạt
                        hơn khi tình huống yêu cầu.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="italic text-gray-700">
                      "ISTJ là nhân viên đáng tin cậy nhất. Họ coi trọng cam kết
                      và sẽ làm mọi thứ để hoàn thành nhiệm vụ đúng hạn với chất
                      lượng tốt nhất."
                    </p>
                  </div>
                </div>

                {/* As Colleagues Section */}
                <div className="mb-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-700">
                      ISTJ khi là đồng nghiệp
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Ưu điểm
                      </h4>
                      <p className="text-gray-700">
                        Luôn đáng tin cậy và giữ lời hứa. Sẵn sàng giúp đỡ đồng
                        nghiệp khi được yêu cầu, đặc biệt trong các vấn đề thực
                        tế và chi tiết.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Hạn chế
                      </h4>
                      <p className="text-gray-700">
                        Có thể quá thẳng thắn trong phản hồi mà không cân nhắc
                        cảm xúc người khác. Không giỏi trong giao tiếp xã giao
                        và các cuộc trò chuyện phiếm.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1 mr-3 text-blue-500 text-xl">
                      💡
                    </div>
                    <div>
                      <p className="text-gray-700">
                        "ISTJ đánh giá cao đồng nghiệp chuyên nghiệp, đúng giờ
                        và tôn trọng quy trình. Họ có thể không phải là người
                        vui vẻ nhất văn phòng, nhưng luôn là người bạn có thể
                        tin tưởng tuyệt đối."
                      </p>
                    </div>
                  </div>
                </div>

                {/* As Managers Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-2 h-8 mr-3 rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-blue-700">
                      ISTJ khi làm cấp trên
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phong cách lãnh đạo
                      </h4>
                      <p className="text-gray-700">
                        Quản lý có hệ thống, rõ ràng về kỳ vọng và tiêu chuẩn.
                        Trao quyền dựa trên năng lực đã được chứng minh, đảm bảo
                        mọi người hiểu rõ vai trò và trách nhiệm.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Tiêu chuẩn
                      </h4>
                      <p className="text-gray-700">
                        Đánh giá cao nhân viên chăm chỉ, đáng tin cậy và tuân
                        thủ quy trình. Không kiên nhẫn với sự thiếu tổ chức hoặc
                        không tôn trọng deadline.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 text-blue-500">⚠️</div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Lãnh đạo ISTJ cần chú ý: Sự cứng nhắc quá mức có thể
                          hạn chế sáng tạo của nhân viên. Học cách cân bằng giữa
                          tuân thủ quy trình và khuyến khích đổi mới là chìa
                          khóa thành công.
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
                    <span className="text-blue-600">
                      NGƯỜI TRÁCH NHIỆM (ISTJ)
                    </span>{" "}
                    VỚI
                    <span className="text-green-600">
                      {" "}
                      NGƯỜI NUÔI DƯỠNG (ISFJ)
                    </span>{" "}
                    VÀ
                    <span className="text-red-600"> NHÀ ĐIỀU HÀNH (ESTJ)</span>
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Phân tích sâu về 3 nhóm tính cách thuộc nhóm "Người bảo vệ"
                    - những người đáng tin cậy và tận tâm
                  </p>
                </div>

                {/* Core Similarities */}
                <div className="bg-gray-50 p-6 rounded-lg mb-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-2"
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
                    Điểm chung cốt lõi của bộ ba Nguyên tắc - Thực tế (Si +
                    Te/Fe)
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          S
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Tiếp cận thực tế
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Cả ba đều dựa vào kinh nghiệm và thông tin cụ thể, coi
                        trọng sự kiện và chi tiết thực tế
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          J
                        </div>
                        <h4 className="font-bold text-gray-800">Nguyên tắc</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Ưa thích sự ổn định, có kế hoạch rõ ràng và tuân thủ quy
                        trình đã đặt ra
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          ★
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Đáng tin cậy
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Luôn giữ lời hứa, có tinh thần trách nhiệm cao và hoàn
                        thành nhiệm vụ đúng hạn
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pair Comparisons */}
                <div className="space-y-10">
                  {/* ISTJ vs ISFJ */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-blue-600 to-green-600 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-blue-600">ISTJ</span> vs{" "}
                        <span className="text-green-600">ISFJ</span>:
                        <span className="text-sm font-normal ml-2">
                          Người tổ chức logic vs Người chăm sóc tận tâm
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Đều là người hướng nội và có tổ chức</li>
                          <li>Có trí nhớ tốt về chi tiết và sự kiện</li>
                          <li>
                            Trung thành và đáng tin cậy trong các mối quan hệ
                          </li>
                          <li>Ưa thích sự ổn định và truyền thống</li>
                          <li>Làm việc chăm chỉ và có trách nhiệm</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-green-600 mr-2"
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
                              ISTJ (T) dựa trên logic và khách quan, ISFJ (F)
                              cân nhắc cảm xúc và hòa hợp
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách giao tiếp
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ISTJ thẳng thắn và trực tiếp, ISFJ tế nhị và quan
                              tâm đến cảm xúc người khác
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Ưu tiên công việc
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ISTJ tập trung vào hiệu quả và quy trình, ISFJ chú
                              trọng đến nhu cầu của mọi người
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ISTJ như một thủ thư nghiêm túc sắp xếp mọi thứ ngăn
                        nắp, ISFJ như một người chăm sóc ân cần. Cả hai đều tỉ
                        mỉ nhưng với động lực khác nhau."
                      </p>
                    </div>
                  </div>

                  {/* ISTJ vs ESTJ */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-blue-600 to-red-600 w-2 h-10 mr-3 rounded-full"></div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        <span className="text-blue-600">ISTJ</span> vs{" "}
                        <span className="text-red-600">ESTJ</span>:
                        <span className="text-sm font-normal ml-2">
                          Người thực thi kỷ luật vs Nhà lãnh đạo truyền thống
                        </span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Tương đồng chính
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Đều có tư duy logic và thực tế</li>
                          <li>Tuân thủ nghiêm ngặt các quy tắc và quy trình</li>
                          <li>Có tổ chức và đáng tin cậy trong công việc</li>
                          <li>Coi trọng truyền thống và trách nhiệm</li>
                          <li>Làm việc chăm chỉ và kiên định</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-red-600 mr-2"
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
                              ISTJ (I) hướng nội và kín đáo, ESTJ (E) hướng
                              ngoại và quyết đoán
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Phong cách lãnh đạo
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ISTJ lãnh đạo bằng ví dụ cá nhân, ESTJ chủ động
                              chỉ đạo và ra lệnh
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              Tương tác xã hội
                            </h5>
                            <p className="text-gray-700 text-sm">
                              ISTJ thích làm việc độc lập, ESTJ thoải mái trong
                              các tình huống xã hội
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                      <p className="italic text-gray-700">
                        "ISTJ như một kiểm toán viên cẩn thận, ESTJ như một sĩ
                        quan quân đội. Cả hai đều tuân thủ quy tắc nhưng với mức
                        độ thể hiện khác nhau."
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
                      <thead className="bg-blue-600 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold">
                            Đặc điểm
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ISTJ
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ISFJ
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            ESTJ
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
                            Cảm nhận nội tâm (Si) + Tư duy hướng ngoại (Te)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Cảm nhận nội tâm (Si) + Cảm xúc hướng ngoại (Fe)
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tư duy hướng ngoại (Te) + Cảm nhận nội tâm (Si)
                          </td>
                        </tr>
                        {/* Row 2 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Phong cách làm việc
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Phương pháp, chính xác, tập trung vào quy trình
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-green-50">
                            Tận tâm, hỗ trợ, chú ý đến nhu cầu người khác
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-red-50">
                            Hiệu quả, quyết đoán, tập trung vào kết quả
                          </td>
                        </tr>
                        {/* Row 3 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Trong quan hệ
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Đáng tin, trung thành, ít biểu lộ cảm xúc
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Ân cần, chu đáo, quan tâm đến cảm xúc người khác
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Thẳng thắn, bảo vệ, có xu hướng kiểm soát
                          </td>
                        </tr>
                        {/* Row 4 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Ưu thế nghề nghiệp
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Kế toán, kiểm toán, quản lý dữ liệu
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-green-50">
                            Y tá, giáo viên, nhân viên xã hội
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-red-50">
                            Quản lý, giám sát, điều hành doanh nghiệp
                          </td>
                        </tr>
                        {/* Row 5 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                            Điểm mạnh
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Logic, đáng tin cậy, kiên định
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Tận tâm, chu đáo, có trách nhiệm
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Quyết đoán, tổ chức tốt, thực tế
                          </td>
                        </tr>
                        {/* Row 6 */}
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            Điểm yếu
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-blue-50">
                            Cứng nhắc, khó thích nghi, thiếu linh hoạt
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-green-50">
                            Dễ bị lợi dụng, khó nói không, quá nhạy cảm
                          </td>
                          <td className="py-3 px-4 text-gray-600 bg-red-50">
                            Bảo thủ, độc đoán, thiếu kiên nhẫn
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
                    {/* ISTJ Column */}
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
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-blue-700">ISTJ</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Kế
                          toán/Kiểm toán viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Quản lý
                          dữ liệu
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Kỹ sư
                          phần mềm
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Quản lý
                          hành chính
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span> Thanh
                          tra chất lượng
                        </li>
                      </ul>
                    </div>

                    {/* ISFJ Column */}
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
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-green-700">ISFJ</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Y
                          tá/Điều dưỡng
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Giáo
                          viên
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Nhân
                          viên xã hội
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Quản lý
                          văn phòng
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span> Chuyên
                          gia dinh dưỡng
                        </li>
                      </ul>
                    </div>

                    {/* ESTJ Column */}
                    <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-red-100 p-3 rounded-lg mr-4">
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
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-red-700">ESTJ</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span> Quản lý
                          doanh nghiệp
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span> Giám đốc
                          điều hành
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span> Quân
                          nhân/Cảnh sát
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span> Giám sát
                          sản xuất
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span> Luật sư
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final Thoughts */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    Nhận định cuối
                  </h3>
                  <p className="text-gray-700 mb-3">
                    ISTJ, ISFJ và ESTJ đều là những nhóm tính cách đáng tin cậy
                    và có tổ chức, nhưng mỗi nhóm có thế mạnh riêng:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                    <li>
                      <span className="font-medium">ISTJ</span> - Người thực thi
                      đáng tin cậy với tư duy logic
                    </li>
                    <li>
                      <span className="font-medium">ISFJ</span> - Người chăm sóc
                      tận tâm với sự đồng cảm sâu sắc
                    </li>
                    <li>
                      <span className="font-medium">ESTJ</span> - Nhà lãnh đạo
                      quyết đoán với tầm nhìn thực tế
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Sự khác biệt chính nằm ở cách họ tiếp cận thế giới: ISTJ với
                    sự chính xác và kỷ luật, ISFJ với sự chu đáo và quan tâm,
                    ESTJ với sự quyết đoán và hiệu quả. Hiểu rõ những khác biệt
                    này giúp mỗi nhóm phát huy tối đa tiềm năng của mình.
                  </p>
                </div>
              </div>
            )}
            {activeSection === "advice" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Main Header */}
                <h2 className="text-3xl font-bold text-indigo-800 mb-8 border-b-2 border-indigo-100 pb-4">
                  LỜI KHUYÊN PHÁT TRIỂN DÀNH CHO NGƯỜI BẢO HỘ (ISTJ)
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Chiến lược hoàn thiện dành cho ISTJ
                    </h3>
                    <p className="text-gray-300">
                      Là những người đáng tin cậy và có trách nhiệm, ISTJ cần
                      cân bằng giữa tính kỷ luật và sự linh hoạt để đạt được
                      thành công toàn diện trong cuộc sống.
                    </p>
                  </div>
                </div>

                {/* Advice Sections */}
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
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Phát triển điểm mạnh
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tận dụng tối đa khả năng tổ chức và trách nhiệm của bạn:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Duy trì tính kỷ luật và đáng tin cậy</li>
                      <li>Phát huy khả năng làm việc hệ thống và chi tiết</li>
                      <li>Xây dựng nền tảng vững chắc trong mọi lĩnh vực</li>
                    </ul>
                  </div>

                  {/* Improve Weaknesses */}
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
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Cải thiện điểm yếu
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Chấp nhận và cải thiện những hạn chế:
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="italic text-gray-700">
                        "Sự hoàn hảo thực sự nằm ở khả năng cân bằng giữa nguyên
                        tắc và linh hoạt"
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Học cách thả lỏng và cho bản thân nghỉ ngơi</li>
                      <li>Chấp nhận rủi ro có tính toán</li>
                    </ul>
                  </div>
                </div>

                {/* Emotional & Social Skills Section */}
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold text-red-800 mb-4">
                        Phát triển kỹ năng xã hội
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                          <h4 className="font-semibold text-red-700 mb-2">
                            Giao tiếp hiệu quả
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Học cách bộc lộ cảm xúc nhiều hơn</li>
                            <li>Thực hành lắng nghe và thấu hiểu người khác</li>
                            <li>Kiên nhẫn và cho người khác cơ hội</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                          <h4 className="font-semibold text-red-700 mb-2">
                            Quản lý cảm xúc
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Nhận diện và thể hiện cảm xúc cá nhân</li>
                            <li>Đồng cảm với cảm xúc của người khác</li>
                            <li>Giảm bớt sự phán xét trong giao tiếp</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Life Skills */}
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
                        <h3 className="text-xl font-semibold text-indigo-700">
                          Kỹ năng sống thực tế
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        ISTJ thường cần cải thiện các kỹ năng để cân bằng cuộc
                        sống:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Bước khỏi vùng an toàn
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Chấp nhận mạo hiểm có tính toán</li>
                            <li>
                              Thử những điều mới mẻ dù chưa chắc chắn 100%
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Cân bằng cuộc sống
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Học cách thư giãn và không quá khắt khe</li>
                            <li>
                              Ghi nhận nỗ lực thay vì chỉ tập trung vào kết quả
                            </li>
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
                                Thử thách mới mỗi tuần
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi tuần thử một việc ngoài vùng an toàn của bản
                                thân
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              2
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Ghi nhận cảm xúc
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi ngày ghi lại 3 cảm xúc của bản thân và người
                                xung quanh
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                              3
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                Lắng nghe không phán xét
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Mỗi ngày dành 10 phút lắng nghe ai đó mà không
                                đánh giá
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold mb-4">
                      Sức mạnh của Người Bảo Hộ
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Bạn được ban tặng sự đáng tin cậy, trách nhiệm và tính kỷ
                      luật hiếm có. Khi kết hợp với sự linh hoạt và thấu cảm,
                      bạn có thể trở thành một người vừa nguyên tắc vừa được yêu
                      mến trong cả công việc và cuộc sống.
                    </p>
                    <div className="bg-indigo-800 bg-opacity-30 p-4 rounded-lg inline-block">
                      <p className="font-medium">
                        "Thế giới cần những người nguyên tắc như bạn. Hãy mở
                        rộng trái tim để hiểu và chấp nhận sự khác biệt, đồng
                        thời giữ vững những giá trị cốt lõi làm nên con người
                        bạn."
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
export default ISTJPage;
