'use client'
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";

export default function SliderCard({images}:string[]) {
    const settings: SwiperProps = {
        slidesPerView: 1,
        navigation: true,
        loop: true,
    }
    return (
        <SwiperSlider settings={settings}>
            {images && images.map((image: any, index: number) => (
                <SwiperSlide key={index} className="z-20">
                    <img src={image} className="animate-fade-in block w-full scale-100 transform object-cover object-center" alt="" /> 
                </SwiperSlide>
            ))}
        </SwiperSlider>
    );
}