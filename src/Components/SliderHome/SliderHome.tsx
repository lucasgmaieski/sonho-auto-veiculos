'use client'

import api from "@/api";
import styles from './sliderhome.module.scss'
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
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div className={`${styles.containerSlider} `}>
            <Slider {...settings}>
                {menus && menus.itens.map((menu: any, index: number) => (
                    <div>
                        <img src="/banner-home1.jpg" alt="" />
                        <div>
                        <h3>{menu.title}</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}