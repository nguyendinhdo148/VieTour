import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Toaster } from "react-hot-toast";
import Jobs from "./components/pages/Jobs";
import Browse from "./components/pages/Browse";
import Profile from "./components/pages/Profile";
import JobDetail from "./components/pages/JobDetail";
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
import Chatbot from "./components/Chatbot";
import ResumeReview from "./components/tools/ResumeReview";
import LandingPageBlog from "./components/blog/LandingPageBlog";
import BlogDetail from "./components/blog/screens/BlogDetail";
import CreateBlog from "./components/blog/screens/CreateBlog";
import UpdateBlog from "./components/blog/screens/UpdateBlog";
import ManagerBlogs from "./components/blog/screens/ManagerBlogs";
import NotFound from "./components/pages/NotFound";
import BlogManagerAdmin from "./components/admin/screeens/BlogManagerAdmin";
import MBTIPage from "./components/MBTI/MBTIPage";
import MBTITest from "./components/MBTI/MBTITest";
import INFPPage from "./components/MBTI/infp";
import MBTIResult from "./components/MBTI/MBTIResult";
import INFJPage from "./components/MBTI/infj";
import INTJPage from "./components/MBTI/intj";
import INTPPage from "./components/MBTI/intp";
import ISTJPage from "./components/MBTI/istj";
import ISFJPage from "./components/MBTI/isfj";
import ISTPPage from "./components/MBTI/istp";
import ISFPPage from "./components/MBTI/isfp";
import ESTPPage from "./components/MBTI/estp";
import ENFPPage from "./components/MBTI/enfp";
import ESFPPage from "./components/MBTI/esfp";
import ENTPPage from "./components/MBTI/entp";
import ESTJPage from "./components/MBTI/estj";
import ESFJPage from "./components/MBTI/esfj";
import ENFJPage from "./components/MBTI/enfj";
import ENTJPage from "./components/MBTI/entj";
import SalaryCalculator from "./components/tools/SalaryCalculator";
import MIPage from "./components/MI/MIPage";
import MITest from "./components/MI/MITest";
import MIResult from "./components/MI/MIResult";
import PersonalTaxCalc from "./components/tools/PersonalTaxCalc";

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
        <Route path="/job/detail/:slug" element={<JobDetail />} />
        <Route path="/company/detail/:slug" element={<CompanyDetail />} />
        <Route path="/tools/resume-review" element={<ResumeReview />} />

        {/* Blog routes */}
        <Route path="/blog" element={<LandingPageBlog />} />
        <Route path="/blog/detail/:slug" element={<BlogDetail />} />
        <Route path="/blog/create-blog" element={<CreateBlog />} />
        <Route path="/blog/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/blog/manager-blogs" element={<ManagerBlogs />} />

        {/* Tools */}
        {/* MBTI */}
        <Route path="/tools/mbti" element={<MBTIPage />} />
        <Route path="/tools/mbti/test" element={<MBTITest />} />
        <Route path="/tools/mbti/result" element={<MBTIResult />} />
        <Route path="/tools/mbti/tinh-cach/infp" element={<INFPPage />} />
        <Route path="/tools/mbti/tinh-cach/infj" element={<INFJPage />} />
        <Route path="/tools/mbti/tinh-cach/intj" element={<INTJPage />} />
        <Route path="/tools/mbti/tinh-cach/intp" element={<INTPPage />} />
        <Route path="/tools/mbti/tinh-cach/istj" element={<ISTJPage />} />
        <Route path="/tools/mbti/tinh-cach/isfj" element={<ISFJPage />} />
        <Route path="/tools/mbti/tinh-cach/istp" element={<ISTPPage />} />
        <Route path="/tools/mbti/tinh-cach/isfp" element={<ISFPPage />} />
        <Route path="/tools/mbti/tinh-cach/estp" element={<ESTPPage />} />
        <Route path="/tools/mbti/tinh-cach/esfp" element={<ESFPPage />} />
        <Route path="/tools/mbti/tinh-cach/enfp" element={<ENFPPage />} />
        <Route path="/tools/mbti/tinh-cach/entp" element={<ENTPPage />} />
        <Route path="/tools/mbti/tinh-cach/estj" element={<ESTJPage />} />
        <Route path="/tools/mbti/tinh-cach/esfj" element={<ESFJPage />} />
        <Route path="/tools/mbti/tinh-cach/enfj" element={<ENFJPage />} />
        <Route path="/tools/mbti/tinh-cach/entj" element={<ENTJPage />} />

        {/* MI */}
        <Route path="/tools/mi" element={<MIPage />} />
        <Route path="/tools/mi/test" element={<MITest />} />
        <Route path="/tools/mi/result" element={<MIResult />} />

        <Route path="/tools/gross-net" element={<SalaryCalculator />} />
        <Route path="/tools/personal-tax" element={<PersonalTaxCalc />} />

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
          <Route path="/admin/blogs" element={<BlogManagerAdmin />} />
          <Route path="/admin/user" element={<UserManagerAdmin />} />
        </Route>

        {/* Resume routes */}
        <Route path="/resume" element={<LandingPage />} />
        <Route path="/resume/dashboard-resume" element={<DashboardResume />} />
        <Route path="/resume/edit/:resumeId" element={<EditResume />} />

        {/* Page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <Chatbot />
    </>
  );
}

export default App;
