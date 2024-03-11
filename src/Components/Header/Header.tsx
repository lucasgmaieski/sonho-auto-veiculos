
import api from "@/api";
import Link from "next/link";
import { ThemeSwitcher } from "../../app/ThemeSwitcher";
import { FaHeart } from "react-icons/fa";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover";
import { getUrl } from "@/lib/utils";

export default async function Header() {
    const menuPrincipal: MenuClassic[] = await api.getMenuBySlugGQL("menu-principal");
    console.log(menuPrincipal);

    return (
        <header className={`fixed top-0 z-20 w-full p-4 dark:bg-gradient-to-t dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-t from-white via-stone-100 to-white`}>
            <div className="flex justify-between items-center container">
                <h1><Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}><img className="w-36" src="/logo.svg" alt="" /></Link></h1>
                {/* <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus-visible:outline-none focus:outline-blue-500 focus:outline-1 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Buscar Veículos, Tipos..." required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form> */}
                <nav className="flex w-50 gap-5 justify-between ">
                    <ul className={`flex justify-between gap-6 col mb-0 `}>
                        {menuPrincipal && menuPrincipal.filter(menu => menu.parentId === null).map((menu, index: number) => (
                            <li key={index} className="relative group py-2">
                                <Link href={getUrl(menu.url)}>{menu.label}</Link> 
                                {menu.childItems?.nodes.length > 0 &&
                                    <ul className="absolute hidden group-hover:top-10 group-hover:animate-fadeeout group-hover:block w-60 rounded-lg divide-y-2 dark:divide-blue-900 divide-blue-200 overflow-hidden">
                                        {menu.childItems.nodes.map((submenu, i) => (
                                            <li key={i} className="px-4 py-2 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300">
                                                <Link href={getUrl(submenu.url)}>{submenu.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </li>
                        ))}
                    </ul>
                    <Popover>
                        <PopoverTrigger><FaHeart className="w-[28px] h-[28px] text-red-500"/></PopoverTrigger>
                        <PopoverContent>
                            <ul>
                                <li>ford focus R$ 35000</li>
                                <li>ford focus R$ 35000</li>
                                <li>ford focus R$ 35000</li>
                                <li>ford focus R$ 35000</li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                    <div className="flex justify-content-end items-center">
                        <ThemeSwitcher />
                    </div>
                </nav>
            </div>
        </header>
    );
}