'use client'
import api from "@/api";
import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect } from 'react';

export default function MenuMarcas() {
    
    function getUrl(url: string): string {
        if(process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_WORDPRESS_URL) {
            url = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, process.env.NEXT_PUBLIC_SITE_URL)
            return url;
        }
        return '/';
    }

    const [menus, setMenus] = useState<any>();
    useEffect(() => {
        getItensMenu();
        async function getItensMenu() {
            const menuTipos: any = await api.getMenu(8);
            console.log(menuTipos);
            setMenus(menuTipos);
        }
    }, []);

    var settingsSliderMarcas = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
      };
    return (
        <div className="relative flex flex-col justify-center gap-2 w-fit z-10 p-4 mx-auto mt-12">
            <h2 className="text-3xl font-bold">Marcas</h2>
            <div className="flex flex-row gap-2">
            <Slider {...settingsSliderMarcas}>
            {menus && menus.itens.map((menu: any, index: number) => (
                    
                <Link key={index} href={getUrl(menu.url)} className="relative w-[13vw] h-[13vw] rounded-full flex flex-col justify-center overflow-hidden">
                    <div className="group relative h-full w-full flex shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                        <div className="z-100 h-full w-full overflow-hidden rounded-full border border-gray-200 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                            <img src={menu.description} className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                        </div>
                    </div>
                </Link>
            ))}
            </Slider>
            </div>
            
        </div>
    );
}