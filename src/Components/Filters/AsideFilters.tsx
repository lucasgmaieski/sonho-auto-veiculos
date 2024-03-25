"use client"
import { Checkbox } from "@/Components/ui/checkbox"
import { getNameField, getUrl, useQueryParams } from "@/lib/utils";
import { useContext, useEffect, useState } from 'react'
import { Context } from "@/Contexts/Context";
import FilterText from "@/Components/Filters/FilterText";
import { MarcaFilter } from "@/Types/MarcaFilter";
import SeeAll from "./SeeAll";
import { FaAngleRight, FaXmark } from "react-icons/fa6";

interface ContagemPorCampo {
    [campo: string]: {
        [valor: string]: number;
    };
}
export interface StatusFilterItem {
    key: string;
    value: boolean;
}
export interface ContentSeeAllItem {
    field: string;
    data?: [string, number][];
    dataMarca?: MarcaFilter[];
}
type Props = {
    vehiclesFilter: ContagemPorCampo | undefined;
    marcaFilter: MarcaFilter[];
}


export default function AsideFilters({vehiclesFilter, marcaFilter}: Props) {
    const [activeSeeAll, setActiveSeeAll] = useState(false);
    const [contentSeeAll, setContentSeeAll] = useState<ContentSeeAllItem>();
    const { urlSearchParams, setQueryParams } = useQueryParams();
    const { urlParams, changeUrlParams, openFilter, toggleFilter } = useContext(Context);
    

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

    const statusFilterItemIsSet = (key: string): StatusFilterItem | undefined => {
        return statusFilterItens.find(item => item.key === key);
    };

    const handleSheetAll = (filter: [string, number][] | MarcaFilter[], field: string) => {
        setActiveSeeAll(true);
        field === 'marca' ? 
        setContentSeeAll({dataMarca:filter as MarcaFilter[], field})
        :
        setContentSeeAll({data:filter as [string, number][], field});
    }

    useEffect(()=> {
        const parametros = urlSearchParams;
        parametros.forEach((value, key) => {
            if(value) {
                const valueArray = value.split('_');
                valueArray.forEach((item) => {
                    addStatusFilterItem(item, true);
                })
            }
            changeUrlParams(urlSearchParams.toString());
        });
    }, []);
    useEffect(() => {
        if(urlParams === '') {
            setStatusFilterItens([])
        }
    }, [urlParams])

    const handleSetFilterCheck = (field: string, val: string) => {
        const currentField = urlSearchParams.get(field);
        const currentFieldArray = currentField?.split('_');
        const newValue = !statusFilterItemIsSet(val)?.value ?? true;
        if (newValue) {
            if(!currentField) {
                setQueryParams({ [field]: val, ['page']: 1 })
            }
            else if(currentFieldArray?.indexOf(val) == -1) {
                let newParam = currentField + '_' + val;
                newParam = newParam.replace(/^_/, '');
                setQueryParams({ [field]: newParam, ['page']: 1 })
            } 
        } else {
            if (currentFieldArray?.indexOf(val) !== -1) {
                const newParamArray = currentFieldArray?.filter(valor => valor !== val)
                let newParam = newParamArray.join('_');
                newParam = newParam.replace(/^_/, '');
                setQueryParams({ [field]: newParam, ['page']: 1 })
            }
        }
        changeStatusFilterItem(val, newValue);
        changeUrlParams(urlSearchParams.toString());
    }
    const handleSetFilterText = (field: string, valMin?: string, valMax?: string) => {
        const currentField = urlSearchParams.get(field);
        const currentFieldArray = currentField?.split('_');

        if(!currentField) {
            let newParam = `${valMin ?? 0}_${valMax ?? 0}`;
            setQueryParams({ [field]: newParam, ['page']: 1  });
        } else {
            console.log(currentFieldArray)
            let newParam = `${valMin === '' ? '0' : valMin ?? currentFieldArray[0]}_${valMax === '' ? '0' : valMax ?? currentFieldArray[1]}`;
            if(newParam === '0_0') newParam = '';
            setQueryParams({ [field]: newParam, ['page']: 1  });
        }
        changeUrlParams(urlSearchParams.toString());
    }

    return(
        <aside className={`dark:bg-slate-800 bg-slate-100 ${openFilter ? 'translate-x-0 sm:min-w-[310px] w-screen h-screen sm:h-full sm:sticky top-0 fixed sm:w-1/5 z-20 sm:z-10' : 'sticky -translate-x-[310px] w-0 h-0'} transition-all`}>
            <div className={`relative overflow-hidden h-full`}>
                <div className={`overflow-y-auto h-full`}>
                <button type="button" onClick={() =>toggleFilter(false)} className="absolute right-4 bg-slate-800 p-1 rounded-bl-md inline sm:hidden"><FaXmark className={`text-2xl`}/></button>
                    <div className="px-4 py-6">
                        <h2 className="font-semibold mb-2">Marca</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 sm:gap-y-4">
                            {marcaFilter && marcaFilter
                            .sort((a, b) => (b.count) - (a.count))
                            .slice(0, 6)
                            .map((item,index) => (
                                <div key={index} className={`rounded-lg p-1 text-center border-blue-500 ${(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value) ? 'border' : ''}`}>
                        
                                    <Checkbox className="hidden"  id={item.name} checked={(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value)} onCheckedChange={()=>handleSetFilterCheck('marca',item.name)}/>
                                    <label htmlFor={item.name}>
                                        <img src={item?.logoposts?.logo?.node?.mediaItemUrl} alt={item?.name} />
                                        {item?.name} <br /><span className="opacity-80"> ({item?.count ?? '0'})</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="cursor-pointer w-fit ml-auto font-semibold mt-2" onClick={()=>handleSheetAll(marcaFilter, 'marca')}>Ver todos <FaAngleRight className="text-xl inline" /></div>
                    </div>

                    { vehiclesFilter &&
                    Object.keys(vehiclesFilter)
                    .filter((campo) => campo === 'preco' || campo === 'quilometros' || campo === 'ano')
                    .map((campo) => (
                        <div key={campo} className="flex flex-col px-4 py-6 border-t-[1px] dark:border-blue-900 border-blue-200">
                            <h2 className="font-semibold mb-2">{getNameField(campo)}</h2>
                            <FilterText field={campo} handleSetFilterText={handleSetFilterText}/>
                        </div>
                    ))}

                    { vehiclesFilter &&
                    Object.keys(vehiclesFilter)
                    .filter((campo) => campo !== 'preco' && campo !== 'quilometros' && campo !== 'ano' && campo !== 'marca')
                    .map((campo) => (
                        <div key={campo} className="flex flex-col px-4 py-6 border-t-[1px] dark:border-blue-900 border-blue-200">
                            <h2 className="font-semibold mb-2">{getNameField(campo)}</h2>
                            {Object.entries(vehiclesFilter[campo])
                                .sort(([, countA], [, countB]) => countB - countA)
                                .slice(0, 4)
                                .map(([valor, contagem]) => (
                                <div key={valor} className="space-x-2">
                                    <Checkbox  id={valor} checked={(statusFilterItens.find(item => item.key === valor )?.value)} onCheckedChange={()=>handleSetFilterCheck(campo,valor)}/>
                                    <label htmlFor={valor} className="">
                                        {valor}
                                        <span className="opacity-80"> ({contagem})</span>
                                    </label>
                                </div>
                            ))}
                            {Object.entries(vehiclesFilter[campo]).length > 4 &&
                                <div className="cursor-pointer w-fit self-end font-semibold" onClick={()=>handleSheetAll(Object.entries(vehiclesFilter[campo]), campo)}>Ver todos <FaAngleRight className="text-xl inline" /></div>
                            }
                        </div>
                    ))}

                    <SeeAll activeSeeAll={activeSeeAll} setActiveSeeAll={setActiveSeeAll} contentSeeAll={contentSeeAll} statusFilterItens={statusFilterItens} handleSetFilterCheck={handleSetFilterCheck}/>
                    
                </div>
            </div>
        </aside>
    );
}