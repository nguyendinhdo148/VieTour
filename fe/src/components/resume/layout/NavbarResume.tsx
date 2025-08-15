import {
  User2,
  LogOut,
  BriefcaseBusiness,
  Heart,
  ChevronDown,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { API } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NavbarResume = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // logout
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="flex items-center justify-between w-full px-8 h-10">
        <Link to="/resume" className="block">
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
        </Link>

        <div className="flex items-center gap-10">
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
          </motion.nav>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 bg-white text-black hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-md cursor-pointer">
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            user?.role === "student" && (
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
                <PopoverContent
                  align="end"
                  className="w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-100"
                >
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
  );
};

export default NavbarResume;
