import {useQuery} from "@tanstack/react-query";
import {cocktailsPageQuery} from "../api/queries.tsx";
import {Cocktail} from "../api/cocktailsAPI.tsx";
import {useEffect, useState} from "react";
import {queryClient} from "../main.tsx";

/**
 * This page shows paginated view of cocktail Cards.
 * @constructor
 */
const CocktailsPage = () => {
    const [page, setPage] = useState(1);
    const { status, data: response, error, isFetching, isPlaceholderData } = useQuery(cocktailsPageQuery(page));

    useEffect(() => {
       if (!isPlaceholderData && response?.hasMore) {
           queryClient.prefetchQuery({
               queryKey: ['cocktails', page + 1],
               queryFn: async () => cocktailsPageQuery(page + 1),
           })
       }
    }, [response, isPlaceholderData, page]);

    if (status === 'pending') {
        return <div>Loading...</div>;
    }
    else if (status === 'error') {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className='text-primary-50 font-semibold'>
            <div>
                {response.data.length === 0 ? (
                    <i className='text-center'>No cocktails matching the query.</i>
                ) : (
                    response.data.map((cocktail: Cocktail) => (
                        <div key={cocktail.id}>{cocktail.name}</div>
                    ))
                )}
            </div>
            <div>Current Page: {page}</div>
            <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className='m-3 p-3 bg-primary-800 rounded-md '
            >
                Previous Page
            </button>
            <button
                onClick={() => setPage((old) => (page != response?.meta.lastPage) ? old + 1 : old)}
                disabled={isPlaceholderData || page === response?.meta.lastPage}
                className='m-3 p-3 bg-primary-800 rounded-md '
            >
                Next Page
            </button>
            {
                isFetching ? <span> Loading...</span> : <></>
            }
        </div>
    )
}

export default CocktailsPage;