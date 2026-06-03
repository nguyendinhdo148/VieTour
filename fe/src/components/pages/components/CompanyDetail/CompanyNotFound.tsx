import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, ArrowLeft } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

const CompanyNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto mt-10">
          <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Building className="h-14 w-14 text-orange-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Không tìm thấy địa điểm
          </h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
            Nhà hàng hoặc quán cafe bạn đang tìm kiếm không tồn tại hoặc đã ngừng hoạt động trên hệ thống.
          </p>
          <Link to="/jobs">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-6 text-lg rounded-2xl shadow-lg shadow-orange-200 transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Khám phá địa điểm khác
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyNotFound;