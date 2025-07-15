import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; // Dùng locale tiếng Việt nếu muốn
import type { Job } from "@/types/job";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

interface JobProps {
  job: Job;
  savedJobs: string[]; // Danh sách job đã lưu (jobId)
  onJobSaveChange: (jobId: string, saved: boolean) => void; // Callback để cập nhật job saved
}

const Job = ({ job, savedJobs, onJobSaveChange }: JobProps) => {
  const { user } = useSelector((store: RootState) => store.auth);
  const isSaved = savedJobs.includes(job._id);

  const navigate = useNavigate();

  const handleSaveClick = () => {
    if (!user) {
      navigate("/login");
      toast.error("Vui lòng đăng nhập để lưu công việc!");
    }
    onJobSaveChange(job._id, !isSaved);
  };

  return (
    <div className="p-6 rounded-lg shadow-sm bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-gray-500">
          Đăng{" "}
          {formatDistanceToNow(new Date(job?.createdAt || new Date()), {
            addSuffix: true,
            locale: vi,
          })}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full"
          aria-label="Save job"
          onClick={handleSaveClick}
        >
          {isSaved ? (
            <BookmarkCheck className="size-4 text-green-600" />
          ) : (
            <Bookmark className="size-4" />
          )}
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-start gap-3 mb-5">
        <Avatar className="size-14 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all duration-200">
          <AvatarImage
            src={job?.company.logo || "/default_company_logo.jpg"}
            alt={job?.company.name}
            className="object-contain p-1"
          />
        </Avatar>

        <div>
          <h2 className="font-semibold text-gray-900 line-clamp-1">
            {job?.title}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-600">{job?.company.name}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="size-3" />
              <span className="line-clamp-1">{job?.company?.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job description */}
      <div className="mb-5">
        <p className="text-gray-700 text-sm line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge
          className="text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium"
          variant="outline"
        >
          {job?.position} Vị trí
        </Badge>
        <Badge
          className="text-purple-600 bg-purple-50 hover:bg-purple-100 font-medium"
          variant="outline"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-green-600 bg-green-50 hover:bg-green-100 font-medium"
          variant="outline"
        >
          {job?.salary} triệu
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Link to={`/job/detail/${job?.slug}`} className="flex-1">
          <Button className="w-full py-2 px-6 bg-[#00b14f] text-white hover:bg-[#009640] cursor-pointer">
            Xem chi tiết
          </Button>
        </Link>

        <Button
          className={`flex-1 cursor-pointer w-full py-2 px-6
              ${
                isSaved
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "flex-1 w-full py-1 px-4 border border-gray-300 hover:bg-gray-50"
              }`}
          onClick={handleSaveClick}
        >
          {isSaved ? (
            <span className="flex items-center space-x-2">
              <BookmarkCheck className="size-4 text-white" />
              <span>Đã lưu</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <Bookmark className="size-4" />
              <span>Lưu lại sau</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Job;
