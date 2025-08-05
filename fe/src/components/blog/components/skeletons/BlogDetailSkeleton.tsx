import { Card, CardContent } from "@/components/ui/card"

const BlogDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Navbar Skeleton */}
      <div className="border-b border-b-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>

              {/* Title */}
              <div className="space-y-3">
                <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Author and Meta Info */}
              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-200/60 shadow-lg">
                <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center gap-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-18 h-18 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      {/* Author name */}
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                      {/* Email */}
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    {/* Reading time */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="w-full h-[400px] md:h-[500px] bg-gray-200 animate-pulse"></div>
            </div>

            {/* Content */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-4">
                  {/* Content paragraphs */}
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}

                  {/* Content headings */}
                  <div className="space-y-4 mt-8">
                    <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Info */}
            <Card className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Posts */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-3 pb-4 border-b border-gray-200 last:border-b-0">
                      <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional sidebar content */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-6 w-28 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailSkeleton
