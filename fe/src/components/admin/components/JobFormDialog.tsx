import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Job } from "@/types/job";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { API } from "@/utils/constant";
import { Loader2 } from "lucide-react";

export interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  benefits: string[];
  location: string;
  jobType: string; // Sẽ dùng để lưu Danh mục (Món chính, Khai vị,...)
  experienceLevel: number;
  position: number;
  category: string; // Sẽ dùng để lưu Hình thức (Tại chỗ, Giao đi,...)
  company: {
    _id: string;
    name: string;
  };
  status?: string;
}

interface JobFormDialogProps {
  open: boolean;
  onClose: () => void;
  job: Job | null;
  onSuccess: (data: JobFormData) => Promise<void>;
}

const initialFormData: JobFormData = {
  title: "",
  description: "",
  requirements: [],
  benefits: [],
  salary: 0,
  location: "",
  jobType: "",
  experienceLevel: 0,
  position: 1,
  category: "",
  company: {
    _id: "",
    name: "",
  },
  status: "active",
};

// Đồng bộ CHUẨN 100% với file FilterCard.tsx
const FILTER_CATEGORIES = [
  "Khuyến mãi HOT",
  "Set Menu",
  "Khai vị",
  "Món chính",
  "Đồ uống",
  "Tráng miệng",
  "Sự kiện",
];

export const JobFormDialog = ({
  open,
  onClose,
  job,
  onSuccess,
}: JobFormDialogProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const dispatch = useDispatch();

  const { companies } = useSelector((state: RootState) => state.company);

  // Fetch companies
  const fetchCompanies = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/all-companies`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setCompanies(res.data.companies));
      }
    } catch (error) {
      console.error("Fetch companies error:", error);
      toast.error("Không thể tải danh sách chi nhánh!");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      return;
    }
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        requirements: job.requirements,
        benefits: job.benefits,
        salary: Number(job.salary) || 0,
        location: job.location,
        jobType: job.jobType, 
        experienceLevel: job.experienceLevel,
        position: job.position,
        category: job.category,
        company: {
          _id: job.company?._id || "",
          name: job.company?.name || "",
        },
        status: job.status || "draft",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [job, open]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Vui lòng nhập mô tả");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Vui lòng nhập địa điểm");
      return;
    }
    if (!formData.company._id) {
      toast.error("Vui lòng chọn chi nhánh");
      return;
    }
    if (formData.salary <= 0) {
      toast.error("Vui lòng nhập Chi phí trung bình hợp lệ");
      return;
    }
    if (!formData.jobType) {
      toast.error("Vui lòng chọn Danh mục để khách dễ tìm kiếm");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSuccess({
        ...formData,
        salary: Number(formData.salary),
        requirements: formData.requirements,
        benefits: formData.benefits,
        experienceLevel: Number(formData.experienceLevel),
        position: Number(formData.position),
      });
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Có lỗi xảy ra khi xử lý form");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate description by AI
  const handleGenDescription = async () => {
    try {
      setIsGenerating(true);
      const res = await axios.post(
        `${API}/ai/generate-description`,
        {
          title: formData.title,
          category: formData.jobType, // Truyền jobType cho AI hiểu đang làm món gì
        },
        { withCredentials: true }
      );

      if (res.data.success && res.data.description) {
        setFormData((prev) => ({
          ...prev,
          description: res.data.description,
        }));
        toast.success("Đã tạo mô tả thành công!");
      } else {
        toast.error("Không tạo được mô tả, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Generate AI error:", error);
      toast.error("Có lỗi khi sử dụng AI!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-white max-h-[90vh] overflow-y-auto border-none p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
        <DialogHeader>
          <DialogTitle>
            {job ? "Chỉnh sửa tin đăng" : "Đăng món / sự kiện mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- Thông tin công việc --- */}
          <div className="space-y-4 border p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>

            <div className="grid gap-2">
              <Label htmlFor="company">
                Nhà hàng / Chi nhánh <span className="text-red-700">*</span>
              </Label>
              <Select
                value={formData.company._id}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    company: { ...formData.company, _id: value },
                  })
                }
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Chọn chi nhánh">
                    {
                      companies.find((c) => c._id === formData.company._id)
                        ?.name
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                  {companies.map((company) => (
                    <SelectItem
                      className="cursor-pointer hover:bg-gray-100"
                      key={company._id}
                      value={company._id}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">
                Tiêu đề quảng cáo / Tên món <span className="text-red-700">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="VD: “Một Ngày Mới Bắt Đầu Từ Ly Cà Phê Đậm Vị”"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">
                Địa điểm <span className="text-red-700">*</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="VD: Tòa nhà A, Quận 1, Hồ Chí Minh"
                required
              />
            </div>
          </div>

          {/* --- Mô tả & Yêu cầu --- */}
          <div className="space-y-4 border p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">Mô tả & Điều kiện</h3>

            <div className="grid gap-2">
              <Label htmlFor="description">
                Mô tả chi tiết <span className="text-red-700">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Mô tả chi tiết. Mỗi đoạn đều kết thúc bằng dấu chấm."
                required
                rows={5}
              />

              <Button
                type="button"
                size="sm"
                variant="outline"
                className="hover:bg-gray-100 cursor-pointer right-2 top-2 text-sm flex gap-2 items-center w-fit"
                onClick={handleGenDescription}
                disabled={isGenerating || !formData.title.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  "✨ Dùng AI tạo mô tả"
                )}
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requirements">
                Điều kiện áp dụng <span className="text-red-700">*</span>
              </Label>
              <Textarea
                id="requirements"
                value={formData.requirements.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirements: e.target.value.split("\n").filter(Boolean),
                  })
                }
                placeholder="Mỗi yêu cầu đều kết thúc bằng dấu chấm."
                required
                rows={4}
              />
            </div>
          </div>

          {/* --- Phân loại & Giá --- */}
          <div className="space-y-4 border p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">Phân loại & Giá cả</h3>

            <div className="grid gap-2">
              <Label htmlFor="benefits">
                Quyền lợi khách hàng <span className="text-red-700">*</span>
              </Label>
              <Textarea
                id="benefits"
                value={formData.benefits.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    benefits: e.target.value.split("\n").filter(Boolean),
                  })
                }
                placeholder="Mỗi quyền lợi đều kết thúc bằng dấu chấm."
                required
                rows={3}
              />
            </div>

            {/* ĐỒNG BỘ: Danh mục lọc hiển thị trên web -> map vào jobType */}
            <div className="grid gap-2">
              <Label htmlFor="jobType">
                Danh mục (Hiển thị ở bộ lọc) <span className="text-red-700">*</span>
              </Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) =>
                  setFormData({ ...formData, jobType: value })
                }
              >
                <SelectTrigger id="jobType" className="cursor-pointer">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                  {FILTER_CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      className="cursor-pointer hover:bg-gray-100"
                      value={cat}
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Hình thức phục vụ -> map vào category */}
            <div className="grid gap-2">
              <Label htmlFor="category">
                Hình thức phục vụ <span className="text-red-700">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="category" className="cursor-pointer">
                  <SelectValue placeholder="Chọn hình thức" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                  <SelectItem className="cursor-pointer hover:bg-gray-100" value="Tại chỗ">
                    Tại chỗ
                  </SelectItem>
                  <SelectItem className="cursor-pointer hover:bg-gray-100" value="Giao đi">
                    Giao đi
                  </SelectItem>
                  <SelectItem className="cursor-pointer hover:bg-gray-100" value="Tại chỗ và giao đi">
                    Tại chỗ và giao đi
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="experienceLevel">
                Kinh nghiệm / Thời gian (năm) <span className="text-red-700">*</span>
              </Label>
              <Input
                id="experienceLevel"
                type="number"
                min="0"
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceLevel: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="VD: 2"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="salary">
                Chi phí trung bình (VND) <span className="text-red-700">*</span>
              </Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="VD: 50000"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">
                Số lượng / Sức chứa khách <span className="text-red-700">*</span>
              </Label>
              <Input
                id="position"
                type="number"
                min="1"
                value={formData.position}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: parseInt(e.target.value) || 1,
                  })
                }
                placeholder="VD: 100"
                required
              />
            </div>
          </div>

          {/* --- Trạng thái & Nút --- */}
          <div className="space-y-4 border p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">Trạng thái</h3>

            <div className="grid gap-2">
              <Label htmlFor="status">
                Trạng thái hiển thị <span className="text-red-700">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status" className="cursor-pointer">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                  <SelectItem className="cursor-pointer hover:bg-gray-100" value="active">
                    Hoạt động
                  </SelectItem>
                  <SelectItem className="cursor-pointer hover:bg-gray-100" value="draft">
                    Nháp
                  </SelectItem>
                  <SelectItem className="cursor-pointer hover:bg-gray-100" value="closed">
                    Đã đóng
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="border-gray-300 text-black hover:bg-gray-100 cursor-pointer"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-orange-600 hover:bg-orange-700 cursor-pointer"
              >
                {isSubmitting ? "Đang xử lý..." : job ? "Cập nhật" : "Đăng bài"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};