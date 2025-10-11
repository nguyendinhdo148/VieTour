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
import { RefreshCw, Search, Users } from "lucide-react";
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
            ? "Chấp nhận ứng viên thành công"
            : "Từ chối ứng viên thành công"
        );
      }
    } catch (error) {
      console.error("Error accepting application:", error);
      toast.error("Lỗi khi chấp nhận ứng viên");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6; // Number of jobs per page

  // Filter applications based on search term
  const filteredApplications = applications.filter((app) => {
    const fullName = app.applicant?.fullname.toLowerCase();
    const email = app.applicant?.email.toLowerCase();
    const jobTitle = app.job?.title.toLowerCase();
    const term = searchTerm.toLowerCase();
    return (
      fullName?.includes(term) ||
      email?.includes(term) ||
      jobTitle?.includes(term)
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

  // handle refresh
  const handleRefresh = () => {
    setLoading(true);
    fetchApplications();
  };

  if (isLoading) {
    return <CommonSkeleton />;
  }

  return (
    <div ref={candidatesRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Quản lý ứng viên
          </h1>
          <p className="mt-1 text-gray-500">
            Xem và quản lý danh sách ứng viên ứng tuyển vào các vị trí công việc
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 shadow-sm border border-gray-200 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm ứng viên..."
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
              Tất cả ({applications.length})
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full px-4 py-1 text-sm hover:bg-yellow-50 text-yellow-700 border-yellow-300"
            >
              Đang xem xét (
              {applications.filter((app) => app.status === "pending").length})
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full px-4 py-1 text-sm hover:bg-green-50 text-green-700 border-green-300"
            >
              Đã chấp nhận (
              {applications.filter((app) => app.status === "accepted").length})
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer rounded-full px-4 py-1 text-sm hover:bg-red-50 text-red-700 border-red-300"
            >
              Đã từ chối (
              {applications.filter((app) => app.status === "rejected").length})
            </Badge>
          </div>
        </div>
      </Card>

      {/* Candidates List */}
      <Card className="shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[300px] text-gray-700 font-semibold">
                  Ứng viên
                </TableHead>
                <TableHead className="w-[300px] text-gray-700 font-semibold">
                  Vị trí ứng tuyển
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Số điện thoại
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Ngày ứng tuyển
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
                            {app.applicant?.fullname.charAt(0)}
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
                    <TableCell className="max-w-[300px]">
                      <div className="font-medium truncate">
                        {app.job?.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.job?.company.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-medium text-gray-800">
                        0{app.applicant?.phoneNumber}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(app.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionButtons
                        applicant={app.applicant}
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
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="text-gray-500 text-lg flex flex-col items-center gap-2">
                      <span>📭 Không có ứng viên nào</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination Buttons */}
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Candidates;
