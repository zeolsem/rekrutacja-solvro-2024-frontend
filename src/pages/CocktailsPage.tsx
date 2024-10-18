import {useQuery} from "@tanstack/react-query";
import {cocktailsPageQuery} from "../api/queries.tsx";
import {Cocktail} from "../api/cocktailsAPI.tsx";
import {useEffect} from "react";
import {queryClient} from "../main.tsx";
import CocktailCard from "../components/CocktailCard.tsx";
import {useNavigate, useParams} from "react-router-dom";

/**
 * This page shows paginated view of cocktail Cards.
 * @constructor
 */
const CocktailsPage = () => {
    const navigate = useNavigate();
    const { page: pageParam } = useParams();
    const page = Number(pageParam) || 1;
    const { status, data: response, error, isFetching, isPlaceholderData } = useQuery(cocktailsPageQuery(page));


    // Prefetch next page
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
        <div className='text-primary-50 flex flex-col items-center font-semibold'>
            {/* Cocktail cards grid*/}
            <div className='grid grid-cols-1 lg:grid-cols-3 container'>
                {response.data.length === 0 ? (
                    <i className='text-center'>No cocktails matching the query.</i>
                ) : (
                    response.data.map((cocktail: Cocktail) => (
                        <CocktailCard key={cocktail.id} cocktail={cocktail}/>
                    ))
                )}
            </div>
            {/*Cocktail pages navigation buttons*/}
            <div className='mx-auto flex flex-col justify-center items-center'>
                <h1
                    className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-background-600'
                >
                    Page {page}
                </h1>
                <div className='flex w-max whitespace-nowrap'>
                    <button
                        onClick={() => navigate(`/cocktails/${Math.max(page - 1, 1)}`)}
                        disabled={page === 1}
                        className='text-xl m-3 py-2 px-4 bg-primary-800 rounded-md w-full'
                    >
                        Previous Page
                    </button>
                    <button
                        onClick={() => {
                            if (response?.meta.lastPage) {
                                navigate(`/cocktails/${page < response.meta.lastPage ? page + 1 : page}`);
                        }}}
                        disabled={isPlaceholderData || page === response?.meta.lastPage}
                        className='text-xl m-3 py-2 px-4 bg-primary-800 rounded-md w-full'
                    >
                        Next Page
                    </button>
                </div>
            </div>
            {
                isFetching ? <span> Loading...</span> : <></>
            }
        </div>
    )
}

export default CocktailsPage;