"use client"
import { Checkbox } from "@/Components/ui/checkbox"
import { VehicleType } from "@/Types/VehicleType";
import SliderCard from "../SliderCard/SliderCard"
import { getUrl, useQueryParams } from "@/lib/utils";
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { MenuTypes } from "@/Types/MenuType";
import { MdOutlineKeyboardBackspace } from "react-icons/md";


interface ContagemPorCampo {
    [campo: string]: {
    [valor: string]: number;
    };
}
interface StatusFilterItem {
    key: string;
    value: boolean;
}
interface ContentSheetAllItem {
    field: string;
    data: [string, number][];
}
type Props = {
    vehiclesFilter: ContagemPorCampo | undefined;
    marcaFilter: MenuTypes;
}


export default function AsideFilters({vehiclesFilter, marcaFilter}: Props) {
    const [activeSheetAll, setActiveSheetAll] = useState(false);
    const [contentSheetAll, setContentSheetAll] = useState<ContentSheetAllItem>();
    const { urlSearchParams, setQueryParams } = useQueryParams();


    const [statusFilterItens, setStatusFilterItens] = useState<StatusFilterItem[]>([
        // { key: 'Fiat', value: true },
        // { key: '2020', value: true },
    ]);

    const addStatusFilterItem = (key: string, value: boolean) => {
        setStatusFilterItens(prevStatusFilterItens => {
            const newItem: StatusFilterItem = { key, value };
            const newState = [...prevStatusFilterItens, newItem];
            return newState;
          });
    };

    const changeStatusFilterItem = (key: string, newValue: boolean) => {
        const itemExist = statusFilterItens.find(item => item.key === key);

        if(itemExist){
            const novoEstado = statusFilterItens.map(item => {
                if (item.key === key) {
                    return { ...item, value: newValue };
                }
                return item;
            });
            setStatusFilterItens(novoEstado);
        } else {
            setStatusFilterItens([...statusFilterItens, { key, value: newValue }]);
            console.log("statusFilterItens");
            console.log(statusFilterItens);
        }
    };

    const getStatusFilterItem = (key: string): StatusFilterItem | undefined => {
        return statusFilterItens.find(item => item.key === key);
    };

    const handleSheetAll = (filter: [string, number][], field: string) => {
        setActiveSheetAll(true);
        setContentSheetAll({data:filter, field});
    }
    useEffect(()=> {
        const parametros = urlSearchParams;
        parametros.forEach((value, key) => {
            console.log("valor: "+value+"-key: "+ key);
            addStatusFilterItem(value, true);
            
        });
    }, []);
    console.log(statusFilterItens);

    // (urlSearchParams.get(campo) ?? "") === valor ? true : false

    const handleSelectFilter = (field: string, val: string) => {
        // console.log('Tipo do Evento:', event.type);
        // console.log('Alvo do Evento:', event.currentTarget);
        
        // // Propriedades específicas do elemento
        // const idDoElemento = event.currentTarget.id;
        // const classeDoElemento = event.currentTarget.className;
    
        // console.log('ID do Elemento:', idDoElemento);
        // console.log('Classe do Elemento:', classeDoElemento);
        // const checked = event.currentTarget.dataset
        // console.log( checked)
        console.log("taclicando aqui")
        const newValue = !getStatusFilterItem(val)?.value ?? true
        changeStatusFilterItem(val, newValue);
        setQueryParams({ [field]: val })
    }

    return(
        <div className="relative overflow-hidden h-full">
            <div className="overflow-y-scroll h-full p-3">
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
                                <Checkbox  id={valor} checked={(statusFilterItens.find(item => item.key === valor )?.value)} onCheckedChange={()=>handleSelectFilter(campo,valor)}/>
                                <label htmlFor={valor}>
                                    {`${valor}: ${contagem}`}
                                </label>
                            </div>
                        ))}
                        <div className="cursor-pointer w-fit self-end" onClick={()=>handleSheetAll(Object.entries(vehiclesFilter[campo]), campo)}>Ver todos</div>
                    </div>
                ))}
                <div className={`${activeSheetAll ? 'translate-x-0' : '-translate-x-96'} absolute top-0 dark:bg-slate-800 bg-slate-100 w-full h-full transition-transform tr duration-500`}>
                    <button onClick={()=>setActiveSheetAll(false)}><MdOutlineKeyboardBackspace className="w-[32px] h-[32px]"/></button>
                    <div>
                    {contentSheetAll?.data.map(([valor, contagem]) => (
                        <div key={valor}>
                            <Checkbox  id={valor} checked={(statusFilterItens.find(item => item.key === valor )?.value)} onCheckedChange={()=>handleSelectFilter(contentSheetAll.field, valor)}/>
                            <label htmlFor={valor}>
                                {`${valor}: ${contagem}`}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}