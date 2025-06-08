import Navbar from "../shared/Navbar";
import Job from "./components/Job";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAllJobs, setSearchedQuery } from "@/redux/jobSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/utils/constant";

const Browse = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  const location = useLocation(); // lấy URL hiện tại
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter");
    }

    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${API}/save-job/`, {
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

  // fetch all jobs
  useEffect(() => {
  const fetchAllJobs = async () => {
    try {
      const res = await axios.get(`${API}/job/all-jobs`);
      dispatch(setAllJobs(res.data.jobs));
    } catch (err) {
      console.error("Lỗi khi fetch jobs:", err);
    }
  };

  fetchAllJobs();
}, [dispatch]);

  // Lấy query từ URL và set lại searchedQuery trong Redux (chỉ 1 lần khi component mount)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    dispatch(setSearchedQuery(query));
  }, [location.search, dispatch]);

  const { allJobs, searchedQuery } = useSelector(
    (store: RootState) => store.job
  );

  const filteredJobs = allJobs.filter((job) => {
    const isActive = job.status === "active" && job.approval === "approved";
    const keyword = searchedQuery.toLowerCase();

    const matchesTitle = job.title.toLowerCase().includes(keyword);
    const matchesLocation = job.location.toLowerCase().includes(keyword);
    const matchesCompany = job.company.name.toLowerCase().includes(keyword);
    const matchesCategory = job.category.toLowerCase().includes(keyword);

    return (
      isActive &&
      (matchesTitle || matchesLocation || matchesCompany || matchesCategory)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Kết quả tìm kiếm ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map((job) => {
            return (
              <Job
                key={job._id}
                job={job}
                savedJobs={savedJobs}
                onJobSaveChange={onJobSaveChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
