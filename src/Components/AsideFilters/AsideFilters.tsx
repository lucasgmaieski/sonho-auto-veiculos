"use client"
import { VehicleType } from "@/Types/VehicleType";
import SliderCard from "../SliderCard/SliderCard"
import { getUrl } from "@/lib/utils";
import { useEffect, useState } from 'react'
import { MenuTypes } from "@/Types/MenuType";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

interface ContagemPorCampo {
    [campo: string]: {
    [valor: string]: number;
    };
}
type Props = {
    vehiclesFilter: ContagemPorCampo | undefined;
    marcaFilter: MenuTypes;
}
export default function AsideFilters({vehiclesFilter, marcaFilter}: Props) {
    const [activeSheetAll, setActiveSheetAll] = useState(false);
    const [contentSheetAll, setContentSheetAll] = useState<[string, number][]>();
    const handleSheetAll = (filter: [string, number][]) => {
        setActiveSheetAll(true);
        setContentSheetAll(filter);
    }

    return(
        <div className="relative overflow-hidden h-full">
            <div className="overflow-y-scroll h-full">
                <h2>Marca</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 sm:gap-y-4">
                {marcaFilter && marcaFilter.itens.map((item,index) => (
                    <div key={index} className="text-center">
                        <img src={item.logo} alt={item.titulo} />
                        {item.titulo} <br />({item.contagem})
                    </div>
                ))}
                </div>
                { vehiclesFilter &&
                Object.keys(vehiclesFilter).map((campo) => (
                    <div key={campo} className="flex flex-col">
                        <h3>Contagem para o campo "{campo}":</h3>
                        {Object.entries(vehiclesFilter[campo]).map(([valor, contagem]) => (
                            <div key={valor}>
                            {`${valor}: ${contagem}`}
                            </div>
                        ))}
                        <div className="cursor-pointer w-fit self-end" onClick={()=>handleSheetAll(Object.entries(vehiclesFilter[campo]))}>Ver todos</div>
                    </div>
                ))}
                <div className={`${activeSheetAll ? 'translate-x-0' : '-translate-x-72'} absolute top-0 dark:bg-slate-800 bg-slate-100 w-full h-full transition-transform tr duration-500`}>
                    <button onClick={()=>setActiveSheetAll(false)}><MdOutlineKeyboardBackspace className="w-[32px] h-[32px]"/></button>
                    <div>
                    {contentSheetAll?.map(([valor, contagem]) => (
                        <div key={valor}>
                        {`${valor}: ${contagem}`}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}