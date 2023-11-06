'use client'
import api from "@/api";
import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";

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
    

    // var settingsSliderMarcas = {
    //     className: "menuMarcas",
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 6,
    //     slidesToScroll: 1,
    //     responsive: [
    //         {
    //           breakpoint: 1024,
    //           settings: {
    //             slidesToShow: 5,
    //             slidesToScroll: 1,
    //           }
    //         },
    //         {
    //           breakpoint: 640,
    //           settings: {
    //             slidesToShow: 4,
    //             slidesToScroll: 1,
    //           }
    //         },
    //         {
    //           breakpoint: 500,
    //           settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 1
    //           }
    //         },
    //         {
    //             breakpoint: 400,
    //             settings: {
    //               slidesToShow: 2,
    //               slidesToScroll: 1
    //             }
    //         }
    //       ],
    //   };

    const settings: SwiperProps = {
        spaceBetween: 5,
        slidesPerView: 3,
        navigation: true,
        breakpoints: {
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
        <div className="container relative flex flex-col justify-center gap-2 z-10 p-4 mx-auto mt-12">
            <h2 className="text-3xl font-bold">Marcas</h2>
            <div className="flex flex-row gap-2">
                <SwiperSlider settings={settings}>
                {menus && menus.itens.map((menu: any, index: number) => (
                    <SwiperSlide className="max-w-[190px]">
                        <Link key={index} href={getUrl(menu.url)} className="relative max-w-[190px] aspect-[1/1] p-1 rounded-full flex flex-col justify-center overflow-hidden">
                            <div className="z-100 overflow-hidden rounded-full border border-gray-200 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                                <img src={menu.description} className="animate-fade-in block w-full aspect-[1/1] scale-100 transform object-cover object-center " alt="" />
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
                </SwiperSlider>
            </div>
            
        </div>
    );
}