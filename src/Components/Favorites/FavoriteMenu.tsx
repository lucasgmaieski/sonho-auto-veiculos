"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Context } from "@/Contexts/Context";
import Link from "next/link";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa";

export function FavoriteMenu() {
    const { favorites } = useContext(Context);

    return (
        <Popover>
            <PopoverTrigger><FaHeart className="w-[28px] h-[28px] text-red-500"/></PopoverTrigger>
            <PopoverContent className="p-0">
                {favorites.length > 0 && 
                    <>
                        <ul className="space-y-1 p-1">
                            {favorites.map((favorite, index) => (
                            <Link href={`/veiculos/${favorite.slug}`} key={index} className="block py-2 px-4 rounded-md hover:bg-slate-200 hover:dark:bg-slate-800">
                                {favorite.title}
                            </Link>
                            ))}
                        </ul>
                        <Link href="/favoritos" className="block font-semibold text-center py-2 px-4 rounded-b-md dark:bg-slate-900 bg-slate-100 hover:bg-slate-200 hover:dark:bg-slate-800">Ver todos</Link>
                    </>
                }
                {favorites.length === 0 &&
                    <div>Você ainda não tem veículos favoritos</div>
                }
            </PopoverContent>
        </Popover>
    );
}