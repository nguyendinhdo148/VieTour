import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Toaster } from "react-hot-toast";
import Jobs from "./components/pages/Jobs";
import Browse from "./components/pages/Browse";
import Profile from "./components/pages/Profile";
import JobDescription from "./components/pages/JobDescription";
import CompanyDetail from "./components/pages/CompanyDetail";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ScrollRestoration from "./components/pages/components/ScrollRestoration";
import RecruiterLayout from "./components/recruiter/RecruiterLayout";
import Recruiter from "./components/recruiter/screeens/Recruiter";
import Company from "./components/recruiter/screeens/Company";
import JobManager from "./components/recruiter/screeens/JobManager";
import Candidates from "./components/recruiter/screeens/Candidates";
import AppliedJob from "./components/pages/AppliedJob";
import SavedJobs from "./components/pages/SavedJobs";
import LandingPage from "./components/resume/LandingPage";
import EditResume from "./components/resume/ResumeUpdate/EditResume";
import DashboardResume from "./components/resume/Home/DashboardResume";
import AdminLayout from "./components/admin/AdminLayout";
import Admin from "./components/admin/screeens/Admin";
import CompanyAdmin from "./components/admin/screeens/CompanyAdmin";
import JobManagerAdmin from "./components/admin/screeens/JobManagerAdmin";
import UserManagerAdmin from "./components/admin/screeens/UserManagerAdmin";

function App() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applied-jobs" element={<AppliedJob />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/jobs/description/:id" element={<JobDescription />} />
        <Route path="/company/:id" element={<CompanyDetail />} />

        {/* Recruiter routes */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<Recruiter />} />
          <Route path="/recruiter/company" element={<Company />} />
          <Route path="/recruiter/jobs" element={<JobManager />} />
          <Route path="/recruiter/candidates" element={<Candidates />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="/admin/company" element={<CompanyAdmin />} />
          <Route path="/admin/jobs" element={<JobManagerAdmin />} />
          <Route path="/admin/user" element={<UserManagerAdmin />} />
        </Route>

        {/* Resume routes */}
        <Route path="/resume" element={<LandingPage />} />
        <Route path="/resume/dashboard-resume" element={<DashboardResume />} />
        <Route path="/resume/edit/:resumeId" element={<EditResume />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </>
  );
}

export default App;
