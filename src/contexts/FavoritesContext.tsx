import React, { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export type FavoritesContextType = {
    favorites: number[];
    addFavorite: (favorite: number) => void;
    removeFavorite: (favorite: number) => void;
}

const getInitialFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoritesContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [favorites, setFavorites] = useState<number[]>(getInitialFavorites);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (cocktailId: number) => {
        setFavorites([...favorites, cocktailId]);
    }

    const removeFavorite = (cocktailId: number) => {
        setFavorites(favorites.filter(id => id !== cocktailId));
    }


    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}