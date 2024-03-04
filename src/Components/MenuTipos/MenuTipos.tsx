'use client'

import api from "@/api";
import Link from "next/link";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";
import { getLastPartUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MenuTypes } from "@/Types/MenuType";


export default function MenuTipos() {
    const [menu, setMenu] = useState<MenuTypes[]>();
    useEffect(() => {
        getItensMenu();
        async function getItensMenu() {
            const menuTipos: MenuTypes[] = await api.getMenuTiposGQL();
            setMenu(menuTipos);
        }
    }, []);

    const [sizeItem, setSizeItem] = useState(15);

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
            setSizeItem(14.28)
        }
      }
      handleResize()
      window.addEventListener('resize', handleResize);
  
      // Remover o event listener quando o componente é desmontado
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const settings: SwiperProps = {
        spaceBetween: 10,
        slidesPerView: 'auto',
        navigation: true,
        // breakpoints: {
        //     475: {
        //       slidesPerView: 3,
        //     },
        //     550: {
        //       slidesPerView: 4,
        //     },
        //     768: {
        //       slidesPerView: 5,
        //     },
        //     1024: {
        //       slidesPerView: 6,
        //     },
        //     1536: {
        //         slidesPerView: 6,
        //       },
        // }
    }
    return (
            <div id="tipos" className="relative max-w-fit mt-7 md:-mt-14 flex flex-col justify-center gap-2 md:dark:bg-slate-800 md:bg-slate-100 bg-transparent z-10 p-4 mx-auto rounded-xl md:shadow-xl">
                <h2 className="block md:hidden text-center text-3xl font-bold">Tipos</h2>
                <SwiperSlider settings={settings}>
                    {menu && menu.map((item: any, index: number) => (
                        <SwiperSlide className="flex-grow max-w-[200px]" key={index} style={{width: 'calc('+ (sizeItem) + '% - 7px)'}}>
                            <div className="flex flex-row  aspect-[12/9] px-1.5">
                                <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/veiculos?tipo=${item.nome}`} className="relative h-full w-full flex flex-col justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-center dark:bg-black rounded-xl"></div>
                                    <div className="group relative h-full w-full flex rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                                        <div className="z-100 h-full w-full overflow-hidden rounded-xl border border-gray-200 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                                            <img src={item.logo} className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                                        </div>
                                        <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                                            <h1 className="font-serif text-lg md:text-2xl font-bold text-white shadow-xl">{item.nome}</h1>
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