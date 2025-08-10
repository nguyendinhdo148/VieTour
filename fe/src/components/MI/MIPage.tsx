import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import AIINTEL from "./images/AIINTEL.png";
import bgMI from "/mi_icons/bgMI.png";
import { intelligenceTypes } from "@/lib/intelligenceTypes";
import { ArrowRight } from "lucide-react";
import Footer from "../Footer";

const MIPage = () => {
  const [isBannerHovered, setIsBannerHovered] = useState(false);
  const translateX = 0;
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const animationDuration = 40000;
  const bannerWidthRef = useRef<number>(0);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
    }
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLElement
            );
            if (index !== -1 && !visibleSections.includes(index)) {
              setVisibleSections((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [visibleSections]);

  useEffect(() => {
    if (!bannerRef.current) return;

    if (bannerWidthRef.current === 0 && bannerRef.current) {
      bannerWidthRef.current = bannerRef.current.scrollWidth / 2;
    }

    let requestId: number | undefined;
    const startTime =
      performance.now() -
      (translateX / -bannerWidthRef.current) * animationDuration;

    let translate = 0;
    const update = () => {
      if (!isBannerHovered && bannerRef.current) {
        const elapsed = (performance.now() - startTime) % animationDuration;
        const percent = elapsed / animationDuration;
        translate = -percent * bannerWidthRef.current;
        bannerRef.current.style.transform = `translateX(${translate}px)`;
        requestId = requestAnimationFrame(update);
      }
    };

    if (!isBannerHovered) {
      requestId = requestAnimationFrame(update);
    }

    return () => {
      if (typeof requestId === "number") {
        cancelAnimationFrame(requestId);
      }
    };
  }, [isBannerHovered, translateX]);

  return (
    <div className="mi-intro bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={(el) => addToRefs(el, 0)}
        className={`hero-section relative bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white py-24 overflow-hidden shadow-xl transition-all duration-700 ease-out ${
          visibleSections.includes(0)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        style={{
          minHeight: "530px",
          backgroundImage: `url(${bgMI})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow mb-4 animate-fadeIn text-center">
            Khám phá{" "}
            <span className="gradient-text-pink">Đa trí thông minh</span>
          </h1>
          <p className="text-2xl mb-8 drop-shadow-md animate-fadeIn delay-100 text-center max-w-2xl">
            Mỗi người đều có những loại hình thông minh nổi trội riêng
          </p>
          <img
            src={AIINTEL}
            alt="MI Hero"
            className="mx-auto mb-6 animate-floatUp w-40 md:w-56"
          />
          <Link
            to="/tools/mi/test"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-400 text-white font-extrabold py-4 px-10 rounded-full text-xl transition-all duration-300 shadow-xl mt-2 animate-fadeIn delay-150 hover:scale-105 hover:shadow-2xl hover:brightness-110"
          >
            Làm bài test ngay
          </Link>
        </div>
      </section>

      {/* Interactive MI Banner */}
      <section
        ref={(el) => addToRefs(el, 1)}
        className={`py-16 bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-700 delay-100 ease-out ${
          visibleSections.includes(1)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-center text-3xl font-bold mb-8 text-indigo-600">
            9 Loại hình trí thông minh
          </h3>

          <div
            className="relative h-[200px] overflow-hidden"
            style={{ cursor: "pointer" }}
          >
            <div
              ref={bannerRef}
              className="absolute top-0 left-0 flex gap-6 whitespace-nowrap"
              style={{
                willChange: "transform",
                transform: `translateX(${translateX}px)`,
                transition: "transform 0.1s linear",
              }}
              onMouseEnter={() => setIsBannerHovered(true)}
              onMouseLeave={() => setIsBannerHovered(false)}
            >
              {[...intelligenceTypes, ...intelligenceTypes].map((type, idx) => (
                <div
                  key={idx}
                  className={`flex w-[400px] h-[200px] ${
                    type.bgColor
                  } rounded-xl shadow-md border-2 border-transparent overflow-hidden transition-all duration-300 ${
                    isBannerHovered ? "hover:border-yellow-400" : ""
                  }`}
                >
                  <div
                    className={`w-44 h-full bg-gradient-to-br ${type.color} flex items-center justify-center`}
                  >
                    <img
                      src={type.icon}
                      alt={type.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center px-5 py-4 text-left w-full overflow-hidden">
                    <div className="font-bold text-xl gradient-text-pink mb-2">
                      {type.name}
                    </div>
                    <div className="text-base text-gray-800 leading-relaxed whitespace-normal w-full break-words">
                      {type.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MI Explanation Section */}
      <section
        ref={(el) => addToRefs(el, 2)}
        className={`py-20 bg-white transition-all duration-700 delay-100 ease-out ${
          visibleSections.includes(2)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-4xl font-bold mb-16 pl-6 border-l-4 border-blue-500">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Thuyết Đa trí thông minh là gì?
            </span>
          </h2>

          <div className="mb-16 flex flex-col md:flex-row items-start gap-10">
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src="/mi_icons/mi-logo.webp"
                alt="Howard Gardner"
                className="w-full h-auto max-w-[360px] object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="w-full md:w-3/5">
              <h3 className="text-3xl font-semibold mb-6 text-indigo-600">
                Lý thuyết Đa trí thông minh
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-5">
                Lý thuyết Đa trí thông minh (Multiple Intelligences) được Giáo
                sư Howard Gardner đề xuất năm 1983, phản bác quan niệm truyền
                thống về trí thông minh đo bằng IQ. Theo ông, mỗi người đều sở
                hữu nhiều loại trí thông minh khác nhau với mức độ phát triển
                khác nhau.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Thuyết này đã cách mạng hóa giáo dục bằng cách công nhận sự đa
                dạng trong năng lực của con người. Thay vì chỉ tập trung vào trí
                thông minh logic và ngôn ngữ, chúng ta cần phát triển toàn diện
                các loại hình thông minh khác nhau.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl md:text-4xl font-bold gradient-text-pink mb-10 pl-6 border-l-4 border-green-500">
              Ứng dụng của Đa trí thông minh
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
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
                <h3 className="text-xl font-semibold mb-2 text-indigo-800">
                  Giáo dục
                </h3>
                <p className="text-gray-600">
                  Giúp giáo viên thiết kế phương pháp giảng dạy phù hợp với từng
                  học sinh dựa trên loại hình thông minh nổi trội.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">
                  Nghề nghiệp
                </h3>
                <p className="text-gray-600">
                  Định hướng nghề nghiệp phù hợp với loại hình thông minh nổi
                  trội, giúp phát huy tối đa tiềm năng.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                <h3 className="text-xl font-semibold mb-2 text-purple-800">
                  Phát triển bản thân
                </h3>
                <p className="text-gray-600">
                  Nhận biết điểm mạnh để phát huy và điểm yếu để cải thiện, giúp
                  phát triển toàn diện các kỹ năng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Intelligence Types Grid */}
      <section
        ref={(el) => addToRefs(el, 3)}
        className={`py-20 bg-gray-50 transition-all duration-700 delay-100 ease-out ${
          visibleSections.includes(3)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 gradient-text-blue">
            9 Loại hình trí thông minh
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {intelligenceTypes.map((type) => (
              <div
                key={type.name}
                className="flip-card h-64 w-full perspective-1000"
              >
                <div className="flip-card-inner relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
                  <div
                    className={`flip-card-front absolute w-full h-full backface-hidden rounded-2xl ${type.bgColor} p-6 shadow-lg flex flex-col items-center justify-center`}
                  >
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${type.color} mb-4`}
                    >
                      <img
                        src={type.icon}
                        alt={type.name}
                        className="size-16 object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-2xl text-gray-800 mb-1">
                      {type.name}
                    </h3>
                  </div>

                  <div
                    className={`flip-card-back absolute w-full h-full backface-hidden rounded-2xl ${type.bgColor} p-6 shadow-lg transform rotate-y-180 flex flex-col justify-center`}
                  >
                    <h3 className="font-bold text-2xl text-gray-800 mb-2">
                      {type.name}
                    </h3>
                    <p className="font-semibold text-gray-700 text-lg leading-relaxed">
                      {type.description}.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        ref={(el) => addToRefs(el, 4)}
        className={`py-20 bg-white transition-all duration-700 delay-100 ease-out ${
          visibleSections.includes(4)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 gradient-text-pink">
            Làm thế nào để có kết quả chính xác?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border border-gray-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-3xl font-bold">1</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                Trả lời trung thực
              </h3>
              <p className="text-gray-600">
                Chọn đáp án phản ánh đúng nhất con người thật của bạn, không
                phải con người bạn mong muốn
              </p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border border-gray-100">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-purple-600 text-3xl font-bold">2</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                Theo bản năng
              </h3>
              <p className="text-gray-600">
                Hãy chọn theo phản ứng đầu tiên của bạn, đừng phân tích quá
                nhiều
              </p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border border-gray-100">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-pink-600 text-3xl font-bold">3</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                Kiểm tra định kỳ
              </h3>
              <p className="text-gray-600">
                Các loại hình thông minh có thể phát triển thay đổi theo thời
                gian và trải nghiệm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={(el) => addToRefs(el, 5)}
        className={`py-5 bg-gray-50 transition-all duration-700 delay-100 ease-out ${
          visibleSections.includes(5)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center py-10 gradient-text-blue">
            Câu hỏi thường gặp
          </h2>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <button
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(1)}
              >
                <h3 className="text-xl font-bold text-gray-800">
                  Thuyết Đa trí thông minh là gì?
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    activeFAQ === 1 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-6 ${activeFAQ === 1 ? "block" : "hidden"}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  Thuyết Đa trí thông minh (Multiple Intelligences) do Howard
                  Gardner đề xuất năm 1983, cho rằng trí thông minh không chỉ là
                  khả năng logic hay ngôn ngữ mà bao gồm nhiều loại hình khác
                  nhau. Mỗi người đều có những loại hình thông minh nổi trội
                  riêng.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <button
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(2)}
              >
                <h3 className="text-xl font-bold text-gray-800">
                  Có bao nhiêu loại hình trí thông minh?
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    activeFAQ === 2 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-6 ${activeFAQ === 2 ? "block" : "hidden"}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  Ban đầu Gardner đề xuất 7 loại hình (1983), sau đó bổ sung
                  thêm 2 loại nữa (1999), tổng cộng hiện có 9 loại hình trí
                  thông minh: Logic/Toán học, Ngôn ngữ, Không gian, Vận động, Âm
                  nhạc, Xã hội, Nội tâm, Thiên nhiên và Triết học.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <button
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(3)}
              >
                <h3 className="text-xl font-bold text-gray-800">
                  Loại hình thông minh có thay đổi không?
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    activeFAQ === 3 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-6 ${activeFAQ === 3 ? "block" : "hidden"}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  Có, các loại hình thông minh có thể phát triển hoặc thay đổi
                  theo thời gian thông qua rèn luyện và trải nghiệm. Đây là điểm
                  khác biệt quan trọng so với quan niệm truyền thống về IQ
                  thường được coi là ổn định.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <button
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(4)}
              >
                <h3 className="text-xl font-bold text-gray-800">
                  Làm sao để phát triển các loại hình thông minh?
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    activeFAQ === 4 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-6 ${activeFAQ === 4 ? "block" : "hidden"}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  Bạn có thể phát triển từng loại hình thông minh thông qua các
                  hoạt động cụ thể:
                  <br />- Logic: Giải đố, lập trình
                  <br />- Ngôn ngữ: Đọc sách, viết lách
                  <br />- Không gian: Vẽ, thiết kế
                  <br />- Vận động: Thể thao, thủ công
                  <br />- Âm nhạc: Học nhạc cụ
                  <br />- Xã hội: Giao tiếp, teamwork
                  <br />- Nội tâm: Thiền, viết nhật ký
                  <br />- Thiên nhiên: Khám phá thiên nhiên
                  <br />- Triết học: Suy ngẫm các vấn đề trừu tượng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => addToRefs(el, 6)}
        className={`py-24 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 text-white transition-all duration-700 delay-100 ease-out ${
          visibleSections.includes(6)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">
              Sẵn sàng khám phá trí thông minh nổi trội của bạn?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Bài test MI sẽ giúp bạn nhận diện điểm mạnh để phát huy và điểm
              yếu để cải thiện
            </p>
            <Link
              to="/tools/mi/test"
              className="inline-block bg-white hover:bg-gray-100 text-indigo-600 font-bold py-5 px-16 rounded-full text-lg shadow-2xl transition duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                Bắt đầu ngay
                <ArrowRight className="size-6" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Custom CSS */}
      <style>{`
        .gradient-text-blue {
          background: linear-gradient(90deg, #3b82f6 25%, #8b5cf6 75%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .gradient-text-pink {
          background: linear-gradient(90deg, #f472b6 10%, #6366f1 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .animate-floatUp {
          animation: floatUp 3s infinite alternate ease-in-out;
        }
        @keyframes floatUp {
          from { transform: translateY(0) rotate(-2deg); }
          to { transform: translateY(-16px) rotate(2deg); }
        }
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .transition-all {
          transition-property: all;
        }
        .duration-700 {
          transition-duration: 700ms;
        }
        .ease-out {
          transition-timing-function: ease-out;
        }
        .delay-100 {
          transition-delay: 100ms;
        }
        .translate-y-10 {
          transform: translateY(40px);
        }
        .translate-y-0 {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default MIPage;
