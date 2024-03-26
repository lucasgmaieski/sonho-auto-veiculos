'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './Slider.css';

// import required modules
import { Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

export default function SliderVehicle({images}: {images: string[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
 
  return (
    <>
        <Swiper
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="mySwiperVehicle mb-3 rounded-lg overflow-hidden"
        >
            {images && images.map((image, index) => (
            <SwiperSlide key={index} className='relative aspect-[3/2]'>
                <Image 
                    src={image}
                    fill
                    alt="Imagem do Veículo"
                    priority={index === 0}
                    className='object-cover'
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className="mySwiper"
        >
            {images.length > 1 && images.map((image, index) => (
                <SwiperSlide key={index} className='relative aspect-[3/2] max-w-[23.5%] mr-[2%] rounded-lg overflow-hidden cursor-pointer'>
                    <Image
                        src={image}
                        fill
                        alt="Imagem do Veículo"
                        priority={index <= 4}
                        className='object-cover'
                        sizes="(max-width: 1024px) 23vw, 12vw"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </>
  );
}
