import { HeroSkeleton, CardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-9 w-48 mx-auto bg-[#e8e6e1] rounded animate-pulse mb-4" />
            <div className="h-6 w-96 max-w-full mx-auto bg-[#e8e6e1] rounded animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}






