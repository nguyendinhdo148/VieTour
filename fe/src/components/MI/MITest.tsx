import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import axios from "axios";
import { API } from "@/utils/constant";
import toast from "react-hot-toast";
import { questionsMI } from "@/lib/questionsMI";

const intelligenceCategories = [
  { name: "Vận động", start: 1, end: 6 },
  { name: "Âm nhạc", start: 7, end: 12 },
  { name: "Thiên nhiên", start: 13, end: 18 },
  { name: "Không gian", start: 19, end: 24 },
  { name: "Triết học", start: 25, end: 30 },
  { name: "Ngôn ngữ", start: 31, end: 36 },
  { name: "Xã hội", start: 37, end: 42 },
  { name: "Nội tâm", start: 43, end: 48 },
  { name: "Logic", start: 49, end: 56 },
];

const MITest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questionsMI.length).fill(-1)
  );
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  // Hàm tính điểm cho từng loại trí thông minh
  const calculateMIScores = (answers: number[]): Record<string, number> => {
    const scores: Record<string, number> = {};

    intelligenceCategories.forEach((category) => {
      let sum = 0;
      for (let i = category.start - 1; i < category.end; i++) {
        sum += answers[i] !== -1 ? answers[i] + 1 : 0; // Chuyển từ 0-4 thành 1-5
      }
      scores[category.name] = sum;
    });

    return scores;
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    // Tự động chuyển câu tiếp theo nếu không phải là câu cuối
    if (currentQuestion < questionsMI.length - 1 && !showSummary) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === questionsMI.length - 1 && !showSummary) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(-1)) {
      toast.error("Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!");
      return;
    }

    if (!gender) {
      toast.error("Vui lòng chọn giới tính của bạn!");
      return;
    }

    setIsSubmitting(true);
    try {
      const miScores = calculateMIScores(answers);

      // Tìm loại hình thông minh nổi trội nhất
      let dominantIntelligence = "";
      let maxScore = 0;
      for (const [intelligence, score] of Object.entries(miScores)) {
        if (score > maxScore) {
          maxScore = score;
          dominantIntelligence = intelligence;
        }
      }

      const response = await axios.post(
        `${API}/mi/advanced-analysis`,
        {
          answers,
          gender,
          miScores,
          dominantIntelligence,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      const result = await response.data;
      navigate("/tools/mi/result", { state: { result } });
    } catch (error) {
      console.error("Error submitting test:", error);
      toast.error("Có lỗi xảy ra khi xử lý kết quả. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const answeredCount = answers.filter((answer) => answer !== -1).length;

  // Lấy màu sắc cho từng loại trí thông minh
  const getCategoryColor = (categoryName: string): string => {
    const colors: Record<string, string> = {
      "Vận động": "bg-red-100 text-red-800",
      "Âm nhạc": "bg-yellow-100 text-yellow-800",
      "Thiên nhiên": "bg-green-100 text-green-800",
      "Không gian": "bg-purple-100 text-purple-800",
      "Triết học": "bg-gray-100 text-gray-800",
      "Ngôn ngữ": "bg-blue-100 text-blue-800",
      "Xã hội": "bg-pink-100 text-pink-800",
      "Nội tâm": "bg-indigo-100 text-indigo-800",
      Logic: "bg-teal-100 text-teal-800",
    };
    return colors[categoryName] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-6">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white py-8 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Làm bài trắc nghiệm Đa trí thông minh MI
          </h1>
          <p className="text-lg">
            Khám phá loại hình thông minh nổi trội của bạn
          </p>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Tiến độ: {answeredCount}/{questionsMI.length}
            </span>
            <span className="text-sm font-medium">
              {Math.round((answeredCount / questionsMI.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(answeredCount / questionsMI.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8">
          {currentQuestion < questionsMI.length ? (
            <>
              {/* Summary toggle button */}
              <button
                onClick={toggleSummary}
                className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                {showSummary ? "Ẩn bảng trả lời" : "Hiển thị bảng trả lời"}
              </button>

              {/* Answers summary */}
              {showSummary && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-bold mb-2">Tổng hợp câu trả lời:</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {questionsMI.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentQuestion(index);
                          setShowSummary(false);
                        }}
                        className={`p-2 rounded text-center text-sm ${
                          answers[index] === -1
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        Câu {index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Phân loại câu hỏi:</h4>
                    <div className="flex flex-wrap gap-2">
                      {intelligenceCategories.map((category) => (
                        <span
                          key={category.name}
                          className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(
                            category.name
                          )}`}
                        >
                          {category.name} ({category.start}-{category.end})
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="text-green-600">●</span> Đã trả lời:{" "}
                    {answeredCount} |<span className="text-red-600"> ●</span>{" "}
                    Chưa trả lời: {questionsMI.length - answeredCount}
                  </div>
                </div>
              )}

              {/* Current question */}
              <div className="min-h-[120px] flex items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {questionsMI[currentQuestion]}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {[0, 1, 2, 3, 4].map((optionIndex) => (
                  <button
                    key={optionIndex}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestion] === optionIndex
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleAnswer(optionIndex)}
                  >
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-sm font-medium ${
                          answers[currentQuestion] === optionIndex
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {optionIndex + 1}
                      </span>
                      <span>
                        {optionIndex === 0 && "Hoàn toàn sai"}
                        {optionIndex === 1 && "Thường là sai"}
                        {optionIndex === 2 && "Không rõ ràng"}
                        {optionIndex === 3 && "Đôi lúc đúng"}
                        {optionIndex === 4 && "Hoàn toàn đúng"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Quay lại
                </button>
                <span className="text-gray-500 self-center">
                  Câu {currentQuestion + 1}/{questionsMI.length}
                </span>
                <button
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  onClick={() => {
                    if (currentQuestion < questionsMI.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    } else if (currentQuestion === questionsMI.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    }
                  }}
                  disabled={false}
                >
                  Tiếp theo
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">
                Vui lòng lựa chọn giới tính của bạn
              </h2>
              <p className="mb-6 text-gray-600">
                Hình ảnh minh hoạ tính cách sẽ thay đổi tuỳ theo giới tính bạn
                chọn
              </p>

              <div className="flex justify-center gap-6 mb-8">
                <button
                  className={`px-6 py-3 rounded-lg border-2 ${
                    gender === "male"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  } transition`}
                  onClick={() => setGender("male")}
                >
                  Nam
                </button>
                <button
                  className={`px-6 py-3 rounded-lg border-2 ${
                    gender === "female"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200"
                  } transition`}
                  onClick={() => setGender("female")}
                >
                  Nữ
                </button>
              </div>

              <button
                className="px-6 py-3 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition disabled:opacity-50"
                onClick={handleSubmit}
                disabled={isSubmitting || !gender}
              >
                {isSubmitting ? "Đang xử lý..." : "Xem kết quả"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MITest;
