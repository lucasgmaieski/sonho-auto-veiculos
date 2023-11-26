"use client"
import { VehicleType } from "@/Types/VehicleType";
import { getUrl, useQueryParams } from "@/lib/utils";
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { MenuTypes } from "@/Types/MenuType";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import CarCard from "../CarCard/CarCard";


type Props = {
    vehicles: VehicleType[];
}


export default function ListVehicles({vehicles}: Props) {
    const { urlSearchParams, setQueryParams } = useQueryParams();
    const [vehiclesList, setVehiclesList] = useState<VehicleType[]>(vehicles);

    
    useEffect(()=> {
       
    }, []);

    return(
        <>
            Lista
            {vehiclesList && vehiclesList.map((vehicle: VehicleType, index:number) => (
                <CarCard vehicle={vehicle} key={index}/>
            ))}
            {!vehiclesList &&
                <p>Nenhum vaículo para mostrar!</p>
            }
        </>
    );
}