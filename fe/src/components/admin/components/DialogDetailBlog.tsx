import { BlogContent } from "@/components/blog/components/BlogContent";
import { formatDate } from "@/components/helpers/FormatDate";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Blog } from "@/types/blog";
import { BarChart3, Calendar, Tag, User } from "lucide-react";

interface DialogDetailBlogProps {
  isDetailOpen: boolean;
  setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBlog: Blog | null;
}

const DialogDetailBlog = ({
  isDetailOpen,
  setIsDetailOpen,
  selectedBlog,
}: DialogDetailBlogProps) => {
  return (
    <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Chi tiết bài viết
          </DialogTitle>
        </DialogHeader>
        {selectedBlog && (
          <div className="space-y-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={selectedBlog.image || "/placeholder.svg"}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="pb-2">
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {selectedBlog.category}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedBlog.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedBlog.created_by.fullname}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedBlog.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  {selectedBlog.views.toLocaleString()} lượt xem
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBlog.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-50 text-blue-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  <BlogContent content={selectedBlog.content} />
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailBlog;
