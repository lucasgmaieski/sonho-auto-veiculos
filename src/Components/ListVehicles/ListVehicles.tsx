"use client"
import { VehicleCustomType } from "@/Types/VehicleCustomType";
import { useQueryParams } from "@/lib/utils";
import {useContext, useEffect, useState } from 'react'
import { IoFilter } from "react-icons/io5";
import CarCard from "../CarCard/CarCard";
import { Context } from "@/Contexts/Context";
import api from "@/api";
import Pagination from "../Pagination/Pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/Components/ui/select"
import { thousandsMask } from "@/lib/masks/thousandsMask";
import { Button } from "../ui/button";

type Props = {
    vehicles: VehicleCustomType[];
}


export default function ListVehicles({vehicles}: Props) {
    const { urlParams, changeUrlParams, openFilter, toggleFilter } = useContext(Context);
    const { urlSearchParams, setQueryParams, removeQueryParams } = useQueryParams();
    const [vehiclesList, setVehiclesList] = useState<VehicleCustomType[]>([]);
    const [isMounted, setIsMounted] = useState(true);
    
    const [ordering, setOrdering] = useState<string>(urlSearchParams.get('ord') ?? 'padrao' );

    useEffect(() => {
        if(!isMounted){
            setQueryParams({ ['ord']: ordering, ['page']: 1 });
            changeUrlParams(urlSearchParams.toString());
        }
        setIsMounted(false)
    }, [ordering]);

    async function getVehiclesSearch() {
        const vehiclesSearch: VehicleCustomType[] = await api.getVehiclesByParamsGQL(urlParams);
        console.log('ta trasendo certo até aqui')
        console.log(vehiclesSearch);
        
        setVehiclesList(vehiclesSearch || []);
    }
    useEffect(()=> {
        console.log("ele entra aqui caraiiiiiiiiii", urlParams.toString())
        getVehiclesSearch();
    }, [urlParams]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleResize = () => {
        // Defina openFilter como false em telas de celular (por exemplo, largura menor que 768px)
        if (window.innerWidth < 640) {
            toggleFilter(false);
        }
    };
    const handleRemoveFilters = () => {
        removeQueryParams();
        changeUrlParams('');
    } 
    return(
        <>
            <div className="flex items-center mb-6 px-2 gap-4">
                <button type="button" onClick={() =>toggleFilter(undefined)}><IoFilter className={`text-2xl`}/></button>
                {/* Lista - {urlParams} */}
                <Button size="sm" className="" type="button" onClick={handleRemoveFilters}>Limpar Filtros</Button>
                
                <div className="w-fit flex items-center ml-auto">
                    <label htmlFor="">Ordenar: </label>
                    <Select defaultValue={ordering} onValueChange={setOrdering}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione a orndem" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel></SelectLabel>
                                <SelectItem value="padrao">Ordem Padrão</SelectItem>
                                <SelectItem value="maiorpreco">Maior Preço</SelectItem>
                                <SelectItem value="menorpreco">Menor Preço</SelectItem>
                                <SelectItem value="anomaisnovo">Ano mais novo</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {vehiclesList[0]?.count > 0 && 
                <p className="px-2 mb-5">{thousandsMask(vehiclesList[0].count.toString())} {vehiclesList[0].count === 1 ? 'veículo encontrado' : 'veículos encontrados'}</p>
            }
            <div className={`grid grid-cols-1 ${openFilter ? 'sm:grid-cols-1' : 'sm:grid-cols-2'} md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 gap-y-6 sm:gap-y-4`}>

                {vehiclesList.length > 0 && vehiclesList.map((vehicle: VehicleCustomType, index:number) => (
                    <CarCard vehicle={vehicle} key={index}/>
                ))}
                {!vehiclesList &&
                    <p>Nenhum vaículo para mostrar!</p>
                }
            </div>
            {vehiclesList[0]?.count > 0 &&
                <Pagination totalCount={vehiclesList[0]?.count} slug={"/veiculos"} perPage={2}/>
            }
        </>
    );
}