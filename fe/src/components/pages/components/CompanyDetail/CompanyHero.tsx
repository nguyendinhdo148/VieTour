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
      <div className="h-[28rem] bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />

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
          <div className="absolute top-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse"
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
          <div className="flex items-center gap-8 w-full">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Avatar className="relative size-38 rounded-lg border-4 border-white/40 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <AvatarImage
                  src={company.logo || ""}
                  alt={company.name}
                  className="object-contain"
                />
                <AvatarFallback className="bg-white text-emerald-600 text-3xl font-bold">
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex-1 mt-4">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                  {company.name}
                </h1>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-white/90 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">
                    {company.location || "Chưa cập nhật địa điểm"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">100-500 nhân viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span className="font-medium">
                    {viewCount.toLocaleString()} lượt xem
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {jobs.length} việc làm
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Đang phát triển
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
