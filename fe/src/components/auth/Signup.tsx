import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "@/utils/constant";
// import { toast } from "sonner";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoading } from "@/redux/authSlice";

type FormData = {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: "student" | "recruiter";
};

type FormErrors = {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  server?: string;
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store: RootState) => store.auth); // Access loading state from Redux store

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
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
    const phoneNumberRegex = /^\+?\d{10,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Họ và tên là bắt buộc";
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      dispatch(setLoading(true)); // Set loading state to true
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", formData.role);

      const res = await axios.post(`${API}/user/register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data && res.data.success) {
        toast.success("Đăng ký thành công!");
        navigate("/login");

        setFormData({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          role: "student",
        });
      } else {
        toast.error(res.data.message || "Đăng ký thất bại.");
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrors((prev) => ({
          ...prev,
          email: "Email này đã được đăng ký. Vui lòng sử dụng email khác.",
        }));
        toast.error("Email đã tồn tại trong hệ thống.");
      } else {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
        setErrors((prev) => ({
          ...prev,
          server: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
        }));
      }
    } finally {
      dispatch(setLoading(false)); // Set loading state to false
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
            <h1 className="font-bold text-2xl my-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Đăng ký để tìm việc thích hợp
            </h1>

            {errors.server && (
              <div className="text-red-500 text-sm mt-2">{errors.server}</div>
            )}
          </div>

          {/* full name */}
          <div className="my-3">
            <Label className="mb-2">Họ và tên</Label>
            <Input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Nhập họ tên"
              className={`border-gray-200 focus:border-gray-300 outline-none focus-visible:ring-0 ${
                errors.fullname ? "border-red-500" : ""
              }`}
            />
            {errors.fullname && (
              <div className="text-red-500 text-sm mt-1">{errors.fullname}</div>
            )}
          </div>

          {/* email */}
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

          {/* phone number */}
          <div className="my-3">
            <Label className="mb-2">Số điện thoại</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+84 "
              className={`border-gray-200 focus:border-gray-300 outline-none focus-visible:ring-0 ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-1">
                {errors.phoneNumber}
              </div>
            )}
          </div>

          {/* password */}
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

          {/* confirm password */}
          <div className="my-3">
            <Label className="mb-2">Nhập lại mật khẩu</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                className={`border-gray-200 focus:border-gray-300 outline-none focus-visible:ring-0 pr-10 w-full ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={formData.role === "recruiter"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* button sign up */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full my-4 cursor-pointer bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-md border border-gray-800 hover:border-gray-700 transition-colors duration-200 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              "Đang đăng nhập..."
            ) : loading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Vui lòng
                đợi...{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 cursor-pointer">
                Đăng ký
              </Button>
            )}
          </Button>
          <span>
            Bạn đã có tài khoản?{" "}
            <Link to="/login">
              <span className="text-blue-600 hover:opacity-80">Đăng nhập</span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
