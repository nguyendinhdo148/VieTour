import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Rocket,
  Palette,
  DownloadCloud,
  CheckCircle,
  LayoutTemplate,
  Sparkles,
  Award,
  Users,
  Zap,
  ArrowRight,
  Star,
  ChevronDown,
  FileText,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { API } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { User2, LogOut, BriefcaseBusiness, Heart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  // Logout Handler
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${API}/user/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Đăng xuất thành công!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unknown error");
    }
  };

  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/recruiter");
    } else if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  // Framer Motion Variants
  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.15 } },
  };

  // Handle CTA
  const handleCTA = () => {
    navigate("/resume/dashboard-resume");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-indigo-50/20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-8 md:py-16">
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
              : "bg-transparent py-6"
          }`}
        >
          <div className="w-full px-8">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                  VieJobs CV
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden md:flex items-center space-x-8"
              >
                <a
                  href="#features"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
                >
                  Tính Năng
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
                >
                  Quy Trình
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
                >
                  Đánh Giá
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.nav>

              {!user ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden md:flex items-center space-x-4"
                  >
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="font-medium rounded-xl px-6 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 cursor-pointer"
                      >
                        Đăng Nhập
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-medium rounded-xl px-6 shadow-md shadow-indigo-200/50 cursor-pointer">
                        Đăng Ký
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              ) : (
                user?.role === "student" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative cursor-pointer size-10">
                        <Avatar className="w-full h-full">
                          <AvatarImage
                            src={user.profile?.profilePhoto}
                            alt={user.fullname}
                            className="object-cover hover:scale-105 transition-transform duration-200"
                          />
                          <AvatarFallback className="bg-gray-100 text-gray-700">
                            {user.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                          <ChevronDown className="size-2 text-gray-600" />
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                      {/* User Profile Section */}
                      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                        <Avatar className="size-12">
                          <AvatarImage
                            src={user.profile?.profilePhoto}
                            alt={user.fullname}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-100 text-gray-700">
                            {user.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <h4 className="font-medium text-gray-900 truncate">
                            {user.fullname}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Menu Actions */}
                      <div className="mt-3 space-y-1.5">
                        <Button
                          variant="default"
                          className="w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50"
                          asChild
                        >
                          <Link to="/profile">
                            <User2 className="h-4 w-4 text-gray-500" />
                            <span>Xem hồ sơ</span>
                          </Link>
                        </Button>

                        <Button
                          variant="default"
                          className="w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50"
                          asChild
                        >
                          <Link to="/resume/dashboard-resume">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span>CV của tôi</span>
                          </Link>
                        </Button>

                        <Button
                          variant="default"
                          className="w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50"
                          asChild
                        >
                          <Link to="/saved-jobs">
                            <Heart className="h-4 w-4 text-gray-500" />
                            <span>Việc làm đã lưu</span>
                          </Link>
                        </Button>

                        <Button
                          variant="default"
                          className="w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50"
                          asChild
                        >
                          <Link to="/applied-jobs">
                            <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
                            <span>Việc làm đã ứng tuyển</span>
                          </Link>
                        </Button>

                        <Button
                          variant="default"
                          className="cursor-pointer w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={logoutHandler}
                        >
                          <LogOut className="h-4 w-4 text-gray-500" />
                          <span>Đăng xuất</span>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )
              )}
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 pt-14">
          {/* Hero Content */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            {/* Text Content */}
            <motion.div className="w-full md:w-1/2 space-y-8" variants={fadeIn}>
              <motion.div
                className="inline-flex items-center px-5 py-2.5 bg-indigo-100/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-medium shadow-sm"
                variants={fadeIn}
              >
                <Rocket className="w-5 h-5 mr-2 animate-bounce" />
                #1 Công cụ tạo CV tại Việt Nam
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
                variants={fadeIn}
              >
                Tạo CV chuyên nghiệp{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 bg-[length:200%_200%] animate-text-shine">
                  chỉ trong 5 phút
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 md:text-xl md:leading-relaxed"
                variants={fadeIn}
              >
                Thiết kế CV đẹp như designer với các template đa dạng.
                <span className="block mt-2 font-medium text-indigo-600">
                  Tăng 80% cơ hội nhận được phỏng vấn
                </span>
              </motion.p>

              <motion.div className="flex gap-5" variants={fadeIn}>
                <button
                  onClick={handleCTA}
                  className="flex items-center cursor-pointer justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-8 py-5 rounded-2xl hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300 font-semibold transform hover:-translate-y-1"
                >
                  <LayoutTemplate className="w-6 h-6" />
                  Bắt đầu Thiết Kế
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </button>
              </motion.div>

              <motion.div className="pt-8 flex items-center" variants={fadeIn}>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center overflow-hidden shadow-sm"
                    >
                      <img
                        src="user.webp"
                        alt={`User ${i}`}
                        className="object-cover w-[40px] h-[40px] rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Hơn 50,000+ người dùng hài lòng
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div className="w-full md:w-1/2 relative" variants={fadeIn}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-400/10 z-10 rounded-2xl"></div>
                <img
                  src="CV_Template.jpg"
                  alt="Mẫu CV VieJobs"
                  className="w-full rounded-2xl"
                />

                {/* Floating elements */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md flex items-center gap-2 border border-indigo-100">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">ATS Friendly</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md flex items-center gap-2 border border-indigo-100">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full z-0 blur-xl opacity-70"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 rounded-full z-0 blur-xl opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-100 rounded-full z-0 blur-3xl opacity-30"></div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              { value: "50+", label: "Mẫu CV chuyên nghiệp" },
              { value: "50K+", label: "Người dùng hài lòng" },
              { value: "80%", label: "Tỉ lệ nhận phỏng vấn" },
              { value: "24/7", label: "Hỗ trợ khách hàng" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.section
            id="features"
            className="mt-24 md:mt-32 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Công cụ toàn diện cho CV hoàn hảo
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                VieJobs CV cung cấp các công cụ mạnh mẽ giúp bạn tạo CV chuyên
                nghiệp và nổi bật
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Palette className="w-8 h-8 text-indigo-600" />,
                  title: "Thiết kế chuyên nghiệp",
                  desc: "50+ mẫu CV được thiết kế bởi chuyên gia",
                },
                {
                  icon: <DownloadCloud className="w-8 h-8 text-purple-600" />,
                  title: "Xuất file đa dạng",
                  desc: "PDF, DOCX chất lượng cao chỉ 1 click",
                },
                {
                  icon: <CheckCircle className="w-8 h-8 text-green-600" />,
                  title: "Tối ưu ATS",
                  desc: "Định dạng chuẩn cho hệ thống tuyển dụng",
                },
                {
                  icon: <Zap className="w-8 h-8 text-amber-600" />,
                  title: "Gợi ý AI thông minh",
                  desc: "Tự động gợi ý nội dung phù hợp với vị trí",
                },
                {
                  icon: <Users className="w-8 h-8 text-blue-600" />,
                  title: "Đa ngôn ngữ",
                  desc: "Hỗ trợ tiếng Việt, Anh và nhiều ngôn ngữ khác",
                },
                {
                  icon: <Award className="w-8 h-8 text-rose-600" />,
                  title: "Chứng chỉ xác thực",
                  desc: "Tích hợp chứng chỉ và thành tựu vào CV",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100 group hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section
            id="how-it-works"
            className="mt-24 md:mt-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <motion.p
                className="text-indigo-600 uppercase font-medium mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                quy trình đơn giản
              </motion.p>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Tạo CV Chỉ Với 3 Bước Đơn Giản
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Quy trình tạo CV của chúng tôi được thiết kế để đơn giản và hiệu
                quả, giúp bạn tiết kiệm thời gian
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-indigo-200 z-0"></div>
              {[
                {
                  step: "01",
                  title: "Chọn Mẫu CV",
                  description:
                    "Lựa chọn từ hàng chục mẫu CV chuyên nghiệp được thiết kế bởi các chuyên gia.",
                },
                {
                  step: "02",
                  title: "Điền Thông Tin",
                  description:
                    "Nhập thông tin cá nhân, kinh nghiệm làm việc, học vấn và kỹ năng của bạn.",
                },
                {
                  step: "03",
                  title: "Tải Xuống CV",
                  description:
                    "Xem trước, chỉnh sửa và tải xuống CV của bạn dưới dạng PDF chất lượng cao.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 text-center relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white flex items-center justify-center font-bold text-lg absolute -top-6 left-1/2 transform -translate-x-1/2 shadow-lg">
                      {step.step}
                    </div>
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            id="testimonials"
            className="mt-24 md:mt-32 bg-indigo-50/50 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-indigo-600 font-medium mb-3">ĐÁNH GIÁ</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Người Dùng Nói Gì Về Chúng Tôi
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hàng ngàn người đã thành công trong việc tìm kiếm công việc mơ
                ước với VieJobs CV
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Nguyễn Văn A",
                  position: "Senior Developer",
                  content:
                    "VieJobs giúp mình tạo CV cực nhanh và đẹp. Nhờ CV từ VieJobs mà mình đã nhận được offer lương cao từ công ty mơ ước!",
                  rating: 5,
                },
                {
                  name: "Trần Thị B",
                  position: "Marketing Manager",
                  content:
                    "Tôi đã thử nhiều công cụ tạo CV khác nhau, nhưng VieJobs CV là tốt nhất. Giao diện dễ sử dụng và các mẫu CV rất chuyên nghiệp!",
                  rating: 5,
                },
                {
                  name: "Lê Văn C",
                  position: "UI/UX Designer",
                  content:
                    "Là một designer, tôi rất khó tính về thiết kế. Nhưng các mẫu CV của VieJobs thực sự ấn tượng và chuyên nghiệp. Highly recommended!",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        />
                      )
                    )}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mr-4 overflow-hidden flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            className="mt-24 md:mt-32 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-3xl"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center"></div>
            </div>

            <div className="relative p-12 md:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Bắt Đầu Sự Nghiệp Mới Ngay Hôm Nay
                </motion.h2>
                <motion.p
                  className="text-white/90 mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Tạo CV chuyên nghiệp chỉ trong vài phút và tăng cơ hội được
                  mời phỏng vấn
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Button
                    className="bg-white text-indigo-600 cursor-pointer hover:bg-white/90 px-8 py-6 rounded-xl font-medium text-base shadow-lg group"
                    onClick={handleCTA}
                  >
                    Tạo CV Miễn Phí
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent cursor-pointer border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl font-medium text-base"
                  >
                    Tìm Hiểu Thêm
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            className="mt-24 md:mt-32 text-center py-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-4 md:mb-0">
                VieJobs CV
              </div>
              <div className="flex space-x-6">
                <Link
                  to="\"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Về chúng tôi
                </Link>
                <Link
                  to="\"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Liên hệ
                </Link>
                <Link
                  to="\"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Chính sách
                </Link>
                <Link
                  to="\"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Điều khoản
                </Link>
              </div>
            </div>
            <div className="text-gray-600 text-sm mt-6">
              © {new Date().getFullYear()} VieJobs CV - Made with ❤️ in Vietnam
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
