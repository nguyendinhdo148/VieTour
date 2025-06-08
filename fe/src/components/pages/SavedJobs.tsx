import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import SavedJobsTable from "./components/SavedJobsTable";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SavedJobs = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "recruiter") {
      navigate("/recruiter");
    } else if (user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <SavedJobsTable />
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
