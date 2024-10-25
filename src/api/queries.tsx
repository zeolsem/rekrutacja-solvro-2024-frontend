import {
    fetchAllCocktails,
    fetchCocktail, fetchCocktailsByCategory,
    fetchCocktailsByName,
    fetchCocktailsPage,
    fetchFavoriteCocktails
} from './cocktailsAPI.tsx';
import {keepPreviousData} from "@tanstack/react-query";

export const cocktailsQuery = () => ({
    queryKey: ['cocktails'],
    queryFn: async () => fetchAllCocktails(),
});

export const cocktailsPageQuery = (page: number) => ({
    queryKey: ['cocktails', page],
    queryFn: async () => fetchCocktailsPage({page}),
    placeholderData: keepPreviousData,
    staleTime: 3600,
})

export const cocktailQuery = (id: number) => ({
    queryKey: ['cocktails', id],
    queryFn: async () => fetchCocktail({id}),
})

export const favoritesQuery = (favorites: number[]) => ({
    queryKey: ['favorites', favorites],
    queryFn: async () => fetchFavoriteCocktails({favorites}),
    placeholderData: keepPreviousData,
    staleTime: 3600,
})

export const cocktailsNameQuery = (name: string, page: number) => ({
    queryKey: ['cocktails', name, page],
    queryFn: async () => fetchCocktailsByName({name, page}),
    placeholderData: keepPreviousData,
    staleTime: 3600,
})

export const cocktailsCategoryQuery = (filters: string, page: number) => ({
    queryKey: ['cocktails', filters, page],
    queryFn: async () => fetchCocktailsByCategory({filters, page}),
    placeholderData: keepPreviousData,
    staleTime: 3600,
})