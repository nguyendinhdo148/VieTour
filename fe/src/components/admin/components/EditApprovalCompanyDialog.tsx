import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export type ApprovalStatus = "pending" | "approved" | "rejected";

interface EditApprovalCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  status: ApprovalStatus;
  note: string;

  currentNote?: string;

  onStatusChange: (value: ApprovalStatus) => void;
  onNoteChange: (value: string) => void;

  onConfirm: () => void;
  onCancel: () => void;
}

const EditApprovalCompanyDialog = ({
  open,
  onOpenChange,
  status,
  note,
  currentNote,
  onStatusChange,
  onNoteChange,
  onConfirm,
  onCancel,
}: EditApprovalCompanyDialogProps) => {
  const isRejectError = status === "rejected" && !note.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa trạng thái duyệt công ty</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>
              Trạng thái <span className="text-red-500">*</span>
            </Label>

            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="border-gray-400">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>

              <SelectContent className="border-gray-400 bg-white">
                <SelectItem value="pending">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>Chờ duyệt</span>
                  </div>
                </SelectItem>

                <SelectItem value="approved">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Đã duyệt</span>
                  </div>
                </SelectItem>

                <SelectItem value="rejected">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>Đã từ chối</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ===== Ghi chú ===== */}
          <div className="space-y-2">
            <Label>
              Ghi chú{" "}
              {status === "rejected" && <span className="text-red-500">*</span>}
            </Label>

            <Textarea
              placeholder={
                status === "rejected"
                  ? "Vui lòng nhập lý do từ chối (bắt buộc)..."
                  : "Nhập ghi chú (tùy chọn)..."
              }
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              className={`
                min-h-[120px] resize-none bg-white
                ${
                  isRejectError
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-primary/20"
                }
              `}
            />

            {isRejectError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3.5 w-3.5" />
                Vui lòng nhập lý do từ chối
              </p>
            )}

            {currentNote && (
              <p className="text-xs text-gray-500">
                Ghi chú hiện tại: {currentNote}
              </p>
            )}
          </div>
        </div>

        {/* button confirm */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" className="border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={onCancel}>
            Hủy
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isRejectError}
            className={`
              min-w-[120px] text-white cursor-pointer
              ${
                status === "approved"
                  ? "bg-green-600 hover:bg-green-700"
                  : status === "rejected"
                  ? "bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }
            `}
          >
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditApprovalCompanyDialog;
