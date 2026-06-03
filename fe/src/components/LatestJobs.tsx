import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards"; // Vẫn giữ component cũ cho các item nhỏ
import type { RootState } from "@/redux/store";
import { useState, useMemo, useCallback, useEffect } from "react";
import { paginate } from "./helpers/pagination";
import { PaginationButtons } from "./helpers/PaginationButtons";
import { Button } from "./ui/button";
import LatestJobsSkeleton from "./skeletons/LatestJobsSkeleton";
import { useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NoJobFound from "./helpers/NoJobFound";
import { motion } from "framer-motion";
import {
  fadeIn,
  buttonHover,
  buttonTap,
  slideInLeft,
  slideInRight,
} from "./../framer-motion-config";
import { Store, Filter, TrendingUp, MapPin, Sparkles, Clock, ArrowRight } from "lucide-react";

const LatestPlaces = () => {
  // Giữ nguyên biến allJobs từ store để không vỡ logic backend
  const { allJobs } = useSelector((store: RootState) => store.job);

  const jobsRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number.parseInt(searchParams.get("page") || "1");
  const categoryParam = searchParams.get("category") || "all";

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [filterCategory, setFilterCategory] = useState(categoryParam);

  const itemPerPage = 12; // 1 to đùng + 11 nhỏ (tùy trang)
  
  // Đã đổi category sang concept mới
  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "Nhà hàng", label: "Nhà hàng" },
    { id: "cà phê", label: "Cà phê" },
    { id: "Quán ăn", label: "Quán ăn" },
    { id: "Quán cơm", label: "Quán cơm" },
  ];

  // Lọc và SẮP XẾP MỚI NHẤT LÊN ĐẦU
  const activeJobs = useMemo(
    () =>
      [...allJobs]
        .filter((job) => job.status === "active" && job.approval === "approved")
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), // Đảm bảo mới nhất ở index 0
    [allJobs]
  );

  // Lọc theo category
  const filteredJobs = useMemo(() => {
    if (filterCategory === "all") return activeJobs;
    return activeJobs.filter(
      (job) =>
        job.category &&
        job.category.toLowerCase() === filterCategory.toLowerCase()
    );
  }, [activeJobs, filterCategory]);

  // Tính toán phân trang
  const { paginatedData: paginatedJobs, totalPages } = useMemo(
    () => paginate(filteredJobs, currentPage, itemPerPage),
    [filteredJobs, currentPage]
  );

  // TÁCH BÀI MỚI NHẤT RA ĐỂ LÀM TO ĐÙNG (Chỉ áp dụng ở trang 1)
  const isPageOne = currentPage === 1;
  const hasJobs = paginatedJobs.length > 0;
  const heroItem = isPageOne && hasJobs ? paginatedJobs[0] : null;
  const remainingItems = isPageOne && hasJobs ? paginatedJobs.slice(1) : paginatedJobs;

  // Hàm xử lý thay đổi category
  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      setCurrentPage(1);
      setFilterCategory(categoryId);
      setSearchParams({ page: "1", category: categoryId });
    },
    [setSearchParams]
  );

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString(), category: filterCategory });
  };

  useEffect(() => {
    const pageFromUrl = Number.parseInt(searchParams.get("page") || "1");
    const categoryFromUrl = searchParams.get("category") || "all";

    setCurrentPage(pageFromUrl);
    setFilterCategory(categoryFromUrl);

    if (jobsRef.current) {
      jobsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  if (allJobs.length === 0) {
    return <LatestJobsSkeleton />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 min-h-screen relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div
        ref={jobsRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
      >
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="block text-gray-900 mb-2">Khám phá</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600">
                Địa điểm cực HOT
              </span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Những nhà hàng, quán cafe và dịch vụ làm đẹp mới nhất vừa đổ bộ lên hệ thống
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>
                <strong className="text-gray-900">{activeJobs.length}</strong>{" "}
                Chương trình mới
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>
                <strong className="text-gray-900">500+</strong> đối tác liên kết
              </span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Lọc theo danh mục
            </h3>
          </div>

          <motion.div variants={fadeIn} className="flex gap-3 flex-wrap">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                custom={index}
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <Button
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-0.5
                    ${
                      filterCategory === cat.id
                        ? "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white border-transparent shadow-lg scale-105"
                        : "bg-white/90 text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50"
                    }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                  {filterCategory === cat.id && (
                    <div className="ml-2 w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Results Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Hiển thị <strong className="text-gray-900">{paginatedJobs.length}</strong> / <strong className="text-gray-900">{filteredJobs.length}</strong> địa điểm
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                Trang {currentPage} / {totalPages}
              </span>
            </div>
          </div>
        </div>

        {/* KHU VỰC HIỂN THỊ ĐỊA ĐIỂM */}
        <div className="space-y-12">
          {paginatedJobs.length === 0 ? (
            <NoJobFound />
          ) : (
            <>
              {/* BÀI VIẾT MỚI NHẤT (TO ĐÙNG) - HIỂN THỊ Ở TRANG 1 */}
              {heroItem && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to={`/job/detail/${heroItem.slug || heroItem._id}`} className="block group">
                    <div className="relative w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-500">
                      
                      {/* Gradient viền siêu đẹp (Animated) */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>

                      {/* Badge "MỚI NHẤT" siêu to */}
                      <div className="absolute top-8 right-8 flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider shadow-lg animate-bounce">
                        <Sparkles className="w-5 h-5" />
                        Mới Nhất
                      </div>

                      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                        {/* Logo cực to */}
                        <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 bg-white rounded-3xl shadow-xl flex items-center justify-center border-4 border-gray-50 overflow-hidden group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500">
                          {heroItem.company?.logo ? (
                            <img src={heroItem.company.logo} alt={heroItem.company.name} className="w-full h-full object-contain p-4" />
                          ) : (
                            <span className="text-6xl font-black text-gray-300">{heroItem.company?.name?.charAt(0)}</span>
                          )}
                        </div>

                        {/* Thông tin bài viết */}
                        <div className="flex-1 text-center md:text-left space-y-6">
                          <div>
                            <p className="text-xl font-bold text-blue-600 mb-2">{heroItem.company?.name}</p>
                            <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight group-hover:text-purple-600 transition-colors">
                              {heroItem.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 font-medium">
                            <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                              <MapPin className="w-5 h-5 text-red-500" />
                              {heroItem.location}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                              <Clock className="w-5 h-5 text-orange-500" />
                              Vừa mở cửa
                            </span>
                          </div>

                          {/* Trích dẫn mô tả (nếu có) */}
                          <p className="text-lg text-gray-500 line-clamp-2 md:line-clamp-3">
                            {heroItem.description || "Hãy là những vị khách đầu tiên trải nghiệm dịch vụ và không gian tuyệt vời tại đây. Đặt chỗ ngay hôm nay để nhận vô vàn ưu đãi hấp dẫn!"}
                          </p>

                          <div className="pt-4">
                            <Button className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group-hover:w-full md:group-hover:w-auto">
                              Khám phá ngay <ArrowRight className="ml-2 w-6 h-6 animate-pulse" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* GRID CÁC BÀI VIẾT CÒN LẠI (Sử dụng component cũ) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {remainingItems.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {/* Component cũ nhưng sẽ hiển thị đẹp trong Grid này */}
                    <LatestJobCards job={job} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/60">
              <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestPlaces;