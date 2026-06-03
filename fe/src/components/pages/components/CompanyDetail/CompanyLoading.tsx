import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";

const CompanyLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="h-[28rem] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          
          <div className="container mx-auto px-4 h-full flex items-end pb-16 relative z-10">
            <div className="flex items-center gap-8 w-full">
              <Skeleton className="h-40 w-40 rounded-2xl bg-white/40" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-12 w-80 bg-white/40" />
                <Skeleton className="h-6 w-96 bg-white/40" />
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-32 bg-white/40 rounded-full" />
                  <Skeleton className="h-10 w-40 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl rounded-2xl">
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
              <div className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl rounded-2xl">
                <div className="p-8">
                  <div className="animate-pulse space-y-6">
                    <Skeleton className="h-6 w-40" />
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full rounded-xl" />
                      <Skeleton className="h-12 w-full rounded-xl" />
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