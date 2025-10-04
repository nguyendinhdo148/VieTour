import { Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import logo from "/public/vj1.png";

const ForgotPassword = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    if (!email) {
      setError("Vui lòng nhập email.");
      return;
    }

    try {
      const res = await axios.post(`${API}/user/forgot-password`, { email });

      if (res.data.success) {
        setMessage(
          "Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư."
        );
      } else {
        setError(res.data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Không thể kết nối đến máy chủ."
        );
      } else {
        setError("Không thể kết nối đến máy chủ.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left: Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          {/* Logo */}
          <div className="mb-3">
            <img
              src={logo}
              alt="VieJobs Logo"
              className="h-12 w-auto mx-auto max-w-[160px] object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-green-500 mb-4 text-center">
            Quên mật khẩu
          </h2>

          {/* Description */}
          <p className="text-[14px] text-gray-700 mb-6 text-center">
            Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-green-600" />
              </div>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="pl-10 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full py-3 mt-2 text-white cursor-pointer bg-green-600 hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Gửi liên kết
          </Button>
          {message && (
            <p className="text-green-600 text-sm mt-3 text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
          )}

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            Bằng việc tiếp tục, bạn đồng ý với{" "}
            <Link to="/terms" className="text-green-600 hover:underline">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link to="/privacy" className="text-green-600 hover:underline">
              Chính sách bảo mật
            </Link>{" "}
            của chúng tôi
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">hoặc</span>
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="flex flex-col space-y-3 text-sm">
            <Link
              to="/login"
              className="text-center text-green-600 hover:text-green-700 hover:underline font-medium"
            >
              Quay lại đăng nhập
            </Link>
            <p className="text-center text-gray-500">
              Chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-green-600 hover:text-green-700 hover:underline font-medium"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            Bạn gặp khó khăn? Liên hệ{" "}
            <a
              href="tel:0988514528"
              className="text-green-600 font-medium hover:underline"
            >
              (+84) 8851 4528
            </a>{" "}
            (giờ hành chính)
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} VieJobs Vietnam JSC.
          </p>
        </div>
      </div>

      {/* Right: Branding Section */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#0a5c36] via-[#1a7a4c] to-[#28a76a] text-white w-1/2 px-16 relative overflow-hidden">
        {/* Hiệu ứng ánh sáng */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>

        <div className="max-w-md relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="VieJobs Logo"
              className="h-full w-auto max-w-[240px] object-contain drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* Slogan */}
          <h2 className="text-3xl font-bold text-center leading-tight mb-6 relative">
            <span className="text-white/95 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)]">
              Kết nối nhanh
            </span>
            <br />
            <span className="text-[#c1f0d4] drop-shadow-[2px_2px_1px_rgba(0,0,0,0.25)]">
              Phát triển bền
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-center text-[#e0f8ec] mb-8 drop-shadow-[1.5px_1.5px_1px_rgba(0,0,0,0.2)]">
            Hệ sinh thái nhân sự tiên phong ứng dụng công nghệ AI tại Việt Nam
          </p>

          {/* Testimonial */}
          <div className="mt-8">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 shadow-lg">
              <div className="flex flex-col items-center text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Kết nối tài năng - Kiến tạo tương lai
                </h3>
                <p className="text-white/80">
                  Nền tảng tuyển dụng thông minh hàng đầu Việt Nam
                </p>
              </div>
              <p className="text-white/90 italic">
                "VieJobs đã giúp hơn 10,000 ứng viên tìm được công việc mơ ước
                chỉ sau 2 tuần!"
              </p>
            </div>
          </div>
        </div>

        {/* Hiệu ứng hạt */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
