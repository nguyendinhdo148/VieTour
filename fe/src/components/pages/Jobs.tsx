import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import FilterCard from "./components/FilterCard";
import Job from "./components/Job";
import { RootState } from "@/redux/store";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import NoJobFound from "../helpers/NoJobFound";
import axios from "axios";
import { API } from "@/utils/constant";
import toast from "react-hot-toast";

const Jobs = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const { allJobs } = useSelector((store: RootState) => store.job);
  const [searchText, setSearchText] = useState("");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter");
    }

    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${API}/save-job`, {
          withCredentials: true,
        });
        const savedJobIds = response.data.savedJobs.map(
          (savedJob: { job: { _id: string } }) => savedJob.job._id
        );
        setSavedJobs(savedJobIds);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đã lưu:", error);
      }
    };
    fetchSavedJobs();
  }, [user, navigate]);

  const onJobSaveChange = async (jobId: string, isSaved: boolean) => {
    try {
      if (isSaved) {
        await axios.post(`${API}/save-job/save/${jobId}`, {}, { withCredentials: true });
        setSavedJobs((prev) => [...prev, jobId]);
        toast.success("Đã thêm vào danh sách yêu thích!");
      } else {
        await axios.delete(`${API}/save-job/unsave/${jobId}`, { withCredentials: true });
        setSavedJobs((prev) => prev.filter((id) => id !== jobId));
        toast.success("Đã gỡ khỏi danh sách yêu thích!");
      }
    } catch (error) {
      console.error("Lỗi khi thao tác:", error);
    }
  };

  const [filters, setFilters] = useState({
    location: [] as string[],
    jobType: [] as string[],
    salary: [] as string[],
  });

  useGetAllJobs();

  useEffect(() => {
    const queryFilters = {
      location: searchParams.get("location")?.split(",") || [],
      jobType: searchParams.get("jobType")?.split(",") || [],
      salary: searchParams.get("salary")?.split(",") || [],
    };
    setFilters(queryFilters);
    setSearchText(searchParams.get("query") || "");
  }, [searchParams]);

  const updateURL = (updatedFilters: typeof filters, search?: string) => {
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      }
    });
    if (search) {
      params.set("query", search);
    }
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => {
      const current = prev[type as keyof typeof prev];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      const newFilters = { ...prev, [type]: updated };
      updateURL(newFilters);
      return newFilters;
    });
  };

  const resetFilters = () => {
    const cleared = { location: [], jobType: [], salary: [] };
    setFilters(cleared);
    updateURL(cleared);
  };

  const locationAliasMap: Record<string, string[]> = {
    "Hồ Chí Minh": ["hochiminh", "hcm", "ho chi minh"],
    "Hà Nội": ["hanoi", "hn"],
    "Đà Nẵng": ["danang", "dn"],
    "Quảng Ninh": ["quangninh"],
    "Cần Thơ": ["cantho"],
    "Thái Bình": ["thaibinh"],
    "Hải Phòng": ["haiphong"],
  };

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/\s/g, "") 
      .replace(/\./g, ""); 

  const filteredJobs = allJobs.filter((job) => {
    const matchLocation =
      filters.location.length === 0 ||
      filters.location.some((filterLoc) => {
        const jobLocNorm = normalize(job.company.location ?? "");
        const aliases = locationAliasMap[filterLoc] || [normalize(filterLoc)];
        return aliases.some((alias) => jobLocNorm.includes(alias));
      });

    const matchJobType =
      filters.jobType.length === 0 ||
      filters.jobType.some((filter) =>
        job.title.toLowerCase().includes(filter.toLowerCase())
      );

    const matchSalary =
      filters.salary.length === 0 ||
      filters.salary.some((range) => {
        const priceNum = Number(job.salary.toString().replace(/\D/g, ''));
        if (range.includes(">")) {
          return priceNum > 500000;
        } else {
          const [min, max] = range
            .split(" - ")
            .map((x) => Number(x.replace(/\./g, ""))); 
          return priceNum >= min && priceNum <= max;
        }
      });

    const normalizedSearchText = normalize(searchText);
    const matchSearch =
      normalizedSearchText === "" ||
      normalize(job.title).includes(normalizedSearchText) ||
      normalize(job.company.location || "").includes(normalizedSearchText) ||
      normalize(job.company.name).includes(normalizedSearchText) ||
      normalize(job.jobType || "").includes(normalizedSearchText);

    return (
      job.approval === "approved" &&
      job.status === "active" &&
      matchLocation &&
      matchJobType &&
      matchSalary &&
      matchSearch
    );
  });

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Navbar />
      <div className="pt-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner hoặc Tiêu đề trang hoành tráng */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Khám Phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Thực Đơn </span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Hàng trăm ưu đãi không gian ẩm thực sang trọng đang chờ bạn.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cột Filter (Bên trái) */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="sticky top-24">
              <FilterCard
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
                onSearchChange={(text) => {
                  setSearchText(text);
                  updateURL(filters, text);
                }}
              />
            </div>
          </div>
          
          {/* Cột Danh sách (Bên phải) */}
          <div className="flex-1 pb-10">
            {filteredJobs.length === 0 ? (
              <NoJobFound />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                {filteredJobs.map((job) => (
                  <Job
                    key={job._id}
                    job={job}
                    savedJobs={savedJobs}
                    onJobSaveChange={onJobSaveChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;