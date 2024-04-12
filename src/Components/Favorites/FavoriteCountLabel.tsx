
import { Context } from "@/Contexts/Context";
import { useContext } from "react";

export default function FavoriteCountLabel() {
    const { favorites } = useContext(Context);

    return (
        <>
            {favorites.length > 0 &&
                <span className={`${favorites.length > 0 ? 'inline' : 'hidden'} absolute top-1 -right-2 dark:bg-slate-600 bg-slate-300 w-4 h-4 text-xs rounded-full`}>{favorites.length}</span>
            }
        </>
    );
}