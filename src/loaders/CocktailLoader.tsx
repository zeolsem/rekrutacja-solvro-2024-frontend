import {cocktailsPageQuery} from "../api/queries.tsx";
import {LoaderFunction} from "react-router-dom";
import {queryClient} from "../main.tsx";

export const CocktailLoader: LoaderFunction =
    () =>
        async ({ params } : {params: {page: number}}) => {
            const query = cocktailsPageQuery(params.page);
            return (
                queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
            );
        }