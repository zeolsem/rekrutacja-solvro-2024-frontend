import CocktailCard from "./CocktailCard.tsx";
import {useContext, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {favoritesQuery} from "../api/queries.tsx";
import {FavoritesContext} from "../contexts/FavoritesContext.tsx";
import {Cocktail} from "../api/cocktailsAPI.tsx";

export const FavoritesContainer = () => {
    const favoritesContext = useContext(FavoritesContext);
    const favoriteIds = favoritesContext?.favorites;
    const { status, data: favorites, error} = useQuery(favoritesQuery((favoriteIds ? favoriteIds : [])));

    useEffect(() => {
        console.log(favorites);
    }, [favorites]);

    if (status === 'pending') {
        return <div className='h-screen fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
            <h1 className='text-4xl text-center'>Loading...</h1>
        </div>;
    }
    else if (status === 'error') {
        return <div>Error: {error.message}</div>
    }
    return (
        <div
            className='flex flex-col text-center bg-gradient-to-tl from-background-400 to-primary_350 rounded-3xl p-4'
        >
            <h1 className='text-4xl font-semibold text-primary-900 mb-4'>Your favorite cocktails</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3'>
                {favorites.data.map((cocktail: Cocktail) => (
                    <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))}
            </div>
        </div>
    )
}