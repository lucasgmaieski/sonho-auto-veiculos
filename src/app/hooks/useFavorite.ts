import { Context } from "@/Contexts/Context";
import { VehicleCustomType } from "@/Types/VehicleCustomType";
import { useContext, useEffect, useState } from "react";

export const useFavorite = () => {
    const { dispatch, favorites } = useContext(Context);

    function isInFavorite(slug: string): boolean {
        return favorites.some(favorite => favorite.slug === slug);
    }
    function addFavorite(vehicle: VehicleCustomType) {
        console.log("ta clicando no add favorito", vehicle)
        dispatch({ type: 'ADD_FAVORITE', payload: vehicle });
    }
    function removeFavorite(slug: string) {
        console.log("removendo favorito:", slug)
        dispatch({ type: 'REMOVE_FAVORITE', payload: slug });
    }

    return {
        isInFavorite,
        addFavorite,
        removeFavorite
    }
}