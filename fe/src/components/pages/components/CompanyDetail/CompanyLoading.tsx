import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";

const CompanyLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="relative overflow-hidden">
        {/* Enhanced Loading Hero */}
        <div className="h-96 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                <div className="w-2 h-2 bg-white/20 rounded-full" />
              </div>
            ))}
          </div>

          <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
            <div className="flex items-center gap-8 w-full">
              <Skeleton className="h-32 w-32 rounded-3xl bg-white/20" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-10 w-80 bg-white/20" />
                <Skeleton className="h-6 w-64 bg-white/20" />
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-24 bg-white/20 rounded-full" />
                  <Skeleton className="h-8 w-32 bg-white/20 rounded-full" />
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-12 w-32 bg-white/20 rounded-xl" />
                <Skeleton className="h-12 w-28 bg-white/20 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-xl">
                <div className="p-8">
                  <div className="animate-pulse space-y-6">
                    <Skeleton className="h-8 w-48" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-xl">
                <div className="p-6">
                  <div className="animate-pulse space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLoading;
