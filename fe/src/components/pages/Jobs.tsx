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
        // Map để lấy chỉ job._id từ mảng savedJobs trả về
        const savedJobIds = response.data.savedJobs.map(
          (savedJob: { job: { _id: string } }) => savedJob.job._id
        );
        setSavedJobs(savedJobIds);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc đã lưu:", error);
      }
    };
    fetchSavedJobs();
  }, [user, navigate]);

  const onJobSaveChange = async (jobId: string, isSaved: boolean) => {
    try {
      if (isSaved) {
        await axios.post(
          `${API}/save-job/save/${jobId}`,
          {},
          {
            withCredentials: true,
          }
        );
        setSavedJobs((prev) => [...prev, jobId]);
      } else {
        await axios.delete(`${API}/save-job/unsave/${jobId}`, {
          withCredentials: true,
        });
        setSavedJobs((prev) => prev.filter((id) => id !== jobId));
      }
    } catch (error) {
      console.error("Lỗi khi thao tác với công việc đã lưu:", error);
    }
  };

  const [filters, setFilters] = useState({
    location: [] as string[],
    jobType: [] as string[],
    salary: [] as string[],
  });

  useGetAllJobs();

  // Cập nhật state filters từ URL params
  useEffect(() => {
    const queryFilters = {
      location: searchParams.get("location")?.split(",") || [],
      jobType: searchParams.get("jobType")?.split(",") || [],
      salary: searchParams.get("salary")?.split(",") || [],
    };
    setFilters(queryFilters);
    setSearchText(searchParams.get("query") || "");
  }, [searchParams]);

  // Cập nhật URL khi lọc thay đổi
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
      .normalize("NFD") // xóa dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "") // loại bỏ ký tự dấu
      .replace(/\s/g, "") // xóa khoảng trắng
      .replace(/\./g, ""); // xóa dấu chấm nếu có

  // Lọc job theo filters
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
        if (range.includes(">")) {
          return job.salary > 40; // > 40 triệu
        } else {
          const [min, max] = range
            .split(" - ")
            .map((x) => Number(x.replace(/\./g, "")) / 1_000_000); // chuyển về triệu
          return job.salary >= min && job.salary <= max;
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
    <div>
      <Navbar />
      <div className="pt-4 max-w-7xl mx-auto">
        <div className="flex gap-5">
          <div className="w-[20%] h-[88vh] overflow-y-auto">
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
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filteredJobs.length === 0 ? (
              <NoJobFound />
            ) : (
              <div className="grid grid-cols-3 gap-4">
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
