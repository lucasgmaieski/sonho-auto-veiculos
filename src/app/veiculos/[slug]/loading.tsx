import { Skeleton } from "@/Components/ui/skeleton"

export default function Loading() {
    return (
        <div className="mt-[150px] py-12">
            <div className="max-w-7xl w-full mx-auto space-y-10 px-3 sm:px-6">
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[250px]" />
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-10">
                    <div className="w-full lg:w-1/2">
                        <Skeleton className="w-full h-[400px] rounded-lg " />
                        <div className="grid grid-cols-4 gap-3 mt-3">
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-8">
                            <Skeleton className="h-5 w-[250px]" />
                            <Skeleton className="h-5 w-[150px]" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 xsm:gap-3">
                            {Array.from({ length: 9 }).map((_, index) => (
                                <Skeleton className="h-16" key={index}/>
                            ))}
                        </div>
                        <div className="flex gap-3 pt-5">
                            <Skeleton className="h-10 w-[150px]" />
                            <Skeleton className="h-10 w-[250px]" />
                        </div>
                    </div>
                </div>
                <Skeleton className="h-6 w-[150px]" />
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 18 }).map((_, index) => (
                        <Skeleton className={`h-4 w-${[32, 40, 44, 56, 52, 60][Math.floor(Math.random() * 6)]}`} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}