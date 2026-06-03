import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "@/utils/constant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import {
  ArrowRight,
  Store,
  MapPin,
  Star,
} from "lucide-react";

const gradients = [
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-purple-500 to-pink-400",
  "from-orange-500 to-amber-400",
  "from-indigo-500 to-blue-400",
  "from-pink-500 to-rose-400",
  "from-red-500 to-pink-400",
];

interface Company {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  slug: string;
}

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<CarouselApi | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // GỌI API LẤY DANH SÁCH DOANH NGHIỆP TỪ ADMIN ROUTE
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        // Lưu ý: Sửa lại /admin/all-companies nếu base route của bạn khác nhé (ví dụ /api/v1/admin/all-companies)
        const res = await axios.get(`${API}/admin/all-companies`, {
          withCredentials: true, 
        });
        
        if (res.data.success) {
          setCompanies(res.data.companies || []);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách thương hiệu (Admin Route):", error);
        // Nếu lỗi 401 thì array rỗng sẽ được xử lý ở giao diện dưới
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (companies.length <= 1) return;
    
    setIsAutoPlaying(true);
    intervalRef.current = setInterval(() => {
      carouselRef.current?.scrollNext();
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies.length]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsAutoPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (companies.length > 0) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay, companies.length]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const updateSlide = () => {
      if (carouselRef.current) {
        setCurrentSlide(carouselRef.current.selectedScrollSnap());
      }
    };

    carouselRef.current.on("select", updateSlide);

    return () => {
      carouselRef.current?.off("select", updateSlide);
    };
  }, [companies]);

  const handleCompanyClick = (company: Company) => {
    setSelectedCategory(company._id);
    setTimeout(() => {
      setSelectedCategory(null);
      navigate(`/company/detail/${company.slug}`);
    }, 300);
  };

  return (
    <div className="relative py-12 px-6 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div
        className="relative max-w-7xl mx-auto"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Store size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Đối tác hàng đầu
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Khám phá các thương hiệu nổi bật
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            Trải nghiệm dịch vụ tuyệt vời từ những nhà hàng, quán cà phê được yêu thích nhất.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div
              className={`w-2 h-2 rounded-full ${
                isAutoPlaying ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
            <span>{isAutoPlaying ? "Đang tự động cuộn" : "Đã tạm dừng"}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-500 font-medium">Đang tải danh sách thương hiệu...</span>
          </div>
        ) : companies.length > 0 ? (
          <>
            <Carousel
              setApi={(api) => (carouselRef.current = api)}
              opts={{
                loop: true,
                align: "center",
                skipSnaps: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {companies.map((company, index) => {
                  const gradientColor = gradients[index % gradients.length];

                  return (
                    <CarouselItem
                      key={company._id}
                      className="pl-4 basis-[320px] md:basis-[360px] lg:basis-[380px]"
                    >
                      <div className="group h-full">
                        <div
                          onClick={() => handleCompanyClick(company)}
                          className={`
                            relative h-48 bg-white border border-gray-200/60 
                            rounded-3xl shadow-lg hover:shadow-2xl
                            transition-all duration-400 ease-out cursor-pointer
                            hover:-translate-y-2 overflow-hidden
                            ${
                              selectedCategory === company._id
                                ? "scale-98"
                                : "hover:scale-[1.01]"
                            }
                          `}
                        >
                          <div
                            className={`
                              absolute inset-0 bg-gradient-to-br ${gradientColor} 
                              opacity-0 group-hover:opacity-5 
                              transition-opacity duration-500
                            `}
                          ></div>

                          <div className="absolute top-4 right-4">
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold shadow-sm">
                              <Star className="w-3 h-3 fill-current" />
                              Nổi bật
                            </div>
                          </div>

                          <div className="relative p-6 h-full flex flex-col justify-between">
                            <div className="space-y-4">
                              <div
                                className={`
                                  inline-flex items-center justify-center w-16 h-16 
                                  bg-white rounded-2xl shadow-md border border-gray-100
                                  group-hover:scale-110 group-hover:-rotate-3
                                  transition-all duration-500 overflow-hidden flex-shrink-0
                                `}
                              >
                                {company.logo ? (
                                  <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-full h-full object-contain p-2"
                                  />
                                ) : (
                                  <span className="text-2xl font-black bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">
                                    {company.name.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>

                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-700 transition-colors">
                                  {company.name}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium line-clamp-2">
                                  {company.description || "Thương hiệu đối tác cao cấp trên hệ thống."}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                <MapPin size={14} /> Xem chi nhánh
                              </div>
                              <div className="flex items-center gap-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-sm font-semibold">
                                  Chi tiết
                                </span>
                                <ArrowRight
                                  size={16}
                                  className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious
                className="
                  -left-6 md:-left-12 w-14 h-14 
                  bg-white/90 backdrop-blur-md border-2 border-gray-200/60
                  hover:bg-white hover:border-gray-300 hover:scale-110
                  transition-all duration-300 shadow-xl
                  disabled:opacity-30
                "
              />
              <CarouselNext
                className="
                  -right-6 md:-right-12 w-14 h-14 
                  bg-white/90 backdrop-blur-md border-2 border-gray-200/60
                  hover:bg-white hover:border-gray-300 hover:scale-110
                  transition-all duration-300 shadow-xl
                  disabled:opacity-30
                "
              />
            </Carousel>

            <div className="flex justify-center mt-10 space-x-3">
              {Array.from({
                length: Math.min(5, Math.ceil(companies.length / 2)),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselRef.current?.scrollTo(index * 2)}
                  className={`
                    h-2 rounded-full transition-all duration-500 hover:scale-125
                    ${
                      Math.floor(currentSlide / 2) === index
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 w-8 shadow-lg"
                        : "bg-gray-300 w-2 hover:bg-gray-400"
                    }
                  `}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-red-500 font-medium">
              Không có quyền truy cập (Lỗi 401) hoặc chưa có dữ liệu.
            </span>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-8 py-4 shadow-sm">
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900 text-base">{companies.length || 0}</span> thương hiệu
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-blue-600 text-base">Hàng ngàn</span> địa điểm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;