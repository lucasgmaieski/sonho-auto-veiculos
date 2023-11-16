'use client'
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";
type Props = {
    images: string[]
}
export default function SliderCard({images}: Props) {
    const settings: SwiperProps = {
        slidesPerView: 1,
        navigation: true,
        loop: true,
    }
    return (
        <SwiperSlider settings={settings}>
            {images && images.map((image: string, index: number) => (
                <SwiperSlide key={index} className="z-20">
                    <img src={image} className="animate-fade-in block w-full scale-100 transform object-cover object-center" alt="" /> 
                </SwiperSlide>
            ))}
        </SwiperSlider>
    );
}