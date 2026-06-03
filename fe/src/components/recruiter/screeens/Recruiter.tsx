  import { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { RootState } from "@/redux/store";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import {
    Users2,
    BriefcaseIcon,
    ChevronRight,
    ArrowUpRight,
    TrendingDown,
    TrendingUp,
    Minus,
    UserCheck,
  } from "lucide-react";
  import { API } from "@/utils/constant";
  import { Badge } from "@/components/ui/badge";
  import { Card, CardContent } from "@/components/ui/card";
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
  import type { Application } from "@/types/application";
  import type { Job } from "@/types/job";

  const Recruiter = () => {
    const { user } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [dashboardData, setDashboardData] = useState<{
      todayApplications: number;
      activeJobs: number;
      pendingApplications: number;
      upcomingInterviews: number;
      recentApplications: Application[];
      popularJobs: Job[];
      yesterdayApplications: number;
      yesterdayActiveJobs: number;
      yesterdayPendingApplications: number;
      yesterdayUpcomingInterviews: number;
    }>({
      todayApplications: 0,
      activeJobs: 0,
      pendingApplications: 0,
      upcomingInterviews: 0,
      recentApplications: [],
      popularJobs: [],
      yesterdayApplications: 0,
      yesterdayActiveJobs: 0,
      yesterdayPendingApplications: 0,
      yesterdayUpcomingInterviews: 0,
    });

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          const res = await axios.get(`${API}/application/overview`, {
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

    const getStatusBadge = (status: Application["status"]) => {
      const config = {
        pending: {
          label: "Chờ xem xét",
          className: "bg-yellow-100 text-yellow-800",
        },
        reviewing: {
          label: "Đang xem xét",
          className: "bg-blue-100 text-blue-800",
        },
        accepted: {
          label: "Đã chấp nhận",
          className: "bg-green-100 text-green-800",
        },
        rejected: { label: "Đã từ chối", className: "bg-red-100 text-red-800" },
      }[status];
      return <Badge className={config.className}>{config.label}</Badge>;
    };

    if (isLoading) return <DashboardSkeleton />;

    return (
      <div className="space-y-8 pb-10">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl p-8 shadow-lg text-white">
          <h1 className="text-3xl font-bold">Xin chào, {user?.fullname}</h1>
          <p className="mt-2 text-indigo-100 font-medium">
            Chào mừng bạn quay trở lại với trang quản doanh ngiệp của mình! Hôm nay có {dashboardData.todayApplications} khách đã đặt bàn vào cửa hàng của bạn. Hãy kiểm tra và chuẩn bị để phục vụ khách hàng tốt nhất nhé!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            icon={<Users2 className="size-8 text-white" />}
            iconBg="bg-gradient-to-br from-indigo-500 to-purple-600"
            label="Khách hàng đặt bàn hôm nay"
            value={dashboardData.todayApplications}
            badge="Hôm nay"
            trend={getPercentChange(
              dashboardData.todayApplications,
              dashboardData.yesterdayApplications
            )}
          />
          <StatsCard
            icon={<BriefcaseIcon className="size-8 text-white" />}
            iconBg="bg-gradient-to-br from-green-500 to-emerald-600"
            label="Bài quảng cáo đang chạy"
            value={dashboardData.activeJobs}
            badge="Đang mở"
            trend={getPercentChange(
              dashboardData.activeJobs,
              dashboardData.yesterdayActiveJobs
            )}
          />
          <StatsCard
            icon={<UserCheck className="size-8 text-white" />}
            iconBg="bg-gradient-to-br from-amber-400 to-amber-600"
            label="Khách hàng chờ xác nhận"
            value={dashboardData.pendingApplications}
            badge="Cần xem xét"
            trend={getPercentChange(
              dashboardData.pendingApplications,
              dashboardData.yesterdayPendingApplications
            )}
          />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <Card className="lg:col-span-2 rounded-xl border-none shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Khách hàng gần đây
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {dashboardData.recentApplications.length} khách hàng gần đây
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                  onClick={() => navigate("/recruiter/candidates")}
                >
                  Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
                </Badge>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700 pl-6">
                      Khách hàng
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Số người
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Ngày đặt bàn
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Trạng thái
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentApplications.map((app) => (
                    <TableRow
                      key={app._id}
                      className="hover:bg-indigo-50/30 transition-all duration-200"
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-gray-300">
                            <AvatarImage
                              src={app.applicant?.profile?.profilePhoto?.url}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {app.applicant?.fullname?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">
                              {app.applicant?.fullname}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.applicant?.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <div>
                          <div className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                            {app.job?.title}
                          </div>
                          <div className="text-gray-500">
                            {app.job?.company?.name}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-600">
                        {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Popular Jobs */}
          <Card className="rounded-xl border-none shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="my-3 text-xl font-semibold text-gray-800">
                  Bài viết chạy quảng cáo phổ biến
                </h2>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                  onClick={() => navigate("/recruiter/jobs")}
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

  // StatsCard làm đẹp hơn
  const StatsCard = ({
    icon,
    iconBg,
    label,
    value,
    badge,
    trend,
  }: {
    icon: React.ReactNode;
    iconBg: string;
    label: string;
    value: number | string;
    badge: string;
    trend?: string;
  }) => {
    const isPositive = trend?.startsWith("+");
    const isNeutral = trend === "0%";

    return (
      <Card className="border-none shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 rounded-xl">
        <CardContent className="p-0">
          <div className="flex flex-col h-full">
            <div className={`${iconBg} p-5`}>
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md">
                  {icon}
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-700 font-medium shadow-sm"
                >
                  {badge}
                </Badge>
              </div>
            </div>
            <div className="p-5 bg-white">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>

              {trend && (
                <div className="mt-4 flex items-center gap-2">
                  {isNeutral ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100">
                      <Minus className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        {trend}
                      </span>
                    </div>
                  ) : isPositive ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">
                        {trend}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100">
                      <TrendingDown className="h-4 w-4 text-rose-600" />
                      <span className="text-sm font-medium text-rose-600">
                        {trend}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  export default Recruiter;
