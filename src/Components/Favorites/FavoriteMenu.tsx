"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Context } from "@/Contexts/Context";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa";

const DynamicFavoriteCountLabel = dynamic(() => import('@/Components/Favorites/FavoriteCountLabel'), {
    ssr: false,
})
export function FavoriteMenu() {
    const { favorites } = useContext(Context);

    return (
        <Popover>
            <PopoverTrigger className="relative">
                <FaHeart className="w-[28px] h-[28px] text-red-500"/>
                    {/* <span className={`${favorites.length > 0 ? 'inline' : 'hidden'} absolute top-1 -right-2 dark:bg-slate-600 bg-slate-300 w-4 h-4 text-xs rounded-full`}>{favorites.length}</span> */}
                    <DynamicFavoriteCountLabel />
            </PopoverTrigger>
            <PopoverContent className="p-0">
                {favorites.length > 0 && 
                    <>
                        <ul className="space-y-1 p-1">
                            {favorites.slice(0, 5).map((favorite, index) => (
                            <Link href={`/veiculos/${favorite.slug}`} key={index} className="block py-2 px-4 rounded-md hover:bg-slate-200 hover:dark:bg-slate-800">
                                {favorite.title}
                            </Link>
                            ))}
                        </ul>
                        <Link href="/favoritos" className="block font-semibold text-center py-2 px-4 rounded-b-md dark:bg-slate-900 bg-slate-100 hover:bg-slate-200 hover:dark:bg-slate-800">Ver todos</Link>
                    </>
                }
                {favorites.length === 0 &&
                    <div className="py-2 px-4">Você ainda não tem veículos favoritos</div>
                }
            </PopoverContent>
        </Popover>
    );
}