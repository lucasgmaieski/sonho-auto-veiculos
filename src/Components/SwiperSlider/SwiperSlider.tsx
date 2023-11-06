'use client'
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";

import { ReactNode } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';

interface SwiperSliderProps {
    settings: SwiperProps;
    children: ReactNode
}
export default function SwiperSlider({ settings, children }: SwiperSliderProps) {
    return (
        <Swiper modules={[Navigation, Pagination, A11y]}  {...settings}>
            {children}
        </Swiper>
    );
}