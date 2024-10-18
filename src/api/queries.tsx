import {fetchCocktails} from './cocktailsAPI.tsx';

export const cocktailsQuery = () => ({
    queryKey: ['cocktails'],
    queryFn: async () => fetchCocktails(),
});
