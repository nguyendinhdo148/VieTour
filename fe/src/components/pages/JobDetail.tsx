import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { API } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { RootState } from "@/redux/store";
import { Avatar, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";
import {
  CircleCheck,
  Dot,
  SquarePen,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Globe,
  Calendar,
  Briefcase,
  Star,
  Building2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const JobDetail = () => {
  const { singleJob } = useSelector((store: RootState) => store.job);
  const { user } = useSelector((store: RootState) => store.auth);

  const isApplied =
    singleJob?.applications?.some((app) => app?.applicant._id === user?._id) ||
    false;

  const navigate = useNavigate();
  const params = useParams();
  const jobSlug = params.slug;

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobSlug]);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${API}/job/detail/${jobSlug}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          // console.log(res.data.job);
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobSlug, dispatch]);

  const appliedJobHandle = async () => {
    if (!user) {
      toast("Bạn cần đăng nhập để ứng tuyển!", { icon: "🔒" });
      return navigate("/login");
    }

    try {
      const res = await axios.post(
        `${API}/application/apply-job/${singleJob?._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Ứng tuyển thành công!");
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob?.applications || []),
              { applicant: user },
            ],
          })
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "An unknown error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex items-start gap-4">
                  <Avatar className="size-20 rounded-2xl border-4 border-white/20 bg-white shadow-lg">
                    <AvatarImage
                      src={
                        singleJob?.company?.logo || "/default_company_logo.jpg"
                      }
                      alt={singleJob?.company?.name}
                      className="object-contain p-2"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="font-bold text-3xl mb-2 text-white">
                      {singleJob?.title}
                    </h1>
                    <div className="flex items-center gap-2 text-blue-100 mb-3">
                      <Building2 className="w-5 h-5" />
                      <span className="text-lg font-medium">
                        {singleJob?.company?.name || "Công ty chưa xác định"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-blue-100">
                      <MapPin className="size-4" />
                      <span className="text-sm">{singleJob?.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Key Info Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium">
                    <Users className="w-4 h-4" />
                    <span>{singleJob?.position} vị trí</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl font-medium">
                    <Briefcase className="w-4 h-4" />
                    <span>{singleJob?.jobType}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium">
                    <DollarSign className="w-4 h-4" />
                    <span>{singleJob?.salary} triệu</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl font-medium">
                    <Star className="w-4 h-4" />
                    <span>{singleJob?.experienceLevel} năm KN</span>
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  onClick={isApplied ? undefined : appliedJobHandle}
                  disabled={isApplied}
                  className={`w-full py-4 text-lg font-semibold rounded-xl shadow-lg ${
                    isApplied
                      ? "bg-gray-900 text-white cursor-not-allowed"
                      : "cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-blue-200 hover:from-blue-500 hover:to-indigo-600 hover:scale-[1.02] hover:shadow-xl transition-all duration-200"
                  }`}
                >
                  {isApplied ? (
                    <div className="flex items-center gap-2">
                      <CircleCheck className="w-5 h-5" />
                      <span>Đã ứng tuyển</span>
                    </div>
                  ) : (
                    <span className="">Ứng tuyển ngay</span>
                  )}
                </Button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Mô tả công việc
                </h2>
              </div>

              <div className="prose prose-gray max-w-none">
                <ul className="space-y-3">
                  {singleJob?.description
                    .split(/\.\s+/)
                    .filter((sentence) => sentence.trim().length > 0)
                    .map((sentence, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <Dot className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">
                          {sentence.trim()}
                          {!sentence.trim().endsWith(".") && "."}
                        </span>
                      </motion.li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Requirements */}
            {singleJob?.requirements && singleJob.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <SquarePen className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Yêu cầu ứng viên
                  </h2>
                </div>

                <div className="space-y-4">
                  {singleJob?.requirements.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      {req
                        .split(/\.\s+/)
                        .filter((sentence) => sentence.trim().length > 0)
                        .map((sentence, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl"
                          >
                            <SquarePen className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 leading-relaxed">
                              {sentence.trim()}
                              {!sentence.trim().endsWith(".") && "."}
                            </span>
                          </div>
                        ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {singleJob?.benefits && singleJob.benefits.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CircleCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Phúc lợi</h2>
                </div>

                <div className="space-y-4">
                  {singleJob?.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      {benefit
                        .split(/\.\s+/)
                        .filter((sentence) => sentence.trim().length > 0)
                        .map((sentence, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-green-50 rounded-xl"
                          >
                            <CircleCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 leading-relaxed">
                              {sentence.trim()}
                              {!sentence.trim().endsWith(".") && "."}
                            </span>
                          </div>
                        ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Job Details Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Chi tiết công việc
                </h3>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Briefcase className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Vị trí</p>
                      <p className="text-gray-600">{singleJob?.title}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Địa điểm</p>
                      <p className="text-gray-600">{singleJob?.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Kinh nghiệm</p>
                      <p className="text-gray-600">
                        {singleJob?.experienceLevel} năm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <DollarSign className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Mức lương</p>
                      <p className="text-gray-600">{singleJob?.salary} triệu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Users className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Số lượng tuyển
                      </p>
                      <p className="text-gray-600">{singleJob?.position}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Globe className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <a
                        href={singleJob?.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {singleJob?.company?.website
                          ? new URL(singleJob.company.website).hostname
                          : "N/A"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Ngày đăng</p>
                      <p className="text-gray-600">
                        {new Date(
                          singleJob?.createdAt ?? ""
                        ).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Company Info Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Về công ty
                </h3>
                <Link
                  to={`/company/detail/${singleJob?.company?.slug}`}
                  className="block"
                >
                  <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                    <Avatar className="size-12 rounded-xl border border-gray-200">
                      <AvatarImage
                        src={
                          singleJob?.company?.logo ||
                          "/default_company_logo.jpg"
                        }
                        alt={singleJob?.company?.name}
                        className="object-contain p-1"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {singleJob?.company?.name || "Công ty chưa xác định"}
                      </h4>
                      <p className="text-sm text-gray-600">Thông tin công ty</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
