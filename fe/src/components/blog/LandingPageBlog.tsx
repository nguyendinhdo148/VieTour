import { Search, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { API } from "@/utils/constant";
import axios from "axios";
import { setAllBlogs } from "@/redux/blogSlice";
import { RootState } from "@/redux/store";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { stripHtmlTags } from "../helpers/stripHTML";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SkeletonLandingPageBlog } from "./components/skeletons/SkeletonLandingPageBlog";
import { BLOG_CATEGORIES } from "@/lib/BlogCategory";

const LandingPageBlog = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all blogs
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API}/blog/all-blogs`);
        dispatch(setAllBlogs(res.data.blogs));
      } catch (err) {
        console.error("Lỗi khi fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBlogs();
  }, [dispatch]);

  const { allBlogs } = useSelector((store: RootState) => store.blog);

  const [visibleCount, setVisibleCount] = useState(8);

  const filteredPosts = allBlogs.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    return post.approval === "approved" && matchesCategory && matchesSearch;
  });

  const postsToShow = filteredPosts.slice(0, visibleCount);

  if (isLoading) {
    return <SkeletonLandingPageBlog />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold text-sm mb-8 border border-blue-200/50 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Mới: Tính năng AI được tích hợp
            <div className="ml-3 px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs font-bold">
              HOT
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1]">
            <span className="text-gray-900">Góc chia sẻ</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
              nghề nghiệp
            </span>{" "}
            <span className="text-gray-900">của bạn</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Từ góc nhìn cá nhân, bạn có thể tạo nên thay đổi cho cộng đồng.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-8 py-5 text-lg focus:outline-none"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 font-bold transition-colors flex items-center">
                <Search className="w-6 h-6 mr-3" />
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button
              key="all"
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Tất cả
            </button>
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category.label}
                onClick={() => setActiveCategory(category.label)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category.label
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.value}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
          {postsToShow.map((post, index) => (
            <div key={index}>
              <Link to={`/blog/detail/${post.slug}`}>
                <article className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-blue-200 h-full flex flex-col">
                  {/* Image - Fixed Height */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content - Flexible with fixed structure */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category & Meta */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-bold rounded-xl border border-blue-100">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 leading-tight hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Content */}
                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-4">
                      {stripHtmlTags(post.content)}
                    </p>

                    {/* Author & Date - Fixed height */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500 h-8">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                          <Avatar className="size-8 ring-2 ring-gray-200 shadow-lg">
                            <AvatarImage
                              src={
                                post.created_by.profile.profilePhoto ||
                                "/placeholder.svg"
                              }
                              alt={post.created_by.fullname}
                            />
                            <AvatarFallback className="text-lg font-semibold bg-primary/10">
                              {post.created_by.fullname
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="font-medium truncate">
                          {post.created_by.fullname}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-xs">
                          {formatDistanceToNow(
                            new Date(post?.createdAt || new Date()),
                            {
                              addSuffix: true,
                              locale: vi,
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Tags - Fixed at bottom with consistent height */}
                    <div className="flex flex-wrap gap-2 mt-auto h-16 content-start">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-colors cursor-pointer border border-gray-200 hover:border-blue-200 h-fit"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-3 py-1.5 text-gray-400 text-xs font-medium bg-gray-50 rounded-lg border border-gray-200 h-fit">
                          +{post.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">
              Không tìm thấy bài viết nào
            </div>
            <p className="text-gray-400">
              Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </p>
          </div>
        )}

        {/* Hiển thị nút "Hiển thị thêm" nếu còn bài chưa hiển thị hết */}
        {visibleCount < filteredPosts.length && (
          <div className="flex justify-center mt-8">
            <button
              className="bg-white border border-blue-500 text-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
              onClick={() => setVisibleCount((vc) => vc + 8)}
            >
              Hiển thị thêm
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPageBlog;
