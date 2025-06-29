import { Search, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import FullScreenLoader from "./skeletons/FullScreenLoader";
import SuggestionList from "./helpers/SuggestionList";
import axios from "axios";
import { debounce } from "lodash";
import { API } from "@/utils/constant";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = async (selectedQuery?: string) => {
    const finalQuery = selectedQuery || query;
    if (!finalQuery.trim()) return;
    setIsSearching(true);
    dispatch(setSearchedQuery(finalQuery));
    await new Promise((resolve) => setTimeout(resolve, 300));
    navigate(`/browse?query=${finalQuery}`);
    setIsSearching(false);
    setShowSuggestions(false);
  };

  const fetchSuggestions = debounce(async (keyword: string) => {
    try {
      setIsFetchingSuggestions(true);
      const res = await axios.get(`${API}/job/suggestions?keyword=${keyword}`);
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
    } finally {
      setIsFetchingSuggestions(false);
    }
  }, 300);

  // Bắt sự kiện thay đổi input
  useEffect(() => {
    if (query.trim()) {
      fetchSuggestions(query);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Bắt sự kiện click với suggestion
  const handleSelectSuggestion = (item: { title: string }) => {
    setQuery(item.title);
    searchJobHandler(item.title);
  };

  // Bắt sự kiện click ra ngoài input để ẩn gợi ý
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center">
      {isSearching && <FullScreenLoader />}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300" />
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-700" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-1000" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200/50 backdrop-blur-sm shadow-lg">
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Trang web tìm kiếm việc làm số 1
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              <span className="block text-gray-900">Tìm kiếm, Nộp đơn &</span>
              <span className="block mt-2">
                <span className="text-gray-900">Nhận công việc </span>
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                    mơ ước của bạn
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                    mơ ước của bạn
                  </span>
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá hơn{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg blur opacity-30" />
              <span className="relative font-bold text-gray-900 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-lg border border-yellow-200">
                10,000+
              </span>
            </span>{" "}
            cơ hội từ các công ty hàng đầu trong và ngoài nước.
          </p>

          {/* Search Section */}
          <div className="relative max-w-2xl mx-auto mt-8">
            {/* Search Container */}
            <div className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500" />

              {/* Main Search Box */}
              <div className="relative bg-white rounded-2xl w-[480px] shadow-2xl border border-gray-200/50 backdrop-blur-sm overflow-hidden ">
                <div className="flex items-center">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (
                            activeSuggestionIndex >= 0 &&
                            suggestions[activeSuggestionIndex]
                          ) {
                            handleSelectSuggestion(
                              suggestions[activeSuggestionIndex]
                            );
                          } else {
                            searchJobHandler();
                          }
                        } else if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setActiveSuggestionIndex((prev) =>
                            Math.min(prev + 1, suggestions.length - 1)
                          );
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setActiveSuggestionIndex((prev) =>
                            Math.max(prev - 1, 0)
                          );
                        }
                      }}
                      value={query}
                      type="text"
                      placeholder="Vị trí tuyển dụng, tên công ty, địa điểm,..."
                      className="w-full h-16 px-8 text-lg text-gray-900 placeholder:text-gray-400 border-none outline-none bg-transparent font-medium"
                    />

                    {/* Input Border Animation */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>

                  {/* Search Button */}
                  <div className="p-2">
                    <Button
                      onClick={() => searchJobHandler()}
                      className="h-12 w-12 cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group/btn disabled:opacity-50"
                      disabled={isSearching || !query.trim()}
                    >
                      {isSearching ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <Search className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform duration-200" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Indicator */}
            {isFetchingSuggestions && (
              <div className="absolute left-6 -bottom-8 flex items-center gap-2 text-sm text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-100" />
                  <div className="w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-200" />
                </div>
                <span>Đang tìm gợi ý...</span>
              </div>
            )}

            {/* Suggestions */}
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 z-50 mt-2"
              >
                <SuggestionList
                  suggestions={suggestions}
                  onSelect={handleSelectSuggestion}
                  keyword={query}
                  activeIndex={activeSuggestionIndex}
                />
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>
                <span className="font-semibold text-gray-900">2.5M+</span> ứng
                viên đã tìm việc
              </span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
              <span>
                <span className="font-semibold text-gray-900">50K+</span> công
                ty đối tác
              </span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500" />
              <span>
                <span className="font-semibold text-gray-900">98%</span> tỷ lệ
                hài lòng
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
