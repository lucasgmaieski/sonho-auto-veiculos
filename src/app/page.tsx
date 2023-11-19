import React from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import MenuTipos from "@/Components/MenuTipos/MenuTipos";
import SliderHome from "@/Components/SliderHome/SliderHome";
import MenuMarcas from "@/Components/MenuMarcas/MenuMarcas";
import SwiperSlider from "@/Components/SwiperSlider/SwiperSlider";
import { SwiperSlide } from "swiper/react";
import MorePopular from '@/Components/MorePopular/MorePopular';

export default function Home() {
    const settings = {
        spaceBetween: 20,
        slidesPerView: 3,
    }

    return (
        <main className={styles.main}>
            <SliderHome />
            <MenuTipos />
            <MenuMarcas />

            <MorePopular />

        </main>
    );
}
