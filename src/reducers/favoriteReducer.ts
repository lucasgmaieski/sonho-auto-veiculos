import { favoriteReducerActionType } from "@/Types/ReducerActionType";
export type FavoriteType = {
    title: string;
    slug: string;
}

export const favoriteReducer = (state: FavoriteType[], action: favoriteReducerActionType): FavoriteType[] => {
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