import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import type { RootState } from "@/redux/store";
import { useState, useMemo, useCallback, useEffect } from "react";
import { paginate } from "./helpers/pagination";
import { PaginationButtons } from "./helpers/PaginationButtons";
import { Button } from "./ui/button";
import LatestJobsSkeleton from "./skeletons/LatestJobsSkeleton";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import NoJobFound from "./helpers/NoJobFound";
import { motion } from "framer-motion";
import {
  fadeIn,
  buttonHover,
  buttonTap,
  slideInLeft,
  slideInRight,
} from "./../framer-motion-config";
import { Briefcase, Filter, TrendingUp, Users } from "lucide-react";

const LatestJobs = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);

  const jobsRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number.parseInt(searchParams.get("page") || "1");
  const categoryParam = searchParams.get("category") || "all";

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [filterCategory, setFilterCategory] = useState(categoryParam);

  const itemPerPage = 9;
  const categories = ["all", "it", "marketing", "design", "sales", "abc"];

  const activeJobs = useMemo(
    () =>
      allJobs.filter(
        (job) => job.status === "active" && job.approval === "approved"
      ),
    [allJobs]
  );

  // Lọc công việc theo category
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

  // Hàm xử lý thay đổi category
  const handleCategoryChange = useCallback(
    (category: string) => {
      setCurrentPage(1); // Đặt lại trang về 1
      setFilterCategory(category);
      setSearchParams({ page: "1", category }); // Cập nhật searchParams với trang 1 và category đã chọn
    },
    [setSearchParams]
  );

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString(), category: filterCategory }); // Cập nhật URL khi thay đổi trang
  };

  useEffect(() => {
    // Cập nhật lại state từ URL params khi URL thay đổi
    const pageFromUrl = Number.parseInt(searchParams.get("page") || "1");
    const categoryFromUrl = searchParams.get("category") || "all";

    setCurrentPage(pageFromUrl);
    setFilterCategory(categoryFromUrl);

    // Cuộn lên đầu trang khi thay đổi trang hoặc category
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={jobsRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
      >
        {/* Enhanced Header Section */}
        <div className="text-center space-y-6">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="block text-gray-900 mb-2">Việc làm</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600">
                mới nhất và hàng đầu
              </span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Khám phá những cơ hội nghề nghiệp tuyệt vời từ các công ty hàng
              đầu
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>
                <strong className="text-gray-900">{activeJobs.length}</strong>{" "}
                việc làm đang tuyển
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-blue-500" />
              <span>
                <strong className="text-gray-900">500+</strong> công ty đối tác
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Lọc theo ngành nghề
            </h3>
          </div>

          <motion.div variants={fadeIn} className="flex gap-3 flex-wrap">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                custom={index}
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <Button
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-0.5
                    ${
                      filterCategory === category
                        ? "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white border-transparent shadow-lg scale-105"
                        : "bg-white/90 text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50"
                    }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === "all" ? "Tất cả" : category.toUpperCase()}
                  {filterCategory === category && (
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
                Hiển thị{" "}
                <strong className="text-gray-900">
                  {paginatedJobs.length}
                </strong>{" "}
                trong tổng số{" "}
                <strong className="text-gray-900">{filteredJobs.length}</strong>{" "}
                việc làm
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                Trang {currentPage} / {totalPages}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Job Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedJobs.length === 0 ? (
            <div className="col-span-full">
              <NoJobFound />
            </div>
          ) : (
            paginatedJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))
          )}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
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

export default LatestJobs;
