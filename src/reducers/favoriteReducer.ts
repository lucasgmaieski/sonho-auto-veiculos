import { favoriteReducerActionType } from "@/Types/ReducerActionType";
import { VehicleCustomType } from "@/Types/VehicleCustomType";
export type FavoriteType = {
    title: string;
    slug: string;
}

export const favoriteReducer = (state: VehicleCustomType[], action: favoriteReducerActionType): VehicleCustomType[] => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            if (!state.some(favorite => favorite.slug === action.payload.slug)) {
                return [...state, action.payload];
            }
            return state;
        case 'REMOVE_FAVORITE':
            return state.filter((favorite) => favorite.slug !== action.payload);
        default:
            return state;
    }
};