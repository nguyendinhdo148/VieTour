import { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Eye,
  Briefcase,
  TrendingUp,
  Crown,
  Shield,
} from "lucide-react";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";

interface CompanyHeroProps {
  company: Company;
  jobs: Job[];
  viewCount: number;
}

const CompanyHero = ({ company, jobs, viewCount }: CompanyHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden" ref={heroRef}>
      <div className="h-[28rem] bg-gradient-to-r from-orange-600 via-red-500 to-rose-500 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-1 h-1 bg-white/30 rounded-full" />
            </div>
          ))}

          {/* Geometric Shapes */}
          <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-white/20 h-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-end pb-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Avatar className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white/40 shadow-2xl group-hover:scale-105 transition-transform duration-300 bg-white">
                <AvatarImage
                  src={company.logo || ""}
                  alt={company.name}
                  className="object-contain p-2"
                />
                <AvatarFallback className="bg-white text-orange-600 text-4xl font-bold">
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                  {company.name}
                </h1>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 mb-5">
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium text-sm">
                    {company.location || "Chưa cập nhật địa điểm"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Users className="h-4 w-4" />
                  <span className="font-medium text-sm">Sức chứa: {company.noe || "N/A"} khách</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium text-sm">
                    {viewCount.toLocaleString()} lượt quan tâm
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge className="bg-white text-orange-600 border-0 px-4 py-2 shadow-lg hover:bg-gray-50 transition-colors">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {jobs.length} Chương trình đang mở
                </Badge>
                <Badge className="bg-orange-500/80 text-white border-white/20 px-4 py-2 backdrop-blur-md">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Top xu hướng
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHero;