"use client"
import api from "@/api";
import Link from "next/link";
import { ThemeSwitcher } from "../../app/ThemeSwitcher";
import { getUrl } from "@/lib/utils";
import { Menu } from "./Menu";
import { FavoriteMenu } from "../Favorites/FavoriteMenu";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const [menuPrincipal, setMenuPrincipal] = useState<MenuClassic[]>();    
    const [menuOpen, setMenuOpen] = useState<boolean>()
    
    useEffect(() => {
        function handleClick(event) {
          if (event.target.tagName === 'A') {
            setMenuOpen(false)
            document.body.classList.remove('overflow-hidden');
          }
        }
        document.addEventListener('click', handleClick);
        return () => {
          document.removeEventListener('click', handleClick);
        };
    }, []);

    async function getMenuPrincipal() {
        const menuPrincipal: MenuClassic[] = await api.getMenuBySlugGQL("menu-principal");
        console.log(menuPrincipal);
        
        setMenuPrincipal(menuPrincipal || []);
    }
    useEffect(()=> {
        getMenuPrincipal();
    }, []);

    return (
        <header className={`fixed top-0 z-30 w-full dark:bg-gradient-to-t dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-t from-white via-stone-100 to-white`}>
            <div className="flex justify-between items-center container p-4 lg:px-14">
                <h1>
                    <Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'} aria-label="Ir para página inicial">
                        <Image
                            src="/logo.png"
                            width={144}
                            height={108}
                            priority
                            alt="Logo Sonho Auto Veículos"
                            className='object-cover'
                        />
                    </Link>
                </h1>
                <nav className="md:flex w-50 gap-5 justify-between hidden">
                    <ul className={`flex justify-between gap-6 col mb-0 `}>
                        {menuPrincipal && menuPrincipal.filter(menu => menu.parentId === null).map((menu, index: number) => (
                            <li key={index} className="relative group py-2">
                                <Link href={getUrl(menu.url)} className="hover:text-blue-600 transition-all">{menu.label}</Link> 
                                {menu.childItems?.nodes.length > 0 &&
                                    <ul className="absolute hidden group-hover:top-10 group-hover:animate-fadeeout group-hover:block w-60 rounded-lg space-y-1 overflow-hidden shadow-md bg-popover p-1 border">
                                        {menu.childItems.nodes.map((submenu, i) => (
                                            <li key={i} className="px-4 py-2 dark:hover:bg-slate-800 hover:bg-slate-200 rounded-md">
                                                <Link href={getUrl(submenu.url)}>{submenu.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </li>
                        ))}
                    </ul>
                    <FavoriteMenu />
                    <div className="flex justify-content-end items-center">
                        <ThemeSwitcher />
                    </div>
                </nav>
                <Menu menuPrincipal={menuPrincipal} menuIsOpen={menuOpen}/>
            </div>
        </header>
    );
}