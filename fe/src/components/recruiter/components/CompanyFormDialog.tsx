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
import { File, ImagePlus, MapPin, X, Images, Plus } from "lucide-react";
import { Company } from "@/types/company";
import toast from "react-hot-toast";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface CompanyFormDialogProps {
  open: boolean;
  onClose: () => void;
  company?: Company | null;
  onSuccess: (data: FormData) => void;
}

const initialFormData = {
  name: "",
  description: "",
  website: "",
  location: "",
  address: "",
  logo: null as File | null,
  businessLicense: null as File | null,
  featuredImages: [] as File[],
  taxCode: "",
  noe: "",
  yoe: "",
  field: "",
  lat: "",
  lng: "",
};

const defaultCenter: [number, number] = [10.8231, 106.6297];

// --- COMPONENT BỔ TRỢ NGOÀI ---

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
};

const LocationMarker = ({ lat, lng, setFormData }: { 
  lat: string, 
  lng: string, 
  setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>> 
}) => {
  useMapEvents({
    click(e) {
      setFormData((prev) => ({
        ...prev,
        lat: e.latlng.lat.toString(),
        lng: e.latlng.lng.toString(),
      }));
      toast.success("Đã ghim vị trí");
    },
  });

  return lat && lng ? (
    <Marker
      position={[parseFloat(lat), parseFloat(lng)]}
    />
  ) : null;
};

// --- COMPONENT CHÍNH ---

const CompanyFormDialog = ({
  open,
  onClose,
  company,
  onSuccess,
}: CompanyFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [featuredPreviews, setFeaturedPreviews] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setLogoPreview(null);
    setFeaturedPreviews([]);
    setSearchKeyword("");
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
        featuredImages: [], // File mới
        taxCode: company.taxCode || "",
        noe: company.noe || "",
        yoe: company.yoe || "",
        field: company.field || "",
        lat: company.geolocation?.coordinates?.[1]?.toString() || "",
        lng: company.geolocation?.coordinates?.[0]?.toString() || "",
      });

      setLogoPreview(company.logo || null);
      
      // Load ảnh nổi bật cũ nếu có (bạn cần type lại Company interface nếu TypeScript báo lỗi)
      if (company.featuredImages && Array.isArray(company.featuredImages)) {
        setFeaturedPreviews(company.featuredImages);
      } else {
        setFeaturedPreviews([]);
      }
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

  const handleFeaturedImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (formData.featuredImages.length + files.length > 4) {
      toast.error("Chỉ được tải lên tối đa 4 hình ảnh nổi bật");
      return;
    }

    setFormData(prev => ({
      ...prev,
      featuredImages: [...prev.featuredImages, ...files]
    }));

    const newPreviews = files.map(file => URL.createObjectURL(file));
    // Lưu ý: Nếu đang sửa (company có featuredImages), việc thêm ảnh mới ở đây
    // sẽ thay thế hoàn toàn ảnh cũ ở DB (theo logic controller). 
    // Trong UI ta tạm thời clear ảnh cũ đi để người dùng up lại bộ mới cho đồng nhất,
    // hoặc bạn có thể giữ nguyên tùy logic Backend. Ở đây mình giữ previews cũ và nối thêm.
    setFeaturedPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFeaturedImage = (index: number) => {
    // Nếu index nằm trong mảng formData.featuredImages (ảnh mới)
    // Cần map lại cẩn thận, ở đây để đơn giản ta clear hết và bắt chọn lại nếu xóa, 
    // hoặc lọc theo index của preview.
    
    setFeaturedPreviews(prev => prev.filter((_, i) => i !== index));
    
    // Logic đơn giản: Xóa 1 ảnh preview thì clear mảng File[] để buộc user chọn lại 
    // (tránh lỗi sync index giữa Preview và File blob)
    setFormData(prev => ({ ...prev, featuredImages: [] }));
    toast.success("Đã xóa ảnh. Hãy chọn lại ảnh mới (nếu có)");
  };

  const handleBusinessLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, businessLicense: file });
    }
  };

  const handleSearchLocation = async () => {
    if (!searchKeyword.trim()) {
      toast.error("Vui lòng nhập địa điểm cần tìm");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchKeyword
        )}&format=json&limit=1`
      );
      const data = await response.json();

      if (!data || data.length === 0) {
        toast.error("Không tìm thấy địa điểm");
        return;
      }

      const place = data[0];

      setFormData((prev) => ({
        ...prev,
        lat: place.lat,
        lng: place.lon,
      }));

      toast.success("Đã tìm thấy khu vực, hãy ghim lại cho chính xác!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi tìm kiếm vị trí");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập tên công ty");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Vui lòng nhập trụ sở công ty");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Vui lòng nhập địa chỉ công ty");
      return;
    }

    if (!formData.businessLicense && !company) {
      toast.error("Vui lòng chọn giấy phép kinh doanh");
      return;
    }

    if (!formData.lat || !formData.lng) {
      toast.error("Vui lòng ghim vị trí trên bản đồ");
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
      submitFormData.append("lat", formData.lat);
      submitFormData.append("lng", formData.lng);
      submitFormData.append("taxCode", formData.taxCode.trim());
      submitFormData.append("noe", formData.noe.trim());
      submitFormData.append("yoe", formData.yoe.trim());
      submitFormData.append("field", formData.field.trim());

      if (formData.logo) {
        submitFormData.append("logo", formData.logo);
      }

      if (formData.businessLicense) {
        submitFormData.append("businessLicense", formData.businessLicense);
      }

      if (formData.featuredImages && formData.featuredImages.length > 0) {
        formData.featuredImages.forEach(file => {
          submitFormData.append("featuredImages", file);
        });
      }

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
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[95vh] overflow-auto bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle>
            {company ? "Cập nhật thông tin công ty" : "Thêm công ty mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-4">
            <div
              className="size-24 border-2 border-dashed rounded-xl flex items-center justify-center relative overflow-hidden bg-gray-50"
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
              <p className="text-sm text-gray-500 mt-1">Tải lên logo đại diện</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Tên công ty / Nhà hàng <span className="text-red-700">*</span></Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="yoe">Năm thành lập</Label>
              <Input
                id="yoe"
                value={formData.yoe}
                onChange={(e) => setFormData({ ...formData, yoe: e.target.value })}
                placeholder="VD: 2005"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="noe">Quy mô</Label>
              <Input
                id="noe"
                value={formData.noe}
                onChange={(e) => setFormData({ ...formData, noe: e.target.value })}
                placeholder="VD: 100 nhân viên"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="field">Lĩnh vực</Label>
            <Input
              id="field"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              placeholder="VD: Nhà hàng, Công nghệ..."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Giới thiệu chi tiết</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Viết vài dòng mô tả về doanh nghiệp..."
              rows={4}
            />
          </div>

          {/* Featured Images Upload (NEW) */}
          <div className="grid gap-2 border rounded-xl p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Images className="w-5 h-5 text-emerald-600" />
              <Label className="text-base font-semibold">
                Hình ảnh nổi bật (Tối đa 4 ảnh)
              </Label>
            </div>
            <p className="text-sm text-gray-500 mb-2">Tải lên hình ảnh không gian, món ăn, dịch vụ của bạn để thu hút khách hàng.</p>
            
            <div className="flex flex-wrap gap-3 mt-2">
              {featuredPreviews.map((preview, index) => (
                <div key={index} className="relative w-24 h-24 border rounded-xl overflow-hidden shadow-sm">
                  <img src={preview} alt="Featured" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFeaturedImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {featuredPreviews.length < 4 && (
                <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition">
                  <Plus className="w-6 h-6 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFeaturedImagesChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            {company && company.featuredImages && company.featuredImages.length > 0 && formData.featuredImages.length > 0 && (
               <p className="text-xs text-orange-500 mt-2 font-medium">Lưu ý: Việc tải lên ảnh mới sẽ ghi đè bộ ảnh nổi bật hiện tại.</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="website">Website / Fanpage</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Tỉnh / Thành phố <span className="text-red-700">*</span></Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="VD: Hồ Chí Minh"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Địa chỉ chi tiết <span className="text-red-700">*</span></Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Số nhà, tên đường..."
                required
              />
            </div>
          </div>

          {/* MAP SECTION */}
          <div className="space-y-3 border rounded-xl p-4 bg-gray-50">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <Label className="text-base font-semibold">
                Ghim vị trí trên bản đồ <span className="text-red-700">*</span>
              </Label>
            </div>

            <div className="flex gap-2">
              <Input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm vị trí như Google Maps..."
              />
              <Button type="button" onClick={handleSearchLocation}>Tìm</Button>
            </div>

            <div className="rounded-xl overflow-hidden border">
              <MapContainer
                center={
                  formData.lat && formData.lng
                    ? [parseFloat(formData.lat), parseFloat(formData.lng)]
                    : defaultCenter
                }
                zoom={15}
                style={{ height: "350px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <LocationMarker lat={formData.lat} lng={formData.lng} setFormData={setFormData} />
                
                <ChangeView 
                  center={
                    formData.lat && formData.lng 
                      ? [parseFloat(formData.lat), parseFloat(formData.lng)] 
                      : defaultCenter
                  } 
                />
              </MapContainer>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input value={formData.lat} readOnly placeholder="Latitude" />
              <Input value={formData.lng} readOnly placeholder="Longitude" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="taxCode">Mã số thuế <span className="text-red-700">*</span></Label>
            <Input
              id="taxCode"
              value={formData.taxCode}
              onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
              placeholder="Nhập 10 chữ số"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Giấy phép kinh doanh <span className="text-red-700">*</span></Label>
            {company?.businessLicense && (
              <div className="flex items-center gap-1 mb-2">
                <File className="w-4 h-4 text-blue-600" />
                <a
                  href={company.businessLicense}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Xem file hiện tại
                </a>
              </div>
            )}

            <div className="border rounded-md p-2 relative bg-white">
              <input
                type="file"
                accept="application/pdf, image/*"
                onChange={handleBusinessLicenseChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required={!company?.businessLicense}
              />
              <p className="text-sm text-gray-500">
                {formData.businessLicense ? `File đã chọn: ${formData.businessLicense.name}` : "Click để chọn file PDF hoặc hình ảnh"}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
            >
              {isSubmitting ? "Đang xử lý..." : company ? "Lưu thay đổi" : "Tạo mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFormDialog;