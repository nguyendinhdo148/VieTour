import { useEffect, useRef, useCallback, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import {
  Monitor,
  Server,
  Settings,
  Palette,
  MousePointer,
  Smartphone,
  Gamepad2,
  ArrowRight,
  Briefcase,
  Database,
  SquareStack,
} from "lucide-react";

const category = [
  {
    name: "Frontend Developer",
    icon: Monitor,
    color: "from-blue-500 to-cyan-400",
    description: "UI/UX Implementation",
    demand: "High",
  },
  {
    name: "Backend Developer",
    icon: Server,
    color: "from-emerald-500 to-teal-400",
    description: "Server & Database",
    demand: "High",
  },
  {
    name: "Fullstack Developer",
    icon: SquareStack,
    color: "from-purple-500 to-pink-400",
    description: "End-to-End Development",
    demand: "Very High",
  },
  {
    name: "DevOps Engineer",
    icon: Settings,
    color: "from-orange-500 to-amber-400",
    description: "Infrastructure & CI/CD",
    demand: "High",
  },
  {
    name: "Data Scientist",
    icon: Database,
    color: "from-indigo-500 to-blue-400",
    description: "Analytics & ML",
    demand: "Medium",
  },
  {
    name: "Graphics Designer",
    icon: Palette,
    color: "from-pink-500 to-rose-400",
    description: "Visual Design",
    demand: "Medium",
  },
  {
    name: "UI/UX Designer",
    icon: MousePointer,
    color: "from-violet-500 to-purple-400",
    description: "User Experience",
    demand: "High",
  },
  {
    name: "Mobile Developer",
    icon: Smartphone,
    color: "from-teal-500 to-cyan-400",
    description: "iOS & Android",
    demand: "High",
  },
  {
    name: "Game Developer",
    icon: Gamepad2,
    color: "from-red-500 to-pink-400",
    description: "Gaming & Interactive",
    demand: "Medium",
  },
];

const CategoryCarousel = () => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    setIsAutoPlaying(true);
    intervalRef.current = setInterval(() => {
      carouselRef.current?.scrollNext();
    }, 4000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsAutoPlaying(false);
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

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
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setTimeout(() => setSelectedCategory(null), 300);
  };

  const getDemandBadgeColor = (demand: string) => {
    switch (demand) {
      case "Very High":
        return "bg-gradient-to-r from-green-500 to-emerald-400 text-white";
      case "High":
        return "bg-gradient-to-r from-blue-500 to-cyan-400 text-white";
      case "Medium":
        return "bg-gradient-to-r from-yellow-500 to-orange-400 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="relative py-12 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div
        className="relative max-w-7xl mx-auto"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {/* Hero Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6">
            <Briefcase size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Cơ hội việc làm
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Khám phá cơ hội nghề nghiệp
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            Tìm kiếm vị trí phù hợp với kỹ năng và đam mê của bạn
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div
              className={`w-2 h-2 rounded-full ${
                isAutoPlaying ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
            <span>{isAutoPlaying ? "Đang tự động duyệt" : "Đã tạm dừng"}</span>
          </div>
        </div>

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
            {category.map((cate, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-[320px] md:basis-[360px] lg:basis-[380px]"
              >
                <div className="group h-full">
                  <div
                    onClick={() => handleCategoryClick(cate.name)}
                    className={`
                      relative h-48 bg-white border border-gray-200/60 
                      rounded-3xl shadow-lg hover:shadow-2xl
                      transition-all duration-400 ease-out cursor-pointer
                      hover:-translate-y-2 overflow-hidden
                      ${
                        selectedCategory === cate.name
                          ? "scale-98"
                          : "hover:scale-[1.01]"
                      }
                    `}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`
                      absolute inset-0 bg-gradient-to-br ${cate.color} 
                      opacity-0 group-hover:opacity-10 
                      transition-opacity duration-500
                    `}
                    ></div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`
                        inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                        ${getDemandBadgeColor(cate.demand)}
                      `}
                      >
                        <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
                        {cate.demand}
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="relative p-8 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Icon */}
                        <div
                          className={`
                          inline-flex items-center justify-center w-16 h-16 
                          bg-gradient-to-br ${cate.color} rounded-2xl
                          group-hover:rotate-6 group-hover:scale-110
                          transition-all duration-500
                        `}
                        >
                          <cate.icon
                            size={28}
                            className="text-white drop-shadow-lg"
                          />
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                            {cate.name}
                          </h3>
                          <p className="text-gray-600 text-sm font-medium">
                            {cate.description}
                          </p>
                        </div>
                      </div>

                      {/* Action Area */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="text-xs text-gray-500 font-medium">
                          Xem cơ hội
                        </div>
                        <div className="flex items-center gap-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-semibold">
                            Khám phá
                          </span>
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Premium Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Premium Navigation */}
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

        {/* Enhanced Progress Indicators */}
        <div className="flex justify-center mt-10 space-x-3">
          {Array.from({
            length: Math.min(5, Math.ceil(category.length / 2)),
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

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-8 py-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">100+</span> lĩnh vực
              nghề nghiệp
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">1000+</span> cơ hội
              việc làm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
