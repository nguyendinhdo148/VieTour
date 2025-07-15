import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const JobMarketDashboard = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);

  const activeJobs = useMemo(
    () =>
      allJobs
        .filter((job) => job.status === "active" && job.approval === "approved")
        .splice(0, 3),
    [allJobs]
  );

  const currentDate = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .pause-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.6); }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-green-600 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-32 w-24 h-24 bg-green-500/20 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-400/15 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-300 rounded-full opacity-80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Thị trường việc làm hôm nay{" "}
              <span className="text-green-400 font-extrabold">
                {currentDate}
              </span>
            </h2>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center pulse-glow">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Robot & Latest Jobs */}
            <div className="lg:col-span-4 space-y-8">
              {/* Robot Illustration */}
              <div className="flex justify-center">
                <div className="relative float-animation">
                  <div className="w-36 h-36 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl pulse-glow">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                      <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                        AI
                      </span>
                    </div>
                  </div>
                  <div className="absolute -top-3 -left-6 w-10 h-10 bg-green-400 rounded-full shadow-lg"></div>
                  <div className="absolute -top-3 -right-6 w-10 h-10 bg-green-400 rounded-full shadow-lg"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-green-500/30 rounded-full blur-md"></div>
                </div>
              </div>

              {/* Latest Jobs */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold mb-6 text-green-400">
                  Việc làm mới nhất
                </h3>
                <div className="space-y-4">
                  {activeJobs.map((job, index) => (
                    <Link
                      to={`/job/detail/${job.slug}`}
                      key={index}
                      className="block"
                    >
                      <div
                        key={index}
                        className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer border border-slate-600/30"
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                          >
                            <span className="text-white font-bold text-sm">
                              {job.company.logo ? (
                                <img
                                  src={job.company.logo}
                                  alt={job.company.name}
                                  className="w-6 h-6"
                                />
                              ) : (
                                job.company.name.charAt(0).toUpperCase()
                              )}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                              {job.title}
                            </h4>
                            <p className="text-xs text-green-300 mb-1 truncate">
                              {job.company.name}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {job.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Column - Statistics */}
            <div className="lg:col-span-4 space-y-6">
              {/* Top Stats Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    4.790
                  </div>
                  <div className="text-green-300 font-medium">
                    Việc làm mới 24h gần nhất
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    50.641
                  </div>
                  <div className="text-blue-300 font-medium">
                    Việc làm đang tuyển
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    18.091
                  </div>
                  <div className="text-purple-300 font-medium">
                    Công ty đang tuyển
                  </div>
                </div>
              </div>

              {/* Growth Chart */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <h3 className="text-lg font-bold text-green-400">
                    Tăng trưởng cơ hội việc làm
                  </h3>
                </div>
                <div className="h-40 flex items-end justify-between space-x-2">
                  {[45, 52, 48, 55, 51, 49, 53].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg shadow-lg hover:from-green-500 hover:to-green-300 transition-all duration-300"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-4">
                  <span>22/06</span>
                  <span>23/06</span>
                  <span>24/06</span>
                  <span>25/06</span>
                  <span>26/06</span>
                  <span>27/06</span>
                  <span>28/06</span>
                </div>
              </div>
            </div>

            {/* Right Column - Demand Chart */}
            <div className="lg:col-span-4">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-blue-400">
                      Nhu cầu tuyển dụng theo
                    </h3>
                  </div>
                  <button className="text-xs bg-green-500/20 hover:bg-green-500/30 px-3 py-2 rounded-lg text-green-300 border border-green-500/30 transition-all duration-300">
                    Mức lương
                  </button>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      label: "Dưới 3 triệu",
                      value: 15,
                      color: "from-green-500 to-green-400",
                    },
                    {
                      label: "Từ 3-10 triệu",
                      value: 45,
                      color: "from-blue-500 to-blue-400",
                    },
                    {
                      label: "Từ 10-20 triệu",
                      value: 25,
                      color: "from-yellow-500 to-yellow-400",
                    },
                    {
                      label: "Từ 20-30 triệu",
                      value: 10,
                      color: "from-orange-500 to-orange-400",
                    },
                    {
                      label: "Trên 30 triệu",
                      value: 5,
                      color: "from-red-500 to-red-400",
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300 font-medium">
                          {item.label}
                        </span>
                        <span className="text-white font-bold">
                          {item.value}%
                        </span>
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

export default JobMarketDashboard;
