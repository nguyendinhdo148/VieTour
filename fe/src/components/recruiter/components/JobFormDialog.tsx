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
import { Loader2, Sparkles } from "lucide-react";

// Thay đổi type cho phép chuỗi rỗng "" để ô input không hiện số 0
export interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  salary: number | ""; 
  benefits: string[];
  location: string;
  jobType: string;
  experienceLevel: number | "";
  position: number | "";
  category: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (data: any) => Promise<void>; // Nới lỏng type onSuccess để truyền dữ liệu đi
}

// Chuyển 0 thành ""
const initialFormData: JobFormData = {
  title: "",
  description: "",
  requirements: [],
  benefits: [],
  salary: "",
  location: "",
  jobType: "",
  experienceLevel: "",
  position: "",
  category: "",
  company: {
    _id: "",
    name: "",
  },
  status: "active",
};

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
      const res = await axios.get(`${API}/company`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setCompanies(res.data.companies));
      }
    } catch (error) {
      console.error("Fetch companies error:", error);
      toast.error("Không thể tải danh sách công ty!");
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
        salary: job.salary ? Number(job.salary) : "",
        location: job.location,
        jobType: job.jobType,
        experienceLevel: job.experienceLevel ?? "",
        position: job.position ?? "",
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
      toast.error("Vui lòng nhập tiêu đề bài quảng cáo");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Vui lòng nhập mô tả chi tiết");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Vui lòng nhập địa điểm");
      return;
    }
    if (!formData.company._id) {
      toast.error("Vui lòng chọn công ty/thương hiệu");
      return;
    }
    if (!formData.category) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }
    // Validate các số không được rỗng
    if (formData.salary === "" || formData.salary <= 0) {
      toast.error("Vui lòng nhập chi phí trung bình hợp lệ");
      return;
    }
    if (formData.experienceLevel === "" || formData.experienceLevel < 0) {
      toast.error("Vui lòng nhập số năm kinh nghiệm hợp lệ");
      return;
    }
    if (formData.position === "" || formData.position < 1) {
      toast.error("Vui lòng nhập sức chứa khách hợp lệ");
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
          category: formData.category,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const { description, requirements, benefits } = res.data;

        setFormData((prev) => ({
          ...prev,
          description: description || prev.description,
          requirements: Array.isArray(requirements)
            ? requirements
            : prev.requirements,
          benefits: Array.isArray(benefits) ? benefits : prev.benefits,
        }));

        toast.success("Đã tạo nội dung công việc thành công!");
      } else {
        toast.error("Không tạo được nội dung, vui lòng thử lại!");
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
        <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b mb-4 space-y-0">
          <DialogTitle className="text-xl font-bold">
            {job ? "Chỉnh sửa bài đăng" : "Đăng bài quảng cáo mới"}
          </DialogTitle>

          {/* Button AI Gen */}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mr-8 gap-2 cursor-pointer text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all shadow-sm"
            onClick={handleGenDescription}
            disabled={isGenerating || !formData.title.trim()}
            title={
              !formData.title.trim()
                ? "Vui lòng nhập tiêu đề trước"
                : "Tự động điền mô tả, yêu cầu, quyền lợi"
            }
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isGenerating ? "Đang viết..." : "AI Hỗ trợ nội dung"}
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- Thông tin công việc --- */}
          <div className="space-y-4 border p-4 rounded-xl shadow-sm bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800">
              Thông tin chung
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company">
                  Công ty / Thương hiệu <span className="text-red-700">*</span>
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
                  <SelectTrigger className="cursor-pointer bg-white">
                    <SelectValue placeholder="Chọn thương hiệu">
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
                  Tiêu đề bài quảng cáo <span className="text-red-700">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Sau khi điền tiêu đề có thể click AI để tạo mô tả "
                  className="resize-none focus:ring-indigo-500"
                  required
                />
              </div>
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
                className="resize-none focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* --- Mô tả & Yêu cầu --- */}
          <div className="space-y-4 border p-4 rounded-xl shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-800">
              Nội dung chi tiết
            </h3>

            <div className="grid gap-2">
              <Label htmlFor="description">
                Mô tả nội dung <span className="text-red-700">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Mô tả chi tiết về chương trình. Mỗi đoạn mô tả đều kết thúc bằng dấu chấm."
                required
                rows={5}
                className="resize-none focus:ring-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requirements">
                Áp dụng cho <span className="text-red-700">*</span>
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
                rows={5}
                className="resize-none focus:ring-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="benefits">
                Quyền lợi <span className="text-red-700">*</span>
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
                rows={5}
                className="resize-none focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* --- Thông tin bổ sung --- */}
          <div className="space-y-4 border p-4 rounded-xl shadow-sm bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800">
              Thông tin bổ sung
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="jobType">
                  Hình thức áp dụng <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, jobType: value })
                  }
                >
                  <SelectTrigger
                    id="jobType"
                    className="cursor-pointer bg-white"
                  >
                    <SelectValue placeholder="Chọn hình thức" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                    <SelectItem
                      className="cursor-pointer hover:bg-gray-100"
                      value="Tại chỗ"
                    >
                      Tại chỗ
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-gray-100"
                      value="Giao đồ ăn / thức uống"
                    >
                      Giao đồ ăn / thức uống
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-gray-100"
                      value="Tại chỗ và giao hàng"
                    >
                      Tại chỗ và giao hàng
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">
                  Danh mục <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger
                    id="category"
                    className="cursor-pointer bg-white focus:ring-indigo-500"
                  >
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="Cà phê">
                      Cà phê
                    </SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="Nhà hàng">
                      Nhà hàng
                    </SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="Quán ăn">
                      Quán ăn
                    </SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-gray-100" value="Quán cơm">
                      Quán cơm
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* SỬA CHỖ NÀY: KIỂM TRA VALUE RỖNG THÌ ĐỂ "", NẾU CÓ THÌ GÁN SỐ */}
              <div className="grid gap-2">
                <Label htmlFor="experienceLevel">
                  Kinh nghiệm (năm) <span className="text-red-700">*</span>
                </Label>
                <Input
                  id="experienceLevel"
                  type="number"
                  min="0"
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experienceLevel: e.target.value === "" ? "" : parseInt(e.target.value),
                    })
                  }
                  placeholder="VD: 2"
                  className="resize-none focus:ring-indigo-500"
                  required
                />
              </div>

              {/* SỬA CHỖ NÀY */}
              <div className="grid gap-2">
                <Label htmlFor="salary">
                  Chi phí trung bình / khách <span className="text-red-700">*</span>
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: e.target.value === "" ? "" : parseInt(e.target.value),
                    })
                  }
                  placeholder="VD: 155000"
                  className="resize-none focus:ring-indigo-500"
                  required
                />
              </div>

              {/* SỬA CHỖ NÀY */}
              <div className="grid gap-2">
                <Label htmlFor="position">
                  Sức chứa khách <span className="text-red-700">*</span>
                </Label>
                <Input
                  id="position"
                  type="number"
                  min="1"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      position: e.target.value === "" ? "" : parseInt(e.target.value),
                    })
                  }
                  placeholder="VD: 50"
                  className="resize-none focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">
                  Trạng thái <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger
                    id="status"
                    className="cursor-pointer bg-white"
                  >
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                    <SelectItem
                      className="cursor-pointer hover:bg-gray-100"
                      value="active"
                    >
                      Hoạt động
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-gray-100"
                      value="draft"
                    >
                      Nháp
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-gray-100"
                      value="closed"
                    >
                      Đã đóng
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* --- Footer Actions --- */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="hover:bg-gray-100"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-600 hover:bg-blue-700 cursor-pointer min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : job ? (
                "Cập nhật"
              ) : (
                "Đăng tin"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};