import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import axios from "axios";
import { API } from "@/utils/constant";

// ... Điền đây danh sách questions và options như trước ...

const questions = [
  "1. Trong một buổi tiệc, bạn sẽ:",
  "2. Bạn thiên về:",
  "3. Điều gì khiến bạn cảm thấy tệ hơn?",
  "4. Bạn thấy ấn tượng hơn bởi:",
  "5. Bạn dễ bị thuyết phục hơn bởi những sự việc:",
  "6. Bạn thích làm việc:",
  "7. Khi lựa chọn, bạn thường:",
  "8. Tại các buổi gặp mặt, bạn sẽ:",
  "9. Tuýp người nào sẽ thu hút bạn hơn?",
  "10. Bạn hứng thú hơn với những sự việc:",
  "11. Bạn thường đánh giá người khác dựa trên:",
  "12. Khi tiếp cận người khác, bạn thường đánh giá họ dựa trên góc nhìn nào?",
  "13. Bạn thường là người:",
  "14. Sau khi trải qua một kỳ thi, bạn thường:",
  "15. Trong nhóm, bạn thường là người:",
  "16. Cách bạn giải quyết những công việc thường ngày là:",
  "17. Theo bạn, các nhà văn nên:",
  "18. Điều gì thu hút bạn hơn?",
  "19. Bạn cảm thấy thoải mái hơn khi đưa ra nhận xét:",
  "20. Bạn thích những điều:",
  "21. Một phút thật lòng với bản thân nhé. Bạn là người:",
  "22. Khi nói chuyện điện thoại, bạn:",
  "23. Theo bạn, các sự việc và hiện tượng:",
  "24. Những người có tầm nhìn xa:",
  "25. Bạn là người:",
  "26. Bạn cảm thấy tồi tệ hơn khi đối mặt với:",
  "27. Theo bạn, quyết định nên được đưa ra:",
  "28. Khi đi mua sắm, bạn thích cảm giác nào hơn?",
  "29. Trong công ty, bạn là người:",
  "30. Với những kiến thức, quy luật đã được xã hội công nhận, bạn sẽ:",
  "31. Theo bạn, trẻ em thường không:",
  "32. Khi mua xe hơi, bạn nghĩ yếu tố nào quan trọng hơn?",
  "33. Tính cách của bạn nghiêng về:",
  "34. Khả năng nào đáng khâm phục hơn?",
  "35. Bạn mong muốn điều gì hơn ở cấp trên?",
  "36. Khi đối mặt với những vấn đề mới, bạn thường cảm thấy:",
  "37. Tính cách của bạn thiên về:",
  "38. Bạn sẽ quan tâm hơn đến:",
  "39. Điều gì làm bạn thoải mái hơn?",
  "40. Bạn sẽ lựa chọn công việc nào?",
  "41. Bạn thích được điều hướng công việc theo cách:",
  "42. Bạn thường tìm kiếm những điều:",
  "43. Bạn thường kết giao:",
  "44. Điều gì ảnh hưởng tới quyết định của bạn nhiều hơn?",
  "45. Bạn thấy hứng thú hơn với việc:",
  "46. Bạn thường được tán thưởng vì:",
  "47. Bạn thấy điều gì giá trị hơn ở bản thân mình?",
  "48. Bạn đánh giá cao:",
  "49. Bạn thấy nhẹ nhõm hơn:",
  "50. Bạn đánh giá bản thân là người như thế nào?",
  "51. Bạn có xu hướng tin tưởng vào:",
  "52. Bạn thường:",
  "53. Bạn thấy ấn tượng hơn khi tiếp xúc với một người:",
  "54. Bạn đánh giá tính cách nào cao hơn?",
  "55. Theo bạn, mọi chuyện sẽ diễn ra hợp lý hơn nếu:",
  "56. Trong một mối quan hệ:",
  "57. Khi có số lạ gọi tới điện thoại của bạn, bạn sẽ:",
  "58. Bạn đánh giá cao khả năng của mình hơn khi:",
  "59. Bạn bị thu hút hơn với điều gì?",
  "60. Bạn không thích những người:",
  "61. Bạn thuộc tuýp người:",
  "62. Trước một chuyến đi chơi, bạn thường:",
  "63. Trong công việc, bạn thường:",
  "64. Bạn nghĩ mình là người:",
  "65. Khi viết lách, bạn có xu hướng:",
  "66. Là một cấp trên, bạn cảm thấy điều gì khó hơn?",
  "67. Bạn cảm thấy mình cần trở nên:",
  "68. Điều gì khiến bạn khó chấp nhận hơn?",
  "69. Bạn sẽ lựa chọn:",
  "70. Phong cách làm việc của bạn là gì?",
];
const options = [
  [
    "Thoải mái trò chuyện với tất cả mọi người, kể cả người lạ",
    "Chỉ tương tác với những người bạn quen",
  ],
  ["Thực tế hơn là suy đoán", "Suy đoán hơn là thực tế"],
  ["Đầu óc trên mây, viển vông và phi thực tế", "Nhàm chán, đơn điệu"],
  ["Nguyên lý, nguyên tắc", "Cảm xúc, tình cảm"],
  [
    "Logic, dựa trên bằng chứng và lý lẽ",
    "Cảm động, thiên về cảm xúc và tình người",
  ],
  ["Với thời hạn (deadline) rõ ràng", "Tùy hứng, linh hoạt"],
  [
    "Xem xét kỹ lưỡng từ nhiều khía cạnh",
    "Tin vào suy đoán và linh cảm của mình",
  ],
  [
    "Muốn tận hưởng bữa tiệc và ở lại đến cuối cùng",
    "Nhanh chóng thấy mệt mỏi và muốn ra về sớm",
  ],
  ["Người logic và thực tế", "Người có khả năng tưởng tượng phong phú"],
  ["Đã và đang xảy ra", "Có khả năng xảy ra"],
  ["Quy định, nguyên tắc", "Hoàn cảnh cụ thể"],
  ["Khách quan", "Chủ quan"],
  ["Luôn đúng giờ", "Thong thả, linh hoạt về thời gian"],
  [
    "Cảm thấy nhẹ nhõm và bắt đầu lên lịch đi chơi",
    "Lo lắng về kết quả sẽ đạt được",
  ],
  ["Luôn nắm bắt thông tin kịp thời", "Biết thông tin muộn hơn"],
  ["Làm theo cách thông thường", "Làm theo cách của riêng mình"],
  [
    "Viết chính xác những gì họ nghĩ, diễn đạt một cách rõ ràng, nghĩa trên mặt chữ",
    "Diễn đạt bằng biện pháp so sánh, liên tưởng, ví von thâm sâu",
  ],
  ["Tính nhất quán trong tư tưởng", "Mối quan hệ hài hòa giữa người với người"],
  ["Dựa trên logic", "Dựa trên quan điểm, giá trị cá nhân"],
  ["Theo kế hoạch và ổn định", "Linh hoạt và có thể thay đổi"],
  ["Nghiêm túc, quyết đoán", "Dễ tính, thoải mái"],
  [
    "Hiếm khi băn khoăn đến những điều mình sẽ nói",
    "Thường chuẩn bị trước những điều mình sẽ nói",
  ],
  [
    "Tự nói lên bản chất của chính nó",
    "Tồn tại để minh họa cho các quy luật, quy tắc khác",
  ],
  [
    "Ở mức độ nào đó, họ thường gây khó chịu cho người khác",
    "Khá thú vị, lôi cuốn",
  ],
  ["Có cái đầu lạnh", "Có trái tim ấm"],
  ["Sự bất công", "Sự tàn nhẫn"],
  [
    "Dựa trên việc cân nhắc và lựa chọn kỹ lưỡng",
    "Thuận theo tự nhiên, nước chảy mây trôi",
  ],
  ["Đã mua được thứ mình muốn", "Đang trong quá trình lựa chọn"],
  ["Khởi xướng các câu chuyện", "Đợi người khác khởi xướng rồi tham gia vào"],
  ["Tin tưởng không nghi ngờ", "Không ngừng đặt nghi vấn về tính chính xác"],
  [
    "Tự mình phát huy hết năng lực",
    "Khai thác tối đa trí tưởng tượng của mình",
  ],
  ["Nhu cầu sử dụng", "Sở thích cá nhân"],
  ["Cứng rắn", "Mềm mỏng"],
  [
    "Tổ chức và làm việc bài bản, có phương pháp, hệ thống",
    "Dễ dàng thích ứng và linh hoạt trong mọi tình huống",
  ],
  ["Chuyên môn xuất sắc", "Tư duy cởi mở"],
  ["Hào hứng, tràn đầy năng lượng", "Mệt mỏi, nhanh chóng bị hút cạn sức lực"],
  ["Thực tế", "Mơ mộng"],
  [
    "Giá trị thực tế mà một người mang lại",
    "Cảm nhận, suy nghĩ của đối phương",
  ],
  [
    "Thảo luận kỹ lưỡng về một vấn đề (quá trình)",
    "Thống nhất được hướng giải quyết cho một vấn đề (kết quả)",
  ],
  [
    "Công việc bạn không thực sự thích nhưng đem lại thu nhập cao",
    "Công việc mà bạn hằng mơ ước nhưng thu nhập trung bình",
  ],
  [
    "Giao việc trọn gói, bàn giao 100% sau khi hoàn thành",
    "Giao việc hàng ngày, từng bước hoàn thành công việc",
  ],
  ["Được sắp xếp theo thứ tự rõ ràng", "Ngẫu nhiên, tùy hứng"],
  [
    "Với nhiều bạn nhưng không quá thân",
    "Với ít bạn nhưng tình cảm khăng khít",
  ],
  ["Tình hình thực tế", "Nguyên tắc, luật lệ"],
  ["Sản xuất và phân phối", "Thiết kế và nghiên cứu"],
  ["Là người có tư duy logic", "Là người tinh tế, tình cảm"],
  ["Tinh thần kiên định, vững vàng", "Sự toàn tâm, cống hiến"],
  [
    "Tuyên bố cuối cùng, không thay đổi",
    "Tuyên bố mang tính dự kiến, có thể thay đổi",
  ],
  ["Trước khi đưa ra quyết định", "Sau khi đưa ra quyết định"],
  [
    "Tôi có thể dễ dàng bắt chuyện với người lạ",
    "Tôi không có hứng thú trò chuyện với người lạ",
  ],
  ["Kinh nghiệm của mình", "Linh cảm của mình"],
  [
    "Giải quyết vấn đề một cách thực tế và hiệu quả (có thể áp dụng được ngay)",
    "Nghĩ ra những giải pháp sáng tạo và độc đáo (có thể không thực hiện ngay được)",
  ],
  ["Giàu lý trí", "Giàu cảm xúc"],
  ["Sự công bằng", "Sự đồng cảm"],
  ["Được chuẩn bị trước", "Diễn ra tự nhiên"],
  [
    "Điều gì cũng có thể thương lượng và điều chỉnh lại để đạt được sự đồng thuận chung",
    "Nên để mọi chuyện diễn ra tự nhiên, thuận theo hoàn cảnh đưa đẩy",
  ],
  ["Nhấc máy ngay để xem ai đang gọi", "Chần chừ không nghe máy"],
  [
    "Đưa ra quyết định dựa trên số liệu thực tế",
    "Đưa ra quyết định dựa trên trực giác và linh cảm",
  ],
  ["Những nguyên tắc cơ bản", "Những ẩn ý sâu xa"],
  [
    "Quá cảm xúc (dễ bị tình cảm chi phối)",
    "Quá lý trí (không dễ bị ảnh hưởng bởi yếu tố cảm xúc)",
  ],
  [
    "Mạnh mẽ, quyết đoán, không dễ bị thuyết phục",
    "Mềm mỏng, dễ bị thuyết phục, dễ thay đổi quan điểm dưới ảnh hưởng của người khác",
  ],
  ["Lên lịch trình chi tiết, rõ ràng", "Tới đâu hay tới đó"],
  ["Làm việc theo thói quen", "Hay thay đổi, thích thử nghiệm những điều mới"],
  ["Cởi mở, dễ gần", "Kín tiếng, khó đoán"],
  [
    "Viết những áng văn bay bổng (thiên về nghĩa bóng)",
    "Viết về những điều thực tế (thiên về nghĩa đen)",
  ],
  [
    "Hiểu và chia sẻ với cấp dưới",
    "Bỏ qua yếu tố cảm xúc, công việc là quan trọng nhất",
  ],
  ["Lý trí hơn", "Tình cảm hơn"],
  [
    "Hành động thiếu suy nghĩ, gây ra sai phạm lớn",
    "Sự chỉ trích, phê phán nghiêm khắc quá mức",
  ],
  [
    "Sự kiện đã được lên kế hoạch trước",
    "Sự kiện chưa được lên kế hoạch trước",
  ],
  ["Cân nhắc thận trọng", "Tự nhiên, tự phát"],
];

const MBTITest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(70).fill(-1));
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  // Hàm tính MBTI type từ đáp án
  const calculateMBTIType = (answers: number[]): string => {
    const dimensions = [
      ["E", "I"],
      ["S", "N"],
      ["T", "F"],
      ["J", "P"],
    ];

    let mbtiType = "";

    for (let i = 0; i < 4; i++) {
      const startIdx = i * 10;
      const endIdx = startIdx + 10;
      const dimensionAnswers = answers.slice(startIdx, endIdx);
      const typeACount = dimensionAnswers.filter((a) => a === 0).length;
      const typeBCount = dimensionAnswers.filter((a) => a === 1).length;
      mbtiType += typeACount > typeBCount ? dimensions[i][0] : dimensions[i][1];
    }

    return mbtiType;
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    // Nếu chưa phải câu cuối thì tăng câu lên; nếu câu cuối thì tăng để sang bước tiếp theo
    if (currentQuestion < questions.length - 1 && !showSummary) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === questions.length - 1 && !showSummary) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(-1)) {
      alert("Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!");
      return;
    }

    if (!gender) {
      alert("Vui lòng chọn giới tính của bạn!");
      return;
    }

    setIsSubmitting(true);
    try {
      const mbtiType = calculateMBTIType(answers);
      const response = await axios.post(
        `${API}/mbti/advanced-analysis`,
        {
          answers,
          gender,
          mbtiType,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const result = response.data;
      navigate("/tools/mbti/result", { state: { result } });
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Có lỗi xảy ra khi xử lý kết quả. Vui lòng thử lại!");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-blue-500 to-purple-600 text-white py-8 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Làm bài trắc nghiệm MBTI miễn phí
          </h1>
          <p className="text-lg">
            Khám phá tiềm năng bản thân, tỏa sáng năng lực nghề nghiệp
          </p>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Tiến độ: {answeredCount}/{questions.length}
            </span>
            <span className="text-sm font-medium">
              {Math.round((answeredCount / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8">
          {currentQuestion < questions.length ? (
            <>
              {/* Summary toggle button */}
              <button
                onClick={toggleSummary}
                className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                {showSummary ? "Ẩn bảng đáp án" : "Hiển thị bảng đáp án"}
              </button>

              {/* Answers summary */}
              {showSummary && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-bold mb-2">Tổng hợp câu trả lời:</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, index) => (
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
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="text-green-600">●</span> Đã trả lời:{" "}
                    {answeredCount} |<span className="text-red-600"> ●</span>{" "}
                    Chưa trả lời: {questions.length - answeredCount}
                  </div>
                </div>
              )}

              {/* Current question */}
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
                {questions[currentQuestion]}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {options[currentQuestion].map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestion] === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
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
                  Câu {currentQuestion + 1}/{questions.length}
                </span>
                <button
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  onClick={() => {
                    if (currentQuestion < questions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    } else if (currentQuestion === questions.length - 1) {
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
                className="px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50"
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

export default MBTITest;
