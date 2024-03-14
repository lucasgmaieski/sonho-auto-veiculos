'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/Components/ui/breadcrumb"
import { BreadcrumbType } from "@/Types/BreadcrumbType";
import { useRouter, usePathname } from "next/navigation";
  
export default function BreadcrumbCustom({itens} : {itens: BreadcrumbType[]}) {
    const pathname = usePathname();
    
    return (
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {itens.length > 0 && itens.map((item, index) =>(
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    {index === itens.length - 1 ?
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    :
                        <BreadcrumbLink href={`/${item.url}`}>{item.title}</BreadcrumbLink>
                    }
                    </BreadcrumbItem>
                </>
            ))}
        </BreadcrumbList>
        </Breadcrumb>
    );
}
