"use client"
import Link from "next/link";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import { getUrl } from "@/lib/utils";
import { ThemeSwitcher } from "@/app/ThemeSwitcher";
import { FavoriteMenu } from "../Favorites/FavoriteMenu";

export function Menu({menuPrincipal}: {menuPrincipal: MenuClassic[]}) {
    const [menuOpen, setMenuOpen] = useState<boolean>()
    function handleMenu() {
        setMenuOpen(!menuOpen)
        document.body.classList.toggle('overflow-hidden');
    }
    return (
        <>
            <div className=" py-6 flex flex-col justify-center md:hidden z-20">
                <div className="relative py-3 sm:max-w-xl mx-auto">
                    <nav x-data="{ open: false }">
                        <button className="text-gray-500 w-10 h-10 relative focus:outline-none dark:bg-slate-800 bg-slate-200 rounded-lg" onClick={handleMenu}>
                            <span className="sr-only">Open main menu</span>
                            <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                                <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                                <span aria-hidden="true" className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${menuOpen ? 'opacity-0' : ''}`}></span>
                                <span aria-hidden="true" className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${menuOpen ? '-rotate-45' : ' translate-y-1.5'}`}></span>
                            </div>
                        </button>
                    </nav>
                </div>
            </div>
            
            <nav className={`${menuOpen ? 'animate-fadeeoutmenumobile  flex p-7' : 'animate-fadeinmenumobile max-w-0 p-0'} absolute top-0 right-0 w-screen h-screen gap-5 flex-col justify-start items-start md:hidden dark:bg-gradient-to-bl dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-bl from-white via-stone-100 to-white overflow-auto`}>
                <h1><Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}><img className="w-36" src="/logo.svg" alt="" /></Link></h1>

                <ul className={`flex flex-col justify-between gap-2 col mb-0 w-full`}>
                    {menuPrincipal && menuPrincipal.filter(menu => menu.parentId === null).map((menu, index: number) => (
                        <li key={index} className="relative group py-2">
                            {menu.childItems?.nodes.length > 0 ?
                                <Accordion type="single" collapsible className="w-fit">
                                    <AccordionItem value="item-1" className="border-none">
                                        <AccordionTrigger className="p-0 gap-3"><Link href={getUrl(menu.url)}>{menu.label}</Link> </AccordionTrigger>
                                        <AccordionContent className="pb-0 pt-2">
                                        <ul className="space-y-2">
                                            {menu.childItems.nodes.map((submenu, i) => (
                                                <li key={i} className="px-4 py-2">
                                                    <Link href={getUrl(submenu.url)} className="hover:underline">{submenu.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                :
                                <Link href={getUrl(menu.url)} className="hover:underline transition-transform">{menu.label}</Link> 
                            }
                        </li>
                    ))}
                    <li className="py-2">
                        <FavoriteMenu />
                    </li>
                    <li className="py-2">
                        <div className="flex justify-start items-start">
                            <ThemeSwitcher />
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}