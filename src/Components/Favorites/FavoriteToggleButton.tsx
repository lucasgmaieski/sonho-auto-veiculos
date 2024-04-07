
import { useFavorite } from "@/app/hooks/useFavorite";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export function FavoriteToggleButton({slug, title}: {slug: string, title: string}) {
    const { addFavorite, isInFavorite, removeFavorite } = useFavorite();
    function toggleFavorite() {
        isInFavorite(slug) ? removeFavorite : addFavorite(slug, title);
    }
    return (
        <button type="button" onClick={toggleFavorite}>
            {isInFavorite(slug) ?
                <FaHeart />
                :
                <FaRegHeart />
            }
        </button>
    );
}