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
import { Menu } from "./Menu";

export default async function Header() {
    const menuPrincipal: MenuClassic[] = await api.getMenuBySlugGQL("menu-principal");
    console.log(menuPrincipal);

    return (
        <header className={`fixed top-0 z-20 w-full p-4 dark:bg-gradient-to-t dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-t from-white via-stone-100 to-white`}>
            <div className="flex justify-between items-center container">
                <h1><Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}><img className="w-36" src="/logo.svg" alt="" /></Link></h1>
                <nav className="md:flex w-50 gap-5 justify-between hidden">
                    <ul className={`flex justify-between gap-6 col mb-0 `}>
                        {menuPrincipal && menuPrincipal.filter(menu => menu.parentId === null).map((menu, index: number) => (
                            <li key={index} className="relative group py-2">
                                <Link href={getUrl(menu.url)} className="hover:text-blue-600 transition-all">{menu.label}</Link> 
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
                <Menu menuPrincipal={menuPrincipal}/>
            </div>
        </header>
    );
}