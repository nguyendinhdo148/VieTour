import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import { Pointer, RefreshCcw } from "lucide-react";

interface MBTIResultData {
  type: string;
  gender: "male" | "female";
  overview: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  advice: string;
  answerPatterns?: {
    consistency: number;
    decisiveness: number;
    extremeResponses: number;
    neutralCount: number;
    preferenceTrend: string;
  };
}

const MBTI_IMAGES: Record<string, string> = {
  INFP: "/mbti_icons/infp.webp",
  INFJ: "/mbti_icons/infj.webp",
  INTJ: "/mbti_icons/intj.webp",
  INTP: "/mbti_icons/intp.webp",
  ISTJ: "/mbti_icons/istj.webp",
  ISFJ: "/mbti_icons/isfj.webp",
  ISTP: "/mbti_icons/istp.webp",
  ISFP: "/mbti_icons/isfp.webp",
  ESTP: "/mbti_icons/estp.webp",
  ESFP: "/mbti_icons/esfp.webp",
  ENFP: "/mbti_icons/enfp.webp",
  ENTP: "/mbti_icons/entp.webp",
  ESTJ: "/mbti_icons/estj.webp",
  ESFJ: "/mbti_icons/esfj.webp",
  ENFJ: "/mbti_icons/enfj.webp",
  ENTJ: "/mbti_icons/entj.png",
};

// Map MBTI type to detail path (copy from MBTIPage)
const MBTI_DETAIL_PATHS: Record<string, string> = {
  INFP: "/tools/mbti/tinh-cach/infp",
  INFJ: "/tools/mbti/tinh-cach/infj",
  INTJ: "/tools/mbti/tinh-cach/intj",
  INTP: "/tools/mbti/tinh-cach/intp",
  ISTJ: "/tools/mbti/tinh-cach/istj",
  ISFJ: "/tools/mbti/tinh-cach/isfj",
  ISTP: "/tools/mbti/tinh-cach/istp",
  ISFP: "/tools/mbti/tinh-cach/isfp",
  ESTP: "/tools/mbti/tinh-cach/estp",
  ESFP: "/tools/mbti/tinh-cach/esfp",
  ENFP: "/tools/mbti/tinh-cach/enfp",
  ENTP: "/tools/mbti/tinh-cach/entp",
  ESTJ: "/tools/mbti/tinh-cach/estj",
  ESFJ: "/tools/mbti/tinh-cach/esfj",
  ENFJ: "/tools/mbti/tinh-cach/enfj",
  ENTJ: "/tools/mbti/tinh-cach/entj",
};

const MBTIResult = () => {
  const { state } = useLocation();
  const result = state?.result as MBTIResultData | undefined;

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navbar />
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden my-8 p-8 text-center">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg inline-block mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Không tìm thấy kết quả
          </h2>
          <p className="text-gray-600 mb-6">
            Vui lòng làm bài kiểm tra trước khi xem kết quả
          </p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition shadow-md"
            onClick={() => (window.location.href = "/mbti-test")}
          >
            Làm bài kiểm tra ngay
          </button>
        </div>
      </div>
    );
  }

  const mbtiImage = MBTI_IMAGES[result.type] || "/mbti_icons/default.webp";
  const mbtiDetailPath = MBTI_DETAIL_PATHS[result.type];

  // Helper function to clean text (remove markdown symbols)
  const cleanText = (text: string) => {
    return text
      .replace(/\*\*/g, "") // Remove bold markers **
      .replace(/^[-*•]\s*/, "") // Remove bullet points at start
      .trim();
  };

  const renderFormattedText = (text: string) => {
    return text.split("\n").map((paragraph, i) =>
      paragraph.trim() ? (
        <p key={i} className="mb-4 text-gray-700 leading-relaxed text-justify">
          {cleanText(paragraph)}
        </p>
      ) : null
    );
  };

  const getDimensionInfo = (type: string) => {
    const dimensions: Record<
      string,
      {
        title: string;
        description: string;
        icon: React.ReactNode;
        color: string;
      }
    > = {
      E: {
        title: "Hướng ngoại",
        description:
          "Năng động, hoạt bát, thích giao tiếp xã hội, được tiếp thêm năng lượng khi tương tác với người khác",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
        color: "text-blue-500",
      },
      I: {
        title: "Hướng nội",
        description:
          "Suy tư, độc lập, thích không gian riêng, được tiếp thêm năng lượng khi ở một mình",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
        color: "text-indigo-500",
      },
      S: {
        title: "Giác quan",
        description:
          "Thực tế, cụ thể, tập trung vào hiện tại, chú ý đến chi tiết và thông tin thực tế",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        ),
        color: "text-green-500",
      },
      N: {
        title: "Trực giác",
        description:
          "Sáng tạo, tưởng tượng, hướng tới tương lai, tập trung vào bức tranh tổng thể và khả năng",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ),
        color: "text-purple-500",
      },
      T: {
        title: "Lý trí",
        description:
          "Logic, khách quan, quyết định dựa trên phân tích và các nguyên tắc công bằng",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ),
        color: "text-red-500",
      },
      F: {
        title: "Cảm xúc",
        description:
          "Đồng cảm, hài hòa, quyết định dựa trên giá trị cá nhân và tác động đến con người",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        ),
        color: "text-pink-500",
      },
      J: {
        title: "Nguyên tắc",
        description:
          "Có kế hoạch, quyết đoán, ngăn nắp, thích sự kiểm soát và kết cấu rõ ràng",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        ),
        color: "text-yellow-500",
      },
      P: {
        title: "Linh hoạt",
        description:
          "Tự do, thích ứng, linh hoạt, thích sự tự phát và giữ các lựa chọn mở",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        ),
        color: "text-teal-500",
      },
    };

    return (
      dimensions[type] || {
        title: "",
        description: "",
        icon: null,
        color: "",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Result Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-20">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 0C44.77 0 0 44.77 0 100C0 155.23 44.77 200 100 200C155.23 200 200 155.23 200 100C200 44.77 155.23 0 100 0ZM100 180C55.94 180 20 144.06 20 100C20 55.94 55.94 20 100 20C144.06 20 180 55.94 180 100C180 144.06 144.06 180 100 180Z"
                fill="white"
              />
              <path
                d="M100 40C67.19 40 40 67.19 40 100C40 132.81 67.19 160 100 160C132.81 160 160 132.81 160 100C160 67.19 132.81 40 100 40ZM100 140C78.95 140 60 121.05 60 100C60 78.95 78.95 60 100 60C121.05 60 140 78.95 140 100C140 121.05 121.05 140 100 140Z"
                fill="white"
              />
              <path
                d="M100 80C89.54 80 80 89.54 80 100C80 110.46 89.54 120 100 120C110.46 120 120 110.46 120 100C120 89.54 110.46 80 100 80Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="relative z-10 text-center">
            {/* Thêm hình ảnh MBTI ở đây */}
            <div className="flex justify-center mb-4">
              <img
                src={mbtiImage}
                alt={`MBTI ${result.type}`}
                className="w-32 h-48 object-cover rounded-lg border-4 border-white shadow-lg"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Kết Quả Trắc Nghiệm MBTI
            </h1>
            <div className="text-7xl font-extrabold my-6 text-white/90">
              {result.type}
            </div>
            <p className="text-xl font-medium">
              Loại tính cách của bạn là{" "}
              {result.gender === "male" ? "nam" : "nữ"}
            </p>
          </div>
        </div>

        {/* Personality Dimensions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {result.type.split("").map((dimension, i) => {
            const { title, description, icon, color } =
              getDimensionInfo(dimension);
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`text-3xl font-bold text-center ${color} mb-3`}>
                  {dimension}
                </div>
                <div className="flex justify-center mb-3">
                  <div
                    className={`p-3 rounded-full bg-opacity-10 ${color.replace(
                      "text",
                      "bg"
                    )}`}
                  >
                    {icon}
                  </div>
                </div>
                <h3 className="font-semibold text-center text-lg mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Overview Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-3 h-10 bg-indigo-600 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Tổng Quan Tính Cách
            </h2>
          </div>
          <div className="prose max-w-none text-gray-700 text-justify">
            {renderFormattedText(result.overview)}
          </div>
        </section>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Strengths */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-3 h-10 bg-green-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Điểm Mạnh Nổi Bật
              </h2>
            </div>
            <ul className="space-y-4">
              {result.strengths
                .filter((s) => s && s.trim() !== "")
                .map((strength, i) => {
                  return (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700 leading-relaxed">
                        {cleanText(strength)}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </section>

          {/* Weaknesses */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-3 h-10 bg-red-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Điểm Cần Cải Thiện
              </h2>
            </div>
            <ul className="space-y-4">
              {result.weaknesses.map((weakness, i) => {
                return (
                  <li key={i} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-[-1px]">⚠️</span>
                    <span className="text-gray-700">{cleanText(weakness)}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        {/* Career Recommendations */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-3 h-10 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Nghề Nghiệp Phù Hợp
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(Array.isArray(result.careers)
              ? result.careers
              : [result.careers]
            ).map((career, i) => (
              <div
                key={i}
                className="bg-blue-50 p-5 rounded-xl border border-blue-200 hover:border-blue-400 transition-all hover:shadow-md group"
              >
                <div className="flex items-center">
                  <span className="text-blue-500 mr-3 group-hover:text-blue-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-blue-800 group-hover:text-blue-900 transition-colors">
                    {cleanText(career)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Development Advice */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-3 h-10 bg-purple-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Lời Khuyên Phát Triển
            </h2>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <div className="prose max-w-none text-gray-700">
              {renderFormattedText(result.advice)}
            </div>
          </div>
        </section>

        {/* Answer Patterns (if available) */}
        {result.answerPatterns && (
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-3 h-10 bg-gray-600 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Phân Tích Kiểu Trả Lời
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tính Nhất Quán
                </h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${result.answerPatterns.consistency * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    {Math.round(result.answerPatterns.consistency * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Mức độ nhất quán trong các câu trả lời của bạn
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Quyết Đoán
                </h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{
                        width: `${result.answerPatterns.decisiveness * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    {Math.round(result.answerPatterns.decisiveness * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Khả năng đưa ra quyết định rõ ràng trong trả lời
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-purple-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  Xu Hướng Trả Lời
                </h3>
                <p className="text-lg font-medium text-gray-700 capitalize mb-2">
                  {result.answerPatterns.preferenceTrend}
                </p>
                <p className="text-sm text-gray-500">
                  Xu hướng chung trong cách bạn trả lời các câu hỏi
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Share & Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          <Link
            to={mbtiDetailPath}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <div className="flex items-center gap-2">
              <Pointer className="size-6" />
              Chi tiết tính cách
            </div>
          </Link>
          <Link
            to={"/tools/mbti/test"}
            className="px-8 py-4 bg-white border-2 border-indigo-500 text-indigo-600 font-medium rounded-xl shadow-md hover:bg-indigo-50 transition-all flex items-center justify-center cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <RefreshCcw className="size-6" />
              Làm Lại Trắc Nghiệm
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Kết quả này chỉ mang tính chất tham khảo, không phải là chẩn đoán
            tâm lý chuyên nghiệp.
          </p>
          <p className="mt-1">
            MBTI là công cụ giúp bạn hiểu rõ hơn về bản thân và phát triển cá
            nhân.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MBTIResult;
