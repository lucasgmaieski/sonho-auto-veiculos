"use client"
import { Checkbox } from "@/Components/ui/checkbox"
import { VehicleType } from "@/Types/VehicleType";
import SliderCard from "../SliderCard/SliderCard"
import { getUrl, useQueryParams } from "@/lib/utils";
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { MenuTypes } from "@/Types/MenuType";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Context } from "@/Contexts/Context";
import FilterText from "../FilterText/FilterText";
import { MarcaFilter } from "@/Types/MarcaFilter";

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
    data?: [string, number][];
    dataMarca?: MarcaFilter[];
}
type Props = {
    vehiclesFilter: ContagemPorCampo | undefined;
    marcaFilter: MarcaFilter[];
}


export default function AsideFilters({vehiclesFilter, marcaFilter}: Props) {
    const [activeSheetAll, setActiveSheetAll] = useState(false);
    const [contentSheetAll, setContentSheetAll] = useState<ContentSheetAllItem>();
    const { urlSearchParams, setQueryParams } = useQueryParams();
    const { urlParams, changeUrlParams } = useContext(Context);

    const [statusFilterItens, setStatusFilterItens] = useState<StatusFilterItem[]>([]);

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

    const handleSheetAll = (filter: [string, number][] | MarcaFilter[], field: string) => {
        setActiveSheetAll(true);
        field === 'marca' ? 
        setContentSheetAll({dataMarca:filter as MarcaFilter[], field})
        :
        setContentSheetAll({data:filter as [string, number][], field});
    }
    useEffect(()=> {
        const parametros = urlSearchParams;
        parametros.forEach((value, key) => {
            console.log("valor: "+value+"-key: "+ key);
            if(value) {
                const valueArray = value.split('_');
                valueArray.forEach((item) => {
                    addStatusFilterItem(item, true);
                })
            }
            changeUrlParams(urlSearchParams.toString());
        });
    }, []);
    console.log(statusFilterItens);

    const handleSelectFilter = (field: string, val: string) => {
        console.log("taclicando aqui")
        const currentField = urlSearchParams.get(field);
        console.log(currentField);
        const currentFieldArray = currentField?.split('_');
        const newValue = !getStatusFilterItem(val)?.value ?? true;
        if (newValue) {
            if(!currentField) {
                setQueryParams({ [field]: val })
            }
            else if(currentFieldArray?.indexOf(val) == -1) {
                let newParam = currentField + '_' + val;
                newParam = newParam.replace(/^_/, '');

                console.log("newParam 1: " + newParam)
                setQueryParams({ [field]: newParam })
            } 
        } else {
            if (currentFieldArray?.indexOf(val) !== -1) {
                const newParamArray = currentFieldArray?.filter(valor => valor !== val)
                let newParam = newParamArray.join('_');
                newParam = newParam.replace(/^_/, '');

                console.log("newParam 2: " + newParam)
                setQueryParams({ [field]: newParam })
            }
        }
        changeStatusFilterItem(val, newValue);
        changeUrlParams(urlSearchParams.toString());
    }



    return(
        <div className="relative overflow-hidden h-full">
            <div className={`overflow-y-auto h-full p-3 space-y-4`}>
                <div>
                    <h2>Marca - {urlParams}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 sm:gap-y-4">
                        {marcaFilter && marcaFilter.map((item,index) => (
                            <div key={index} className={`text-center border-blue-500 ${(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value) ? 'border' : ''}`}>
                    
                                <Checkbox className="hidden"  id={item.name} checked={(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value)} onCheckedChange={()=>handleSelectFilter('marca',item.name)}/>
                                <label htmlFor={item.name}>
                                    <img src={item?.marcas?.logo?.node?.mediaItemUrl} alt={item?.name} />
                                    {item?.name} <br />({item?.count ?? '0'})
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="cursor-pointer w-fit ml-auto" onClick={()=>handleSheetAll(marcaFilter, 'marca')}>Ver todos</div>
                </div>

                { vehiclesFilter &&
                Object.keys(vehiclesFilter)
                .filter((campo) => campo === 'preco' || campo === 'quilometros' || campo === 'ano')
                .map((campo) => (
                    <div key={campo} className="flex flex-col">
                        <h2>{campo}</h2>
                        <FilterText field={campo} handleSelectFilter={handleSelectFilter}/>
                    </div>
                ))}

                { vehiclesFilter &&
                Object.keys(vehiclesFilter)
                .filter((campo) => campo !== 'preco' && campo !== 'quilometros' && campo !== 'ano' && campo !== 'marca')
                .map((campo) => (
                    <div key={campo} className="flex flex-col">
                        <h2>{campo}</h2>
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
                
                <div className={`${activeSheetAll ? 'translate-x-0' : '-translate-x-96'} absolute top-0 dark:bg-slate-800 bg-slate-100 w-full h-full p-3 pr-6 transition-transform duration-500`}>
                    <button onClick={()=>setActiveSheetAll(false)}><MdOutlineKeyboardBackspace className="w-[32px] h-[32px]"/></button>
                    <div>
                    {contentSheetAll?.field !== 'marca' && contentSheetAll?.data.map(([valor, contagem]) => (
                        <div key={valor}>
                            <Checkbox  id={valor} checked={(statusFilterItens.find(item => item.key === valor )?.value)} onCheckedChange={()=>handleSelectFilter(contentSheetAll.field, valor)}/>
                            <label htmlFor={valor}>
                                {`${valor}: ${contagem}`}
                            </label>
                        </div>
                    ))}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 sm:gap-y-4">
                    {contentSheetAll?.field === 'marca' && contentSheetAll?.dataMarca.map((item, index) => (
                            <div key={index} className={`text-center border-blue-500 ${(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value) ? 'border' : ''}`}>
                                
                                <Checkbox className="hidden"  id={item.name} checked={(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value)} onCheckedChange={()=>handleSelectFilter('marca',item.name)}/>
                                <label htmlFor={item.name}>
                                    <img src={item?.marcas?.logo?.node?.mediaItemUrl} alt={item?.name} />
                                    {item?.name} <br />({item?.count ?? '0'})
                                </label>
                            </div>
                    ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}