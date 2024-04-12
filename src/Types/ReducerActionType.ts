import { FavoriteType } from "@/reducers/favoriteReducer";
import { VehicleCustomType } from "./VehicleCustomType";

export type favoriteReducerActionType =
    | { type: 'ADD_FAVORITE', payload: VehicleCustomType }
    | { type: 'REMOVE_FAVORITE', payload: string };