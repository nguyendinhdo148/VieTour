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
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { API } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import CommonSkeleton from "../components/Skeleton/CommonSkeleton";
import ActionButtons from "../components/ActionButtons";
import { PaginationButtons } from "@/components/helpers/PaginationButtons";
import { paginate } from "@/components/helpers/pagination";
import { setUsersForAdmin } from "@/redux/authSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
import Swal from "sweetalert2";

const UserManagerAdmin = () => {
  const { usersForAdmin } = useSelector((store: RootState) => store.auth);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: 0,
  });

  const dispatch = useDispatch();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/all-users`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUsersForAdmin(res.data.users));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Lỗi khi tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  // Filter users based on search term
  const filteredUsers = usersForAdmin?.filter((user) => {
    const fullName = user.fullname.toLowerCase();
    const email = user.email.toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term);
  });

  const { paginatedData: paginatedUsers, totalPages } = paginate(
    filteredUsers || [],
    currentPage,
    itemPerPage
  );

  const usersRef = useRef<HTMLDivElement | null>(null);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    usersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa người dùng này?",
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
      const res = await axios.delete(`${API}/admin/delete-user/${userId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Xóa người dùng thành công");
        fetchUsers(); // Refresh user list
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Lỗi khi xóa người dùng");
    }
  };

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
    setFormData({
      fullname: user.fullname || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || 0,
    });
    setUpdateDialogOpen(true);
  };

  const handleUpdateUser = async (userId: string) => {
    try {
      const res = await axios.put(
        `${API}/admin/profile/update/${userId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Cập nhật người dùng thành công");
        setUpdateDialogOpen(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Lỗi khi cập nhật người dùng");
    }
  };

  if (isLoading) {
    return <CommonSkeleton />;
  }

  return (
    <div ref={usersRef} className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Quản lý người dùng
          </h1>
          <p className="mt-1 text-gray-500">
            Xem và quản lý danh sách người dùng trong hệ thống
          </p>
        </div>
      </div>

      <Card className="p-6 shadow-sm border border-gray-200 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100"
            >
              Tất cả ({usersForAdmin?.length})
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[300px] text-gray-700 font-semibold">
                  Người dùng
                </TableHead>
                <TableHead className="w-[300px] text-gray-700 font-semibold">
                  Email
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Vai trò
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Số điện thoại
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Ngày tạo
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Ngày cập nhật
                </TableHead>
                <TableHead className="w-[100px] text-gray-700 font-semibold text-center">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-full shadow">
                          <AvatarImage src={user.profile?.profilePhoto?.url || ""} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {user.fullname.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{user.fullname}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-center font-medium text-gray-800">{user.role}</TableCell>
                    <TableCell className="text-center font-medium text-gray-800">
                      {user.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(user.updatedAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionButtons
                        applicant={user}
                        status="user"
                        onView={() => {}}
                        onDelete={() => handleDeleteUser(user._id)}
                        onUpdate={() => handleUpdateClick(user)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <div className="text-gray-500 text-lg flex flex-col items-center gap-2">
                      <span>📭 Không có người dùng nào</span>
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

      {/* Add Update Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none p-6 rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Họ tên
              </Label>
              <Input
                id="fullname"
                className="col-span-3"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phoneNumber"
                className="col-span-3"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setUpdateDialogOpen(false)}
              className="text-red-600 hover:bg-red-100 cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              onClick={() => selectedUser && handleUpdateUser(selectedUser._id)}
            >
              Cập nhật
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagerAdmin;
