import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";

interface JobDetailDialogProps {
  open: boolean;
  onClose: () => void;
  job: Job | null;
}

export const JobDetailDialog = ({
  open,
  onClose,
  job,
}: JobDetailDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full border-none bg-white max-h-[90vh] overflow-auto p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
        <DialogHeader className="pr-2">
          <DialogTitle className="text-2xl font-semibold text-gray-800 mb-2">
            {job.title}
          </DialogTitle>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Công ty:</strong> {job.company?.name}
            </p>
            <p>
              <strong>Địa điểm:</strong> {job.location}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <Badge variant="outline">
                {job.status === "active"
                  ? "Hoạt động"
                  : job.status === "draft"
                  ? "Nháp"
                  : "Đã đóng"}
              </Badge>
            </p>
            <p>
              <strong>Vị trí:</strong> {job.position}
            </p>
            <p>
              <strong>Loại công việc:</strong> {job.jobType}
            </p>
            <p>
              <strong>Kinh nghiệm:</strong> {job.experienceLevel}
            </p>
            <p>
              <strong>Chi phí khoảng / khách:</strong> {job.salary}  
            </p>
            <p>
              <strong>Ngày tạo:</strong> {new Date(job.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[55vh] pr-2 mt-4">
          <section className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-1">
              Mô tả công việc:
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </section>

          {job.requirements?.length > 0 && (
            <section className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-1">
                Yêu cầu khách hàng:
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {job.benefits?.length > 0 && (
            <section>
              <h3 className="font-semibold text-gray-700 mb-1">Phúc lợi:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          )}
        </ScrollArea>

        <div className="mt-6 flex justify-end">
          <Button
            className="cursor-pointer px-6 py-3 hover:bg-gray-100"
            variant="outline"
            onClick={onClose}
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
