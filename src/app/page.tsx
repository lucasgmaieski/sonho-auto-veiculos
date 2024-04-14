import React from 'react';
import MenuTipos from "@/Components/MenuTipos/MenuTipos";
import SliderHome from "@/Components/SliderHome/SliderHome";
import MenuMarcas from "@/Components/MenuMarcas/MenuMarcas";
import MorePopular from '@/Components/MorePopular/MorePopular';

export default function Home() {

    return (
        <>
            <main className="mt-[150px]">
                <SliderHome />
                <MenuTipos />
                <MenuMarcas />
                <MorePopular />
            </main>
        </>
    );
}
