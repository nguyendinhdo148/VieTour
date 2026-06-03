import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Filter,
  SortDesc,
  MapPin,
  Clock,
  DollarSign,
  Rocket,
  ChevronUp,
  ChevronDown,
  Bell,
  UserRound,
  PartyPopper,
  CalendarDays
} from "lucide-react";
import type { Job } from "@/types/job";

interface CompanyJobsProps {
  jobs: Job[];
  isJobsLoading: boolean;
}

const CompanyJobs = ({ jobs, isJobsLoading }: CompanyJobsProps) => {
  const [showAllJobs, setShowAllJobs] = useState(false);

  if (isJobsLoading) {
    return (
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <PartyPopper className="h-6 w-6" />
            </div>
            Chương trình & Sự kiện ({jobs.length})
          </h3>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 border border-gray-100 rounded-2xl bg-white"
            >
              <Skeleton className="h-20 w-20 rounded-xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-12 w-32 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <PartyPopper className="h-6 w-6" />
            </div>
            Chương trình & Sự kiện (0)
          </h3>
        </div>

        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CalendarDays className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Chưa có chương trình nào
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Địa điểm này hiện chưa có sự kiện hoặc chương trình ưu đãi nào đang diễn ra. Hãy quay lại sau nhé!
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-6 font-medium shadow-lg shadow-orange-200">
            <Bell className="h-5 w-5 mr-2" />
            Nhận thông báo khi có sự kiện mới
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
            <PartyPopper className="h-6 w-6" />
          </div>
          Chương trình & Sự kiện ({jobs.length})
        </h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 hover:bg-gray-50 rounded-xl"
          >
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 hover:bg-gray-50 rounded-xl"
          >
            <SortDesc className="h-4 w-4 mr-2" />
            Sắp xếp
          </Button>
        </div>
      </div>

      <div className="grid gap-5">
        {(showAllJobs ? jobs : jobs.slice(0, 6)).map((job) => (
          <div
            key={job._id}
            className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-xl transition-all duration-300 gap-6"
          >
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-orange-100/50 p-2">
                <img
                  src={
                    job.company?.logo || "/placeholder.svg?height=48&width=48"
                  }
                  alt="logo"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xl group-hover:text-orange-600 transition-colors mb-2">
                  {job.title}
                </h4>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    {/* Đã thêm format toLocaleString cho job.salary tại đây */}
                    <span className="font-medium text-green-600">{Number(job.salary).toLocaleString('vi-VN')}</span> VNĐ / người
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg">
                    <UserRound className="h-4 w-4 text-gray-400" />
                    Tối đa {job.position} khách
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium px-3 py-1"
                  >
                    {job.jobType}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto">
              <Link to={`/job/detail/${job.slug}`} className="block w-full">
                <Button
                  className="w-full md:w-auto px-8 py-6 rounded-xl bg-gradient-to-r cursor-pointer text-white from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold text-base"
                >
                  <Rocket className="size-5 mr-2" />
                  Đặt Bàn Ngay
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {jobs.length > 6 && (
          <div className="text-center pt-8">
            <Button
              variant="outline"
              onClick={() => setShowAllJobs(!showAllJobs)}
              className="px-8 py-6 rounded-xl font-medium text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-orange-600"
            >
              {showAllJobs ? (
                <>
                  <ChevronUp className="h-5 w-5 mr-2" />
                  Thu gọn danh sách
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 mr-2" />
                  Xem thêm {jobs.length - 6} chương trình
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyJobs;