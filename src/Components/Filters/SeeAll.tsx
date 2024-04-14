import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { ContentSeeAllItem, StatusFilterItem } from "./AsideFilters";
import { Checkbox } from "@/Components/ui/checkbox"
import Image from "next/image";

type Props = {
    activeSeeAll: boolean;
    setActiveSeeAll: React.Dispatch<React.SetStateAction<boolean>>;
    contentSeeAll: ContentSeeAllItem;
    statusFilterItens: StatusFilterItem[];
    handleSetFilterCheck: (field: string, val: string) => void;
}

export default function SeeAll({activeSeeAll, setActiveSeeAll, contentSeeAll, statusFilterItens, handleSetFilterCheck}: Props) {
    return (
        <div className={`${activeSeeAll ? 'translate-x-0' : '-translate-x-full'} absolute top-0 dark:bg-slate-800 bg-slate-100 w-full h-full p-3 pr-6 transition-transform duration-500 overflow-auto`}>
            <button type="button" onClick={()=>setActiveSeeAll(false)} aria-label="Fechar filtro"><MdOutlineKeyboardBackspace className="w-[32px] h-[32px]"/></button>
            <div>
                {contentSeeAll?.field !== 'marca' && contentSeeAll?.data.map(([valor, contagem]) => (
                    <div key={valor}>
                        <Checkbox aria-label="Checkbox" id={valor} checked={(statusFilterItens.find(item => item.key === valor )?.value)} onCheckedChange={()=>handleSetFilterCheck(contentSeeAll.field, valor)}/>
                        <label htmlFor={valor}>
                            {`${valor}: ${contagem}`}
                        </label>
                    </div>
                ))}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 sm:gap-y-4">
                {contentSeeAll?.field === 'marca' && contentSeeAll?.dataMarca.map((item, index) => (
                    <div key={index} className={`text-center border-blue-500 ${(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value) ? 'border' : ''}`}>
                        
                        <Checkbox aria-label="Checkbox" className="hidden" id={item.name} checked={(statusFilterItens.find(itemFilter => itemFilter.key === item.name )?.value)} onCheckedChange={()=>handleSetFilterCheck('marca',item.name)}/>
                        <label htmlFor={item.name}>
                            <Image 
                                src={item?.logoposts?.logo?.node?.mediaItemUrl}
                                width={75}
                                height={75}
                                alt={item?.name}
                                className='object-cover mx-auto'
                                sizes="75px"
                            />
                            {item?.name} <br />({item?.count ?? '0'})
                        </label>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}