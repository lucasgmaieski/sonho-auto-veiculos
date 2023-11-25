"use client"
import { Checkbox } from "@/Components/ui/checkbox"
import { VehicleType } from "@/Types/VehicleType";
import SliderCard from "../SliderCard/SliderCard"
import { getUrl } from "@/lib/utils";
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { MenuTypes } from "@/Types/MenuType";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


interface ContagemPorCampo {
    [campo: string]: {
    [valor: string]: number;
    };
}
interface FilterField {
    chave: string;
    valor: boolean;
}
interface Item {
    chave: string;
    valor: boolean;
  }
type Props = {
    vehiclesFilter: ContagemPorCampo | undefined;
    marcaFilter: MenuTypes;
}

export function useQueryParams<T = {}>() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );
  
    function setQueryParams(params: Partial<T>) {
      Object.entries(params).forEach(([key, value]) => {
        urlSearchParams.set(key, String(value));
      });
  
      const search = urlSearchParams.toString();
      const query = search ? `?${search}` : "";
  
      router.push(`${pathname}${query}`);
    }
  
    return { urlSearchParams, setQueryParams };
  }
export default function AsideFilters({vehiclesFilter, marcaFilter}: Props) {
    const [activeSheetAll, setActiveSheetAll] = useState(false);
    const [contentSheetAll, setContentSheetAll] = useState<[string, number][]>();
    const [selected, setSelected] = useState<FilterField[]>([]);
    const { urlSearchParams, setQueryParams } = useQueryParams();


    const [meuEstado, setMeuEstado] = useState<Item[]>([]);
    // Função para adicionar um novo item ao estado
    const adicionarItem = (chave: string, valor: boolean) => {
        const novoItem: Item = { chave, valor };
        setMeuEstado([...meuEstado, novoItem]);
    };
    // Função para alterar o valor de um item com base na chave
    const alterarValor = (chave: string, novoValor: boolean) => {
        const novoEstado = meuEstado.map(item => {
        if (item.chave === chave) {
            return { ...item, valor: novoValor };
        }
        return item;
        });

        setMeuEstado(novoEstado);
    };
    const obterItemPorChave = (chave: string): Item | undefined => {
        return meuEstado.find(item => item.chave === chave);
    };
    // Exemplo de uso
    


    // const urlFilterParams = useSearchParams()
    const handleSheetAll = (filter: [string, number][]) => {
        setActiveSheetAll(true);
        setContentSheetAll(filter);
    }
    useEffect(()=> {

        const parametros = urlSearchParams;
        // const parametros = useRouter().query;
        parametros.forEach((value, key) => {
            console.log("valor: "+value+"-key: "+ key);
          });
          
    })

    const handleSelectFilter = (val: string) => {
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
                                {/* <Checkbox  id={valor} checked={(urlSearchParams.get(campo) ?? "") === valor ? true : false} onClick={handleSelectFilter}/> */}
                                <Checkbox  id={valor} checked={(meuEstado.find(item => item.chave === "2020")?.valor)} onCheckedChange={()=>handleSelectFilter(valor)}/>
                                <label htmlFor={valor}>
                                {`${valor}: ${contagem}`}
                                </label>
                            </div>
                        ))}
                        <div className="cursor-pointer w-fit self-end" onClick={()=>handleSheetAll(Object.entries(vehiclesFilter[campo]))}>Ver todos</div>
                    </div>
                ))}
                <div className={`${activeSheetAll ? 'translate-x-0' : '-translate-x-96'} absolute top-0 dark:bg-slate-800 bg-slate-100 w-full h-full transition-transform tr duration-500`}>
                    <button onClick={()=>setActiveSheetAll(false)}><MdOutlineKeyboardBackspace className="w-[32px] h-[32px]"/></button>
                    <div>
                    {contentSheetAll?.map(([valor, contagem]) => (
                        <div key={valor}>
                            <Checkbox id={valor}/>
                            <input type="checkbox" name={valor} id={valor} />
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