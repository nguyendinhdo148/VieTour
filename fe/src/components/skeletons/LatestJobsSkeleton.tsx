const LatestJobsSkeleton = () => {
  const skeletonItems = new Array(9).fill(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-4xl font-bold">
        Việc làm{" "}
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          mới nhất và hàng đầu
        </span>
      </h1>

      {/* Bộ lọc ngành Skeleton */}
      <div className="flex gap-3 flex-wrap">
        {["Tất cả", "IT", "MARKETING", "DESIGN", "SALES"].map((_cat, i) => (
          <div
            key={i}
            className="w-24 h-8 bg-gray-100 animate-pulse rounded-full shadow-sm"
          />
        ))}
      </div>

      {/* Job Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="rounded-xl border-0 p-5 space-y-3 shadow-sm animate-pulse bg-white"
          >
            <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
            <div className="h-3 w-full bg-gray-100 rounded-md"></div>
            <div className="h-3 w-5/6 bg-gray-100 rounded-md"></div>
            <div className="h-3 w-2/3 bg-gray-100 rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Phân trang Skeleton */}
      <div className="flex justify-center pt-6 space-x-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};

export default LatestJobsSkeleton;
