import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Search, Users, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { API } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "@/redux/applicationSlice";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import CommonSkeleton from "../components/Skeleton/CommonSkeleton";
import ActionButtons from "../components/ActionButtons";
import { PaginationButtons } from "@/components/helpers/PaginationButtons";
import { paginate } from "@/components/helpers/pagination";
import { Button } from "@/components/ui/button";

// Định nghĩa interface thay thế cho 'any'
interface CandidateApplication {
  _id: string;
  status: string;
  createdAt: string | Date;
  bookingDate?: string | Date;
  numberOfGuests?: number;
  applicant: {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    phoneNumber: number;
    profile: {
      bio?: string;
      skills?: string[];
      resume?: {
        url: string;
        public_id: string;
      };
      resumeOriginalName?: string;
      company?: string;
      profilePhoto: {
        url: string;
        public_id?: string;
      };
    };
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
  // job có thể không có nếu khách đặt trực tiếp
  job?: {
    title: string;
    company: {
      name: string;
    };
  };
  // Thêm company để lấy thông tin nếu khách đặt trực tiếp
  company?: {
    name: string;
  };
}

const Candidates = () => {
  const { applications } = useSelector((store: RootState) => store.application);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Đang xem xét</Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800">Đã chấp nhận</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Đã từ chối</Badge>;
      default:
        return null;
    }
  };

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/application/applicantsForRecruiter`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setApplications(res.data.applications));
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Lỗi khi tải danh sách ứng viên");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleAcceptAndReject = async (
    applicationId: string,
    status: string
  ) => {
    try {
      const res = await axios.put(
        `${API}/application/update-application-status/${applicationId}`,
        {
          status: status,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        fetchApplications();
        toast.success(
          status === "accepted"
            ? "Chấp nhận đặt bàn thành công"
            : "Từ chối đặt bàn thành công"
        );
      }
    } catch (error) {
      console.error("Error accepting application:", error);
      toast.error("Lỗi khi xử lý thao tác");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  // Ép kiểu mảng applications sang CandidateApplication[]
  const typedApplications = applications as CandidateApplication[];

  // Filter applications based on search term
  const filteredApplications = typedApplications.filter((app) => {
    const fullName = app.applicant?.fullname?.toLowerCase() || "";
    const email = app.applicant?.email?.toLowerCase() || "";
    const jobTitle = app.job?.title?.toLowerCase() || "đặt bàn tự do trực tiếp";
    const term = searchTerm.toLowerCase();
    return (
      fullName.includes(term) ||
      email.includes(term) ||
      jobTitle.includes(term)
    );
  });

  // Calculate total pages for pagination based on filtered applications
  const { paginatedData: paginatedCandidates, totalPages } = paginate(
    filteredApplications,
    currentPage,
    itemPerPage
  );

  const candidatesRef = useRef<HTMLDivElement | null>(null);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    candidatesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchApplications();
  };

  if (isLoading) {
    return <CommonSkeleton />;
  }

  return (
    <div ref={candidatesRef} className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Quản lý khách hàng
          </h1>
          <p className="mt-1 text-gray-500">
            Xem và quản lý danh sách khách hàng đã đặt bàn vào doanh nghiệp của bạn
          </p>
        </div>
      </div>

      <Card className="p-6 shadow-sm border border-gray-200 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm tên, email, sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-0 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border border-gray-300 hover:border-gray-400 transition-all duration-200 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              onClick={handleRefresh}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Tải lại
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full border-gray-300 px-4 py-1 text-sm hover:bg-gray-100"
            >
              Tất cả ({typedApplications.length})
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full px-4 py-1 text-sm hover:bg-yellow-50 text-yellow-700 border-yellow-300"
            >
              Đang xem xét (
              {typedApplications.filter((app) => app.status === "pending").length})
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full px-4 py-1 text-sm hover:bg-green-50 text-green-700 border-green-300"
            >
              Đã chấp nhận (
              {typedApplications.filter((app) => app.status === "accepted").length})
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full px-4 py-1 text-sm hover:bg-red-50 text-red-700 border-red-300"
            >
              Đã từ chối (
              {typedApplications.filter((app) => app.status === "rejected").length})
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[250px] text-gray-700 font-semibold">
                  Khách hàng
                </TableHead>
                <TableHead className="w-[250px] text-gray-700 font-semibold">
                  Chương trình / Dịch vụ
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Số điện thoại
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Số lượng
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Đặt cho ngày</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Ngày đặt bàn
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Trạng thái
                </TableHead>
                <TableHead className="w-[100px] text-center text-gray-700 font-semibold">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCandidates.length > 0 ? (
                paginatedCandidates.map((app) => (
                  <TableRow
                    key={app._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-full shadow">
                          <AvatarImage
                            src={
                              app.applicant?.profile?.profilePhoto?.url || ""
                            }
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {app.applicant?.fullname?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {app.applicant?.fullname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.applicant?.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* HIỂN THỊ "ĐẶT BÀN TỰ DO" NẾU LÀ ĐẶT TRỰC TIẾP DOANH NGHIỆP */}
                    <TableCell className="max-w-[250px]">
                      <div className={`font-medium truncate ${!app.job ? 'text-emerald-600' : ''}`}>
                        {app.job ? app.job.title : "Đặt bàn tự do (Qua doanh nghiệp)"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.job ? app.job.company?.name : (app.company?.name || "Dành cho Doanh nghiệp")}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="font-medium text-gray-800">
                        0{app.applicant?.phoneNumber}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block whitespace-nowrap">
                        {app.numberOfGuests || 1} khách
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {app.bookingDate ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-medium text-gray-800 whitespace-nowrap">
                            {new Date(app.bookingDate).toLocaleDateString(
                              "vi-VN",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(app.bookingDate).toLocaleTimeString(
                              "vi-VN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Chưa chọn</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-gray-700">
                        {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(app.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionButtons
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        applicant={app.applicant as any} 
                        status={app.status}
                        onView={() => console.log("Xem chi tiết", app._id)}
                        onAccept={() =>
                          handleAcceptAndReject(app._id, "accepted")
                        }
                        onReject={() =>
                          handleAcceptAndReject(app._id, "rejected")
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <div className="text-gray-500 text-lg flex flex-col items-center gap-2">
                      <span>📭 Không có khách hàng nào</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Candidates;