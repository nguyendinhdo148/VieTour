import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/utils/constant";
import toast from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

interface UpdateProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UpdateProfileDialog = ({ open, setOpen }: UpdateProfileDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store: RootState) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setInput({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume?.url || ("" as string | File),
      });
    }
  }, [user]);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume?.url || ("" as string | File),
  });

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setInput({ ...input, file: file || "" });
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber.toString());
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${API}/user/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Cập nhật thành công!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "An unknown error");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="w-full sm:max-w-2xl bg-white rounded-lg shadow-xl px-4 sm:px-6"
        >
          <DialogHeader className="border-b pb-4">
            <DialogTitle>
              <span className="text-xl font-semibold text-gray-800">
                Thông tin thực khách
              </span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-gray-600">
                Cập nhật thông tin cá nhân và sở thích ăn uống để nhà hàng phục vụ bạn tốt hơn.
              </span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitHandler} className="space-y-6 py-4">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="fullname"
                  className="sm:text-right text-gray-700"
                >
                  Họ và tên
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeHandler}
                  className="sm:col-span-3 focus-visible:ring-orange-500"
                  placeholder="Nhập họ và tên"
                />
              </div>

              {/* Email Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="sm:text-right text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeHandler}
                  className="sm:col-span-3"
                  placeholder="Nhập địa chỉ email"
                  disabled
                />
              </div>

              {/* Phone Number Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="sm:text-right text-gray-700">
                  Số điện thoại
                </Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeHandler}
                  className="sm:col-span-3 focus-visible:ring-orange-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              {/* Bio Field (Bây giờ làm "Ghi chú/Dị ứng") */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="bio"
                  className="sm:text-right text-gray-700 mt-2"
                >
                  Ghi chú dị ứng
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeHandler}
                  className="sm:col-span-3 focus-visible:ring-orange-500"
                  rows={3}
                  placeholder="Ghi chú về các thành phần dị ứng hoặc yêu cầu đặc biệt..."
                />
              </div>

              {/* Skills Field (Bây giờ làm "Khẩu vị yêu thích") */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="sm:text-right text-gray-700">
                  Khẩu vị
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeHandler}
                  className="sm:col-span-3 focus-visible:ring-orange-500"
                  placeholder="VD: Thích ăn cay, Ít đường, Không hành (cách nhau dấu phẩy)"
                />
              </div>

              {/* Resume Upload (Bây giờ làm Thẻ thành viên/Ảnh hóa đơn PDF) */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="file"
                  className="sm:text-right text-gray-700 pt-2"
                >
                  Tài liệu đính kèm
                </Label>

                <div className="sm:col-span-3 space-y-2">
                  {typeof input.file === "string" && input.file !== "" && (
                    <div className="text-sm text-blue-600">
                      <span className="font-medium">File hiện tại:</span>{" "}
                      <a
                        href={input.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {input.file.split("/").pop()}
                      </a>
                    </div>
                  )}

                  <Input
                    id="file"
                    name="file"
                    type="file"
                    onChange={fileChangeHandler}
                    accept="application/pdf"
                    className="w-full cursor-pointer focus-visible:ring-orange-500"
                  />

                  <p className="text-sm text-gray-500">
                    Chọn file (PDF) thẻ thành viên hoặc voucher chứng minh (nếu có)
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t pt-4">
              {loading ? (
                <Button
                  variant="default"
                  type="button"
                  disabled
                  className="mr-2 text-white bg-gray-400 cursor-pointer"
                >
                  <span className="flex items-center">
                    <Loader2 className="mr-2 animate-spin" size="sm" />
                    <span className="animate-pulse">Đang lưu...</span>
                  </span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="text-white bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Lưu thay đổi
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;