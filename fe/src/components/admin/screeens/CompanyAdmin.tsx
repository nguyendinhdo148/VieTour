import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Building,
  Edit2,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CompanyFormDialog from "../components/CompanyFormDialog";
import axios from "axios";
import { API } from "@/utils/constant";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { setCompanies, setSelectedCompany } from "@/redux/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CommonSkeleton from "../components/Skeleton/CommonSkeleton";
import { CustomTooltip } from "@/components/helpers/CustomTooltip";
import { paginate } from "@/components/helpers/pagination";
import { PaginationButtons } from "@/components/helpers/PaginationButtons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Company } from "@/types/company";
import EditApprovalCompanyDialog from "../components/EditApprovalCompanyDialog";

const CompanyAdmin = () => {
  const { companies, selectedCompany } = useSelector(
    (store: RootState) => store.company
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isEditApprovalDialogOpen, setIsEditApprovalDialogOpen] =
    useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [companyToReject, setCompanyToReject] = useState<string | null>(null);
  const [companyToEditApproval, setCompanyToEditApproval] = useState<{
    id: string;
    currentApproval: string;
    currentNote: string;
  } | null>(null);
  const [editApprovalStatus, setEditApprovalStatus] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const [editApprovalNote, setEditApprovalNote] = useState("");
  const dispatch = useDispatch();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs per page

  const companiesRef = useRef<HTMLDivElement | null>(null);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    companiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { paginatedData: paginatedCompanies, totalPages } = paginate(
    companies,
    currentPage,
    jobsPerPage
  );

  const fetchCompanies = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API}/admin/all-companies`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setCompanies(res.data.companies));
      }
    } catch (error) {
      console.error("Fetch companies error:", error);
      toast.error("Không thể tải danh sách công ty!");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // handleAddCompany function
  /*
  const handleAddCompany = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${API}/admin/company/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.data.success) {
        toast.success("Thêm công ty thành công!");
        fetchCompanies(); // Refresh the list
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Add company error:", error);
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data.message
          : "Không thể thêm công ty"
      );
    }
  };
  */

  // handleEditCompany function
  const handleEditCompany = async (formData: FormData) => {
    try {
      const response = await axios.put(
        `${API}/admin/company/${selectedCompany?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Cập nhật công ty thành công!");
        fetchCompanies();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Edit company error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Không thể cập nhật công ty");
      }
    }
  };

  // handleApproveCompany function
  const handleApproveCompany = async (
    companyId: string,
    approval: "approved" | "rejected",
    note?: string
  ) => {
    try {
      const response = await axios.put(
        `${API}/admin/approve-company/${companyId}`,
        {
          approval,
          approvalNote: note || "",
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          approval === "approved"
            ? "Đã duyệt công ty thành công"
            : approval === "rejected"
            ? "Đã từ chối công ty thành công"
            : "Cập nhật trạng thái công ty thành công"
        );
        fetchCompanies();
      }
    } catch (error) {
      console.error("Approve company error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Không thể duyệt công ty");
      } else {
        toast.error("Không thể duyệt công ty");
      }
    }
  };

  // Handle reject company click
  const handleRejectClick = (companyId: string) => {
    setCompanyToReject(companyId);
    setRejectNote("");
    setIsRejectDialogOpen(true);
  };

  // Confirm reject company
  const handleConfirmReject = async () => {
    if (!companyToReject) return;
    await handleApproveCompany(companyToReject, "rejected", rejectNote);
    setIsRejectDialogOpen(false);
    setCompanyToReject(null);
    setRejectNote("");
  };

  // Handle edit approval click
  const handleEditApprovalClick = (company: Company) => {
    setCompanyToEditApproval({
      id: company._id,
      currentApproval: company.approval || "pending",
      currentNote: company.approvalNote || "",
    });
    setEditApprovalStatus(
      company.approval as "pending" | "approved" | "rejected"
    );
    setEditApprovalNote(company.approvalNote || "");
    setIsEditApprovalDialogOpen(true);
  };

  // Confirm edit approval
  const handleConfirmEditApproval = async () => {
    if (!companyToEditApproval) return;
    await handleApproveCompany(
      companyToEditApproval.id,
      editApprovalStatus as "approved" | "rejected",
      editApprovalNote
    );
    setIsEditApprovalDialogOpen(false);
    setCompanyToEditApproval(null);
    setEditApprovalStatus("pending");
    setEditApprovalNote("");
  };

  // handleDelete function
  const handleDelete = async (company_id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa công ty này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(
        `${API}/admin/company/${company_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Xóa công ty thành công!");
        fetchCompanies();
      }
    } catch (error) {
      console.error("Delete company error:", error);
      toast.error("Không thể xóa công ty");
    }
  };

  if (isLoading) {
    return <CommonSkeleton />;
  }

  return (
    <div ref={companiesRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Building className="size-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Quản lý công ty
            </h1>
            <p className="mt-1 text-gray-500">
              Xem và quản lý danh sách công ty trong hệ thống
            </p>
          </div>
        </div>
        {/* <Button
          size="lg"
          className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md hover:shadow-lg transition"
          onClick={() => {
            setSelectedCompany(null);
            setIsDialogOpen(true);
          }}
        >
          <div className="flex items-center gap-2">
            <Plus className="mr-2 size-4" />
            <span>Thêm công ty mới</span>
          </div>
        </Button> */}
      </div>

      {/* Company List */}
      <Card className="shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6">
          {paginatedCompanies.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-50 transition">
                  <TableHead className="w-[200px]">Công ty</TableHead>
                  <TableHead className="text-center">Địa điểm</TableHead>
                  <TableHead className="text-center">Website</TableHead>
                  <TableHead className="text-center">Mã số thuế</TableHead>
                  <TableHead className="text-center">
                    Giấy phép kinh doanh
                  </TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Số điện thoại</TableHead>
                  <TableHead className="text-center">Ngày tạo</TableHead>
                  <TableHead className="text-center">Ngày cập nhật</TableHead>
                  <TableHead className="text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCompanies.map((company) => (
                  <TableRow key={company._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={company.logo || ""}
                            alt={company.name}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {company.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium max-w-[200px] line-clamp-1">
                            <CustomTooltip content={company.name}>
                              <span className="block">{company.name}</span>
                            </CustomTooltip>
                          </div>
                          <div className="max-w-[200px] text-sm text-gray-500 truncate">
                            {company.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="truncate max-w-[400px]">
                        {company.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {new URL(company.website).hostname}
                        </a>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {company.taxCode}
                    </TableCell>
                    <TableCell className="text-center">
                      {company.businessLicense && (
                        <a
                          href={company.businessLicense}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Xem Giấy phép
                        </a>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {company.approval === "approved" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="h-3 w-3" />
                          Đã duyệt
                        </span>
                      ) : company.approval === "rejected" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="h-3 w-3" />
                          Đã từ chối
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3" />
                          Chờ duyệt
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {company.email || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {company.phoneNumber || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(company.createdAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(company.updatedAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-50 text-blue-600 cursor-pointer"
                          onClick={() => {
                            dispatch(setSelectedCompany(company));
                            setIsDialogOpen(true);
                          }}
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        {company.approval === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-green-50 text-green-600 cursor-pointer"
                              onClick={() =>
                                handleApproveCompany(company._id, "approved")
                              }
                              title="Duyệt"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-red-50 text-red-600 cursor-pointer"
                              onClick={() => handleRejectClick(company._id)}
                              title="Từ chối"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-purple-50 text-purple-600 cursor-pointer"
                          onClick={() => handleEditApprovalClick(company)}
                          title="Chỉnh sửa trạng thái"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-50 text-red-600 cursor-pointer"
                          onClick={() => handleDelete(company?._id)}
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">Chưa có công ty nào được thêm.</p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setSelectedCompany(null);
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="size-4 mr-2" />
                Thêm công ty mới
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Pagination Buttons */}
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <CompanyFormDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          dispatch(setSelectedCompany(null));
        }}
        company={selectedCompany}
        onSuccess={(formData: FormData) => {
          if (selectedCompany) {
            handleEditCompany(formData);
          }
          //  else {
          //   handleAddCompany(formData);
          // }
        }}
      />

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Lý do từ chối công ty</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="note">Nhập lý do từ chối:</Label>
            <Textarea
              id="note"
              placeholder="Vui lòng nhập lý do từ chối..."
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              className="min-h-[100px] outline-none border border-gray-300 rounded-lg p-3 transition-all duration-200"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmReject}
              className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              disabled={!rejectNote.trim()}
            >
              Xác nhận từ chối
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Approval Dialog */}
      <EditApprovalCompanyDialog
        open={isEditApprovalDialogOpen}
        onOpenChange={setIsEditApprovalDialogOpen}
        status={editApprovalStatus}
        note={editApprovalNote}
        currentNote={companyToEditApproval?.currentNote}
        onStatusChange={setEditApprovalStatus}
        onNoteChange={setEditApprovalNote}
        onCancel={() => {
          setIsEditApprovalDialogOpen(false);
          setCompanyToEditApproval(null);
          setEditApprovalStatus("pending");
          setEditApprovalNote("");
        }}
        onConfirm={handleConfirmEditApproval}
      />
    </div>
  );
};

export default CompanyAdmin;
