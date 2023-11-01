'use client'
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { ReactNode } from "react";

import 'swiper/css';

interface SwiperSliderProps {
    settings: SwiperProps;
    children: ReactNode
}
export default function SwiperSlider({ settings, children }: SwiperSliderProps) {
    return (
        <Swiper {...settings}>
            {children}
        </Swiper>
    );
}