import { Camera, Contact, Loader2, Mail, UserPen } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import UpdateProfileDialog from "./components/UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import axios from "axios";
import { API } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const res = await axios.put(`${API}/user/profile/avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Cập nhật ảnh đại diện thành công!");
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error("Đã có lỗi xảy ra khi tải lên ảnh đại diện.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-10">
        <section className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-6 shadow-md ring-1 ring-gray-100">
          {/* Top Info */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <Avatar className="size-20 ring-4 ring-white shadow-2xl shadow-black/10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "/placeholder.svg"}
                      alt={user?.fullname}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-2xl font-bold">
                      {user?.fullname
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Camera Upload Button */}
                  <Label
                    htmlFor="avatar-upload"
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2 rounded-full cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-100 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative">
                      {isUploading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Camera className="size-4" />
                      )}
                    </div>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {user?.fullname}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {user?.profile?.bio || "N/A"}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="ghost"
              size="icon"
              className="size-9 cursor-pointer rounded-full border border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
            >
              <UserPen className="size-4" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-3 text-gray-700 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="w-4 h-4 text-gray-500" />
              <span>0{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Kỹ năng
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-lg shadow-sm transition"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">N/A</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-8">
            <Label className="text-lg font-semibold text-gray-800 mb-1 block">
              Resume
            </Label>
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm break-all"
              >
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-sm text-gray-500">Chưa có</span>
            )}
          </div>
        </section>
      </main>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
