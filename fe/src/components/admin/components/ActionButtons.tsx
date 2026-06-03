import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/types/user";
import { CheckCircle2, Eye, XCircle, Trash2, Edit2 } from "lucide-react";

import { useState } from "react";

interface ActionButtonsProps {
  applicant: User;
  status: string;
  onView: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const ActionButtons = ({
  applicant,
  status,
  onView,
  onAccept,
  onReject,
  onDelete,
  onUpdate,
}: ActionButtonsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex items-center justify-end gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    onView(); // Gọi hàm xử lý ngoài nếu cần fetch data
                    setIsDialogOpen(true);
                  }}
                  className="hover:bg-gray-100 transition cursor-pointer"
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
          </Tooltip>

          {/* Dialog để hiển thị thông tin khách hàng */}
          <DialogContent className="bg-white border-none p-6 rounded-xl shadow-xl max-w-2xl text-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">
                Hồ sơ người dùng
              </DialogTitle>
            </DialogHeader>

            {applicant ? (
              <div className="space-y-6">
                {/* Avatar + Basic Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b pb-4">
                  <Avatar className="h-24 w-24 rounded-full shadow">
                    <AvatarImage
                      src={applicant?.profile?.profilePhoto?.url}
                      alt={applicant.fullname}
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-700">
                      {applicant?.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-semibold">
                      {applicant.fullname}
                    </h2>
                    <p className="text-sm text-gray-600">{applicant.email}</p>
                  </div>
                </div>

                {/* About section */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Giới thiệu
                  </h3>
                  <p className="text-sm">
                    {applicant.profile.bio || "Không có"}
                  </p>
                </div>

                {/* Skills */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Kỹ năng
                  </h3>
                  <p className="text-sm">
                    {applicant.profile.skills?.length
                      ? applicant.profile.skills.join(", ")
                      : "Không có"}
                  </p>
                </div>

                {/* Resume */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Hồ sơ đính kèm
                  </h3>
                  {applicant.profile.resumeOriginalName &&
                  applicant.profile.resume ? (
                    <a
                      href={applicant.profile.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      📄 {applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <p className="text-sm">Không có file</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Không tìm thấy thông tin khách hàng.
              </p>
            )}
          </DialogContent>
        </Dialog>

        {status === "pending" && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onAccept}
                  className="hover:bg-green-100 text-green-600 transition cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chấp nhận khách hàng</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onReject}
                  className="hover:bg-red-100 text-red-600 transition cursor-pointer"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Từ chối khách hàng</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
        <>
          {onUpdate && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onUpdate}
              className="hover:bg-blue-100 text-blue-600 cursor-pointer"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="hover:bg-red-100 text-red-600 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </>
      </div>
    </TooltipProvider>
  );
};

export default ActionButtons;
