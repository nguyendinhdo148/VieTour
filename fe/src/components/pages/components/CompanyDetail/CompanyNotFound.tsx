import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, ArrowLeft } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

const CompanyNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Building className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Không tìm thấy công ty
          </h2>
          <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg">
            Công ty bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link to="/jobs">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Quay lại danh sách việc làm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyNotFound;
