import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  User2,
  LogOut,
  BriefcaseBusiness,
  Heart,
  ChevronDown,
  FileText,
  PiggyBank,
  Smartphone,
  LineChart,
  Coins,
  Brain,
  NotebookPen,
  Share2,
  SquareChartGantt,
  BrainCog,
  SquareRadical,
  ChartSpline,
  ChartScatter,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { API } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { useState } from "react";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openBlogMenu, setOpenBlogMenu] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${API}/user/logout`,
        {},
        {
          withCredentials: true,
        }
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

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow">
      <div className="flex items-center justify-between w-full px-6 h-18">
        <div className="mb-1">
          <Link to="/" className="block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="flex flex-col items-start">
                <img
                  src="/vj1.png"
                  alt="VieJobs Logo"
                  className="h-12 w-auto max-w-[160px] object-contain"
                />
                <p className="text-sm text-gray-600 italic font-medium leading-tight">
                  Kết nối nhanh – Phát triển bền
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
            >
              Trang chủ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to={"/jobs"}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
            >
              Việc làm
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <HoverCard openDelay={100} closeDelay={300}>
              <HoverCardTrigger asChild>
                <span className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group cursor-pointer px-2 py-1">
                  Công cụ
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </HoverCardTrigger>

              <HoverCardContent
                align="center"
                sideOffset={12} // tạo khoảng cách dropdown với trigger
                className="relative w-[450px] grid grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
              >
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
                            border-l-8 border-r-8 border-b-8 border-l-transparent 
                            border-r-transparent border-b-gray-200"
                ></div>

                {/* Cột 1 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                    Hỗ trợ ứng viên
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="/tools/resume-review"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <FileText className="w-4 h-4 text-indigo-500" />
                        Phân tích CV
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/mbti"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <Brain className="w-4 h-4 text-indigo-500" />
                        Trắc nghiệm MBTI
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/mi"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <BrainCog className="w-4 h-4 text-indigo-500" />
                        Trắc nghiệm MI
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/gross-net"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <Coins className="w-4 h-4 text-indigo-500" />
                        Tính lương Gross/Net
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Cột 2 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                    Tiện ích khác
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="/tools/personal-tax"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <SquareRadical className="w-4 h-4 text-indigo-500" />
                        Tính thuế cá nhân
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/compound-interest"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <LineChart className="w-4 h-4 text-indigo-500" />
                        Tính lãi suất kép
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/unemployment-insurance"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <ChartSpline className="w-4 h-4 text-indigo-500" />
                        Tính BHTN
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/social-insurance"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <ChartScatter className="w-4 h-4 text-indigo-500" />
                        Tính BHXH
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/saving-plan"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <PiggyBank className="w-4 h-4 text-indigo-500" />
                        Kế hoạch tiết kiệm
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tools/mobile-app"
                        className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                      >
                        <Smartphone className="w-4 h-4 text-indigo-500" />
                        Tải ứng dụng di động
                      </Link>
                    </li>
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Link
              to={"/blog"}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
            >
              Góc chia sẻ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to={"/resume"}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
            >
              Tạo CV
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
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
              <div className="flex items-center gap-3">
                <NotificationBell />
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative cursor-pointer size-10">
                      <Avatar className="w-full h-full">
                        <AvatarImage
                          src={user.profile?.profilePhoto?.url}
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
                          src={user.profile?.profilePhoto?.url}
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

                      <div>
                        <Button
                          className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium cursor-pointer"
                          onClick={() => setOpenBlogMenu(!openBlogMenu)}
                        >
                          <span className="flex items-center gap-3">
                            <Share2 className="h-4 w-4 text-gray-500" />
                            Góc Chia Sẻ
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${
                              openBlogMenu ? "rotate-180" : ""
                            }`}
                          />
                        </Button>

                        {openBlogMenu && (
                          <div className="pl-9 mt-1 space-y-1 text-sm">
                            <Link
                              to="/blog/manager-blogs"
                              className="block text-gray-700 hover:text-indigo-600 transition"
                            >
                              <div className="flex items-center gap-2">
                                <SquareChartGantt className="h-4 w-4 text-gray-500" />
                                <span>Quản lý bài viết</span>
                              </div>
                            </Link>
                            <Link
                              to="/blog/create-blog"
                              className="block text-gray-700 hover:text-indigo-600 transition"
                            >
                              <div className="flex items-center gap-2">
                                <NotebookPen className="h-4 w-4 text-gray-500" />
                                <span>Tạo bài viết</span>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>

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
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
