import { Button } from "@/components/ui/button";
import { setJobsForUserIsSaved } from "@/redux/saveJobSlice";
import { RootState } from "@/redux/store";
import { API } from "@/utils/constant";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Clock, Trash2 } from "lucide-react";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { CustomTooltip } from "@/components/helpers/CustomTooltip";
import { Link } from "react-router-dom";

const SavedJobsTable = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  const { jobsForUserIsSaved } = useSelector(
    (store: RootState) => store.saveJob
  );

  const dispatch = useDispatch();

  const handleUnsaveJob = async (jobId: string) => {
    try {
      await axios.delete(`${API}/save-job/unsave/${jobId}`, {
        withCredentials: true,
      });
      fetchSavedJobs();
    } catch (error) {
      console.error("Error unsaving job:", error);
      toast.error("Lỗi khi hủy lưu việc làm");
    }
  };

  const fetchSavedJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/save-job/`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setJobsForUserIsSaved(res.data.savedJobs));
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Lỗi khi tải danh sách việc đã lưu");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchSavedJobs();
  }, [fetchSavedJobs, user]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header section with gradient background */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-500 p-8 rounded-t-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 opacity-20 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-green-400 opacity-20 rounded-full"></div>
        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold mb-2">
            Việc làm đã lưu
          </h1>
          <p className="text-white text-lg max-w-2xl">
            Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
            ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
          </p>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Danh sách{" "}
          <span className="text-green-600 font-semibold">
            {jobsForUserIsSaved.length}
          </span>{" "}
          việc làm đã lưu
        </h2>

        {/* Job listing */}
        {jobsForUserIsSaved.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {jobsForUserIsSaved.map((saveJob) => (
              <div
                key={saveJob._id}
                className="bg-green-50 rounded-lg shadow-sm p-4 flex flex-col md:flex-row items-start gap-4"
              >
                {/* Logo công ty */}
                <div className="size-20 rounded-md overflow-hidden flex items-center justify-center bg-white border border-gray-200">
                  <img
                    src={saveJob.job.company.logo}
                    alt={saveJob.job.company.name}
                    className="size-14 object-contain"
                  />
                </div>

                {/* Nội dung công việc */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {saveJob.job.title}
                  </h3>
                  <div className="text-green-600 font-semibold mb-1">
                    {saveJob.job.salary} Triệu
                  </div>
                  <div className="text-gray-700 mb-1 max-w-[240px] line-clamp-1">
                    <CustomTooltip content={saveJob.job.company.name}>
                      <span className="block">{saveJob.job.company.name}</span>
                    </CustomTooltip>
                  </div>
                  <div className="text-gray-500 text-sm mb-1">
                    Đã lưu:{" "}
                    {dayjs(saveJob.createdAt).format("DD/MM/YYYY - HH:mm")}
                  </div>

                  <div className="flex items-center flex-wrap gap-2 text-sm mb-1">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                      <CustomTooltip content={saveJob.job.location}>
                        <span className="truncate">
                          {saveJob.job.company.location}
                        </span>
                      </CustomTooltip>
                    </span>
                    <span className="text-gray-500">
                      Cập nhật:{" "}
                      {formatDistanceToNow(
                        new Date(saveJob.job.updatedAt || new Date()),
                        {
                          addSuffix: true,
                          locale: vi,
                        }
                      )}
                    </span>
                  </div>
                </div>

                {/* Nút thao tác */}
                <div className="flex flex-col gap-2 self-end md:self-center">
                  <Link
                    to={`/job/detail/${saveJob.job?.slug}`}
                    className="flex-1"
                  >
                    <Button className="bg-green-500 hover:bg-green-600 text-white cursor-pointer transition-colors duration-200">
                      Ứng tuyển
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleUnsaveJob(saveJob.job._id)}
                    variant="outline"
                    className="flex items-center cursor-pointer gap-1 text-gray-600 border-gray-300 hover:text-red-600 hover:border-red-400 transition-colors duration-200"
                  >
                    <Trash2 className="size-4" />
                    Bỏ lưu
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-center py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-green-100 text-green-600 rounded-full p-4">
                <Clock className="w-10 h-10" />
              </div>
              <p className="text-lg font-semibold">
                Bạn chưa lưu công việc nào
              </p>
              <p className="text-sm text-gray-500 max-w-md">
                Lưu những công việc mà bạn thấy phù hợp để dễ dàng truy cập và
                ứng tuyển sau này.
              </p>
              <Button
                className="bg-green-600 text-white hover:bg-green-700 transition mt-4 cursor-pointer"
                onClick={() => {
                  // điều hướng về trang tìm việc
                  window.location.href = "/jobs";
                }}
              >
                Khám phá việc làm
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobsTable;
