'use client'
import { createContext, useState } from "react";

type ContextType = {
    favorites: number[] 
    urlParams: string;
    changeUrlParams: (newParams:string) => void
}
export const Context = createContext<ContextType>({
    favorites: [],
    urlParams: '',
    changeUrlParams: (newParams: string) => {}
});

export default function ContextProvider({children}: React.PropsWithChildren) {
    const favorites:number[] = [];
    const [urlParams, setUrlParams] = useState('');
    const changeUrlParams = (newParams: string) => {
        setUrlParams(newParams)
    }
    return <Context.Provider value={{favorites, urlParams, changeUrlParams}}>{children}</Context.Provider>
}
