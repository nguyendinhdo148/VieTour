import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  Tag,
  FolderOpen,
  FileText,
  AlertCircle,
  BookOpen,
  Clock,
  Shield,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { stripHtmlTags } from "@/components/helpers/stripHTML";
import { SkeletonManagerBlogs } from "../components/skeletons/SkeletonManagerBlogs";
import Swal from "sweetalert2";
import { StatsCard } from "../components/StatsCard";
import { Blog } from "@/types/blog";

const ManagerBlogs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<{
    blogs: Blog[];
    totalBlogs: number;
    yesterdayTotalBlogs: number;
    totalViews: number;
    yesterdayViews: number;
    pendingBlogs: number;
    yesterdayPendingBlogs: number;
    approvedBlogs: number;
    yesterdayApprovedBlogs: number;
  }>({
    blogs: [],
    totalBlogs: 0,
    yesterdayTotalBlogs: 0,
    totalViews: 0,
    yesterdayViews: 0,
    pendingBlogs: 0,
    yesterdayPendingBlogs: 0,
    yesterdayApprovedBlogs: 0,
    approvedBlogs: 0,
  });

  const { user } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/blog/blogs-overview`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setDashboardData(res.data.data);
      } else {
        setError("Không lấy được danh sách bài viết");
      }
    } catch (err) {
      console.log(err);
      setError("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const getPercentChange = (today: number, yesterday: number) => {
    if (yesterday === 0) return today === 0 ? "0%" : "+100%";
    const change = ((today - yesterday) / yesterday) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa bài viết này ?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;
    try {
      const res = await axios.delete(`${API}/blog/delete-blog/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Xóa bài viết thành công");
        fetchOverview();
      } else {
        toast.error(res.data.message || "Xóa bài viết thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi gọi API xóa bài viết");
    }
  };

  const EmptyState = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-lg w-full text-center bg-white border border-gray-100 shadow-lg">
        <CardContent className="p-12 space-y-6">
          <div className="relative">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center border border-blue-100">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">
              Chưa có bài viết nào
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Bắt đầu hành trình viết blog của bạn bằng cách tạo bài viết đầu
              tiên
            </p>
          </div>
          <Link to="/blog/create-blog">
            <Button
              size="lg"
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tạo bài viết mới
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );

  const ErrorState = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-lg w-full text-center bg-white border border-red-100 shadow-lg">
        <CardContent className="p-12 space-y-6">
          <div className="mx-auto w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-red-900">Có lỗi xảy ra</h3>
            <p className="text-red-700 leading-relaxed">{error}</p>
          </div>
          <Button
            onClick={fetchOverview}
            variant="outline"
            size="lg"
            className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
          >
            Thử lại
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Quản lý bài viết
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Quản lý và theo dõi tất cả bài viết của bạn một cách hiệu quả
              </p>
            </div>
            <Link to="/blog/create-blog">
              <Button
                size="lg"
                className="w-full text-lg cursor-pointer lg:w-auto  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
              >
                <Plus className="size-6 mr-3" />
                Tạo bài viết mới
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        {!loading && !error && dashboardData.blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <StatsCard
              icon={BookOpen}
              label="Tổng bài viết"
              value={dashboardData.totalBlogs}
              bgClass="bg-gradient-to-br from-blue-500 to-blue-600"
              trend={getPercentChange(
                dashboardData.totalBlogs,
                dashboardData.yesterdayTotalBlogs
              )}
              description="Tất cả bài viết"
            />

            <StatsCard
              icon={Eye}
              label="Tổng lượt xem"
              value={dashboardData.totalViews.toLocaleString("vi-VN")}
              bgClass="bg-gradient-to-br from-green-500 to-emerald-600"
              trend={getPercentChange(
                dashboardData.totalViews,
                dashboardData.yesterdayViews
              )}
              description="Tất cả lượt xem"
            />

            <StatsCard
              icon={Clock}
              label="Chờ duyệt"
              value={dashboardData.pendingBlogs}
              bgClass="bg-gradient-to-br from-yellow-500 to-orange-600"
              trend={getPercentChange(
                dashboardData.pendingBlogs,
                dashboardData.yesterdayPendingBlogs
              )}
              description="Cần phê duyệt"
            />

            <StatsCard
              icon={Shield}
              label="Đã phê duyệt"
              value={dashboardData.approvedBlogs}
              bgClass="bg-gradient-to-br from-purple-500 to-pink-600"
              trend={getPercentChange(
                dashboardData.approvedBlogs,
                dashboardData.yesterdayApprovedBlogs
              )}
              description="Bài viết hợp lệ"
            />
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <SkeletonManagerBlogs />
        ) : dashboardData.blogs.length === 0 ? (
          <EmptyState />
        ) : error ? (
          <ErrorState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
            {dashboardData.blogs.map((blog, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 group-hover:h-2 transition-all duration-300" />

                <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="font-bold text-2xl leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="size-6 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <Clock className="size-4 text-blue-600" />
                    </div>
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  {/* Content Preview */}
                  <p className="text-gray-600 text-base leading-relaxed line-clamp-4">
                    {stripHtmlTags(blog.content)}
                  </p>

                  {/* Category */}
                  <div className="flex items-center gap-2">
                    <div className="size-6 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
                      <FolderOpen className="size-4 text-purple-600" />
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 border-blue-200 px-2 text-sm">
                      {blog.category}
                    </Badge>
                  </div>

                  {/* Tags */}
                  {blog.tags.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="size-6 bg-pink-50 rounded-xl flex items-center justify-center group-hover:bg-pink-100 transition-colors duration-300">
                          <Tag className="size-4 text-pink-600" />
                        </div>
                        <span className="font-semibold text-gray-700">
                          Tags
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-blue-200 hover:from-blue-100 hover:to-purple-100 px-3 py-1.5 text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                    <Button
                      onClick={() => navigate(`/blog/detail/${blog.slug}`)}
                      variant="outline"
                      size="sm"
                      className="flex-1 cursor-pointer text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      Xem
                    </Button>
                    <Button
                      onClick={() => navigate(`/blog/update-blog/${blog._id}`)}
                      variant="outline"
                      size="sm"
                      className="flex-1 cursor-pointer text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300"
                    >
                      <Edit3 className="w-4 h-4 mr-1.5" />
                      Sửa
                    </Button>
                    <Button
                      onClick={() => handleDelete(blog._id)}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerBlogs;
