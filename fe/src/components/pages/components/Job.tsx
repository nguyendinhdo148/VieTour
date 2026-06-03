import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Flame, Clock, Crown, Star, UtensilsCrossed, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; 
import type { Job } from "@/types/job";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

interface JobProps {
  job: Job;
  savedJobs: string[];
  onJobSaveChange: (jobId: string, saved: boolean) => void; 
}

const Job = ({ job, savedJobs, onJobSaveChange }: JobProps) => {
  const { user } = useSelector((store: RootState) => store.auth);
  const isSaved = savedJobs.includes(job._id);
  const navigate = useNavigate();

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn chặn sự kiện click lan ra ngoài thẻ Link
    if (!user) {
      navigate("/login");
      toast.error("Vui lòng đăng nhập để lưu ưu đãi!");
      return;
    }
    onJobSaveChange(job._id, !isSaved);
  };

  // --- Logic xử lý phân hạng ---
  const priceString = job?.salary?.toString() || "0";
  const priceNum = Number(priceString.replace(/\D/g, '')); 
  
  const isLuxury = priceNum >= 300000; 
  const isHotDeal = priceNum > 0 && priceNum <= 100000;

  const formattedPrice = priceNum > 0 
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceNum)
    : "Liên hệ";

  // Các style động theo hạng mục
  const cardBg = isLuxury ? "bg-zinc-950 text-white border-zinc-800" : "bg-white text-zinc-900 border-gray-100";
  const headerBg = isLuxury ? "bg-gradient-to-br from-amber-900/40 to-zinc-900" : "bg-gradient-to-br from-orange-50 to-red-50";
  const priceColor = isLuxury ? "text-amber-400" : "text-red-600";
  const badgeStyle = isLuxury 
    ? "bg-zinc-800 text-amber-300 border-zinc-700 hover:bg-zinc-700" 
    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";

  return (
    <div 
      className={`group relative flex flex-col justify-between h-full rounded-[2rem] shadow-sm border transition-all duration-500 hover:-translate-y-2 overflow-hidden
        ${cardBg}
        ${isLuxury ? "hover:shadow-amber-900/30 hover:border-amber-700/50" : "hover:shadow-2xl hover:shadow-orange-900/10"}
      `}
    >
      {/* Nút Tim Yêu thích góc trên cùng (Tròn, dễ ấn) */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`w-10 h-10 rounded-full backdrop-blur-md transition-transform active:scale-95 cursor-pointer shadow-sm flex items-center justify-center
            ${isLuxury ? "bg-black/40 hover:bg-black/60 text-amber-100" : "bg-white/80 hover:bg-white text-gray-500"}
          `}
          onClick={handleSaveClick}
          title={isSaved ? "Bỏ yêu thích" : "Yêu thích"}
        >
          <Heart 
            className={`size-5 transition-colors duration-300 
              ${isSaved 
                ? (isLuxury ? "fill-amber-400 text-amber-400" : "fill-red-500 text-red-500") 
                : ""}
            `} 
          />
        </Button>
      </div>

      <div>
        {/* Header chứa Logo nổi */}
        <div className={`h-28 w-full relative ${headerBg}`}>
          {/* Label Phân Hạng */}
          <div className="absolute top-4 left-4">
            {isLuxury && (
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-none shadow-lg gap-1.5 px-3 py-1 font-medium tracking-wide">
                <Crown className="w-3.5 h-3.5" /> Thượng Hạng
              </Badge>
            )}
            {isHotDeal && (
              <Badge className="bg-gradient-to-r from-red-600 to-orange-500 text-white border-none shadow-lg gap-1.5 px-3 py-1 font-medium tracking-wide">
                <Flame className="w-3.5 h-3.5" /> Best Choice
              </Badge>
            )}
          </div>

          {/* Logo nhà hàng */}
          <div className="absolute -bottom-8 left-6">
            <Avatar className={`size-20 rounded-2xl shadow-xl border-4 p-1 transition-transform duration-500 group-hover:scale-110
              ${isLuxury ? "bg-zinc-900 border-zinc-800" : "bg-white border-white"}
            `}>
              <AvatarImage
                src={job?.company.logo || "/default_company_logo.jpg"}
                alt={job?.company.name}
                className="object-contain rounded-xl"
              />
            </Avatar>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="px-6 pt-12 pb-2">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-3 opacity-80">
            <Clock className="w-3.5 h-3.5" />
            Cập nhật {formatDistanceToNow(new Date(job?.createdAt || new Date()), { addSuffix: true, locale: vi })}
          </div>

          <h2 className={`text-xl font-bold line-clamp-2 leading-tight mb-2 transition-colors
            ${isLuxury ? "font-serif text-amber-50 group-hover:text-amber-400" : "text-gray-900 group-hover:text-orange-600"}
          `}>
            {job?.title}
          </h2>

          <div className={`flex items-center gap-1.5 text-sm font-medium mb-1 ${isLuxury ? "text-zinc-400" : "text-gray-600"}`}>
            <UtensilsCrossed className="size-4" />
            <span className="truncate">{job?.company.name}</span>
          </div>

          <div className={`flex items-center gap-1.5 text-xs mb-4 ${isLuxury ? "text-zinc-500" : "text-gray-500"}`}>
            <MapPin className={`size-3.5 ${isLuxury ? "text-amber-600/70" : "text-orange-500/70"}`} />
            <span className="truncate">{job?.company?.location}</span>
          </div>

          <p className={`text-sm line-clamp-2 leading-relaxed ${isLuxury ? "text-zinc-400" : "text-gray-600"}`}>
            {job?.description}
          </p>
        </div>
      </div>

      {/* Footer Card */}
      <div className="px-6 pb-6 pt-4">
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className={`px-3 py-1 font-medium ${badgeStyle}`}>
            {job?.jobType}
          </Badge>
          <Badge className={`px-3 py-1 font-medium ${badgeStyle}`}>
            <Star className="w-3 h-3 mr-1 inline" /> {job?.position} Slot
          </Badge>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className={`text-xs uppercase tracking-wider mb-1 font-semibold ${isLuxury ? "text-zinc-500" : "text-gray-400"}`}>
              Chi phí dự kiến
            </p>
            <div className={`text-2xl font-black tracking-tight ${priceColor}`}>
              {formattedPrice} <span className="text-sm font-normal opacity-70">/ người</span>
            </div>
          </div>
        </div>

        {/* Khu vực Nút bấm (Rất to và dễ ấn) */}
        <div className="flex items-center gap-3 mt-6">
          <Link to={`/job/detail/${job?.slug}`} className="flex-1">
            <Button 
              className={`w-full h-12 text-base font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer
                ${isLuxury 
                  ? "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-900/50" 
                  : "bg-zinc-950 hover:bg-zinc-800 text-white shadow-zinc-900/20"
                }
              `}
            >
              Khám phá ngay
            </Button>
          </Link>

          {/* Nút Yêu thích có chữ đi kèm để tạo mục tiêu click lớn hơn */}
          <Button
            className={`h-12 px-4 flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer border
              ${isLuxury 
                ? (isSaved ? "bg-amber-900/30 border-amber-700/50 text-amber-400" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-amber-400")
                : (isSaved ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500")
              }
            `}
            onClick={handleSaveClick}
          >
            <Heart 
              className={`size-5 transition-colors ${isSaved ? "fill-current" : ""}`} 
            />
            {/* Chữ Yêu thích (Hiện trên màn to, ẩn trên điện thoại nhỏ để tiết kiệm chỗ) */}
            <span className="hidden sm:inline font-semibold">
              {isSaved ? "Đã thích" : "Yêu thích"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;