
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
import { Label } from "../ui/label";
import FieldInfo from "@/Components/Filters/FieldInfo";
import { ChangeEvent, useEffect, useState } from "react";
import { useQueryParams } from "@/lib/utils";
import { thousandsMask } from "@/lib/masks/thousandsMask";

type Props = {
    field: string;
    handleSetFilterText: (field: string, valMin?: string, valMax?: string) => void;
}

let searchTimer: NodeJS.Timeout | undefined = undefined;

export default function FilterText( {field, handleSetFilterText}: Props ) {
    const { urlSearchParams, setQueryParams } = useQueryParams();
    const [isMountedYear1, setIsMountedYear1] = useState(true); 
    const [isMountedYear2, setIsMountedYear2] = useState(true);
    urlSearchParams.get(field)?.split('_') 
    const [year1, setYear1] = useState<string>(urlSearchParams.get(field)?.split('_')[0] );
    const [year2, setYear2] = useState<string>(urlSearchParams.get(field)?.split('_')[1] );
    const [minPrice, setMinPrice] = useState<string>(urlSearchParams.get(field)?.split('_')[0] );
    const [maxPrice, setMaxPrice] = useState<string>(urlSearchParams.get(field)?.split('_')[1] );
    const [minKilometers, setMinKilometers] = useState<string>(urlSearchParams.get(field)?.split('_')[0] );
    const [maxKilometers, setMaxKilometers] = useState<string>(urlSearchParams.get(field)?.split('_')[1] );

    const maxYear = new Date().getFullYear() + 1;

    const handleInputChange = (e :ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target
        console.log(e.target.value);
        console.log(e.target.id);
        switch (id) {
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
    useEffect(() => {
        if(!isMountedYear1){
            handleSetFilterText('ano', year1, undefined)
            console.log("ta entrando aqui: ", year1);
        }
        setIsMountedYear1(false)
    }, [year1]);
    useEffect(() => {
        if(!isMountedYear2){
            handleSetFilterText('ano', undefined, year2)
            console.log("ta entrando aqui: ", year2);
        }
        setIsMountedYear2(false)
    }, [year2]);
    return (
        
        <div >
            {field === 'ano' &&
                <div className="flex justify-between">
                    <div className="flex flex-col w-[45%]">
                        <Select defaultValue={year1} onValueChange={setYear1}>
                            <SelectTrigger>
                                <SelectValue placeholder="De" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel></SelectLabel>
                                    {Array(100).fill(0).map((item, index)=>( 
                                        <SelectItem key={index} value={(maxYear - index).toString()}>{(maxYear - index).toString()}</SelectItem>
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
                                    {Array(100).fill(0).map((item, index)=>( 
                                        <SelectItem key={index} value={(maxYear - index).toString()}>{(maxYear - index).toString()}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldInfo text="ex: 2025" />
                    </div>
                </div>
            }
            {field === 'quilometros' &&
                <div className="flex justify-between">
                    <Label className="w-[45%]">
                        <Input type="text" id="minKilometers"  placeholder="de" value={minKilometers} onChange={handleInputChange}/>
                        <FieldInfo text="ex: 55.000 km" />
                    </Label>
                    <Label className="w-[45%]">
                        <Input type="text" id="maxKilometers" placeholder="até" value={maxKilometers} onChange={handleInputChange}/>
                        <FieldInfo text="ex: 55.000 km" />
                    </Label>
                </div>
            }
            {field === 'preco' &&
                <div className="flex justify-between">
                    <Label className="w-[45%]">
                        <Input type="text" id="minPrice"  placeholder="de" value={minPrice} onChange={handleInputChange}/>
                        <FieldInfo text="ex: R$ 55.000" />
                    </Label>
                    <Label className="w-[45%]">
                        <Input type="text" id="maxPrice" placeholder="até" value={maxPrice} onChange={handleInputChange}/>
                        <FieldInfo text="ex: R$ 55.000" />
                    </Label>
                </div>
            }
        </div>
    );
}