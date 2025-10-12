import { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { API } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Upload } from "lucide-react";
import Navbar from "../shared/Navbar";

const ResumeReview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setFeedback("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFeedback("");
    if (!file) {
      setError("Vui lòng chọn file PDF CV để phân tích.");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Chỉ hỗ trợ file PDF.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${API}/ai/resume-review`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFeedback(res.data.feedback || "Không nhận được phản hồi từ AI.");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "isAxiosError" in err &&
        (err as AxiosError).isAxiosError &&
        (err as AxiosError).response &&
        (err as AxiosError).response?.data
      ) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        setError(
          axiosErr.response?.data?.message || "Có lỗi xảy ra khi phân tích CV."
        );
      } else {
        setError("Có lỗi xảy ra khi phân tích CV.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatFeedbackText = (text: string) => {
    const lines = text.split("\n");
    const formattedContent: React.JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Dòng trống → khoảng cách nhỏ
      if (trimmed === "") {
        formattedContent.push(<div key={index} className="h-1" />);
        return;
      }

      // Tiêu đề chính (I. / II. / III. / ...)
      if (/^[IVX]+\./.test(trimmed)) {
        formattedContent.push(
          <h3
            key={index}
            className="font-bold text-[17px] text-gray-900 mt-3 mb-1"
          >
            {trimmed}
          </h3>
        );
        return;
      }

      // Tiêu đề phụ dạng **...**
      if (/^\*\*(.+)\*\*$/.test(trimmed)) {
        formattedContent.push(
          <p
            key={index}
            className="font-semibold text-[15px] text-gray-800 mt-2 mb-1"
          >
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
        return;
      }

      // Bullet point (- hoặc *)
      if (/^[-*]\s+/.test(trimmed)) {
        const content = trimmed.replace(/^[-*]\s+/, "");

        // Xử lý chữ đậm trong bullet (giữa dòng hoặc nhiều lần)
        const parts = content.split("**");
        const formattedLine = parts.map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="font-bold text-gray-900">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        );

        formattedContent.push(
          <div key={index} className="flex items-start ml-4 mb-1">
            <span className="mr-2 mt-[-2px] text-gray-700 select-none">-</span>
            <p className="text-[15px] text-gray-800 leading-snug">
              {formattedLine}
            </p>
          </div>
        );
        return;
      }

      // Các dòng có **đậm** trong câu
      if (trimmed.includes("**")) {
        const parts = trimmed.split("**");
        const formattedLine = parts.map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="font-bold text-gray-900">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        );

        formattedContent.push(
          <p
            key={index}
            className="text-[15px] text-gray-800 mb-1 leading-snug"
          >
            {formattedLine}
          </p>
        );
        return;
      }

      // Mặc định: dòng thường
      formattedContent.push(
        <p key={index} className="text-[15px] text-gray-800 mb-1 leading-snug">
          {trimmed}
        </p>
      );
    });

    return formattedContent;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Panel - Resume Review (Compact) */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Upload className="size-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-2xl text-white">
                        Phân tích CV
                      </h2>
                      <p className="text-teal-100 text-sm">Powered by AI</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tải CV của bạn lên
                      </label>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-teal-400 transition-colors">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                              disabled={loading}
                            />
                          </div>
                          {file && (
                            <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                              <p className="text-xs text-green-700 font-medium">
                                ✓ {file.name}
                              </p>
                            </div>
                          )}
                          {!file && (
                            <p className="text-xs text-gray-500 mt-2">
                              Chỉ hỗ trợ file PDF (tối đa 5MB)
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="cursor-pointer w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                          disabled={loading || !file}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Đang phân tích...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Phân tích
                            </>
                          )}
                        </Button>
                      </form>

                      {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-xl font-medium text-gray-700 mb-3">
                        Tính năng:
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                          Phân tích cấu trúc CV
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                          Đánh giá nội dung
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                          Gợi ý cải thiện
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Analysis Results */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <FileText className="size-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-2xl text-white">
                        Kết quả phân tích
                      </h2>
                      <p className="text-blue-100 text-sm">
                        Chi tiết và gợi ý cải thiện
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-0 h-[calc(100%-5rem)]">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-700">
                          Đang phân tích CV...
                        </p>
                        <p className="text-sm text-gray-500">
                          Vui lòng đợi trong giây lát
                        </p>
                      </div>
                    </div>
                  ) : feedback ? (
                    <div className="h-full overflow-y-auto p-6">
                      <div className="prose prose-sm max-w-none">
                        {formatFeedbackText(feedback)}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center p-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          Sẵn sàng phân tích CV
                        </h3>
                        <p className="text-sm text-gray-500 max-w-sm">
                          Tải CV lên và nhấp vào "Phân tích" để nhận được đánh
                          giá chi tiết và gợi ý cải thiện từ AI
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;
