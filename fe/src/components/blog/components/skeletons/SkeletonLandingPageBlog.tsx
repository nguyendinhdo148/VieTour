import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/Footer";

const categories = [
  "Tất cả",
  "Kỹ năng",
  "Tuyển dụng",
  "Công nghệ",
  "Phỏng vấn",
  "Phát triển",
  "Tài chính",
  "Khởi nghiệp",
];

export const SkeletonLandingPageBlog = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <Navbar />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-20">
        {/* Badge Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-200 animate-pulse">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-center">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-4xl" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-3xl" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-2xl" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-3 mb-12 max-w-4xl mx-auto">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6 mx-auto" />
          <Skeleton className="h-6 w-4/6 mx-auto" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
            <div className="flex-1 px-8 py-5">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="bg-gray-200 px-10 py-5 animate-pulse">
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>

        {/* Category Filter Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((_, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-full bg-gray-200 animate-pulse"
            >
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
        {[...Array(8)].map((_, index) => (
          <Card
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col"
          >
            {/* Image Skeleton */}
            <div className="relative h-48 overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>

            {/* Content Skeleton */}
            <div className="p-6 flex flex-col flex-1 space-y-4">
              {/* Category & Meta Skeleton */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>

              {/* Title Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>

              {/* Content Skeleton */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Author & Date Skeleton */}
              <div className="flex items-center justify-between h-8">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center space-x-1">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2 mt-auto h-16 content-start">
                <Skeleton className="h-7 w-16 rounded-lg" />
                <Skeleton className="h-7 w-20 rounded-lg" />
                <Skeleton className="h-7 w-12 rounded-lg" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Button Skeleton */}
      <div className="flex justify-center mt-8">
        <Skeleton className="h-12 w-32 rounded-full" />
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
);
