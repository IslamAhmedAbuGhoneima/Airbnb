"use client";
import { apiPostFavorite } from "@/app/services/apiServices";
const FavoriteButton = ({ propertyId, isFavorite }) => {
    const handelFavoriteAction = async () => {
        return await apiPostFavorite(`http://127.0.0.1:8000/api/${propertyId}/add-to-favorite/`);
    }
    return (
        <button
            onClick={handelFavoriteAction}
        >
            <svg fill="rgb(229 231 235 / 75%)" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${isFavorite ? "red" : "white"}`} className="w-6 h-6 hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        </button>
    )
}

export default FavoriteButton;