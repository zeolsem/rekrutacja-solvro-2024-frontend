import {fetchAllCocktails, fetchCocktail, fetchCocktailsPage} from './cocktailsAPI.tsx';
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