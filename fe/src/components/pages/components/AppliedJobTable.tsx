import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Utensils,
  MapPin,
  Store,
  AlertTriangle,
} from "lucide-react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { API } from "@/utils/constant";
import axios from "axios";
import { setApplications } from "@/redux/applicationSlice";
import toast from "react-hot-toast";
import { Application } from "@/types/application";
import { PaginationButtons } from "@/components/helpers/PaginationButtons";
import { paginate } from "@/components/helpers/pagination";
import { CustomTooltip } from "@/components/helpers/CustomTooltip";

const AppliedJobTable = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const { applications } = useSelector((store: RootState) => store.application);
  const dispatch = useDispatch();

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/application/applied-jobs`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setApplications(res.data.applications));
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Lỗi khi tải danh sách");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchApplications();
  }, [fetchApplications, user]);

  const getStatusBadge = (status: Application["status"]) => {
    const variants = {
      pending: {
        icon: <Clock className="h-4 w-4" />,
        text: "Chưa sử dụng",
        style: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      accepted: {
        icon: <CheckCircle2 className="h-4 w-4" />,
        text: "Đã áp dụng",
        style: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      rejected: {
        icon: <XCircle className="h-4 w-4" />,
        text: "Hết hạn",
        style: "bg-red-100 text-red-800 hover:bg-red-200",
      },
    };

    return (
      <Badge
        className={`gap-1.5 px-2 py-1 text-sm font-medium ${variants[status].style}`}
      >
        {variants[status].icon}
        {variants[status].text}
      </Badge>
    );
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6; 

  const { paginatedData: appliedJobs, totalPages } = paginate(
    applications,
    currentPage,
    itemPerPage
  );

  const appliedJobsRef = useRef<HTMLDivElement | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    appliedJobsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      <div className="px-6 py-5 border-b border-gray-200 bg-orange-50">
        <h2 className="text-xl font-bold text-gray-800">
          Chương trình & Khuyến mãi đã nhận
        </h2>
        <p className="text-sm text-gray-500">
          Danh sách các ưu đãi hoặc sự kiện bạn đã đăng ký tham gia
        </p>
      </div>

      <Table className="min-w-full text-sm">
        <TableCaption className="py-4 text-gray-500">
          Hãy đưa mã cho nhân viên nhà hàng để được áp dụng
        </TableCaption>
        <TableHeader className="bg-white">
          <TableRow className="text-gray-600">
            <TableHead className="w-[140px] text-center">Ngày nhận</TableHead>
            <TableHead className="min-w-[180px]">Chương trình / Món</TableHead>
            <TableHead className="min-w-[140px]">Chi nhánh</TableHead>
            <TableHead className="min-w-[200px]">Địa điểm</TableHead>
            <TableHead className="text-left w-[140px]">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((application) => {
              const job = application.job;

              if (!job) {
                return (
                  <TableRow
                    key={application._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell className="text-gray-700 font-medium text-center">
                      {new Date(application.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </TableCell>

                    <TableCell
                      colSpan={3}
                      className="text-gray-400 text-center italic"
                    >
                      <div className="flex justify-center items-center gap-2 text-red-500 italic">
                        <AlertTriangle className="w-4 h-4" />
                        Chương trình này đã kết thúc hoặc không còn khả dụng
                      </div>
                    </TableCell>

                    <TableCell className="text-left">
                      {getStatusBadge(application.status)}
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow
                  key={application._id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell className="text-gray-700 font-medium text-center">
                    {new Date(application.createdAt).toLocaleDateString(
                      "vi-VN"
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 truncate max-w-[200px]">
                      <Utensils className="w-4 h-4 text-gray-400 shrink-0" />
                      <CustomTooltip content={job.title}>
                        <span className="truncate">{job.title}</span>
                      </CustomTooltip>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 truncate max-w-[140px]">
                      <Store className="w-4 h-4 text-gray-400 shrink-0" />
                      <CustomTooltip content={job.company.name}>
                        <span className="truncate">{job.company.name}</span>
                      </CustomTooltip>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 truncate max-w-[220px]">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <CustomTooltip content={job.location}>
                        <span className="truncate">{job.location}</span>
                      </CustomTooltip>
                    </div>
                  </TableCell>

                  <TableCell className="text-left">
                    {getStatusBadge(application.status)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-gray-400"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Clock className="w-10 h-10" />
                  <p className="text-sm">
                    Hiện bạn chưa nhận ưu đãi hay khuyến mãi nào
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center border-t border-gray-50 px-6 pb-4 bg-gray-50">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AppliedJobTable;