import axios, {AxiosResponse} from "axios";

const cocktailsAPI = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export type Cocktail = {
    id: number,
    name: string,
    instructions: string,
    alcoholic: boolean,
    category: string,
    glass: string,
    createdAt: string,
    updatedAt: string,
}

export const fetchAllCocktails  = async (): Promise<Cocktail[]> => {
    const response: AxiosResponse = await cocktailsAPI.get('/cocktails');
    return response.data;
}

export const fetchCocktailsPage = async ({page}: {page: number}) => {
    const response: AxiosResponse = await cocktailsAPI.get(`/cocktails?page=${page}&perPage=12`);
    return response.data;
}
