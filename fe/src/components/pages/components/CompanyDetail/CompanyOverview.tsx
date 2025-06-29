import {
  Lightbulb,
  Gift,
  Sparkles,
  Briefcase,
  Calendar,
  Users,
  Target,
  Eye,
  Heart,
  FileText,
  Coffee,
  Car,
  Wifi,
  Utensils,
  GraduationCap,
  HeartHandshake,
  TreePine,
} from "lucide-react";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";
import CompanyMap from "./CompanyMap";

interface CompanyOverviewProps {
  company: Company;
  jobs: Job[];
}

const CompanyOverview = ({ company, jobs }: CompanyOverviewProps) => {
  const companyStats = {
    rating: 4.8,
    reviews: 156,
    employees: "100-500",
    founded: 2018,
    industry: "Technology",
    revenue: "$10M - $50M",
  };

  const benefits = [
    {
      icon: Coffee,
      label: "Free Coffee & Snacks",
      color: "bg-amber-100 text-amber-600",
    },
    { icon: Car, label: "Parking Space", color: "bg-blue-100 text-blue-600" },
    {
      icon: Wifi,
      label: "High-speed Internet",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Utensils,
      label: "Free Lunch",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: GraduationCap,
      label: "Learning Budget",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: HeartHandshake,
      label: "Health Insurance",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: TreePine,
      label: "Flexible Hours",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Gift,
      label: "Annual Bonus",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Company Description */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-emerald-600" />
          Giới thiệu công ty
        </h3>
        {company.description ? (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {company.description}
            </p>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              Chưa có thông tin giới thiệu
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Company Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {jobs.length}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Việc làm đang tuyển
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {companyStats.founded}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Năm thành lập
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {companyStats.employees}
            </div>
            <div className="text-sm text-gray-600 font-medium">Nhân viên</div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Target className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {companyStats.industry}
            </div>
            <div className="text-sm text-gray-600 font-medium">Ngành nghề</div>
          </div>
        </div>
      </div>

      {/* Benefits & Perks */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Gift className="h-6 w-6 text-emerald-600" />
          Phúc lợi & Quyền lợi
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-4 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <benefit.icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-gray-800">
                {benefit.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Culture */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-emerald-600" />
          Văn hóa công ty
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Sứ mệnh</h4>
            <p className="text-gray-600 text-sm">
              Tạo ra những sản phẩm công nghệ có ý nghĩa, góp phần cải thiện
              cuộc sống của mọi người.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Tầm nhìn</h4>
            <p className="text-gray-600 text-sm">
              Trở thành công ty công nghệ hàng đầu trong khu vực, được khách
              hàng tin tưởng và nhân viên yêu mến.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Giá trị cốt lõi
            </h4>
            <p className="text-gray-600 text-sm">
              Đổi mới sáng tạo, làm việc nhóm, trách nhiệm và phát triển bền
              vững.
            </p>
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="mt-8">
        <CompanyMap company={company} />
      </div>
    </div>
  );
};

export default CompanyOverview;
