/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Lightbulb, Users, Target, FileText, Star,
  MessageSquare, ChevronLeft, ChevronRight, MapPin, Image as ImageIcon,
  Edit3, Trash2, X, Plus, Filter, ChevronDown, ChevronUp, Rocket
} from "lucide-react";
import type { Job } from "@/types/job";
import CompanyMap from "./CompanyMap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================================
// COMPONENT PHỤ: ReviewPhotos (Xử lý Lightbox xem ảnh)
// ==========================================================
const ReviewPhotos = ({ photos }: { photos: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {photos.map((photo: string, pIdx: number) => (
          <div 
            key={pIdx} 
            onClick={() => setSelectedImage(photo)}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 cursor-pointer group"
          >
            <img src={photo} alt="Review" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[101]">
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Full size review" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl relative z-[100]"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==========================================================
// COMPONENT CHÍNH
// ==========================================================
interface CompanyOverviewProps {
  company: any;
  jobs: Job[];
  user?: any; 
  onOpenReviewModal?: (review?: any) => void;
  onDeleteReview?: (reviewId: string) => Promise<void>;
  onOpenBookingModal?: () => void; 
}

const CompanyOverview = ({ company, user, onOpenReviewModal, onDeleteReview, onOpenBookingModal }: CompanyOverviewProps) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // States cho tính năng Đánh giá
  const [sortBy, setSortBy] = useState("newest"); // 'newest', 'oldest', 'highest', 'lowest'
  const [visibleCount, setVisibleCount] = useState(4); // Mặc định hiển thị 4 đánh giá

  const nextImage = () => company.featuredImages && setCurrentImageIdx((prev) => (prev === company.featuredImages.length - 1 ? 0 : prev + 1));
  const prevImage = () => company.featuredImages && setCurrentImageIdx((prev) => (prev === 0 ? company.featuredImages.length - 1 : prev - 1));

  // Logic Sắp xếp Đánh giá
  const sortedReviews = useMemo(() => {
    if (!company?.reviews) return [];
    return [...company.reviews].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (sortBy === "newest") return dateB - dateA;
      if (sortBy === "oldest") return dateA - dateB;
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });
  }, [company?.reviews, sortBy]);

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const totalReviews = sortedReviews.length;

  return (
    <div className="p-8 space-y-12">
      {/* 1. Image Slider */}
      {company.featuredImages && company.featuredImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><ImageIcon className="h-6 w-6" /></div>
            Không gian & Trải nghiệm
          </h3>
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl group bg-gray-100">
            <img src={company.featuredImages[currentImageIdx]} alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {company.featuredImages.length > 1 && (
              <>
                <Button onClick={prevImage} variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 backdrop-blur-md text-white hover:text-gray-900 rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-all duration-300"><ChevronLeft className="h-8 w-8" /></Button>
                <Button onClick={nextImage} variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 backdrop-blur-md text-white hover:text-gray-900 rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-all duration-300"><ChevronRight className="h-8 w-8" /></Button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {company.featuredImages.map((_: any, i: number) => (
                    <button key={i} onClick={() => setCurrentImageIdx(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === currentImageIdx ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. Company Description */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Lightbulb className="h-6 w-6" /></div>
            Giới thiệu chung
          </h3>
          <Button 
            onClick={() => onOpenBookingModal?.()} 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-md px-6 py-5 cursor-pointer"
          >
            <Rocket className="w-5 h-5 mr-2" /> Đặt bàn ngay
          </Button>
        </div>
        
        {company.description ? (
          <div className="prose prose-lg text-gray-600 max-w-none bg-gray-50 p-8 rounded-3xl border border-gray-100"><p className="leading-relaxed whitespace-pre-line">{company.description}</p></div>
        ) : (
          <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-3xl"><FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" /><p className="text-gray-500 font-medium">Chưa có thông tin giới thiệu</p></div>
        )}
      </div>

      {/* 3. Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3"><Users className="h-6 w-6 text-orange-600" /></div>
          <div className="text-2xl font-extrabold text-gray-900 mb-1">{company.noe || "N/A"}</div><div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Sức chứa</div>
        </div>
        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"><Target className="h-6 w-6 text-blue-600" /></div>
          <div className="text-2xl font-extrabold text-gray-900 mb-1 line-clamp-1">{company.field || "N/A"}</div><div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Mô hình</div>
        </div>
        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><MapPin className="h-6 w-6 text-green-600" /></div>
          <div className="text-2xl font-extrabold text-gray-900 mb-1 line-clamp-1">{company.location || "N/A"}</div><div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Khu vực</div>
        </div>
        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"><Star className="h-6 w-6 text-purple-600 fill-current" /></div>
          <div className="text-2xl font-extrabold text-gray-900 mb-1">{company.rating ? company.rating.toFixed(1) : "5.0"}</div><div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Đánh giá</div>
        </div>
      </div>

      {/* 5. Reviews Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-lg text-rose-600"><MessageSquare className="h-6 w-6" /></div>
            Đánh giá từ khách hàng ({totalReviews})
          </h3>
          <Button onClick={() => onOpenReviewModal?.()} className="bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold rounded-xl shadow-sm cursor-pointer">
            <Plus className="w-5 h-5 mr-2" /> Viết đánh giá
          </Button>
        </div>
        
        {/* Rating summary box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
           <div className="flex items-center gap-6">
             <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600">
               {company.rating ? company.rating.toFixed(1) : "0.0"}
             </div>
             <div>
                <div className="flex gap-1.5 text-orange-400 mb-2">
                   {[1,2,3,4,5].map(star => <Star key={star} className={`w-6 h-6 ${star <= Math.round(company.rating || 0) ? "fill-current" : "text-gray-200"}`} />)}
                </div>
                <div className="text-gray-500 font-medium">Dựa trên {totalReviews} đánh giá</div>
             </div>
           </div>

           {/* Bộ lọc sắp xếp */}
           {totalReviews > 0 && (
             <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200">
               <Filter className="w-4 h-4 text-gray-500 ml-2" />
               <select 
                 value={sortBy} 
                 onChange={(e) => {
                   setSortBy(e.target.value);
                   setVisibleCount(4); 
                 }}
                 className="bg-transparent text-gray-700 font-medium text-sm outline-none cursor-pointer pr-2"
               >
                 <option value="newest">Mới nhất</option>
                 <option value="oldest">Cũ nhất</option>
                 <option value="highest">Đánh giá cao nhất</option>
                 <option value="lowest">Đánh giá thấp nhất</option>
               </select>
             </div>
           )}
        </div>

        {/* Review list */}
        <div className="space-y-6">
           {totalReviews > 0 ? (
             <>
               {visibleReviews.map((review: any) => (
                  <div key={review._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                       <div className="flex gap-4 items-center">
                          <Avatar className="w-12 h-12 ring-2 ring-orange-50">
                             <AvatarImage src={review.avatar} />
                             <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">{review.fullname?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                             <div className="font-bold text-gray-900 text-lg">{review.fullname || "Khách hàng"}</div>
                             <div className="text-xs text-gray-500 font-medium mt-0.5">
                               {new Date(review.createdAt).toLocaleDateString('vi-VN')} • {new Date(review.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-3">
                          <div className="flex bg-orange-50 px-3 py-1.5 rounded-full">
                             {[1,2,3,4,5].map(star => <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "fill-orange-400 text-orange-400" : "text-orange-200"}`} />)}
                          </div>
                          
                          {/* CHỈ HIỆN NÚT KHI ĐÚNG USER ĐÓ */}
                          {user?._id && review?.user && String(user._id) === String(review.user) && (
                            <div className="flex items-center gap-1 border-l pl-3 ml-1 border-gray-100">
                               <Button onClick={() => onOpenReviewModal?.(review)} variant="ghost" size="icon" className="text-blue-500 hover:bg-blue-50 h-8 w-8" title="Sửa đánh giá">
                                  <Edit3 className="h-4 w-4" />
                               </Button>
                               <Button onClick={() => onDeleteReview?.(review._id)} variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 h-8 w-8" title="Xóa đánh giá">
                                  <Trash2 className="h-4 w-4" />
                               </Button>
                            </div>
                          )}
                       </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base mb-4 whitespace-pre-line">{review.comment}</p>
                    
                    {/* Gọi Lightbox Ảnh */}
                    {review.photos && review.photos.length > 0 && <ReviewPhotos photos={review.photos} />}
                  </div>
               ))}

               {/* Nút Xem thêm / Thu gọn */}
               {totalReviews > 4 && (
                 <div className="flex justify-center pt-4">
                   {visibleCount < totalReviews ? (
                     <Button 
                       onClick={() => setVisibleCount(prev => prev + 4)}
                       variant="outline"
                       className="rounded-xl font-semibold text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                     >
                       Xem thêm đánh giá <ChevronDown className="w-4 h-4 ml-2" />
                     </Button>
                   ) : (
                     <Button 
                       onClick={() => setVisibleCount(4)}
                       variant="outline"
                       className="rounded-xl font-semibold text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                     >
                       Thu gọn <ChevronUp className="w-4 h-4 ml-2" />
                     </Button>
                   )}
                 </div>
               )}
             </>
           ) : (
             <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4"><MessageSquare className="w-8 h-8 text-gray-300" /></div>
                <p className="text-gray-900 font-bold text-lg mb-1">Chưa có đánh giá nào</p>
                <p className="text-gray-500 mb-4">Hãy là người đầu tiên trải nghiệm và chia sẻ cảm nhận của bạn!</p>
                <Button onClick={() => onOpenReviewModal?.()} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl cursor-pointer">Viết đánh giá ngay</Button>
             </div>
           )}
        </div>
      </div>

      {/* 6. Map Section - Đã bọc useMemo để chống re-render vô ích */}
      <div className="mt-8">
        {useMemo(() => (
          <CompanyMap company={company} />
        ), [company?._id, company?.location])}
      </div>
    </div>
  );
};

export default CompanyOverview;