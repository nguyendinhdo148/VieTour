import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function CompanyPhotos() {
  const companyPhotos = [
    "https://pixaii.com/files/preview/1280x853/11712843092dfsuqgex5u2cjsbdvf48lrsqt5jf0ldiejhfgda9qyxsydg3tnx0xah4kqucd7al8ntmorfqoltoacktzhr4sebkydvzbr7t0kxc.jpg",
    "https://wallpapercat.com/w/full/4/6/6/1536059-3840x2160-desktop-4k-ha-long-vietnam-wallpaper-image.jpg",
    "https://pixaii.com/files/preview/1280x853/11712847070zzv6cal2agal15vsfoi4yjzjawqsgn1vlxmajr2fh7oxv3nbwvknyioicn8bdagii1r7flqisowpvwysxfjkwb3iulfcfsvrylpu.jpg",
    "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752UcT/anh-mo-ta.png",
    "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/02/anh-phong-canh-66-1.jpg",
    "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/dataimages/201706/original/images1920558_4053279_16.jpg",
  ];

  const [openModal, setOpenModal] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(
    null
  );

  const handleOpenModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setOpenModal(true);
  };

  const handleNextPhoto = () => {
    if (
      currentPhotoIndex !== null &&
      currentPhotoIndex < companyPhotos.length - 1
    ) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex !== null && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const selectedPhotoUrl =
    currentPhotoIndex !== null ? companyPhotos[currentPhotoIndex] : null;

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Camera className="h-6 w-6 text-emerald-600" />
          Hình ảnh công ty ({companyPhotos.length})
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyPhotos.map((photo, index) => (
          <div
            key={index}
            className="group relative aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer
                       hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            onClick={() => handleOpenModal(index)}
          >
            {/* Thay thế Next.js Image bằng thẻ img tiêu chuẩn */}
            <img
              src={photo || "/placeholder.svg"}
              alt={`Company photo ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <Button
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           bg-white/90 text-gray-800 hover:bg-white shadow-md"
              >
                <Eye className="h-4 w-4 mr-2" />
                Xem
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="!max-w-none w-auto p-0 bg-black overflow-hidden rounded-lg">
          <div className="relative flex items-center justify-center">
            {selectedPhotoUrl && (
              <img
                src={selectedPhotoUrl || "/placeholder.svg"}
                alt="Ảnh phóng to"
                className="w-auto h-auto max-h-[90vh] object-contain"
              />
            )}

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              disabled={currentPhotoIndex === 0}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              disabled={currentPhotoIndex === companyPhotos.length - 1}
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
