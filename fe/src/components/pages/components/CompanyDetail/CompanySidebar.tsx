import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Eye,
  Heart,
  FileText,
  Globe,
  MapPin,
  Calendar,
  Building,
  Share2,
  Copy,
  Check,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { GrInstagram, GrLinkedin, GrTwitter } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa";
import toast from "react-hot-toast";
import type { Company } from "@/types/company";

interface CompanySidebarProps {
  company: Company;
  viewCount: number;
}

const CompanySidebar = ({ company, viewCount }: CompanySidebarProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Đã sao chép link!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép link");
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            Thống kê nhanh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lượt xem</p>
                <p className="font-bold text-gray-800">
                  {viewCount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Người theo dõi</p>
                <p className="font-bold text-gray-800">2,847</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Contact Information */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            Thông tin liên hệ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {company.website && (
            <div className="group flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Website</p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  Truy cập website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {company.location && (
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                <p className="text-gray-800 font-semibold">
                  {company.location}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Thành lập</p>
              <p className="text-gray-800 font-semibold">
                {new Date(company.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Ngành nghề</p>
              <p className="text-gray-800 font-semibold">Technology</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Action Buttons */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Hành động
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          <Link to="/jobs" className="w-full">
            <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Briefcase className="mr-2 h-5 w-5" />
              Xem tất cả việc làm
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Enhanced Social Sharing */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-emerald-600" />
            Chia sẻ công ty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3 mb-4">
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              <FaFacebookF className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-sky-50 hover:bg-sky-100 border-sky-200"
            >
              <GrTwitter className="h-5 w-5 text-sky-600" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              <GrLinkedin className="h-5 w-5 text-blue-700" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="aspect-square p-0 bg-pink-50 hover:bg-pink-100 border-pink-200"
            >
              <GrInstagram className="h-5 w-5 text-pink-600" />
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={window.location.href}
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              className={`transition-all duration-300 ${
                copied ? "bg-green-50 border-green-200 text-green-700" : ""
              }`}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySidebar;
