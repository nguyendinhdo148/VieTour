import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Filter,
  SortDesc,
  MapPin,
  Clock,
  DollarSign,
  Rocket,
  ChevronUp,
  ChevronDown,
  Bell,
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-emerald-600" />
            Cơ hội nghề nghiệp ({jobs.length})
          </h3>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
            <Button variant="outline" size="sm">
              <SortDesc className="h-4 w-4 mr-2" />
              Sắp xếp
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 border border-gray-100 rounded-2xl"
            >
              <Skeleton className="h-16 w-16 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-emerald-600" />
            Cơ hội nghề nghiệp (0)
          </h3>
        </div>

        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Chưa có việc làm nào
          </h3>
          <p className="text-gray-500 mb-6">
            Công ty này chưa đăng tuyển việc làm nào.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Bell className="h-4 w-4 mr-2" />
            Nhận thông báo khi có việc mới
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-emerald-600" />
          Cơ hội nghề nghiệp ({jobs.length})
        </h3>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <SortDesc className="h-4 w-4 mr-2" />
            Sắp xếp
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {(showAllJobs ? jobs : jobs.slice(0, 6)).map((job) => (
          <div
            key={job._id}
            className="group p-6 border border-gray-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={
                      job.company?.logo || "/placeholder.svg?height=32&width=32"
                    }
                    alt="logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xl group-hover:text-emerald-700 transition-colors mb-2">
                    {job.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Thỏa thuận
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700"
                    >
                      {job.jobType}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Link to={`/jobs/description/${job._id}`}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Ứng tuyển
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {jobs.length > 6 && (
          <div className="text-center pt-6">
            <Button
              variant="outline"
              onClick={() => setShowAllJobs(!showAllJobs)}
              className="px-8 py-3 rounded-xl"
            >
              {showAllJobs ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Thu gọn
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Xem thêm {jobs.length - 6} việc làm
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
