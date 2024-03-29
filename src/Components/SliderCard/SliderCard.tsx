'use client'
import Image from "next/image";
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
        <SwiperSlider settings={settings} >
            {images && images.map((image: string, index: number) => (
                <SwiperSlide key={index} className="z-20 relative aspect-[3/2] w-28 h-28">
                    {/* <img src={image} className="animate-fade-in block w-full scale-100 transform object-cover object-center" alt="" />  */}
                    <Image 
                        src={image}
                        fill
                        alt="Imagem do Veículo"
                        priority={index === 0}
                        className='object-cover'
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 320px, 280px"
                    />
                </SwiperSlide>
            ))}
            {!images &&
                <>
                    <SwiperSlide className="z-20">
                        <Image 
                            src="/Car.png"
                            fill
                            alt="Imagem do Veículo"
                            className='object-cover'
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 320px, 280px"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="z-20">
                        <Image 
                            src="/Car.png"
                            fill
                            alt="Imagem do Veículo"
                            className='object-cover'
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 320px, 280px"
                        />                    
                    </SwiperSlide>
                </>
            }
        </SwiperSlider>
    );
}