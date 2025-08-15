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

  // Handle change events for file input
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setInput({ ...input, file: file || "" });
  };

  // Handle change events for input fields and textarea
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
    console.log(input);
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
                Cập nhật thông tin cá nhân
              </span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-gray-600">
                Thực hiện thay đổi cho hồ sơ của bạn tại đây. Nhấp vào lưu khi
                bạn hoàn tất.
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
                  className="sm:col-span-3"
                  placeholder="Nhập họ và tên"
                  aria-label="Full name"
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
                  aria-label="Email"
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
                  name="number"
                  value={input.phoneNumber}
                  onChange={changeHandler}
                  className="sm:col-span-3"
                  placeholder="Nhập số điện thoại"
                  aria-label="Phone number"
                />
              </div>

              {/* Bio Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="bio"
                  className="sm:text-right text-gray-700 mt-2"
                >
                  Tiểu sử
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeHandler}
                  className="sm:col-span-3"
                  rows={3}
                  placeholder="Mô tả về bản thân"
                  aria-label="Bio"
                />
              </div>

              {/* Skills Field */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="sm:text-right text-gray-700">
                  Kĩ năng
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeHandler}
                  className="sm:col-span-3"
                  placeholder="Nhập các kỹ năng (cách nhau bằng dấu phẩy)"
                  aria-label="Skills"
                />
              </div>

              {/* Resume Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="file"
                  className="sm:text-right text-gray-700 pt-2"
                >
                  Resume
                </Label>

                <div className="sm:col-span-3 space-y-2">
                  {typeof input.file === "string" && (
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
                    className="w-full cursor-pointer"
                    aria-label="Resume upload"
                  />

                  <p className="text-sm text-gray-500">
                    Chọn file CV/Resume của bạn (PDF)
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
                  className="mr-2 text-white bg-gray-400 hover:bg-gray-500 transition-colors cursor-pointer"
                >
                  <span className="flex items-center">
                    <Loader2 className="mr-2 animate-spin" size="sm" />
                    <span className="animate-pulse">Đang lưu...</span>
                  </span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="text-white transition-colors cursor-pointer bg-blue-500 hover:bg-blue-600"
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
