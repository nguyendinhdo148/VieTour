"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "./../framer-motion-config";
import { Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Về VieJobs",
      links: [
        { name: "Giới thiệu", href: "#" },
        { name: "Liên hệ", href: "#" },
        { name: "Tuyển dụng", href: "#" },
      ],
    },
    {
      title: "Xây dựng sự nghiệp",
      links: [
        { name: "Việc làm tốt nhất", href: "#" },
        { name: "Việc làm lương cao", href: "#" },
        { name: "Việc làm quản lý", href: "#" },
        { name: "Việc làm IT", href: "#" },
        { name: "Việc làm bán thời gian", href: "#" },
      ],
    },
    {
      title: "Khám phá",
      links: [
        { name: "Blog việc làm", href: "#" },
        { name: "Mẹo phỏng vấn", href: "#" },
        { name: "Mẫu CV", href: "#" },
        { name: "Tính lương", href: "#" },
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        { name: "Trung tâm trợ giúp", href: "#" },
        { name: "Cộng đồng", href: "#" },
        { name: "Live Chat", href: "#" },
      ],
    },
    {
      title: "Pháp lý",
      links: [
        { name: "Điều khoản dịch vụ", href: "#" },
        { name: "Điều khoản sử dụng", href: "#" },
        { name: "Chính sách bảo mật", href: "#" },
      ],
    },
  ];

  const socialMedia = [
    {
      name: "LinkedIn",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
      color: "from-[#0077B5] to-[#005885]",
      href: "https://www.linkedin.com/",
    },
    {
      name: "Twitter",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      color: "from-[#1DA1F2] to-[#0d8bd9]",
      href: "https://www.twitter.com/",
    },
    {
      name: "Facebook",
      icon: "M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z",
      color: "from-[#4267B2] to-[#365899]",
      href: "https://www.facebook.com/",
    },
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      color: "from-[#E1306C] to-[#C13584]",
      href: "https://www.instagram.com/",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "contact@viejobs.com",
      href: "mailto:contact@viejobs.com",
    },
    {
      icon: Phone,
      text: "+84 (0) 123 456 789",
      href: "tel:+84123456789",
    },
    {
      icon: MapPin,
      text: "Hà Nội, Việt Nam",
      href: "#",
    },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 overflow-hidden"
    >
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-purple-600/8 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/8 to-blue-600/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 rounded-full blur-3xl"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Enhanced Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-4">
            {/* Simple Professional Logo */}
            <div className="mb-8">
              <img
                src="viejob.png"
                alt="VieJobs - Nền tảng tuyển dụng hàng đầu Việt Nam"
                className="h-10 w-auto object-contain"
              />
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Kết nối những tài năng hàng đầu với các công ty đẳng cấp thế giới.
              Nền tảng của chúng tôi giúp hàng triệu người tìm được công việc mơ
              ước và xây dựng sự nghiệp có ý nghĩa.
            </motion.p>

            {/* Enhanced Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-4 mb-8">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
                Thông tin liên hệ
              </h4>
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition-all duration-300 group p-3 rounded-xl"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl border border-blue-200/40 group-hover:border-blue-400/60 group-hover:scale-110 transition-all duration-300">
                    <contact.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 font-medium">
                    {contact.text}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* Enhanced Social Media */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
                Kết nối với chúng tôi
              </h4>
              <div className="flex space-x-4">
                {socialMedia.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={social.href}
                      className={`relative flex items-center justify-center w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden`}
                      aria-label={social.name}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <svg
                        className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300 relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d={social.icon} />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {footerLinks.map((column, colIndex) => (
              <motion.div
                key={column.title}
                variants={fadeInUp}
                custom={colIndex}
                transition={{ delay: colIndex * 0.1 }}
                className="relative min-h-[180px] flex flex-col"
              >
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6 relative">
                  {column.title}
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </h3>
                <ul className="space-y-1 flex-1">
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: colIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className="text-gray-600 gap-x-1 hover:text-blue-600 transition-all duration-300 text-sm leading-6 flex items-center group py-2 rounded-lg"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-500" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Divider */}
        <motion.div variants={fadeIn} className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200/60 shadow-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Heart className="w-5 h-5 text-red-500 fill-current animate-pulse" />
                <span className="text-sm font-semibold">
                  Made with love in Vietnam
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Bottom Footer */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-center gap-6 order-2 lg:order-1"
          >
            <p className="text-sm text-gray-500 font-medium">
              &copy; {currentYear} VieJobs, Inc. All rights reserved.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-8 order-1 lg:order-2">
            {[
              { name: "Privacy Policy", href: "#" },
              { name: "Terms of Service", href: "#" },
              { name: "Cookie Policy", href: "#" },
            ].map((item, index) => (
              <motion.div key={index} className="relative">
                <Link
                  to={item.href}
                  className="text-gray-500 hover:text-gray-900 text-sm transition-all duration-300 relative group font-medium"
                >
                  {item.name}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
