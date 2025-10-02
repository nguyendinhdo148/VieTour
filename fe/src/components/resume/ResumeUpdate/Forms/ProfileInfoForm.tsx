import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileInfoFormProps {
  profileData: {
    profileImg: File | null;
    profilePreviewUrl: string;
    fullName: string;
    designation: string;
    summary: string;
  };
  updateSection: (
    key: string,
    value: string | number | boolean | File | null
  ) => void;
  onNext: () => void;
}

const ProfileInfoForm = ({
  profileData,
  updateSection,
  // onNext,
}: ProfileInfoFormProps) => {
  return (
    <div className="px-6 pt-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900">
        Thông tin cá nhân
      </h2>

      <div className="mt-6">
        <ProfilePhotoSelector
          image={profileData.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData.profilePreviewUrl}
          setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label className="text-sm font-medium text-gray-700">Họ và tên</Label>
          <Input
            value={profileData.fullName}
            onChange={(e) => updateSection("fullName", e.target.value)}
            placeholder="John Doe"
            type="text"
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">
            Vị trí ứng tuyển
          </Label>
          <Input
            value={profileData.designation}
            onChange={(e) => updateSection("designation", e.target.value)}
            placeholder="Backend Developer"
            type="text"
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2 mt-4">
          <Label className="text-sm font-medium text-gray-700">
            Mục tiêu nghề nghiệp
          </Label>
          <Textarea
            value={profileData.summary}
            onChange={(e) => updateSection("summary", e.target.value)}
            placeholder="Write a short summary about yourself"
            rows={4}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
