'use client'
import api from "@/api";
import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";
import { getLastPartUrl } from "@/lib/utils";

export default function MenuMarcas() {

    const [menus, setMenus] = useState<any>();
    useEffect(() => {
        getItensMenu();
        async function getItensMenu() {
            const menuMarcas: any = await api.getMenu(15);
            console.log(menuMarcas);
            setMenus(menuMarcas);
        }
    }, []);

    const settings: SwiperProps = {
        spaceBetween: 7,
        slidesPerView: 2,
        navigation: true,
        loop: true,
        breakpoints: {
            475: {
              slidesPerView: 3,
            },
            550: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
            1536: {
              slidesPerView: 7,
            },
        }
    }
    return (
        <div className="container relative flex flex-col justify-center gap-2 z-10 p-4 mx-auto mt-12">
            <h2 className="text-center text-3xl font-bold">Marcas</h2>
            <div className="flex flex-row gap-2">
                <SwiperSlider settings={settings}>
                {menus && menus.itens.map((menu: any, index: number) => (
                    <SwiperSlide className="w-[15%]" key={index}>
                        <Link key={index} href={`${process.env.NEXT_PUBLIC_SITE_URL}/veiculos?marca=${getLastPartUrl(menu.url)}`} className="relative max-w-[190px] m-auto aspect-[1/1] p-1 rounded-full flex flex-col justify-center overflow-hidden">
                            <div className="z-100 overflow-hidden rounded-full border border-gray-200 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                                <img src={menu.logo} className="animate-fade-in block w-full aspect-[1/1] scale-100 transform object-cover object-center " alt="" />
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
                </SwiperSlider>
            </div>
            
        </div>
    );
}