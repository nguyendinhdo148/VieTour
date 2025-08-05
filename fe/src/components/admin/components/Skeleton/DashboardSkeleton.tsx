import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section Skeleton - Enhanced with better gradients and animation */}
      <div className="bg-gradient-to-r from-violet-500/60 to-indigo-600/60 rounded-2xl p-8 shadow-lg relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[shimmer_2s_infinite] -translate-x-full" />

        <Skeleton className="h-9 w-64 bg-white/30 animate-pulse rounded-md" />
        <Skeleton className="h-6 w-80 mt-2 bg-white/20 animate-pulse rounded-md" />
      </div>

      {/* Stats Cards Skeleton - Enhanced with better colors and animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* First card with indigo gradient */}
        <StatsCardSkeleton gradientFrom="from-indigo-500/50" gradientTo="to-purple-600/50" />

        {/* Second card with cyan gradient */}
        <StatsCardSkeleton gradientFrom="from-cyan-500/50" gradientTo="to-blue-600/50" />

        {/* Third card with sky gradient */}
        <StatsCardSkeleton gradientFrom="from-sky-500/50" gradientTo="to-teal-600/50" />

        {/* Fourth card with sky gradient */}
        <StatsCardSkeleton gradientFrom="from-purple-500/50" gradientTo="to-pink-600/50" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Skeleton - Enhanced with better animation and more rows */}
        <Card className="lg:col-span-2 rounded-xl border-none shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-6 border-b relative overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_infinite] -translate-x-full" />

            <div className="flex items-center justify-between relative">
              <div>
                <Skeleton className="h-6 w-48 bg-gray-200/70 animate-pulse rounded-md" />
                <Skeleton className="h-4 w-72 mt-1 bg-gray-200/50 animate-pulse rounded-md" />
              </div>
              <Skeleton className="h-8 w-28 rounded-full bg-gray-200/70 animate-pulse" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="pl-6 w-1/3">
                    <Skeleton className="h-5 w-24 bg-gray-200/70 animate-pulse rounded-md" />
                  </TableHead>
                  <TableHead className="w-1/3">
                    <Skeleton className="h-5 w-24 bg-gray-200/70 animate-pulse rounded-md" />
                  </TableHead>
                  <TableHead className="w-1/3">
                    <Skeleton className="h-5 w-24 bg-gray-200/70 animate-pulse rounded-md" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Skeleton className="h-10 w-10 rounded-full bg-gray-200/70 animate-pulse" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_infinite] -translate-x-full" />
                        </div>
                        <Skeleton className="h-5 w-36 bg-gray-200/70 animate-pulse rounded-md" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-48 bg-gray-200/70 animate-pulse rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-28 bg-gray-200/70 animate-pulse rounded-md" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Popular Jobs Skeleton - Enhanced with better animation and details */}
        <Card className="rounded-xl border-none shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-6 border-b relative overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_infinite] -translate-x-full" />

            <div className="flex items-center justify-between relative">
              <Skeleton className="my-3 h-6 w-56 bg-gray-200/70 animate-pulse rounded-md" />
              <Skeleton className="h-8 w-24 rounded-full bg-gray-200/70 animate-pulse" />
            </div>
          </div>
          <div className="px-5 py-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[shimmer_2s_infinite] -translate-x-full" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-48 bg-gray-200/70 animate-pulse rounded-md" />
                    <Skeleton className="h-5 w-24 rounded-full bg-indigo-200/50 animate-pulse" />
                  </div>
                  <Skeleton className="mt-2 h-4 w-36 bg-gray-200/70 animate-pulse rounded-md" />
                  <div className="mt-3 flex items-center gap-2">
                    <Skeleton className="h-5 w-20 rounded-full bg-cyan-200/50 animate-pulse" />
                    <Skeleton className="h-5 w-24 rounded-full bg-emerald-200/50 animate-pulse" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-4 w-36 bg-gray-200/70 animate-pulse rounded-md" />
                    <Skeleton className="h-4 w-28 bg-emerald-200/50 animate-pulse rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// Helper component for stats cards
function StatsCardSkeleton({ gradientFrom, gradientTo }: { gradientFrom: string; gradientTo: string }) {
  return (
    <Card className="border-none shadow-lg overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} p-5 relative overflow-hidden`}>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[shimmer_2s_infinite] -translate-x-full" />

            <div className="flex items-center justify-between relative">
              <Skeleton className="h-14 w-14 rounded-xl bg-white/20 animate-pulse" />
              <Skeleton className="h-6 w-20 rounded-full bg-white/40 animate-pulse" />
            </div>
          </div>
          <div className="p-5 bg-white">
            <Skeleton className="h-4 w-36 bg-gray-200/70 animate-pulse rounded-md" />
            <Skeleton className="mt-2 h-8 w-24 bg-gray-300/80 animate-pulse rounded-md" />
            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="h-7 w-28 rounded-full bg-gray-200/70 animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
