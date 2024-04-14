"use client"
import { VehicleCustomType } from "@/Types/VehicleCustomType";
import { useFavorite } from "@/app/hooks/useFavorite";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
type Props = {
    vehicle: VehicleCustomType;
    extraClass: string
    children: React.ReactNode;
}
export default function FavoriteToggleButton({vehicle, extraClass, children}: Props) {
    const { addFavorite, isInFavorite, removeFavorite } = useFavorite();
    function toggleFavorite() {
        isInFavorite(vehicle.slug) ? removeFavorite(vehicle.slug) : addFavorite(vehicle);
    }
    return (
        <button aria-label="Favorito" type="button" onClick={toggleFavorite} className={`${extraClass} ${isInFavorite(vehicle.slug) ? 'bg-blue-600 text-white' : 'bg-transparent'}`}>
            {isInFavorite(vehicle.slug) ?
                <FaHeart className={`py-0.5 `}/>
                :
                <FaRegHeart className={`py-0.5 `}/>
            }
            {children}
        </button>
    );
}