/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API } from "@/utils/constant";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { 
  Star, MessageSquare, Trash2, Filter, 
  Search, Image as ImageIcon, X, Calendar
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================================
// COMPONENT PHỤ: Lightbox Xem Ảnh
// ==========================================================
const AdminReviewPhotos = ({ photos }: { photos: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
        {photos.map((photo, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedImage(photo)}
            className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group flex-shrink-0"
          >
            <img src={photo} alt="Review" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[101]">
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size" 
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
// COMPONENT CHÍNH: Quản lý Đánh Giá (Recruiter)
// ==========================================================
const RecruiterReviews = () => {
  const [company, setCompany] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // States cho Bộ lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all"); // 'all', '5', '4', '3', '2', '1'
  const [sortBy, setSortBy] = useState("newest");

  // Fetch dữ liệu công ty của Recruiter
  // Trong file RecruiterReviews.tsx
const fetchMyCompany = async () => {
  try {
    setIsLoading(true);
    // SỬA DÒNG NÀY: Xóa chữ /get đi
    const response = await axios.get(`${API}/company`, {
      withCredentials: true,
    });
    
    if (response.data.success) {
      // Tùy theo cách backend của bạn trả về, thường là response.data.companies
      setCompany(response.data.companies[0]); 
    }
  } catch (error) {
    console.error("Error fetching company:", error);
    toast.error("Không thể tải dữ liệu đánh giá");
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchMyCompany();
  }, []);

  // Hàm Xóa Đánh Giá
  const handleDeleteReview = async (reviewId: string) => {
    const result = await Swal.fire({
      title: "Xóa đánh giá này?",
      text: "Hành động này sẽ xóa vĩnh viễn đánh giá khỏi trang của công ty.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa ngay",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${API}/company/${company._id}/reviews/${reviewId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success("Đã xóa đánh giá");
          fetchMyCompany(); // Load lại data
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Lỗi khi xóa đánh giá");
      }
    }
  };

  // Logic Lọc & Sắp xếp
  const filteredAndSortedReviews = useMemo(() => {
    if (!company?.reviews) return [];
    
    let result = [...company.reviews];

    // Lọc theo text (Tìm tên hoặc nội dung)
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.fullname?.toLowerCase().includes(lowerSearch) || 
        r.comment?.toLowerCase().includes(lowerSearch)
      );
    }

    // Lọc theo số sao
    if (filterRating !== "all") {
      result = result.filter(r => Math.floor(r.rating) === parseInt(filterRating));
    }

    // Sắp xếp
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (sortBy === "newest") return dateB - dateA;
      if (sortBy === "oldest") return dateA - dateB;
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });

    return result;
  }, [company?.reviews, searchTerm, filterRating, sortBy]);

  // Render Skeleton Loading
  if (isLoading) {
    return (
      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="h-32 w-full bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8 text-center text-gray-500">
        Bạn chưa tạo hồ sơ công ty.
      </div>
    );
  }

  // Phân tích Rating
  const totalReviews = company.reviews?.length || 0;
  const avgRating = company.rating ? company.rating.toFixed(1) : "0.0";
  const getRatingCount = (stars: number) => company.reviews?.filter((r: any) => Math.floor(r.rating) === stars).length || 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          Quản lý Đánh giá
        </h1>
        <p className="text-gray-500 mt-2 ml-14">Theo dõi và quản lý những trải nghiệm của nhân viên/khách hàng về doanh nghiệp.</p>
      </div>

      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 mb-2">
            {avgRating}
          </div>
          <div className="flex gap-1.5 text-orange-400 mb-3">
            {[1,2,3,4,5].map(star => <Star key={star} className={`w-6 h-6 ${star <= Math.round(company.rating || 0) ? "fill-current" : "text-gray-200"}`} />)}
          </div>
          <div className="text-gray-500 font-medium">Tổng cộng {totalReviews} đánh giá</div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <h3 className="font-bold text-gray-800 mb-4">Chi tiết đánh giá</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(star => {
              const count = getRatingCount(star);
              const percent = totalReviews === 0 ? 0 : (count / totalReviews) * 100;
              return (
                <div key={star} className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 w-12 text-gray-600 font-medium">
                    {star} <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  </div>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="w-10 text-right text-gray-500">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FILTER & CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Tìm theo tên hoặc nội dung..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-5 bg-gray-50 border-transparent focus:bg-white rounded-xl"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterRating} 
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-transparent text-gray-700 font-medium outline-none cursor-pointer pr-4"
            >
              <option value="all">Tất cả sao</option>
              <option value="5">5 Sao</option>
              <option value="4">4 Sao</option>
              <option value="3">3 Sao</option>
              <option value="2">2 Sao</option>
              <option value="1">1 Sao</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-700 font-medium outline-none cursor-pointer pr-4"
            >
              <option value="newest">Mới nhất trước</option>
              <option value="oldest">Cũ nhất trước</option>
              <option value="highest">Sao cao trước</option>
              <option value="lowest">Sao thấp trước</option>
            </select>
          </div>
        </div>
      </div>

      {/* DANH SÁCH ĐÁNH GIÁ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredAndSortedReviews.length > 0 ? (
          filteredAndSortedReviews.map((review: any) => (
            <div key={review._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group flex flex-col">
              
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-12 h-12 ring-2 ring-gray-100">
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

                <div className="flex flex-col items-end gap-2">
                  <div className="flex bg-orange-50 px-2 py-1 rounded-full">
                    {[1,2,3,4,5].map(star => <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? "fill-orange-400 text-orange-400" : "text-orange-200"}`} />)}
                  </div>
                  {/* Nút Xóa (Recruiter) */}
                  <button 
                    onClick={() => handleDeleteReview(review._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa đánh giá này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 text-gray-700 text-sm leading-relaxed whitespace-pre-line mb-2">
                {review.comment}
              </div>

              {/* Photos */}
              {review.photos && review.photos.length > 0 && (
                <div className="mt-auto border-t border-gray-50 pt-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <ImageIcon className="w-3.5 h-3.5" /> Ảnh đính kèm
                  </div>
                  <AdminReviewPhotos photos={review.photos} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">Không tìm thấy đánh giá nào</h3>
            <p className="text-gray-500 mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default RecruiterReviews;