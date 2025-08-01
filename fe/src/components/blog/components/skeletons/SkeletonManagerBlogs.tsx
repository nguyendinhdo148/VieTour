import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonManagerBlogs = () => (
  <div className="space-y-8">
    {/* Stats Cards Loading */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <Card
          key={i}
          className="bg-white/80 backdrop-blur-sm border-0 shadow-xl"
        >
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <Skeleton className="w-16 h-16 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
      {[...Array(6)].map((_, i) => (
        <Card
          key={i}
          className="overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col h-full"
        >
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
          <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
            <Skeleton className="h-6 w-4/5" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-5 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-18" />
              </div>
            </div>
            <div className="flex gap-2 pt-2 mt-auto">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
