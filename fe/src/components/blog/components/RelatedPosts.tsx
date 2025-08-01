import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { API } from "@/utils/constant";
import { getReadingTime } from "@/components/helpers/GetReadingTime";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setRandomBlogs } from "@/redux/blogSlice";
import { Link } from "react-router-dom";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi", {
    month: "short",
    day: "numeric",
  });
}

const RelatedPosts = ({ currentSlug }: { currentSlug: string }) => {
  const { randomBlogs } = useSelector((store: RootState) => store.blog);

  const dispatch = useDispatch();

  // Fetch các bài viết random không trùng slug hiện tại
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const res = await axios.get(`${API}/blog/random-blogs`, {
          params: { currentSlug: currentSlug },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setRandomBlogs(res.data.randomBlogs));
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };
    fetchRelatedPosts();
  }, [currentSlug, dispatch]);

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 mb-8 shadow-sm">
        <div className="flex items-center gap-3">
          <BookOpen className="size-6 text-primary" />
          <h2 className="text-xl font-bold text-gray-900">Bài viết khác</h2>
        </div>
      </div>

      <div className="space-y-6">
        {randomBlogs.map((post) => (
          <div
            key={post._id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-300 border-l-4 border-l-primary/20 hover:border-l-primary hover:border-gray-400 rounded-lg"
          >
            <Link to={`/blog/detail/${post.slug}`}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <img
                    src={post.image || "/placeholder.svg?height=80&width=80"}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Badge
                      variant="secondary"
                      className="text-xs mb-2 rounded-full border border-gray-300"
                    >
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{getReadingTime(post.content)}m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
