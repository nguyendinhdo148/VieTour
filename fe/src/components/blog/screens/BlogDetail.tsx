import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Eye, Mail, Tag, User } from "lucide-react";
import { BlogContent } from "./../components/BlogContent";
import RelatedPosts from "./../components/RelatedPosts";
import Navbar from "../../shared/Navbar";
import { formatDate } from "@/components/helpers/FormatDate";
import { getReadingTime } from "@/components/helpers/GetReadingTime";
import axios from "axios";
import { API } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSingleBlog } from "@/redux/blogSlice";
import BlogDetailSkeleton from "../components/skeletons/BlogDetailSkeleton";
import NotFound from "@/components/pages/NotFound";

const BlogDetail = () => {
  const { singleBlog } = useSelector((store: RootState) => store.blog);
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogBySlug = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API}/blog/detail/${slug}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleBlog(res.data.blog));
        }
      } catch (error) {
        console.error("Error fetching blog by slug:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogBySlug();
  }, [slug, dispatch]);

  if (isLoading || !singleBlog) {
    return <BlogDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      {singleBlog && singleBlog.approval === "approved" ? (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Header Section */}
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="text-lg font-semibold px-3 py-1 bg-gray-50/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-full"
                >
                  {singleBlog?.category}
                </Badge>

                <h1 className="text-gray-700 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {singleBlog?.title}
                </h1>

                {/* Author and Meta Info */}
                <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center gap-6 p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-200/60 shadow-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-18 ring-3 ring-gray-200 shadow-lg">
                      <AvatarImage
                        src={
                          singleBlog?.created_by?.profile?.profilePhoto ||
                          "/placeholder.svg"
                        }
                        alt={singleBlog?.created_by?.fullname}
                      />
                      <AvatarFallback className="text-lg font-semibold bg-primary/10">
                        {(singleBlog?.created_by?.fullname ?? "")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="size-4 text-primary" />
                        <p className="font-semibold text-lg">
                          {singleBlog?.created_by?.fullname}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {singleBlog?.created_by?.profile?.bio}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="size-4" />
                        <span>{singleBlog?.created_by?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50">
                      <Eye className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {singleBlog?.views || 0} lượt xem
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {getReadingTime(singleBlog?.content || "")} phút đọc
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {formatDate(singleBlog?.createdAt || "")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {singleBlog?.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border border-gray-300"
                    >
                      <Tag className="h-3 w-3 text-muted-foreground transition-colors duration-200" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={singleBlog?.image || "/placeholder.svg"}
                  alt={singleBlog?.title}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <BlogContent content={singleBlog?.content || ""} />
                </CardContent>
              </Card>

              {/* Footer Info */}
              <Card className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-muted-foreground">
                    <div>
                      <strong>Đã đăng vào:</strong>{" "}
                      {formatDate(singleBlog?.createdAt || "")}
                    </div>
                    <div>
                      <strong>Cập nhật gần nhất:</strong>{" "}
                      {formatDate(singleBlog?.updatedAt || "")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Related Posts */}
              <RelatedPosts currentSlug={singleBlog?.slug} />
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default BlogDetail;
