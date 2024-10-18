import axios, {AxiosResponse} from "axios";

const cocktailsAPI = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

type Cocktail = {
    id: number,
    name: string,
    instructions: string,
    alcoholic: boolean,
    category: string,
    glass: string,
    createdAt: string,
    updatedAt: string,
}

export const fetchCocktails  = async (): Promise<Cocktail[]> => {
    const response: AxiosResponse = await cocktailsAPI.get('/cocktails');
    return response.data;
}

