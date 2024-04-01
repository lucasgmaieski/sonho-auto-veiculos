'use client'
import { createContext, useState } from "react";

type ContextType = {
    favorites: number[] 
    urlParams: string;
    changeUrlParams: (newParams:string) => void;
    openFilter: boolean;
    toggleFilter: (param: boolean) => void
}
export const Context = createContext<ContextType>({
    favorites: [],
    urlParams: '',
    changeUrlParams: (newParams: string) => {},
    openFilter: true,
    toggleFilter: (param?: boolean) => {},
});

export default function ContextProvider({children}: React.PropsWithChildren) {
    const favorites:number[] = [];
    const [urlParams, setUrlParams] = useState('');
    const [openFilter, setOpenFilter] = useState<boolean>();
    const changeUrlParams = (newParams: string) => {
        setUrlParams(newParams)
    }
    const toggleFilter = (param) => {
        if(param === false) {
            document.body.classList.remove('sm:overflow-auto');
            document.body.classList.remove('overflow-hidden');
            setOpenFilter(false);
        } else {
            document.body.classList.toggle('sm:overflow-auto');
            document.body.classList.toggle('overflow-hidden');
            setOpenFilter(prevOpenFilter => !prevOpenFilter);
        }
    }
    return <Context.Provider value={{favorites, urlParams, changeUrlParams, openFilter, toggleFilter}}>{children}</Context.Provider>
}
