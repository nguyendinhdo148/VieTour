import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonManagerBlogs = () => (
  <div className="space-y-8">
    {/* Stats Cards Loading */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <Card
          key={i}
          className="bg-white/90 backdrop-blur-md border-0 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl blur-sm opacity-50" />
                <Skeleton className="w-16 h-16 rounded-2xl relative shadow-lg" />
              </div>
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-32 shadow-sm" />
                <Skeleton className="h-8 w-24 shadow-md" />
                <Skeleton className="h-3 w-20 shadow-sm" />
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
          className="overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative group"
        >
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

          <CardContent className="p-6 space-y-4 flex-1 flex flex-col relative z-10">
            <Skeleton className="h-6 w-4/5 shadow-md" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded shadow-sm" />
              <Skeleton className="h-4 w-20 shadow-sm" />
            </div>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full shadow-sm" />
              <Skeleton className="h-4 w-full shadow-sm" />
              <Skeleton className="h-4 w-3/4 shadow-sm" />
            </div>
            <Skeleton className="h-5 w-32 shadow-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 shadow-sm" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 shadow-md rounded-full" />
                <Skeleton className="h-6 w-20 shadow-md rounded-full" />
                <Skeleton className="h-6 w-18 shadow-md rounded-full" />
              </div>
            </div>
            <div className="flex gap-2 pt-2 mt-auto">
              <Skeleton className="h-9 flex-1 shadow-lg hover:shadow-xl transition-shadow" />
              <Skeleton className="h-9 flex-1 shadow-lg hover:shadow-xl transition-shadow" />
              <Skeleton className="h-9 w-12 shadow-lg hover:shadow-xl transition-shadow" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
