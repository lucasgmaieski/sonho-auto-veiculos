import { Skeleton } from "../ui/skeleton";

export default function CarCardSkeleton() {
    return(
        <div role="status" className="p-2 flex">
            <div className="mx-auto w-full h-full">
                <div className="flex flex-col h-full p-2 border border-slate-200 rounded-lg shadow animate-pulse dark:border-slate-800">
                    <div className="flex gap-2 justify-between my-1">
                        <Skeleton className="h-5 w-20"/>
                        <Skeleton className="h-5 w-5"/>
                    </div>
                    <Skeleton className="aspect-[3/2] w-full rounded-none" />
                    <div className="mt-2 mb-1 flex flex-wrap content-start justify-start px-2 gap-y-2 gap-x-2 flex-1">
                        <Skeleton className="h-5 w-[32%]"/>
                        <Skeleton className="h-5 w-[35%]"/>
                        <Skeleton className="h-5 w-3/5"/>
                        <Skeleton className="h-5 w-[22%]"/>
                        <Skeleton className="h-5 w-[32%]"/>
                        <Skeleton className="h-5 w-[32%]"/>
                        <Skeleton className="h-5 w-[22%]"/>
                    </div>
                    <div className="flex justify-between items-center mt-4 px-2 py-4">
                        <Skeleton className="h-11 w-[42%]"/>
                        <Skeleton className="h-11 w-[40%]"/>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}