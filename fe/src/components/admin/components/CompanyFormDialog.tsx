import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { File, ImagePlus } from "lucide-react";
import { Company } from "@/types/company";
import toast from "react-hot-toast";

interface CompanyFormDialogProps {
  open: boolean;
  onClose: () => void;
  company?: Company | null;
  onSuccess: (data: FormData) => void;
}

// form data initial value for new company
const initialFormData = {
  name: "",
  description: "",
  website: "",
  location: "",
  address: "",
  logo: null as File | null,
  businessLicense: null as File | null,
  taxCode: "",
  noe: "", // number of employees
  yoe: "", // years of experience
  field: "", // field of work
};

const CompanyFormDialog = ({
  open,
  onClose,
  company,
  onSuccess,
}: CompanyFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState(initialFormData);

  // reset form data and logo preview when dialog is closed or company is changed
  const resetForm = () => {
    setFormData(initialFormData);
    setLogoPreview(null);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
      return;
    }

    if (company) {
      setFormData({
        name: company.name || "",
        description: company.description || "",
        website: company.website || "",
        location: company.location || "",
        address: company.address || "",
        logo: null,
        businessLicense: null,
        taxCode: company.taxCode || "",
        noe: company.noe || "",
        yoe: company.yoe || "",
        field: company.field || "",
      });
      setLogoPreview(company.logo || null);
    } else {
      resetForm();
    }
  }, [company, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);
    }
  };

  // handle business license file change
  const handleBusinessLicenseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, businessLicense: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập tên công ty");
      return;
    }

    if (!formData.businessLicense && !company) {
      toast.error("Vui lòng chọn giấy phép kinh doanh");
      return;
    }

    const taxCode = formData.taxCode.trim();

    if (!taxCode) {
      toast.error("Vui lòng nhập mã số thuế");
      return;
    }

    if (!/^\d{10}$/.test(taxCode)) {
      toast.error("Mã số thuế phải gồm đúng 10 chữ số");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name.trim());
      submitFormData.append("description", formData.description.trim());
      submitFormData.append("website", formData.website.trim());
      submitFormData.append("location", formData.location.trim());
      submitFormData.append("address", formData.address.trim());
      if (formData.logo) {
        submitFormData.append("logo", formData.logo);
      }
      if (formData.businessLicense) {
        submitFormData.append("businessLicense", formData.businessLicense);
      }
      submitFormData.append("taxCode", formData.taxCode.trim());
      submitFormData.append("noe", formData.noe.trim());
      submitFormData.append("yoe", formData.yoe.trim());
      submitFormData.append("field", formData.field.trim());

      // Pass the FormData to parent component instead of making API call here
      onSuccess(submitFormData);
      handleClose();
    } catch (error) {
      console.error("Form error:", error);
      toast.error("Có lỗi xảy ra khi xử lý form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setLogoPreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-auto bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle>
            {company ? "Cập nhật thông tin công ty" : "Thêm công ty mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-4">
            <div
              className="size-24 border-2 border-dashed rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundImage: logoPreview ? `url(${logoPreview})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!logoPreview && (
                <div className="text-center">
                  <ImagePlus className="w-8 h-8 mx-auto text-gray-400" />
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <Label>Logo công ty</Label>
              <p className="text-sm text-gray-500 mt-1">
                Tải lên logo công ty của bạn. Đề xuất sử dụng hình ảnh PNG hoặc
                JPG với kích thước tối thiểu 200x200px.
              </p>
            </div>
          </div>

          {/* Company Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Tên công ty <span className="text-red-700">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập tên công ty"
              required
            />
          </div>

          {/* Year of establishment */}
          <div className="grid gap-2">
            <Label htmlFor="yoe">Năm thành lập</Label>
            <Input
              id="yoe"
              value={formData.yoe}
              onChange={(e) =>
                setFormData({ ...formData, yoe: e.target.value })
              }
              placeholder="VD: 2005"
            />
          </div>

          {/* Number of employees */}
          <div className="grid gap-2">
            <Label htmlFor="noe">Quy mô</Label>
            <Input
              id="noe"
              value={formData.noe}
              onChange={(e) =>
                setFormData({ ...formData, noe: e.target.value })
              }
              placeholder="VD: 500-1.000 nhân viên"
            />
          </div>

          {/* Field of work */}
          <div className="grid gap-2">
            <Label htmlFor="noe">Lĩnh vực</Label>
            <Input
              id="field"
              value={formData.field}
              onChange={(e) =>
                setFormData({ ...formData, field: e.target.value })
              }
              placeholder="VD: Nhà hàng, Cà phê, Quán ăn,..."
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Mô tả công ty</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả về công ty của bạn"
              rows={4}
            />
          </div>

          {/* Website */}
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://example.com"
              type="url"
            />
          </div>

          {/* Location */}
          <div className="grid gap-2">
            <Label htmlFor="location">
              Trụ sở (Tên tỉnh thành phố, VD: HCM, Hà Nội,...)
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Trụ sở công ty"
            />
          </div>

          {/* Address */}
          <div className="grid gap-2">
            <Label htmlFor="address">Địa điểm</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Địa chỉ công ty"
            />
          </div>

          {/* Tax Code */}
          <div className="grid gap-2">
            <Label htmlFor="taxCode">
              Mã số thuế <span className="text-red-700">*</span>
            </Label>
            <Input
              id="taxCode"
              value={formData.taxCode}
              onChange={(e) =>
                setFormData({ ...formData, taxCode: e.target.value })
              }
              placeholder="Mã số thuế"
              required
            />
          </div>

          {/* Business License */}
          <div className="grid gap-2">
            <Label htmlFor="businessLicense">
              Giấy phép kinh doanh <span className="text-red-700">*</span>{" "}
            </Label>
            {company?.businessLicense ? (
              <div className="flex items-center gap-1">
                <File className="w-4 h-4" />
                <a
                  href={company.businessLicense}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Xem file hiện tại
                </a>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Chưa có giấy phép kinh doanh
              </p>
            )}
            <div className="border rounded-md p-2 relative">
              <Input
                type="file"
                accept="application/pdf, image/*"
                onChange={handleBusinessLicenseChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required={!company?.businessLicense && !company}
              />
              {!formData.businessLicense ? (
                <p className="text-sm text-gray-500">
                  Chọn file hoặc kéo và thả Giấy phép kinh doanh tại đây.
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  File đã chọn: {formData.businessLicense?.name}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Tải lên Giấy phép kinh doanh của công ty. Hỗ trợ định dạng PDF
              hoặc hình ảnh.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-600 hover:bg-gray-50 cursor-pointer"
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              {isSubmitting
                ? "Đang xử lý..."
                : company
                ? "Cập nhật"
                : "Tạo mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFormDialog;
