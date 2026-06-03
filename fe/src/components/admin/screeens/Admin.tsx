import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users2,
  BriefcaseIcon,
  ChevronRight,
  ArrowUpRight,
  ClipboardList,
  BookOpen,
} from "lucide-react";
import { API } from "@/utils/constant";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardSkeleton from "../components/Skeleton/DashboardSkeleton";
import type { Job } from "@/types/job";
import { StatsCard } from "../components/StatsCard";

const Admin = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [dashboardData, setDashboardData] = useState<{
    todayApplications: number;
    activeJobs: number;
    pendingApplications: number;
    upcomingInterviews: number;
    recentUsers: {
      _id: string;
      fullname: string;
      email: string;
      profile?: {
        profilePhoto?: {
          url: string;
          public_id: string;
        }
      };
      createdAt: string;
    }[];
    popularJobs: Job[];
    yesterdayApplications: number;
    yesterdayActiveJobs: number;
    yesterdayPendingApplications: number;
    yesterdayUpcomingInterviews: number;
    totalUsers: number;
    totalCompanies: number;
    totalJobs: number;
    totalBlogs: number;
  }>({
    todayApplications: 0,
    activeJobs: 0,
    pendingApplications: 0,
    upcomingInterviews: 0,
    recentUsers: [],
    popularJobs: [],
    yesterdayApplications: 0,
    yesterdayActiveJobs: 0,
    yesterdayPendingApplications: 0,
    yesterdayUpcomingInterviews: 0,
    totalUsers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalBlogs: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${API}/admin/overview`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setDashboardData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getPercentChange = (today: number, yesterday: number) => {
    if (yesterday === 0) return today === 0 ? "0%" : "+100%";
    const change = ((today - yesterday) / yesterday) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl p-8 shadow-lg text-white">
        <h1 className="text-3xl font-bold">👋 Xin chào, {user?.fullname}</h1>
        <p className="mt-2 text-indigo-100 font-medium">
          Chào mừng bạn quay trở lại với trang quản trị
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Users2 className="size-8 text-white" />}
          iconBg="bg-gradient-to-br from-indigo-500 to-purple-600"
          label="Tổng người dùng"
          value={dashboardData.totalUsers}
          badge="Hệ thống"
          trend={getPercentChange(
            dashboardData.totalUsers,
            dashboardData.totalUsers - 5
          )}
        />

        <StatsCard
          icon={<BriefcaseIcon className="size-8 text-white" />}
          iconBg="bg-gradient-to-br from-cyan-500 to-blue-600"
          label="Tổng công ty"
          value={dashboardData.totalCompanies}
          badge="Hệ thống"
          trend={getPercentChange(
            dashboardData.totalCompanies,
            dashboardData.totalCompanies - 2
          )}
        />

        <StatsCard
          icon={<ClipboardList className="size-8 text-white" />}
          iconBg="bg-gradient-to-br from-sky-500 to-teal-600"
          label="Tổng tin tuyển dụng"
          value={dashboardData.totalJobs}
          badge="Hệ thống"
          trend={getPercentChange(
            dashboardData.totalJobs,
            dashboardData.totalJobs - 3
          )}
        />

        <StatsCard
          icon={<BookOpen className="size-8 text-white" />}
          iconBg="bg-gradient-to-br from-purple-500 to-pink-500"
          label="Tổng các bài viết"
          value={dashboardData.totalBlogs}
          badge="Hệ thống"
          trend={getPercentChange(
            dashboardData.totalBlogs,
            dashboardData.totalBlogs - 3
          )}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <Card className="lg:col-span-2 rounded-xl border-none shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Người dùng mới
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Tổng: {dashboardData.recentUsers.length} người dùng gần đây /{" "}
                  {dashboardData.totalUsers} tổng cộng
                </p>
              </div>
              <Badge
                variant="outline"
                className="cursor-pointer border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                onClick={() => navigate("/admin/user")}
              >
                Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
              </Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 pl-6">
                    Họ tên
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Ngày tạo
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentUsers.length > 0 ? (
                  dashboardData.recentUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-indigo-50/30 transition-all duration-200"
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-gray-300">
                            <AvatarImage
                              src={
                                user.profile?.profilePhoto?.url|| "/placeholder.svg"
                              }
                            />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 font-medium">
                              {user.fullname.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-semibold text-gray-800">
                            {user.fullname}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 font-medium">
                        {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-10 text-gray-500"
                    >
                      Chưa có người dùng nào gần đây
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Popular Jobs */}
        <Card className="rounded-xl border-none shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="my-3 text-xl font-semibold text-gray-800">
                Tin tuyển dụng nổi bật
              </h2>
              <Badge
                variant="outline"
                className="cursor-pointer border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                onClick={() => navigate("/admin/jobs")}
              >
                Quản lý
              </Badge>
            </div>
          </div>
          <div className="px-5 space-y-4">
            {dashboardData.popularJobs.map((job) => (
              <div
                key={job._id}
                className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {job.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-indigo-100 text-indigo-700 font-medium"
                  >
                    {job.applications?.length || 0} khách hàng
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">{job.location}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-cyan-200 bg-cyan-50 text-cyan-700"
                  >
                    {job.experienceLevel} năm
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-emerald-200 bg-emerald-50 text-emerald-700"
                  >
                    {job.salary}  
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    Cập nhật:{" "}
                    {new Date(job.updatedAt).toLocaleDateString("vi-VN")}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>
                      {(job.applications?.length || 0) * 2.5}% tăng trưởng
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
