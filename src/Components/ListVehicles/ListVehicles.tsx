"use client"
import { VehicleType } from "@/Types/VehicleType";
import { useQueryParams } from "@/lib/utils";
import {useContext, useEffect, useState } from 'react'
import CarCard from "../CarCard/CarCard";
import { Context } from "@/Contexts/Context";
import api from "@/api";
import Pagination from "../Pagination/Pagination";


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
            const vehiclesSearch: VehicleType[] = await api.getVehiclesByParamsGQL(urlParams);
            console.log('ta trasendo certo até aqui')
            console.log(vehiclesSearch);
            
                setVehiclesList(vehiclesSearch || []);
              
        }
    }, [urlParams]);
    // console.log(vehiclesList)

    return(
        <>
            Lista - {urlParams}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 gap-y-6 sm:gap-y-4">

                {vehiclesList.length > 0 && vehiclesList.map((vehicle: VehicleType, index:number) => (
                    <CarCard vehicle={vehicle} key={index}/>
                ))}
                {!vehiclesList &&
                    <p>Nenhum vaículo para mostrar!</p>
                }
            </div>
            {vehiclesList[0]?.count > 0 &&
                <Pagination totalCount={vehiclesList[0]?.count} slug={"/veiculos"} perPage={6}/>
            }
        </>
    );
}