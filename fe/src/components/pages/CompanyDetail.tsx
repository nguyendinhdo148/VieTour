/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "@/utils/constant";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";
import Navbar from "@/components/shared/Navbar";
import CompanyHero from "./components/CompanyDetail/CompanyHero";
import CompanyTabs from "./components/CompanyDetail/CompanyTabs";
import CompanySidebar from "./components/CompanyDetail/CompanySidebar";
import CompanyLoading from "./components/CompanyDetail/CompanyLoading";
import CompanyNotFound from "./components/CompanyDetail/CompanyNotFound";
import "./components/CompanyDetail/CompanyAnimations.css";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquarePlus, X, ImagePlus, Rocket, CalendarDays, Users } from "lucide-react";
import { Button } from "../ui/button";

const CompanyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [company, setCompany] = useState<Company | any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJobsLoading, setIsJobsLoading] = useState(true);

  const { user } = useSelector((store: RootState) => store.auth);

  // States cho Form Đánh giá
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewPhotos, setReviewPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // States cho Form Đặt bàn (Apply Company)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const fetchCompanyDetail = async () => {
    try {
      const response = await axios.get(`${API}/company/detail/${slug}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCompany(response.data.company);
      }
    } catch (error) {
      console.error("Error fetching company:", error);
      toast.error("Không thể tải thông tin chi tiết");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanyJobs = async () => {
    try {
      setIsJobsLoading(true);
      const response = await axios.get(`${API}/company/jobs/${slug}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch {
      console.error("Error fetching company jobs");
    } finally {
      setIsJobsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchCompanyDetail();
      fetchCompanyJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Xử lý Review
  const openReviewModal = (review: any = null) => {
    if (!user) return toast("Đăng nhập để đánh giá nhé!", { icon: "🔒" });
    if (review) {
      setEditingReviewId(review._id);
      setRating(review.rating);
      setComment(review.comment);
      setPhotoPreviews(review.photos || []);
      setReviewPhotos([]); 
    } else {
      setEditingReviewId(null);
      setRating(5);
      setComment("");
      setPhotoPreviews([]);
      setReviewPhotos([]);
    }
    setIsReviewModalOpen(true);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (reviewPhotos.length + files.length > 5) {
      return toast.error("Chỉ được tải lên tối đa 5 ảnh");
    }
    setReviewPhotos((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePhoto = (index: number) => {
    setReviewPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Vui lòng đăng nhập!");
    if (!comment.trim()) return toast.error("Vui lòng nhập nội dung đánh giá");

    setIsSubmittingReview(true);
    try {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      reviewPhotos.forEach((file) => formData.append("reviewPhotos", file));

      const url = editingReviewId 
        ? `${API}/company/${company._id}/reviews/${editingReviewId}`
        : `${API}/company/${company._id}/reviews`;
      
      const method = editingReviewId ? "put" : "post";

      const res = await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(editingReviewId ? "Đã cập nhật đánh giá!" : "Cảm ơn bạn đã đánh giá!");
        setIsReviewModalOpen(false);
        fetchCompanyDetail(); 
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi gửi đánh giá");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const result = await Swal.fire({
      title: "Xóa đánh giá này?",
      text: "Bạn không thể khôi phục lại đánh giá sau khi xóa.",
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
          fetchCompanyDetail();
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Lỗi khi xóa đánh giá");
      }
    }
  };

  // Xử lý Submit Form Đặt Bàn
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Vui lòng đăng nhập để đặt bàn!");
    if (!bookingDate) return toast.error("Vui lòng chọn ngày đến");

    setIsSubmittingBooking(true);
    try {
      const res = await axios.post(
        `${API}/application/apply-company/${company._id}`,
        { bookingDate, numberOfGuests },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Đặt bàn thành công! Doanh nghiệp sẽ sớm liên hệ với bạn.");
        setIsBookingModalOpen(false);
        setBookingDate("");
        setNumberOfGuests(1);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi đặt bàn");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  if (isLoading) return <CompanyLoading />;
  if (!company) return <CompanyNotFound />;

  const viewCount = company.views || 0;

  return (
    <div className="min-h-screen bg-slate-50 relative pb-10">
      <Navbar />
      <CompanyHero company={company} jobs={jobs} viewCount={viewCount} />

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CompanyTabs
  company={company}
  jobs={jobs}
  isJobsLoading={isJobsLoading}
  onOpenReviewModal={openReviewModal}
  onDeleteReview={handleDeleteReview}
  user={user}
  onOpenBookingModal={() => {
    if (!user) return toast("Vui lòng đăng nhập!", { icon: "🔒" });
    setIsBookingModalOpen(true);
  }}
/>
          </div>
          <CompanySidebar company={company} viewCount={viewCount} />
        </div>
      </div>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-8 z-40 flex flex-col gap-4 items-end">
        {/* Nút Đặt bàn ngay */}
        <button
          onClick={() => {
            if (!user) return toast("Vui lòng đăng nhập!", { icon: "🔒" });
            setIsBookingModalOpen(true);
          }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all group flex items-center gap-2 cursor-pointer border-4 border-white"
        >
          <Rocket className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
            Đặt bàn ngay
          </span>
        </button>

        {/* Nút Đánh giá */}
        <button
          onClick={() => openReviewModal()}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl shadow-orange-500/40 hover:scale-110 transition-all group flex items-center gap-2 cursor-pointer border-4 border-white"
        >
          <MessageSquarePlus className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
            Viết đánh giá
          </span>
        </button>
      </div>

      {/* Modal Review (Giữ nguyên) */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isSubmittingReview && setIsReviewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{editingReviewId ? "Sửa đánh giá" : "Trải nghiệm của bạn?"}</h2>
                  <p className="text-orange-100 text-sm opacity-90 mt-1">Gửi nhận xét về {company.name}</p>
                </div>
                <button
                  onClick={() => !isSubmittingReview && setIsReviewModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="p-8 space-y-8">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Chạm để đánh giá</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transform hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-12 h-12 transition-colors ${
                            star <= (hoverRating || rating) ? "fill-orange-400 text-orange-400" : "text-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Chia sẻ cảm nhận của bạn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Không gian quán, thái độ phục vụ, chất lượng món ăn..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:bg-white outline-none transition-all min-h-[140px] resize-none text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <ImagePlus className="w-5 h-5 text-emerald-500" />
                    Đính kèm ảnh thực tế (Tối đa 5 ảnh)
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {photoPreviews.map((preview, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                        <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button
                             type="button"
                             onClick={() => removePhoto(index)}
                             className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 cursor-pointer"
                           >
                             <X className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    ))}
                    {photoPreviews.length < 5 && (
                      <div className="relative w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 flex items-center justify-center transition-colors cursor-pointer group">
                        <ImagePlus className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsReviewModalOpen(false)} disabled={isSubmittingReview} className="flex-1 py-6 rounded-2xl font-bold text-gray-600 cursor-pointer">
                    Hủy bỏ
                  </Button>
                  <Button type="submit" disabled={!comment.trim() || isSubmittingReview} className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold cursor-pointer">
                    {isSubmittingReview ? "Đang lưu..." : "Gửi đánh giá"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Đặt bàn */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isSubmittingBooking && setIsBookingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Đặt bàn ngay</h2>
                  <p className="text-emerald-100 text-sm mt-1">{company.name}</p>
                </div>
                <button
                  onClick={() => !isSubmittingBooking && setIsBookingModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-emerald-600" />
                    Ngày đến
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Giới hạn từ ngày hôm nay
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Số lượng khách
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsBookingModalOpen(false)} disabled={isSubmittingBooking} className="flex-1 py-6 rounded-2xl font-bold text-gray-600 cursor-pointer">
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isSubmittingBooking} className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold cursor-pointer">
                    {isSubmittingBooking ? "Đang xử lý..." : "Xác nhận đặt"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyDetail;