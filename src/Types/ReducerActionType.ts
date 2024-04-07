import { FavoriteType } from "@/reducers/favoriteReducer";

export type favoriteReducerActionType =
    | { type: 'ADD_FAVORITE', payload: FavoriteType }
    | { type: 'REMOVE_FAVORITE', payload: string };