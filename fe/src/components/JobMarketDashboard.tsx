import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PlaceMarketDashboard = () => {
  // Lấy danh sách tất cả data từ Redux store (giữ nguyên biến job để không lỗi logic)
  const { allJobs } = useSelector((store: RootState) => store.job);

  // 1. DỮ LIỆU THẬT: THẰNG NÀO ĐĂNG NHIỀU CHO NÓ LÊN (Top Thương hiệu / Chuỗi)
  const topBrands = useMemo(() => {
    const brandMap = new Map();
    allJobs.forEach((job) => {
      if (job.status === "active" && job.approval === "approved") {
        const cId = job.company?._id;
        if (cId) {
          const companyName = job.company?.name ?? "Unknown";
          const companyLogo = job.company?.logo ?? "";
          if (brandMap.has(cId)) {
            brandMap.get(cId).count += 1;
          } else {
            brandMap.set(cId, {
              _id: cId,
              name: companyName,
              logo: companyLogo,
              count: 1,
            });
          }
        }
      }
    });
    // Sắp xếp giảm dần theo số lượng bài đăng và lấy Top 4
    return Array.from(brandMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [allJobs]);

  // 2. Địa điểm "active" và "approved" (top 3 mới nhất)
  const activePlaces = useMemo(
    () =>
      allJobs
        .filter(
          (job) =>
            job.status === "active" &&
            job.approval === "approved" &&
            job.company
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 3),
    [allJobs]
  );

  // 3. Tổng số địa điểm active
  const activePlacesCount = useMemo(
    () =>
      allJobs.filter(
        (job) => job.status === "active" && job.approval === "approved"
      ).length,
    [allJobs]
  );

  // 4. Địa điểm đăng mới trong 24h gần nhất
  const placesInLast24h = useMemo(() => {
    const now = new Date();
    return allJobs.filter((job) => {
      const createDate = new Date(job.createdAt);
      return (now.getTime() - createDate.getTime()) / (1000 * 60 * 60) <= 24;
    });
  }, [allJobs]);

  // 5. Số thương hiệu/chuỗi đang hoạt động
  const activeBrandsCount = useMemo(() => {
    const set = new Set();
    allJobs.forEach((job) => {
      if (job.status === "active" && job.approval === "approved") {
        const companyId = job.company?._id;
        if (companyId) {
          set.add(companyId);
        }
      }
    });
    return set.size;
  }, [allJobs]);

  // 6. Chart tăng trưởng số địa điểm mới mỗi ngày (7 ngày gần nhất)
  const growthChart = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      date.setHours(0, 0, 0, 0);
      return date;
    });
    const data = days.map((d) => {
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      return allJobs.filter((job) => {
        const c = new Date(job.createdAt);
        return c >= d && c < next;
      }).length;
    });
    const max = Math.max(...data, 1);
    return data.map((v) => Math.round((v / max) * 60 + 35)); // scale 35%-95%
  }, [allJobs]);

  // 7. Gắn ngày cho trục chart
  const chartLabels = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });
    });
  }, []);

  const currentDate = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // 8. Phân bổ theo mức giá / khách (Đã điều chỉnh dải số để khớp với VNĐ thực tế như 155000)
  const priceStats = useMemo(() => {
    const ranges = [
      { label: "Dưới 100k", min: 0, max: 100000 },
      { label: "100k - 300k", min: 100000, max: 300000 },
      { label: "300k - 500k", min: 300000, max: 500000 },
      { label: "500k - 1 triệu", min: 500000, max: 1000000 },
      { label: "Trên 1 triệu", min: 1000000, max: Number.MAX_SAFE_INTEGER },
    ];
    const stats = Array(ranges.length).fill(0);
    allJobs.forEach((job) => {
      if (
        job.status === "active" &&
        job.approval === "approved" &&
        typeof job.salary === "number"
      ) {
        const price = job.salary;
        ranges.forEach((r, idx) => {
          if (price >= r.min && price < r.max) {
            stats[idx]++;
          }
        });
      }
    });
    const total = stats.reduce((a, b) => a + b, 0) || 1;
    return stats.map((count, idx) => ({
      label: ranges[idx].label,
      value: Math.round((count / total) * 100),
      color: [
        "from-green-500 to-green-400",
        "from-blue-500 to-blue-400",
        "from-yellow-500 to-yellow-400",
        "from-orange-500 to-orange-400",
        "from-red-500 to-red-400",
      ][idx],
    }));
  }, [allJobs]);

  return (
    <>
      <style>{`
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px rgba(34,197,94,0.3); } 50% { box-shadow: 0 0 30px rgba(34,197,94,0.6); } }
        .pulse-glow {animation: pulse-glow 2s ease-in-out infinite;}
      `}</style>

      <div className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Khám phá địa điểm hôm nay{" "}
              <span className="text-green-400 font-extrabold block md:inline mt-2 md:mt-0">
                {currentDate}
              </span>
            </h2>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center pulse-glow">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Top Brands & Latest */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* TOP BRANDS (DỮ LIỆU THẬT) */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full blur-2xl"></div>
                <h3 className="text-xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Chuỗi nổi bật nhất
                </h3>
                
                <div className="space-y-4 relative z-10">
                  {topBrands.length === 0 && (
                    <p className="text-slate-400 text-sm">Chưa có dữ liệu thương hiệu.</p>
                  )}
                  {topBrands.map((brand, index) => (
                    <div key={brand._id} className="flex items-center justify-between bg-slate-700/30 rounded-xl p-3 border border-slate-600/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                          {brand.logo ? (
                            <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-slate-800 font-bold">{brand.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white line-clamp-1">{brand.name}</div>
                          <div className="text-xs text-yellow-200">Top {index + 1} Trending</div>
                        </div>
                      </div>
                      <div className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded-md">
                        {brand.count} bài đăng
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Places */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold mb-6 text-green-400">Chương trình mới</h3>
                <div className="space-y-4">
                  {activePlaces.length === 0 && (
                    <p className="text-slate-400 text-sm">Chưa có địa điểm mới cập nhật.</p>
                  )}
                  {activePlaces.map((job, index) => (
                    <Link to={`/job/detail/${job.slug}`} key={index} className="block">
                      <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer border border-slate-600/30">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                            {job.company.logo ? (
                              <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-slate-800 font-bold text-lg">{job.company.name.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2">{job.title}</h4>
                            <p className="text-xs text-green-300 mb-1 truncate">{job.company.name}</p>
                            <p className="text-xs text-slate-400 truncate">{job.location}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Column - Statistics & Chart */}
            <div className="lg:col-span-4 space-y-6">
              {/* Top Stats Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">{placesInLast24h.length.toLocaleString("vi-VN")}</div>
                  <div className="text-green-300 font-medium">Chương trình mới (24h) </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">{activePlacesCount.toLocaleString("vi-VN")}</div>
                  <div className="text-blue-300 font-medium">Tổng chương trình trên hệ thống</div>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">{activeBrandsCount.toLocaleString("vi-VN")}</div>
                  <div className="text-purple-300 font-medium">Thương hiệu / Đối tác</div>
                </div>
              </div>

              {/* Growth Chart */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <h3 className="text-lg font-bold text-green-400">Tăng trưởng địa điểm mới</h3>
                </div>
                <div className="h-40 flex items-end justify-between space-x-2">
                  {growthChart.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg shadow-lg hover:from-green-500 hover:to-green-300 transition-all duration-300"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-around gap-2 text-xs text-slate-400 mt-4">
                  {chartLabels.map((label, idx) => (
                    <span key={idx}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Price Range Chart */}
            <div className="lg:col-span-4">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-blue-400">Phân bổ theo mức giá</h3>
                  </div>
                  <button className="text-xs bg-green-500/20 px-3 py-2 rounded-lg text-green-300 border border-green-500/30">
                    Chi phí / Khách
                  </button>
                </div>

                <div className="space-y-6 mt-8">
                  {priceStats.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300 font-medium">{item.label}</span>
                        <span className="text-white font-bold">{item.value}%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 shadow-lg`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceMarketDashboard;