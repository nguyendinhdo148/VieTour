import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoading, setUser } from "@/redux/authSlice";

type FormData = {
  email: string;
  password: string;
  role: "student" | "recruiter" | "admin";
};

type FormErrors = {
  email?: string;
  password?: string;
  role?: string;
  server?: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store: RootState) => store.auth);

  // Kiểm tra email có phải admin không
  const emailNamePart = formData.email.split("@")[0].toLowerCase();
  const isAdmin = emailNamePart.includes("admin");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // Nếu đổi email thành admin, reset role
      if (name === "email") {
        const emailPart = value.split("@")[0].toLowerCase();
        if (emailPart.includes("admin")) {
          updatedData.role = "admin";
        }
      }
      return updatedData;
    });

    // Xóa lỗi tương ứng khi sửa input
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Nếu không phải admin thì role là bắt buộc
    if (!isAdmin && !formData.role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }

    // Mật khẩu bắt buộc với user không phải admin
    if (!isAdmin) {
      if (!formData.password) {
        newErrors.password = "Mật khẩu là bắt buộc";
      } else if (formData.password.length < 8) {
        newErrors.password =
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    dispatch(setLoading(true));

    try {
      const res = await axios.post(`${API}/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        server: "Email hoặc mật khẩu hoặc role không đúng. Vui lòng thử lại.",
      }));
    } finally {
      dispatch(setLoading(false));
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          {/* Header section */}
          <div className="text-center mb-6">
            <img
              src="vj1.png"
              alt="VieJobs Logo"
              className="h-full w-auto max-w-[170px] mx-auto object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-700">
              Chào mừng bạn đã quay trở lại
            </h1>
            <h1 className="font-bold text-2xl mb-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Đăng nhập để tìm quán ăn thích hợp
            </h1>

            {errors.server && (
              <div className="text-red-500 text-sm mt-2">{errors.server}</div>
            )}
          </div>

          {/* Email */}
          <div className="my-3">
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className={`border-gray-200 focus:border-gray-300 outline-none focus-visible:ring-0 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="my-3">
            <Label className="mb-2">Mật khẩu</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                className={`border-gray-200 focus:border-gray-300 outline-none focus-visible:ring-0 pr-10 w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          {/* Chọn role (ẩn nếu admin) */}
          {!isAdmin && (
            <div className="flex items-center justify-between">
              <RadioGroup className="flex flex-row items-center gap-8 my-3">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                    className="cursor-pointer size-4"
                  />
                  <Label
                    htmlFor="student"
                    className="whitespace-nowrap font-medium"
                  >
                    khách hàng
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={formData.role === "recruiter"}
                    onChange={handleChange}
                    className="cursor-pointer h-4 w-4"
                  />
                  <Label
                    htmlFor="recruiter"
                    className="whitespace-nowrap font-medium"
                  >
                    Nhà tuyển dụng
                  </Label>
                </div>
              </RadioGroup>
              {errors.role && (
                <div className="text-red-500 text-sm mt-1">{errors.role}</div>
              )}
            </div>
          )}

          {/* Forgot password link */}
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full my-4 cursor-pointer bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-md border border-gray-800 hover:border-gray-700 transition-colors duration-200 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting || loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>

          <div className="text-center">
            <span>
              Bạn chưa có tài khoản?{" "}
              <Link to="/signup">
                <span className="text-blue-600 hover:opacity-80">Đăng ký</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
