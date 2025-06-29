import useGetAllJobs from "@/hooks/useGetAllJobs";
import CategoryCarousel from "./CategoryCarousel";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BrandCarousel from "./BrandsCarousel";
import JobMarketDashboard from "./JobMarketDashboard";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter");
    } else if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  useGetAllJobs();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <HeroSection />
        <CategoryCarousel />

        <LatestJobs />
        <BrandCarousel />
        <JobMarketDashboard />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
