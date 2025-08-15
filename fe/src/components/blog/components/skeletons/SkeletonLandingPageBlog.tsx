import { Card } from "@/components/ui/card";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-20">
        {/* Badge Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse">
            <div className="h-4 w-64 bg-transparent" />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-center">
            <div
              className="h-12 md:h-16 lg:h-20 w-full max-w-4xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"
              style={{ animationDelay: "0s" }}
            />
          </div>
          <div className="flex justify-center">
            <div
              className="h-12 md:h-16 lg:h-20 w-full max-w-3xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"
              style={{ animationDelay: "0.1s" }}
            />
          </div>
          <div className="flex justify-center">
            <div
              className="h-12 md:h-16 lg:h-20 w-full max-w-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>

        <div className="space-y-3 mb-12 max-w-4xl mx-auto">
          <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded" />
          <div
            className="h-6 w-5/6 mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="h-6 w-4/6 mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded"
            style={{ animationDelay: "0.2s" }}
          />
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
            <div className="flex-1 px-8 py-5">
              <div className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded" />
            </div>
            <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-[length:200%_100%] animate-pulse px-10 py-5">
              <div className="h-6 w-24 bg-white/30 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((_, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-4 w-16 bg-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
        {[...Array(8)].map((_, index) => (
          <Card
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col animate-pulse"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative h-48 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse" />
            </div>

            {/* Content Skeleton */}
            <div className="p-6 flex flex-col flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-8 w-20 rounded-xl bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 bg-[length:200%_100%] animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="h-5 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded" />
                <div
                  className="h-5 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded"
                  style={{ animationDelay: "0.1s" }}
                />
              </div>

              <div className="space-y-2 flex-1">
                <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded" />
                <div
                  className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>

              <div className="flex items-center justify-between h-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse" />
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded" />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded" />
                  <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto h-16 content-start">
                <div className="h-7 w-16 rounded-lg bg-gradient-to-r from-green-200 via-green-300 to-green-200 bg-[length:200%_100%] animate-pulse" />
                <div
                  className="h-7 w-20 rounded-lg bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 bg-[length:200%_100%] animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-7 w-12 rounded-lg bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 bg-[length:200%_100%] animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="h-12 w-32 rounded-full bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 bg-[length:200%_100%] animate-pulse" />
      </div>
    </div>
  </div>
);
