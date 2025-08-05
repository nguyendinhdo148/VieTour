import { Card } from "@/components/ui/card";

const CommonSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mt-2 animate-pulse"></div>
        </div>
        {/* <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div> */}
      </div>

      {/* Table Skeleton */}
      <Card className="shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6">
          <div className="space-y-4">
            {/* Table Header Skeleton */}
            <div className="flex border-b pb-4">
              <div className="w-[300px] h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-5 bg-gray-200 rounded ml-4 animate-pulse"></div>
              <div className="w-32 h-5 bg-gray-200 rounded ml-4 animate-pulse"></div>
              <div className="w-24 h-5 bg-gray-200 rounded ml-4 animate-pulse"></div>
            </div>

            {/* Table Rows Skeleton */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center py-4">
                <div className="flex items-center gap-3 w-[300px]">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 h-4 bg-gray-200 rounded ml-4 animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded ml-4 animate-pulse"></div>
                <div className="flex gap-2 ml-4">
                  <div className="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
                  <div className="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommonSkeleton;
