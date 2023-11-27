'use client'
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import { SwiperProps, SwiperSlide } from "swiper/react";
type Props = {
    images: string[]
}
export default function SliderCard({images}: Props) {
    const settings: SwiperProps = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: true,
    }
    return (
        <SwiperSlider settings={settings}>
            {images && images.map((image: string, index: number) => (
                <SwiperSlide key={index} className="z-20">
                    <img src={image} className="animate-fade-in block w-full scale-100 transform object-cover object-center" alt="" /> 
                </SwiperSlide>
            ))}
            {!images &&
                <>
                    <SwiperSlide className="z-20">
                        <img src="/Car.png" className="animate-fade-in block w-full scale-100 transform object-cover object-center" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className="z-20">
                        <img src="/Car.png" className="animate-fade-in block w-full scale-100 transform object-cover object-center" alt="" />
                    </SwiperSlide>
                </>
            }
        </SwiperSlider>
    );
}