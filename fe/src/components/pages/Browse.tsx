import Navbar from "../shared/Navbar";
import Job from "./components/Job"; // Vẫn giữ nguyên component Job để không vỡ logic
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAllJobs, setSearchedQuery } from "@/redux/jobSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/utils/constant";
// Đổi Briefcase thành MapPin cho phù hợp với tìm kiếm địa điểm/dịch vụ
import { Search, Filter, MapPin, ChevronDown } from "lucide-react";

const Browse = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  const location = useLocation();
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GIỮ NGUYÊN LOGIC
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter");
    }

    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${API}/save-job/`, {
          withCredentials: true,
        });
        const savedJobIds = response.data.savedJobs.map(
          (savedJob: { job: { _id: string } }) => savedJob.job._id
        );
        setSavedJobs(savedJobIds);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đã lưu:", error);
      }
    };
    fetchSavedJobs();
  }, [user, navigate]);

  const onJobSaveChange = async (jobId: string, isSaved: boolean) => {
    try {
      if (isSaved) {
        await axios.post(
          `${API}/save-job/save/${jobId}`,
          {},
          {
            withCredentials: true,
          }
        );
        setSavedJobs((prev) => [...prev, jobId]);
      } else {
        await axios.delete(`${API}/save-job/unsave/${jobId}`, {
          withCredentials: true,
        });
        setSavedJobs((prev) => prev.filter((id) => id !== jobId));
      }
    } catch (error) {
      console.error("Lỗi khi thao tác lưu:", error);
    }
  };

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${API}/job/all-jobs`);
        dispatch(setAllJobs(res.data.jobs));
      } catch (err) {
        console.error("Lỗi khi fetch data:", err);
      }
    };

    fetchAllJobs();
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    dispatch(setSearchedQuery(query));
  }, [location.search, dispatch]);

  const { allJobs, searchedQuery } = useSelector(
    (store: RootState) => store.job
  );

  const filteredJobs = allJobs.filter((job) => {
    const isActive = job.status === "active" && job.approval === "approved";
    const keyword = searchedQuery.toLowerCase();

    const matchesTitle = job.title.toLowerCase().includes(keyword);
    const matchesLocation = job.location.toLowerCase().includes(keyword);
    const matchesCompany = job.company.name.toLowerCase().includes(keyword);
    const matchesCategory = job.category.toLowerCase().includes(keyword);

    return (
      isActive &&
      (matchesTitle || matchesLocation || matchesCompany || matchesCategory)
    );
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // GIAO DIỆN ĐÃ ĐƯỢC CHỈNH SỬA LẠI TỪ NGỮ VÀ MÀU SẮC CHO ĐỒNG BỘ NỀN TẢNG
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50">
      <Navbar />

      {/* Hero Section with Search Summary */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Khám phá địa điểm & Dịch vụ
              </h1>
              {searchedQuery && (
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <span>Từ khóa:</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    "{searchedQuery}"
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium">
                <MapPin className="w-4 h-4" />
                {filteredJobs.length} địa điểm phù hợp
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Lưới
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Danh sách
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="title">Theo tên (A-Z)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Bộ lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredJobs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy địa điểm/dịch vụ phù hợp
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Thử tìm kiếm với từ khóa khác hoặc mở rộng tiêu chí bộ lọc để khám phá thêm nhiều lựa chọn tuyệt vời.
            </p>
            <button
              onClick={() => {
                dispatch(setSearchedQuery(""));
                navigate("/browse");
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all rounded-lg font-medium shadow-md hover:shadow-lg"
            >
              Khám phá tất cả địa điểm
            </button>
          </div>
        ) : (
          /* Jobs Grid/List */
          <div
            className={`
            ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          `}
          >
            {sortedJobs.map((job) => (
              <div key={job._id}>
                {/* Vẫn giữ component Job như cũ để không làm gãy code bên trong */}
                <Job
                  job={job}
                  savedJobs={savedJobs}
                  onJobSaveChange={onJobSaveChange}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button - Optional for pagination */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
              <span>Hiển thị {filteredJobs.length} kết quả</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Filter className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Browse;