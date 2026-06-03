import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { API } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { RootState } from "@/redux/store";
import { Avatar, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";
import {
  CircleCheck,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Star,
  X,
  ChevronRight,
  Sparkles,
  Ticket,
  Gift,
  Utensils,
  UserCheck,
  Info
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho Application trong JobDetail
interface JobApplication {
  applicant?: {
    _id: string;
  };
}

const JobDetail = () => {
  const { singleJob } = useSelector((store: RootState) => store.job);
  const { user } = useSelector((store: RootState) => store.auth);

  // State for date picker modal
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState<number | string>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isApplied = !!(
    user &&
    singleJob?.applications?.some(
      (app: JobApplication) => app?.applicant?._id === user._id
    )
  );

  const navigate = useNavigate();
  const params = useParams();
  const jobSlug = params.slug;

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobSlug]);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${API}/job/detail/${jobSlug}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobSlug, dispatch]);

  const handleApplyClick = () => {
    if (!user) {
      toast("Bạn cần đăng nhập để đặt bàn tham gia!", { icon: "🔒" });
      return navigate("/login");
    }
    setShowDatePicker(true);
    setSelectedDate("");
    setNumberOfGuests(1);
  };

  const appliedJobHandle = async () => {
    if (!selectedDate) {
      toast.error("Vui lòng chọn ngày đặt bàn");
      return;
    }

    if (!numberOfGuests || Number(numberOfGuests) < 1) {
      toast.error("Vui lòng nhập số lượng khách hợp lệ");
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingDateTime = new Date(selectedDate).toISOString();

      const res = await axios.post(
        `${API}/application/apply-job/${singleJob?._id}`,
        {
          bookingDate: bookingDateTime,
          numberOfGuests: Number(numberOfGuests),
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Đặt bàn thành công!");
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob?.applications || []),
              { applicant: user },
            ],
          })
        );
        setShowDatePicker(false);
        setSelectedDate("");
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Lỗi khi đặt bàn.");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Lỗi không xác định. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <Navbar />

      {/* Hero Banner Background */}
      <div className="h-64 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 w-full absolute top-0 -z-10 opacity-90"></div>

      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-blue-50 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Avatar className="size-28 rounded-3xl border-4 border-blue-50 bg-white shadow-lg flex-shrink-0">
                    <AvatarImage
                      src={
                        singleJob?.company?.logo || "/default_company_logo.jpg"
                      }
                      alt={singleJob?.company?.name}
                      className="object-contain p-3"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-3">
                      <Sparkles className="w-4 h-4" />
                      <span>Sự kiện & Chương trình</span>
                    </div>
                    <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-900 mb-4 leading-tight">
                      {singleJob?.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-indigo-500" />
                        <span className="font-medium text-gray-900">
                          {singleJob?.company?.name || "Nhà hàng chưa xác định"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-500" />
                        <span>{singleJob?.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                  <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Sức chứa</span>
                    </div>
                    <span className="font-semibold text-gray-900">{singleJob?.position} khách</span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Ticket className="w-4 h-4" />
                      <span className="text-sm font-medium">Hình thức</span>
                    </div>
                    <span className="font-semibold text-gray-900">{singleJob?.jobType}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">Chi phí (Dự kiến)</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      {singleJob?.salary 
                        ? !isNaN(Number(singleJob.salary)) 
                          ? Number(singleJob.salary).toLocaleString('vi-VN') 
                          : singleJob.salary 
                        : "Đang cập nhật"} VNĐ / khách
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">Đánh giá</span>
                    </div>
                    <span className="font-semibold text-orange-500">{singleJob?.experienceLevel} sao</span>
                  </div>
                </div>
              </div>

              {/* Call to Action Bar */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-blue-50 text-center sm:text-left">
                  <p className="font-medium text-lg">Bạn đã sẵn sàng trải nghiệm?</p>
                  <p className="text-sm opacity-90">Đặt bàn ngay để giữ chỗ cho sự kiện này</p>
                </div>
                <Button
                  onClick={isApplied ? undefined : handleApplyClick}
                  disabled={isApplied}
                  className={`w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 ${
                    isApplied
                      ? "bg-gray-800 text-white cursor-not-allowed hover:bg-gray-800"
                      : "bg-white text-indigo-700 hover:bg-blue-50 hover:scale-105"
                  }`}
                >
                  {isApplied ? (
                    <div className="flex items-center gap-2">
                      <CircleCheck className="w-6 h-6" />
                      <span>Đã đặt bàn</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Đặt Bàn Ngay</span>
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Nội dung chương trình
                </h2>
              </div>

              <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                <ul className="space-y-4">
                  {singleJob?.description
                    ?.split(/\.\s+/)
                    .filter((sentence: string) => sentence.trim().length > 0)
                    .map((sentence: string, index: number) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-blue-500" />
                        <span className="leading-relaxed">
                          {sentence.trim()}
                          {!sentence.trim().endsWith(".") && "."}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>

            {/* Target Audience / Requirements */}
            {singleJob?.requirements && singleJob.requirements.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shadow-inner">
                    <UserCheck className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Đối tượng khách hàng
                  </h2>
                </div>

                <div className="space-y-4">
                  {singleJob?.requirements.map((req: string, index: number) => (
                    <div key={index} className="space-y-3">
                      {req
                        .split(/\.\s+/)
                        .filter((sentence: string) => sentence.trim().length > 0)
                        .map((sentence: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-4 bg-orange-50/50 hover:bg-orange-50 rounded-2xl transition-colors border border-orange-100/50"
                          >
                            <UserCheck className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 leading-relaxed font-medium">
                              {sentence.trim()}
                              {!sentence.trim().endsWith(".") && "."}
                            </span>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Benefits & Offers */}
            {singleJob?.benefits && singleJob.benefits.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl shadow-lg border border-indigo-100 p-8 relative overflow-hidden"
              >
                {/* Decorative element */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Gift className="w-48 h-48" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Gift className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Ưu đãi đặc biệt</h2>
                  </div>

                  <div className="space-y-4">
                    {singleJob?.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="space-y-3">
                        {benefit
                          .split(/\.\s+/)
                          .filter((sentence: string) => sentence.trim().length > 0)
                          .map((sentence: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white"
                            >
                              <div className="bg-indigo-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                                <CircleCheck className="w-4 h-4 text-indigo-600" />
                              </div>
                              <span className="text-gray-800 leading-relaxed font-medium">
                                {sentence.trim()}
                                {!sentence.trim().endsWith(".") && "."}
                              </span>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Event Details Overview */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Thông tin tóm tắt
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-50 p-2.5 rounded-xl text-gray-500">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Ngày đăng chương trình</p>
                      <p className="font-semibold text-gray-900 mt-0.5">
                        {new Date(singleJob?.createdAt ?? "").toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-50 p-2.5 rounded-xl text-gray-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Khu vực</p>
                      <p className="font-semibold text-gray-900 mt-0.5">{singleJob?.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-50 p-2.5 rounded-xl text-gray-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Giới hạn số lượng</p>
                      <p className="font-semibold text-gray-900 mt-0.5">{singleJob?.position} khách</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-50 p-2.5 rounded-xl text-gray-500">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mức giá tham khảo</p>
                      <p className="font-semibold text-green-600 mt-0.5">{singleJob?.salary}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company / Restaurant Info Banner */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group">
                <div className="h-24 bg-gradient-to-br from-indigo-100 to-blue-50 relative">
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                </div>
                
                <div className="px-6 pb-6 relative">
                  <div className="flex justify-center -mt-12 mb-4 relative z-10">
                    <Avatar className="size-24 rounded-2xl border-4 border-white bg-white shadow-lg transition-transform group-hover:scale-105">
                      <AvatarImage
                        src={singleJob?.company?.logo || "/default_company_logo.jpg"}
                        alt={singleJob?.company?.name}
                        className="object-contain p-2"
                      />
                    </Avatar>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {singleJob?.company?.name || "Tên nhà hàng/thương hiệu"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">Đơn vị tổ chức & cung cấp dịch vụ</p>

                    <div className="space-y-3">
                      
                      
                      <Link
                        to={`/company/detail/${singleJob?.company?.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-medium transition-colors text-sm"
                      >
                        <Utensils className="w-4 h-4" />
                        <span>Xem chi tiết nhà hàng</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showDatePicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !isSubmitting && setShowDatePicker(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Ticket className="w-24 h-24 transform rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Xác nhận đặt bàn</h2>
                  <button
                    onClick={() => !isSubmitting && setShowDatePicker(false)}
                    disabled={isSubmitting}
                    className="p-1.5 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-blue-100 text-sm opacity-90">
                  {singleJob?.company?.name} rất hân hạnh được phục vụ bạn
                </p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span>Chọn ngày tham gia</span>
                  </div>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getTodayString()}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>Số lượng khách</span>
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Nhập số người..."
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-medium"
                />
              </div>

              <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex gap-3">
                <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800 leading-relaxed">
                  <span className="font-semibold block mb-1">Lưu ý quan trọng:</span> 
                  Yêu cầu đặt bàn của bạn sẽ được gửi trực tiếp đến quản lý nhà hàng để sắp xếp vị trí tốt nhất.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 px-8 py-6 flex gap-4 border-t border-slate-100">
              <button
                onClick={() => setShowDatePicker(false)}
                disabled={isSubmitting}
                className="w-1/3 px-4 py-3.5 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-bold rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Hủy bỏ
              </button>
              <button
                onClick={appliedJobHandle}
                disabled={!selectedDate || !numberOfGuests || isSubmitting}
                className="flex-1 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <CircleCheck className="w-5 h-5" />
                    <span>Xác nhận đặt ngay</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default JobDetail;