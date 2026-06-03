import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Eye,
  FileText,
  Globe,
  MapPin,
  Calendar,
  Share2,
  ExternalLink,
  Link2,
} from "lucide-react";
import { GrInstagram, GrLinkedin, GrTwitter } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa";
import type { Company } from "@/types/company";
import handleCopyLink from "@/components/helpers/HandleCopyLink";

interface CompanySidebarProps {
  company: Company;
  viewCount: number;
}

const CompanySidebar = ({ company, viewCount }: CompanySidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-xl rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Tương tác nổi bật
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm shadow-orange-200">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Lượt quan tâm</p>
                <p className="font-extrabold text-gray-900 text-lg">
                  {viewCount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          
        </CardContent>
      </Card>

      {/* Enhanced Contact Information */}
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-xl rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Thông tin liên hệ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {company.website && (
            <div className="group flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all duration-300 cursor-pointer border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Globe className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fanpage / Website</p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 font-bold flex items-center gap-1 hover:text-blue-600 transition"
                >
                  Truy cập ngay
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {company.location && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <MapPin className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Địa chỉ</p>
                <p className="text-gray-900 font-bold leading-tight">
                  {company.location}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Hoạt động từ</p>
              <p className="text-gray-900 font-bold">
                {company.yoe || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Social Sharing */}
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-xl rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-indigo-500" />
            Chia sẻ với bạn bè
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-4 gap-3 mb-5">
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-200 rounded-xl transition"
            >
              <FaFacebookF className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-white hover:bg-sky-50 border-gray-200 hover:border-sky-200 rounded-xl transition"
            >
              <GrTwitter className="h-5 w-5 text-sky-500" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-200 rounded-xl transition"
            >
              <GrLinkedin className="h-5 w-5 text-blue-700" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-white hover:bg-pink-50 border-gray-200 hover:border-pink-200 rounded-xl transition"
            >
              <GrInstagram className="h-5 w-5 text-pink-600" />
            </Button>
          </div>

          <Separator className="my-4 bg-gray-100" />

          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
            <input
              type="text"
              value={window.location.href}
              readOnly
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-500 bg-transparent focus:outline-none"
            />
            <Button
              size="default"
              variant="outline"
              onClick={() => handleCopyLink(window.location.href)}
              className="cursor-pointer bg-white hover:bg-gray-100 border-gray-200 rounded-lg shadow-sm"
            >
              <Link2 className="size-4 text-gray-700" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySidebar;