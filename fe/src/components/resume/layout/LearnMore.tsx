import { motion } from "framer-motion";
import {
  CheckCircle,
  Palette,
  Shield,
  Clock,
  Target,
  TrendingUp,
  Sparkles,
  Globe,
  HeadphonesIcon,
  Star,
  ArrowRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/Footer";

const LearnMore = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-indigo-50/20">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.div
            className="inline-flex items-center px-5 py-2.5 bg-indigo-100/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-medium shadow-sm mb-6"
            variants={fadeIn}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Tìm hiểu về VieJobs CV
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6"
            variants={fadeIn}
          >
            Tại sao chọn{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              VieJobs CV?
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            variants={fadeIn}
          >
            VieJobs CV là nền tảng tạo CV hàng đầu Việt Nam, được tin tưởng bởi
            hơn 50,000+ người dùng. Chúng tôi giúp bạn tạo ra những bản CV
            chuyên nghiệp, nổi bật và tăng 80% cơ hội nhận được phỏng vấn.
          </motion.p>

          <motion.div className="flex justify-center" variants={fadeIn}>
            <div className="relative">
              <img
                src="/professional-cv-templates.png"
                alt="VieJobs CV Templates"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-indigo-600 ml-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Key Benefits */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Lợi ích vượt trội khi sử dụng VieJobs CV
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Khám phá những tính năng độc đáo giúp CV của bạn nổi bật trong mắt
              nhà tuyển dụng
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-indigo-600" />,
                title: "Tăng 80% cơ hội phỏng vấn",
                desc: "CV được tối ưu theo chuẩn ATS giúp bạn vượt qua vòng lọc tự động của nhà tuyển dụng",
                color: "indigo",
              },
              {
                icon: <Clock className="w-8 h-8 text-green-600" />,
                title: "Tiết kiệm 90% thời gian",
                desc: "Tạo CV chuyên nghiệp chỉ trong 5 phút thay vì mất hàng giờ thiết kế",
                color: "green",
              },
              {
                icon: <Palette className="w-8 h-8 text-purple-600" />,
                title: "50+ mẫu CV đa dạng",
                desc: "Từ truyền thống đến hiện đại, phù hợp với mọi ngành nghề và cấp độ",
                color: "purple",
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Bảo mật tuyệt đối",
                desc: "Thông tin cá nhân được mã hóa và bảo vệ theo tiêu chuẩn quốc tế",
                color: "blue",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-amber-600" />,
                title: "Gợi ý AI thông minh",
                desc: "Trí tuệ nhân tạo phân tích và đề xuất nội dung phù hợp với vị trí ứng tuyển",
                color: "amber",
              },
              {
                icon: <Globe className="w-8 h-8 text-rose-600" />,
                title: "Hỗ trợ đa ngôn ngữ",
                desc: "Tạo CV bằng tiếng Việt, Anh và nhiều ngôn ngữ khác một cách dễ dàng",
                color: "rose",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-indigo-100 group hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-14 h-14 bg-${benefit.color}-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Detailed Features */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Tính năng chi tiết
            </motion.h2>
          </div>

          <div className="space-y-16">
            {[
              {
                title: "Thiết kế chuyên nghiệp",
                description:
                  "Hơn 50 mẫu CV được thiết kế bởi các chuyên gia thiết kế và HR, đảm bảo tính thẩm mỹ và hiệu quả.",
                features: [
                  "Mẫu CV theo ngành nghề cụ thể",
                  "Thiết kế responsive trên mọi thiết bị",
                  "Tùy chỉnh màu sắc và font chữ",
                  "Layout tối ưu cho ATS",
                ],
                image: "/professional-cv-templates.png",
                reverse: false,
              },
              {
                title: "Công nghệ AI tiên tiến",
                description:
                  "Trí tuệ nhân tạo phân tích job description và gợi ý nội dung phù hợp, giúp CV của bạn nổi bật.",
                features: [
                  "Phân tích từ khóa quan trọng",
                  "Gợi ý kỹ năng cần thiết",
                  "Tối ưu hóa nội dung CV",
                  "Đánh giá độ phù hợp với vị trí",
                ],
                image: "/ai-resume-analysis.png",
                reverse: true,
              },
              {
                title: "Tối ưu CV",
                description:
                  "Hệ thống tối ưu hóa CV thông minh giúp tăng tỷ lệ thành công lên đến 80% khi ứng tuyển vào các vị trí mong muốn.",
                features: [
                  "Tối ưu từ khóa theo ATS",
                  "Phân tích điểm mạnh cá nhân",
                  "Gợi ý cải thiện nội dung",
                  "Đánh giá tương thích với JD",
                ],
                image: "/Cartoon-employer-reviewing-a-resume.png",
                reverse: false,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${
                  feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full lg:w-1/2">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="rounded-2xl shadow-xl w-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Success Stories */}
        <motion.section
          className="mb-20 bg-indigo-50/50 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Câu chuyện thành công
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Hàng ngàn người đã thay đổi sự nghiệp nhờ VieJobs CV
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Nguyễn Minh Tuấn",
                position: "Software Engineer tại FPT Software",
                story:
                  "Sau khi sử dụng VieJobs CV, tôi đã nhận được 5 lời mời phỏng vấn chỉ trong 2 tuần. CV được thiết kế rất chuyên nghiệp và nổi bật so với các khách hàng khác.",
                salary: "Tăng lương 150%",
                avatar: "/user.webp",
              },
              {
                name: "Trần Thị Hương",
                position: "Marketing Manager tại Shopee",
                story:
                  "VieJobs CV giúp tôi chuyển đổi sự nghiệp từ Sales sang Marketing một cách suôn sẻ. Các gợi ý AI rất hữu ích trong việc highlight những kỹ năng phù hợp.",
                salary: "Thăng tiến vị trí",
                avatar: "/user.webp",
              },
              {
                name: "Lê Văn Đức",
                position: "Data Analyst tại Grab",
                story:
                  "Là fresh graduate, tôi lo lắng về việc thiếu kinh nghiệm. Nhưng VieJobs CV đã giúp tôi trình bày các project học tập một cách ấn tượng và nhận được offer đầu tiên.",
                salary: "Offer đầu tiên",
                avatar: "/user.webp",
              },
              {
                name: "Phạm Thị Lan",
                position: "UX Designer tại VNG",
                story:
                  "Với background kỹ thuật, tôi gặp khó khăn khi chuyển sang thiết kế. VieJobs CV đã giúp tôi tạo ra một bản CV creative nhưng vẫn professional, thu hút được sự chú ý của recruiter.",
                salary: "Chuyển đổi ngành",
                avatar: "/user.webp",
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={story.avatar || "/placeholder.svg"}
                    alt={story.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {story.name}
                    </h4>
                    <p className="text-sm text-gray-600">{story.position}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      {story.salary}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{story.story}"</p>
                <div className="flex items-center mt-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Support & Security */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Hỗ trợ 24/7
              </h3>
              <p className="text-gray-600 mb-6">
                Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi. Từ việc
                chọn template phù hợp đến tối ưu hóa nội dung CV.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Chat trực tuyến 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Video call tư vấn 1-1</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Hướng dẫn chi tiết từng bước</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Bảo mật tuyệt đối
              </h3>
              <p className="text-gray-600 mb-6">
                Thông tin cá nhân của bạn được bảo vệ bằng công nghệ mã hóa tiên
                tiến, tuân thủ các tiêu chuẩn bảo mật quốc tế.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Mã hóa SSL 256-bit</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Tuân thủ GDPR</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Sao lưu dữ liệu tự động</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-500 rounded-3xl p-12 md:p-16 text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Sẵn sàng tạo CV chuyên nghiệp?
          </motion.h2>
          <motion.p
            className="text-white/90 mb-8 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Tham gia cùng hơn 50,000+ người dùng đã thành công trong việc tìm
            kiếm công việc mơ ước với VieJobs CV
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/resume/dashboard-resume">
              <Button className="bg-white cursor-pointer text-indigo-600 hover:bg-white/90 px-8 py-6 rounded-xl font-medium text-base shadow-lg group">
                Tạo CV Miễn Phí Ngay
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="bg-transparent cursor-pointer border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl font-medium text-base"
              >
                Quay lại trang chủ
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default LearnMore;
