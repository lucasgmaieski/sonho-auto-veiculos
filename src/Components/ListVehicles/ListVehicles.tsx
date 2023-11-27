"use client"
import { VehicleType } from "@/Types/VehicleType";
import { useQueryParams } from "@/lib/utils";
import {useContext, useEffect, useState } from 'react'
import CarCard from "../CarCard/CarCard";
import { Context } from "@/Contexts/Context";
import api from "@/api";


type Props = {
    vehicles: VehicleType[];
}


export default function ListVehicles({vehicles}: Props) {
    const { urlSearchParams, setQueryParams } = useQueryParams();
    const [vehiclesList, setVehiclesList] = useState<VehicleType[]>([]);
    const [isMounted, setIsMounted] = useState(true);  // Novo estado para verificar se o componente está montado

    const { urlParams } = useContext(Context)

    
    useEffect(()=> {

            getVehiclesSearch();
        async function getVehiclesSearch() {
            const vehiclesSearch: VehicleType[] = await api.getVehiclesBypParams(urlParams);
            console.log('ta trasendo certo até aqui')
            console.log(vehiclesSearch);
            
                setVehiclesList(vehiclesSearch || []);
              
        }
    }, [urlParams]);
    // console.log(vehiclesList)

    return(
        <>
            Lista - {urlParams}
            {vehiclesList.length > 0 && vehiclesList.map((vehicle: VehicleType, index:number) => (
                <CarCard vehicle={vehicle} key={index}/>
            ))}
            {!vehiclesList &&
                <p>Nenhum vaículo para mostrar!</p>
            }
        </>
    );
}