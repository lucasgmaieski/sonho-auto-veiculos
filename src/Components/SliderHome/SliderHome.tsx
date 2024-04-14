'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Style.css";
import Link from "next/link";
import Image from "next/image";

export default function SliderHome() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>
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
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white md:-mt-12 w-5/6 md:w-3/5">
                    <h2 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl mb-5">Encontre o veículo perfeito para você. A realização do seu sonho começa aqui!</h2>
                    <Link href="/veiculos" className="text-lg xsm:text-xl sm:text-2xl md:text-3xl py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Começar</Link>
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
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white md:-mt-12 w-5/6 md:w-3/5">
                    <h2 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl mb-5">Na Sonho Auto Veículos, seu próximo carro está mais perto do que você imagina. Descubra hoje mesmo!</h2>
                    <Link href="/veiculos" className="text-lg xsm:text-xl sm:text-2xl md:text-3xl py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Ver mais</Link>
                </div>
            </div>
        </Slider>
    );
}