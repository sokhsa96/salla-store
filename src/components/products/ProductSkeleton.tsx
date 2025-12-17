export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm h-full">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] w-full bg-gray-200 rounded-xl animate-pulse mb-4" />
      
      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        
        <div className="flex items-center gap-2 mt-4">
           <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
           <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}