"use client"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
//   } from "@/Components/ui/select"
// import { Input } from "@/Components/ui/input"
// import { Label } from "../ui/label";
// import FieldInfo from "@/Components/Filters/FieldInfo";
// import { ChangeEvent, useContext, useEffect, useState } from "react";
// import { useQueryParams } from "@/lib/utils";
// import { thousandsMask } from "@/lib/masks/thousandsMask";
// import { Context } from "@/Contexts/Context";

// type Props = {
//     field: string;
//     handleSetFilterText: (field: string, valMin?: string, valMax?: string) => void;
// }

// let searchTimer: NodeJS.Timeout | undefined = undefined;

// export default function FilterText( {field, handleSetFilterText}: Props ) {
//     const { urlSearchParams, setQueryParams } = useQueryParams();
//     const { urlParams } = useContext(Context);
//     const [isMountedField, setIsMountedField] = useState(true); 
//     const [isMountedYear1, setIsMountedYear1] = useState(true); 
//     const [isMountedYear2, setIsMountedYear2] = useState(true);
//     const [year1, setYear1] = useState<string>(urlSearchParams.get(field)?.split('_')[0] );
//     const [year2, setYear2] = useState<string>(urlSearchParams.get(field)?.split('_')[1] );
//     const [minPrice, setMinPrice] = useState<string>(urlSearchParams.get(field)?.split('_')[0] );
//     const [maxPrice, setMaxPrice] = useState<string>(urlSearchParams.get(field)?.split('_')[1] );
//     const [minKilometers, setMinKilometers] = useState<string>(urlSearchParams.get(field)?.split('_')[0] );
//     const [maxKilometers, setMaxKilometers] = useState<string>(urlSearchParams.get(field)?.split('_')[1] );
//     console.log(urlParams);
//     const maxYear = new Date().getFullYear() + 1;

//     useEffect(() => {
//         console.log("entra aqui para atualizar os campos de texto", field)
//         if(!isMountedField) {
//             switch (field) {
//                 case 'ano':
//                     setYear1(urlSearchParams.get(field)?.split('_')[0])
//                     setYear2(urlSearchParams.get(field)?.split('_')[1])
//                     break;
            
//                 case 'quilometros':
//                     setMinKilometers(urlSearchParams.get(field)?.split('_')[0])
//                     setMaxKilometers(urlSearchParams.get(field)?.split('_')[1])
//                     break;
            
//                 case 'preco':
//                     setMinPrice(urlSearchParams.get(field)?.split('_')[0])
//                     setMaxPrice(urlSearchParams.get(field)?.split('_')[1])
//                     break;
            
//                 default:
//                     break;
//             }
//         } 
//         setIsMountedField(false)
//     }, [urlSearchParams.get(field)]);

//     const handleInputChange = (e :ChangeEvent<HTMLInputElement>) => {
//         const { value, id } = e.target
//         console.log(e.target.value);
//         console.log(e.target.id);
//         switch (id) {
//             case "minKilometers":
//                 setMinKilometers(thousandsMask(value));
//                 clearTimeout(searchTimer);
//                 searchTimer = setTimeout(() => {
//                     handleSetFilterText('quilometros', value.replace(/\D/g, ""), undefined)
//                 }, 2000);
//                 break;
//             case "maxKilometers":
//                 setMaxKilometers(thousandsMask(value));
//                 clearTimeout(searchTimer);
//                 searchTimer = setTimeout(() => {
//                     handleSetFilterText('quilometros', undefined, value.replace(/\D/g, ""))
//                 }, 2000);
//                 break;
//             case "minPrice":
//                 setMinPrice(`${value.replace(/\D/g, "") != "" ? "R$ " : ''}${thousandsMask(value)}`);
//                 clearTimeout(searchTimer);
//                 searchTimer = setTimeout(() => {
//                     handleSetFilterText('preco', value.replace(/\D/g, ""), undefined)
//                 }, 2000);
//                 break;
//             case "maxPrice":
//                 setMaxPrice(`${value.replace(/\D/g, "") != "" ? "R$ " : ''}${thousandsMask(value)}`);
//                 clearTimeout(searchTimer);
//                 searchTimer = setTimeout(() => {
//                     handleSetFilterText('preco', undefined, value.replace(/\D/g, ""))
//                 }, 2000);
//                 break;
//             default:
//                 break;
//         }
//     };
//     useEffect(() => {
//         if(!isMountedYear1){
//             handleSetFilterText('ano', year1, undefined)
//             console.log("ta entrando aqui: ", year1);
//         }
//         setIsMountedYear1(false)
//     }, [year1]);
//     useEffect(() => {
//         if(!isMountedYear2){
//             handleSetFilterText('ano', undefined, year2)
//             console.log("ta entrando aqui: ", year2);
//         }
//         setIsMountedYear2(false)
//     }, [year2]);
//     return (
        
//         <div >
//             {field === 'ano' &&
//                 <div className="flex justify-between">
//                     <div className="flex flex-col w-[45%]">
//                         <Select defaultValue={year1} onValueChange={setYear1}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="De" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectGroup>
//                                     <SelectLabel></SelectLabel>
//                                     {Array(100).fill(0).map((item, index)=>( 
//                                         <SelectItem key={index} value={(maxYear - index).toString()}>{(maxYear - index).toString()}</SelectItem>
//                                     ))}
//                                 </SelectGroup>
//                             </SelectContent>
//                         </Select>
//                         <FieldInfo text="ex: 1996" />
//                     </div>
//                     <div className="flex flex-col w-[45%]">
//                         <Select defaultValue={year2} onValueChange={setYear2}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Até" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectGroup>
//                                     <SelectLabel></SelectLabel>
//                                     {Array(100).fill(0).map((item, index)=>( 
//                                         <SelectItem key={index} value={(maxYear - index).toString()}>{(maxYear - index).toString()}</SelectItem>
//                                     ))}
//                                 </SelectGroup>
//                             </SelectContent>
//                         </Select>
//                         <FieldInfo text="ex: 2025" />
//                     </div>
//                 </div>
//             }
//             {field === 'quilometros' &&
//                 <div className="flex justify-between">
//                     <Label className="w-[45%]">
//                         <Input type="text" id="minKilometers"  placeholder="de" value={minKilometers} onChange={handleInputChange}/>
//                         <FieldInfo text="ex: 55.000 km" />
//                     </Label>
//                     <Label className="w-[45%]">
//                         <Input type="text" id="maxKilometers" placeholder="até" value={maxKilometers} onChange={handleInputChange}/>
//                         <FieldInfo text="ex: 55.000 km" />
//                     </Label>
//                 </div>
//             }
//             {field === 'preco' &&
//                 <div className="flex justify-between">
//                     <Label className="w-[45%]">
//                         <Input type="text" id="minPrice"  placeholder="de" value={minPrice} onChange={handleInputChange}/>
//                         <FieldInfo text="ex: R$ 55.000" />
//                     </Label>
//                     <Label className="w-[45%]">
//                         <Input type="text" id="maxPrice" placeholder="até" value={maxPrice} onChange={handleInputChange}/>
//                         <FieldInfo text="ex: R$ 55.000" />
//                     </Label>
//                 </div>
//             }
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import FieldInfo from "@/Components/Filters/FieldInfo";
import { Input } from "@/Components/ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { ChangeEvent } from "react";
import { thousandsMask } from "@/lib/masks/thousandsMask";
import { useQueryParams } from '@/lib/utils';

type Props = {
    field: string;
    handleSetFilterText: (field: string, valMin?: string, valMax?: string) => void;
}

let searchTimer: NodeJS.Timeout | undefined = undefined;

export default function FilterText( {field, handleSetFilterText}: Props ) {
        const { urlSearchParams, setQueryParams } = useQueryParams();

    const [year1, setYear1] = useState<string | null>(null);
    const [year2, setYear2] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [minKilometers, setMinKilometers] = useState<string>('');
    const [maxKilometers, setMaxKilometers] = useState<string>('');

    useEffect(() => {
        setYear1(urlSearchParams.get(field)?.split('_')[0] ?? null);
        setYear2(urlSearchParams.get(field)?.split('_')[1] ?? null);
        setMinPrice(urlSearchParams.get(field)?.split('_')[0] ?? '');
        setMaxPrice(urlSearchParams.get(field)?.split('_')[1] ?? '');
        setMinKilometers(urlSearchParams.get(field)?.split('_')[0] ?? '');
        setMaxKilometers(urlSearchParams.get(field)?.split('_')[1] ?? '');
    }, [urlSearchParams.get(field)]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        const { value } = e.target;
        const cleanedValue = value.replace(/\D/g, '');
        switch (type) {
            case 'year':
                setYear1(value);
                break;
                case "minKilometers":
                    setMinKilometers(thousandsMask(value));
                    clearTimeout(searchTimer);
                    searchTimer = setTimeout(() => {
                        handleSetFilterText('quilometros', value.replace(/\D/g, ""), undefined)
                    }, 2000);
                    break;
                case "maxKilometers":
                    setMaxKilometers(thousandsMask(value));
                    clearTimeout(searchTimer);
                    searchTimer = setTimeout(() => {
                        handleSetFilterText('quilometros', undefined, value.replace(/\D/g, ""))
                    }, 2000);
                    break;
                case "minPrice":
                    setMinPrice(`${value.replace(/\D/g, "") != "" ? "R$ " : ''}${thousandsMask(value)}`);
                    clearTimeout(searchTimer);
                    searchTimer = setTimeout(() => {
                        handleSetFilterText('preco', value.replace(/\D/g, ""), undefined)
                    }, 2000);
                    break;
                case "maxPrice":
                    setMaxPrice(`${value.replace(/\D/g, "") != "" ? "R$ " : ''}${thousandsMask(value)}`);
                    clearTimeout(searchTimer);
                    searchTimer = setTimeout(() => {
                        handleSetFilterText('preco', undefined, value.replace(/\D/g, ""))
                    }, 2000);
                    break;
            default:
                break;
        }
    };

    return (
        <div>
            {field === 'ano' && (
                <div className="flex justify-between">
                    <div className="flex flex-col w-[45%]">
                        <Select defaultValue={year1} onValueChange={setYear1}>
                            <SelectTrigger>
                                <SelectValue placeholder="De" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel></SelectLabel>
                                    {Array(100).fill(0).map((_, index) => (
                                        <SelectItem key={index} value={(new Date().getFullYear() - index).toString()}>{(new Date().getFullYear() - index).toString()}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldInfo text="ex: 1996" />
                    </div>
                    <div className="flex flex-col w-[45%]">
                        <Select defaultValue={year2} onValueChange={setYear2}>
                            <SelectTrigger>
                                <SelectValue placeholder="Até" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel></SelectLabel>
                                    {Array(100).fill(0).map((_, index) => (
                                        <SelectItem key={index} value={(new Date().getFullYear() - index).toString()}>{(new Date().getFullYear() - index).toString()}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldInfo text="ex: 2025" />
                    </div>
                </div>
            )}
            {field === 'quilometros' && (
                <div className="flex justify-between">
                    <Label className="w-[45%]">
                        <Input type="text" id="minKilometers" placeholder="De" value={thousandsMask(minKilometers)} onChange={(e) => handleInputChange(e, 'minKilometers')} />
                        <FieldInfo text="ex: 55.000 km" />
                    </Label>
                    <Label className="w-[45%]">
                        <Input type="text" id="maxKilometers" placeholder="Até" value={thousandsMask(maxKilometers)} onChange={(e) => handleInputChange(e, 'maxKilometers')} />
                        <FieldInfo text="ex: 55.000 km" />
                    </Label>
                </div>
            )}
            {field === 'preco' && (
                <div className="flex justify-between">
                    <Label className="w-[45%]">
                        <Input type="text" id="minPrice" placeholder="De" value={`R$ ${thousandsMask(minPrice)}`} onChange={(e) => handleInputChange(e, 'minPrice')} />
                        <FieldInfo text="ex: R$ 55.000" />
                    </Label>
                    <Label className="w-[45%]">
                        <Input type="text" id="maxPrice" placeholder="Até" value={`R$ ${thousandsMask(maxPrice)}`} onChange={(e) => handleInputChange(e, 'maxPrice')} />
                        <FieldInfo text="ex: R$ 55.000" />
                    </Label>
                </div>
            )}
        </div>
    );
}
