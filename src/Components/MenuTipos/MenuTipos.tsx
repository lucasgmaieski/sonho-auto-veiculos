'use client'

import api from "@/api";
import Link from "next/link";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";


export default async function MenuTipos() {
    const menuTipos: any = await api.getMenu(8);
    console.log(menuTipos);

    function getUrl(url: string): string {
        if(process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_WORDPRESS_URL) {
            url = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, process.env.NEXT_PUBLIC_SITE_URL)
            return url;
        }
        return '/';
    }

    const settings: SwiperProps = {
        spaceBetween: 10,
        slidesPerView: 2,
        navigation: true,
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
                slidesPerView: 6,
              },
        }
    }
    return (
            <div id="marcas" className="relative -mt-14 flex justify-center gap-2 bg-white z-10 p-4 mx-auto rounded-xl shadow-xl">
                <SwiperSlider settings={settings}>
                    {menuTipos && menuTipos.itens.map((menu: any, index: number) => (
                        <SwiperSlide className="max-w-[190px]">
                            <div key={index} className="flex flex-row  max-w-[190px] aspect-[12/9]">
                                
                                <Link href={getUrl(menu.url)} className="relative h-full w-full flex flex-col justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-center dark:bg-black"></div>
                                    <div className="group relative h-full w-full flex rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                                        <div className="z-100 h-full w-full overflow-hidden rounded-xl border border-gray-200 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                                            <img src={menu.description} className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                                        </div>
                                        <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                                            <h1 className="font-serif text-lg md:text-2xl font-bold text-white shadow-xl">{menu.title}</h1>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </SwiperSlide>
                    ))}
                </SwiperSlider>
            </div>
    );
}