import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  BriefcaseIcon,
  Users,
  LogOut,
  Menu,
  LayoutDashboard,
  SquareChartGantt,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Quản lý công ty",
      href: "/admin/company",
      icon: Building2,
    },
    {
      name: "Quản lý việc làm",
      href: "/admin/jobs",
      icon: BriefcaseIcon,
    },
    {
      name: "Quản lý bài viết",
      href: "/admin/blogs",
      icon: SquareChartGantt,
    },
    {
      name: "Quản lý người dùng",
      href: "/admin/user",
      icon: Users,
    },
  ];

  // protect route admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
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
        navigate("/login");
        toast.success("Đăng xuất thành công!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Có lỗi xảy ra khi đăng xuất");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r shadow-sm transition-transform duration-200 ease-in-out transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0" // Always show on large screens
        )}
      >
        {/* Profile section */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profile?.profilePhoto} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user?.fullname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-gray-900 truncate">
                {user?.fullname}
              </h2>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-0 w-full p-4 border-t bg-gray-50">
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer w-full gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-200",
          isSidebarOpen ? "lg:pl-64" : "lg:pl-0"
        )}
      >
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
