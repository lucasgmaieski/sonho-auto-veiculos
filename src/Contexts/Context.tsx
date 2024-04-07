'use client'
import { favoriteReducerActionType } from "@/Types/ReducerActionType";
import { FavoriteType, favoriteReducer } from "@/reducers/favoriteReducer";
import { createContext, useEffect, useReducer, useState } from "react";


type ContextType = {
    favorites: FavoriteType[] 
    urlParams: string;
    changeUrlParams: (newParams:string) => void;
    openFilter: boolean;
    toggleFilter: (param: boolean) => void;
    dispatch: React.Dispatch<favoriteReducerActionType>
}
export const Context = createContext<ContextType>({
    favorites: [],
    urlParams: '',
    changeUrlParams: (newParams: string) => {},
    openFilter: true,
    toggleFilter: (param?: boolean) => {},
    dispatch: () => {}
});

export default function ContextProvider({children}: React.PropsWithChildren) {
    const [favorites, dispatch] = useReducer(favoriteReducer, [], () => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const [urlParams, setUrlParams] = useState('');
    const [openFilter, setOpenFilter] = useState<boolean>(true);
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
    return <Context.Provider value={{favorites, urlParams, changeUrlParams, openFilter, toggleFilter, dispatch}}>{children}</Context.Provider>
}
