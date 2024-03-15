'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './Slider.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

export default function SliderVehicle({images}: {images: string[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
        <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiperVehicle mb-2 rounded-lg overflow-hidden"
        >
            {images && images.map((image, index) => (
            <SwiperSlide key={index}>
                <Image 
                    src={image}
                    width={500}
                    height={500}
                    alt="Imagem do Veículo"
                    priority={index === 0}
                    placeholder='blur'
                    blurDataURL='blue'
                />
            </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={14}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
        >
            {images && images.map((image, index) => (
            <SwiperSlide key={index}>
                <Image 
                    src={image}
                    width={80}
                    height={60}
                    alt="Imagem do Veículo"
                    priority={index <= 4}
                    placeholder='blur'
                    blurDataURL='blue'
                />
            </SwiperSlide>
            ))}
        </Swiper>
    </>
  );
}
