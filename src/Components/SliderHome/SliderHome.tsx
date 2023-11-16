'use client'

import api from "@/api";
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function SliderHome() {
    

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
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div className="">
            <Slider {...settings}>
                {menus && menus.itens.map((menu: any, index: number) => (
                    <div key={index} className="relative">
                        <img src="/banner-home1.jpg" alt="" />
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white">
                            <h3 className="text-4xl">{menu.titulo}</h3>
                            <p className="text-xl">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}