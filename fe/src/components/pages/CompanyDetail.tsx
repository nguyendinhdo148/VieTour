import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "@/utils/constant";
import toast from "react-hot-toast";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";
import Navbar from "@/components/shared/Navbar";
import CompanyHero from "./components/CompanyDetail/CompanyHero";
import CompanyTabs from "./components/CompanyDetail/CompanyTabs";
import CompanySidebar from "./components/CompanyDetail/CompanySidebar";
import CompanyLoading from "./components/CompanyDetail/CompanyLoading";
import CompanyNotFound from "./components/CompanyDetail/CompanyNotFound";
import "./components/CompanyDetail/CompanyAnimations.css";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [viewCount, setViewCount] = useState(1247);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API}/company/details/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setCompany(response.data.company);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        toast.error("Không thể tải thông tin công ty");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCompanyJobs = async () => {
      try {
        setIsJobsLoading(true);
        const response = await axios.get(`${API}/company/jobs/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setJobs(response.data.jobs);
        }
      } catch {
        console.error("Error fetching company jobs");
      } finally {
        setIsJobsLoading(false);
      }
    };

    if (id) {
      fetchCompanyDetail();
      fetchCompanyJobs();
      // Simulate view count increment
      setTimeout(() => setViewCount((prev) => prev + 1), 2000);
    }
  }, [id]);

  if (isLoading) {
    return <CompanyLoading />;
  }

  if (!company) {
    return <CompanyNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Premium Hero Section */}
      <CompanyHero company={company} jobs={jobs} viewCount={viewCount} />

      {/* Main Content with Advanced Tabs */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <CompanyTabs
              company={company}
              jobs={jobs}
              isJobsLoading={isJobsLoading}
            />
          </div>

          {/* Enhanced Sidebar */}
          <CompanySidebar company={company} viewCount={viewCount} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
