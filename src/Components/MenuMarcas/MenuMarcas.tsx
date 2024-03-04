'use client'
import api from "@/api";
import Link from "next/link";
import { useState, useEffect } from 'react';
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";
import { MenuTypes } from "@/Types/MenuType";

export default function MenuMarcas() {
    const [menu, setMenu] = useState<MenuTypes[]>();
    const [sizeItem, setSizeItem] = useState(15);

    useEffect(() => {
        async function getItensMenu() {
            const menuMarcas: MenuTypes[] = await api.getMenuMarcasGQL();
            setMenu(menuMarcas);
        }
        getItensMenu();
    }, []);

    useEffect(() => {
      function handleResize() {
        if(window.innerWidth < 475) {
            setSizeItem(50);
        }
        else if(window.innerWidth < 550) {
            setSizeItem(33.33);
        }
        else if(window.innerWidth < 768) {
            setSizeItem(20);
        }
        else if(window.innerWidth < 1024) {
            setSizeItem(20);
        } else {
            console.log(menu?.length)
            setSizeItem(14.28)
        }
      }
      handleResize()
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const settings: SwiperProps = {
        spaceBetween: 9,
        slidesPerView: 'auto',
        navigation: true,
        loop: true,
        // breakpoints: {
        //     475: {
        //       slidesPerView: menu?.length > 2 ? 2 : menu?.length,
        //     },
        //     550: {
        //       slidesPerView: menu?.length > 4 ? 4 : menu?.length,
        //     },
        //     768: {
        //       slidesPerView: menu?.length > 5 ? 5 : menu?.length,
        //     },
        //     1024: {
        //       slidesPerView: menu?.length > 6 ? 6 : menu?.length,
        //     },
        //     1536: {
        //       slidesPerView: menu?.length > 6 ? 6 : menu?.length,
        //     },
        // }
    }
    return (
        <div id="menu-marcas" className="container relative flex flex-col justify-center gap-2 z-10 p-4 mx-auto my-14">
            <h2 className="text-center text-3xl font-bold">Marcas</h2>
            <div className="flex flex-row gap-2">
                <SwiperSlider settings={settings}>
                {menu && menu.map((item: any, index: number) => (
                    <SwiperSlide key={index} style={{width: 'calc('+ (sizeItem) + '% - 7px)'}}>
                        <Link key={index} href={`${process.env.NEXT_PUBLIC_SITE_URL}/veiculos?marca=${item.nome}`} className="relative max-w-[190px] m-auto aspect-[1/1] p-1 rounded-full flex flex-col justify-center overflow-hidden">
                            <div className="m-1 z-100 overflow-hidden rounded-full border border-gray-200 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                                <img src={item.logo} className="animate-fade-in block w-full aspect-[1/1] scale-100 transform object-cover object-center " alt="" />
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
                </SwiperSlider>
            </div>
            
        </div>
    );
}