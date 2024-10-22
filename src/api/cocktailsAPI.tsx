import axios, {AxiosResponse} from "axios";

const cocktailsAPI = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export interface Cocktail {
    id: number,
    name: string,
    category: string,
    instructions: string,
    imageUrl: string,
    alcoholic: boolean,
    glass: string,
    createdAt: string,
    updatedAt: string,
}

export interface CocktailDetailed extends Cocktail {
    ingredients: Ingredient[]
}

export type Ingredient = {
    id: number,
    name: string,
    description: string,
    alcohol: boolean,
    type: string,
    percentage: number | null,
    measure: string,
}

export const fetchAllCocktails  = async (): Promise<Cocktail[]> => {
    const response: AxiosResponse = await cocktailsAPI.get('/cocktails');
    return response.data;
}

export const fetchCocktailsPage = async ({page}: {page: number}) => {
    const response: AxiosResponse = await cocktailsAPI.get(`/cocktails?page=${page}&perPage=12`);
    return response.data;
}

export const fetchCocktail = async ({id} : {id: number}) => {
    const response: AxiosResponse = await cocktailsAPI.get(`/cocktails/${id}`);
    return response.data;
}

export const fetchFavoriteCocktails = async ({favorites}: {favorites: number[]}) => {
    const url_string = 'cocktails?' + favorites.map(favorite => `id[]=${favorite}`).join('&');
    const response: AxiosResponse = await cocktailsAPI.get(url_string);
    return response.data;
}