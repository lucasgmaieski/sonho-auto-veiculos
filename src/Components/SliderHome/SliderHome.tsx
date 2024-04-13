'use client'

import api from "@/api";
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

export default function SliderHome() {

    const [menus, setMenus] = useState<any>();

    useEffect(() => {
        getItensMenu();
        async function getItensMenu() {
            // const menuTipos: any = await api.getMenu(8);
            // console.log(menuTipos);
            // setMenus(menuTipos);
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
                {/* {Array(4).fill(0).map((menu: any, index: number) => (
                    <div key={index} className="relative">
                        <img src="/banner-home1.jpg" alt="" />
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white">
                            <h3 className="text-4xl">Título {index}</h3>
                            <p className="text-xl">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                ))} */}
                <div className="relative">
                    <Image
                        src="/slider-3.webp"
                        width="100"
                        height="100"
                        alt="Slider"
                        priority
                        className='inset-0 aspect-video object-cover w-full h-auto'
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e2026] to-[#000] opacity-40"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white md:-mt-12">
                        <h2 className="text-3xl mb-5">Encontre o veículo perfeito para você. A realização do seu sonho começa aqui!</h2>
                        <Link href="/veiculos" className="text-3xl py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Começar</Link>
                    </div>
                </div>
                <div className="relative">
                    <Image
                        src="/slider-2.jpg"
                        width="100"
                        height="100"
                        alt="Slider"
                        priority
                        className='inset-0 aspect-video object-cover w-full h-auto'
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e2026] to-[#000] opacity-40"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white md:-mt-12">
                        <h2 className="text-3xl mb-5">Na Sonho Auto Veículos, seu próximo carro está mais perto do que você imagina. Descubra hoje mesmo!</h2>
                        <Link href="/veiculos" className="text-3xl py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Ver mais</Link>

                    </div>
                </div>
            </Slider>
        </div>
    );
}