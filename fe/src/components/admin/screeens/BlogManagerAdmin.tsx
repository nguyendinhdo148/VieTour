import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Edit2,
  Eye,
  Trash2,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  Tag,
  BarChart3,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "@/utils/constant";
import Swal from "sweetalert2";
import { setBlogsForAdmin } from "@/redux/blogSlice";
import type { RootState } from "@/redux/store";
import { paginate } from "@/components/helpers/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PaginationButtons } from "@/components/helpers/PaginationButtons";
import CommonSkeleton from "../components/Skeleton/CommonSkeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Blog } from "@/types/blog";
import { BLOG_CATEGORIES } from "@/lib/BlogCategory";
import DialogDetailBlog from "../components/DialogDetailBlog";

const BlogManagerAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [blogToReject, setBlogToReject] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null); // select blog detail to view
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const dispatch = useDispatch();
  const { blogsForAdmin } = useSelector((store: RootState) => store.blog);

  // filter blogs by status
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredBlogs = blogsForAdmin.filter((blog) => {
    const approvalMatch =
      approvalFilter === "all" ? true : blog.approval === approvalFilter;
    const categoryMatch =
      categoryFilter === "all" ? true : blog.category === categoryFilter;
    return approvalMatch && categoryMatch;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Number of blogs per page

  const { paginatedData: paginatedBlogs, totalPages } = paginate(
    filteredBlogs,
    currentPage,
    blogsPerPage
  );

  // Reset current page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [approvalFilter, categoryFilter]);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/blog/all-blogs`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setBlogsForAdmin(response.data.blogs));
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      toast.error("Không thể tải danh sách bài viết");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Delete blog
  const handleDelete = async (blog_id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa bài viết này?",
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
      const response = await axios.delete(
        `${API}/blog/delete-blog/${blog_id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        await fetchBlogs();
        toast.success("Xóa bài viết thành công!");
      }
    } catch (error) {
      console.error("Delete blog error:", error);
      toast.error("Không thể xóa bài viết");
    }
  };

  // Approve or reject blog
  const handleApproveBlog = async (
    blogId: string,
    approval: "approved" | "rejected",
    note?: string
  ) => {
    try {
      const res = await axios.put(
        `${API}/admin/approve-blog/${blogId}`,
        { approval, approvalNote: note },
        { withCredentials: true }
      );
      if (res.data.success) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Approve blog error:", error);
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data.message
          : "Không thể duyệt bài viết"
      );
    }
  };

  const blogsRef = useRef<HTMLDivElement | null>(null);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    blogsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle blog selection
  const handleSelectBlog = (blogId: string) => {
    setSelectedBlogs((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  // Handle select all blogs on current page
  const handleSelectAll = () => {
    if (selectedBlogs.length === paginatedBlogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(paginatedBlogs.map((blog) => blog._id));
    }
  };

  // Handle bulk approve
  const handleBulkApprove = async (approval: "approved" | "rejected") => {
    if (approval === "rejected") {
      setIsRejectDialogOpen(true);
      return;
    }

    const result = await Swal.fire({
      title: "Bạn có chắc muốn duyệt tất cả bài viết đã chọn?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    try {
      await Promise.all(
        selectedBlogs.map((blogId) => handleApproveBlog(blogId, "approved"))
      );
      setSelectedBlogs([]);
      toast.success("Đã duyệt bài viết đã chọn");
    } catch (error) {
      console.error("Bulk approve error:", error);
      toast.error("Không thể duyệt bài viết");
    }
  };

  // Handle bulk reject
  const handleBulkReject = async () => {
    if (!rejectNote.trim()) return;

    try {
      await Promise.all(
        selectedBlogs.map((blogId) =>
          handleApproveBlog(blogId, "rejected", rejectNote)
        )
      );
      setSelectedBlogs([]);
      setIsRejectDialogOpen(false);
      setRejectNote("");
      toast.success("Đã từ chối tất cả bài viết đã chọn");
    } catch (error) {
      console.error("Bulk reject error:", error);
      toast.error("Không thể từ chối tất cả bài viết");
    }
  };

  // Handle reject blog click
  const handleRejectClick = (blogId: string) => {
    setBlogToReject(blogId);
    setRejectNote("");
    setIsRejectDialogOpen(true);
  };

  // Confirm reject blog
  const handleConfirmReject = async () => {
    if (!blogToReject) return;
    await handleApproveBlog(blogToReject, "rejected", rejectNote);
    setIsRejectDialogOpen(false);
    setBlogToReject(null);
    setRejectNote("");
  };

  // Navigate to edit blog
  const handleEditBlog = (blog: Blog) => {
    navigate(`/blog/update-blog/${blog._id}`);
  };

  // handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    fetchBlogs();
  };

  if (isLoading) return <CommonSkeleton />;

  return (
    <div ref={blogsRef} className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Quản lý bài viết
            </h1>
            <p className="mt-1 text-gray-500">
              Xem và quản lý danh sách bài viết trong hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Filter by status */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {selectedBlogs.length > 0 && (
          <div className="flex-none flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer"
              onClick={() => handleBulkApprove("approved")}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Duyệt đã chọn
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
              onClick={() => handleBulkApprove("rejected")}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Từ chối đã chọn
            </Button>
          </div>
        )}

        <div className="flex-1 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
              Duyệt:
            </label>
            <Select
              onValueChange={(value) => setApprovalFilter(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-[140px] border-gray-300 rounded-md shadow-sm hover:border-gray-400 transition-all duration-200 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-md border border-gray-200 hover:shadow-xl transition-all duration-200">
                <SelectItem
                  value="all"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  Tất cả
                </SelectItem>
                <SelectItem
                  value="pending"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  Chờ duyệt
                </SelectItem>
                <SelectItem
                  value="approved"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  Đã duyệt
                </SelectItem>
                <SelectItem
                  value="rejected"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  Từ chối
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium whitespace-nowrap ">
              Danh mục:
            </label>
            <Select
              onValueChange={(value) => setCategoryFilter(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-[140px] border-gray-300 rounded-md shadow-sm hover:border-gray-400 transition-all duration-200 cursor-pointer">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-md border border-gray-200 hover:shadow-xl transition-all duration-200">
                <SelectItem
                  value="all"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  Tất cả
                </SelectItem>
                {BLOG_CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat.value}
                    value={cat.value}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border border-gray-300 hover:border-gray-400 transition-all duration-200 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              onClick={handleRefresh}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Tải lại
            </Button>
          </div>

          <div className="flex-none flex items-center gap-2 text-gray-600 text-sm font-medium whitespace-nowrap">
            <span className="text-sm text-gray-600">Tổng số bài viết:</span>
            <span className="text-sm font-medium text-gray-800">
              {filteredBlogs.length}
            </span>
          </div>
        </div>
      </div>

      <Card className="shadow-sm border border-gray-200 rounded-xl">
        <div className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 text-gray-700">
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedBlogs.length === paginatedBlogs.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[300px]">Tiêu đề & Tác giả</TableHead>
                <TableHead className="w-[120px]">Danh mục</TableHead>
                <TableHead className="w-[100px] text-center">
                  Lượt xem
                </TableHead>
                <TableHead className="w-[120px] text-center">Tags</TableHead>
                <TableHead className="w-[100px] text-center">
                  Ngày tạo
                </TableHead>
                <TableHead className="w-[100px] text-center">
                  Cập nhật
                </TableHead>
                <TableHead className="w-[180px] text-center">
                  Thao tác
                </TableHead>
                <TableHead className="w-[120px] text-center">Duyệt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map((blog) => (
                  <TableRow
                    key={blog._id}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedBlogs.includes(blog._id)}
                        onCheckedChange={() => handleSelectBlog(blog._id)}
                      />
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="flex items-start gap-3">
                        {blog.image && (
                          <img
                            src={blog.image.url}
                            alt={blog.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate">
                            {blog.title}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <User className="w-3 h-3" />
                            <span className="truncate">
                              {blog.created_by.fullname}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {blog.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <BarChart3 className="size-4" />
                        <span className="font-medium">{blog.views}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-300/20 text-gray-900"
                          >
                            +{blog.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-500">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-500">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.updatedAt).toLocaleDateString("vi-VN")}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-100 cursor-pointer"
                          title="Xem chi tiết"
                          onClick={() => {
                            setSelectedBlog(blog);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-100 text-blue-600 cursor-pointer"
                          onClick={() => handleEditBlog(blog)}
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-100 text-red-600 cursor-pointer"
                          onClick={() => handleDelete(blog._id)}
                          title="Xóa"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        {blog.approval === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-green-100 text-green-600 cursor-pointer"
                              onClick={() =>
                                handleApproveBlog(blog._id, "approved")
                              }
                              title="Duyệt"
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-red-100 text-red-600 cursor-pointer"
                              onClick={() => handleRejectClick(blog._id)}
                              title="Từ chối"
                            >
                              <XCircle className="h-5 w-5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {blog.approval === "rejected" ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge className="px-3 py-1 rounded-full font-medium bg-red-100 text-red-700">
                                <div className="flex items-center gap-1">
                                  <XCircle className="w-4 h-4" />
                                  Từ chối
                                </div>
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 text-white p-3 rounded-lg max-w-[300px] text-sm">
                              <p className="whitespace-pre-wrap">
                                Lý do: {blog.approvalNote || "Không có"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <Badge
                          className={
                            "px-3 py-1 rounded-full font-medium " +
                            (blog.approval === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700")
                          }
                        >
                          <div className="flex items-center gap-1">
                            {blog.approval === "approved" ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <AlertCircle className="w-4 h-4" />
                            )}
                            {blog.approval === "approved"
                              ? "Đã duyệt"
                              : "Chờ duyệt"}
                          </div>
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <div className="text-gray-500 text-lg flex flex-col items-center gap-2">
                      <span>📝 Không có bài viết nào</span>
                      <span className="text-sm text-gray-400">
                        Hãy bắt đầu bằng cách tạo bài viết mới
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Blog Detail Dialog */}
      <DialogDetailBlog
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        selectedBlog={selectedBlog}
      />

      {/* Pagination Buttons */}
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Add Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Lý do từ chối bài viết</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="note">Nhập lý do từ chối:</Label>
            <Textarea
              id="note"
              placeholder="Vui lòng nhập lý do từ chối..."
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              className="min-h-[100px] outline-none border border-gray-300 rounded-lg p-3 transition-all duration-200"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={blogToReject ? handleConfirmReject : handleBulkReject}
              className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              disabled={!rejectNote.trim()}
            >
              Xác nhận từ chối
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagerAdmin;
