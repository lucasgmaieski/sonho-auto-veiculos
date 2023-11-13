"use client"

import { createContext } from "react";

type ContextType = {
    favorites: number[] 
}
export const Context = createContext<ContextType>({
    favorites: []
});

export default function ContextProvider({children}: React.PropsWithChildren) {
    const favorites:number[] = [];

    return <Context.Provider value={{favorites}}>{children}</Context.Provider>
}
