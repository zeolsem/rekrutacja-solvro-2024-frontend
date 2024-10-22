import {FaStar} from "react-icons/fa6";
import React, {useContext, useEffect, useState} from "react";
import {FavoritesContext} from "../contexts/FavoritesContext.tsx";

export const FavoriteButton: React.FC<{cocktailId: number}> = ({cocktailId}) => {
    const favoritesContext = useContext(FavoritesContext);

    const [isFavorite, setIsFavorite] = useState(favoritesContext?.favorites.includes(cocktailId));

    useEffect(() => {
        setIsFavorite(favoritesContext?.favorites.includes(cocktailId));
    }, [favoritesContext?.favorites, cocktailId]);

    const onClick = () => {
        if (isFavorite) {
            favoritesContext?.removeFavorite(cocktailId);
        }
        else {
            favoritesContext?.addFavorite(cocktailId);
        }
    }

    return (
        <button
            onClick={onClick}
            className={`text-primary-50 bg-primary-900 p-2 rounded-lg text-3xl font-bold` + (isFavorite ? ' text-yellow-400' : '')}
        >
            {<FaStar/>}
        </button>
    )
}