
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
import FieldInfo from "../FieldInfo/FieldInfo";
import { useEffect, useState } from "react";

type Props = {
    field: string;
    handleSelectFilter: (field: string, val: string) => void;
}

export default function FilterText( {field, handleSelectFilter}: Props ) {
    const [year1, setYear1] = useState<string>();
    const [year2, setYear2] = useState<string>();
    const maxYear = new Date().getFullYear() + 1;
    const handleInputChange = () => {
        // setLoading(false);
    };
    useEffect(() => {
        handleSelectFilter('ano', year1)
        console.log("ta entrando aqui: ", year1);
    }, [setYear1, setYear2]);
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
                        <Select>
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
                        <Input type="text" id="min"  placeholder="de" onChange={handleInputChange}/>
                        <FieldInfo text="ex: 55.000 km" />
                    </Label>
                    <Label className="w-[45%]">
                        <Input type="text" id="max" placeholder="até" onChange={handleInputChange}/>
                        <FieldInfo text="ex: 55.000 km" />
                    </Label>
                </div>
            }
            {field === 'preco' &&
                <div className="flex justify-between">
                    <Label className="w-[45%]">
                        <Input type="text" id="min"  placeholder="de" onChange={handleInputChange}/>
                        <FieldInfo text="ex: R$ 55.000" />
                    </Label>
                    <Label className="w-[45%]">
                        <Input type="text" id="max" placeholder="até" onChange={handleInputChange}/>
                        <FieldInfo text="ex: R$ 55.000" />
                    </Label>
                </div>
            }
            
            {/* <Button className="" type="submit"><FaChevronRight /></Button> */}
        </div>
        
    );
}