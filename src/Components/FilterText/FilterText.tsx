import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FaChevronRight } from "react-icons/fa";

import { Button } from "@/Components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { Label } from "../ui/label";
import { useState } from "react";

//
const schema = z.object({
    min: z.coerce.number().min(1900),
    max: z.coerce.number().max(new Date().getFullYear()+1),
  })
  type FormProps = z.infer<typeof schema>;

export default function FilterText() {
        
        const { handleSubmit, register, formState: { errors} } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});

        const handleForm = async (data: FormProps) => {
            console.log(data);
        }
        const handleInputChange = () => {
            // setLoading(false);
        };
    
    return (
        
        <form onSubmit={handleSubmit(handleForm)} className="space-y-8 flex">
            <Label>
                <Input type="number" id="min"  {...register('min')} placeholder="de" onChange={handleInputChange}/>
                {errors.min && (
                    <div>{errors.min?.message}</div>
                )}
            </Label>
            <Label>
                <Input type="number" id="max"  {...register('max')} placeholder="até" onChange={handleInputChange}/>
                {errors.max && (
                    <div>{errors.max?.message}</div>
                )}
            </Label>
            <Button type="submit"><FaChevronRight /></Button>
        </form>
        
    );
}