import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {cocktailsCategoryQuery} from "../api/queries.tsx";
import {queryClient} from "../main.tsx";
import {CocktailsContainer} from "../components/CocktailsContainer.tsx";
import {FilterBar} from "../components/FilterBar.tsx";

/**
 * This page is for displaying filtered cocktails queries
 * @constructor
 */
const CocktailsFilteredPage: React.FC = () => {
    const { query: queryString, page: pageParam } = useParams();
    const navigate = useNavigate();
    const page = Number(pageParam) || 1;

    const {status, error, isFetching, isPlaceholderData, data: response}  = useQuery(cocktailsCategoryQuery(queryString || '',  page));

    // Prefetch next page
    useEffect(() => {
        if (!isPlaceholderData && response?.hasMore) {
            queryClient.prefetchQuery({
                queryKey: ['cocktails', 'Cocktail', page + 1],
                queryFn: async () => cocktailsCategoryQuery(queryString || '' , page + 1),
            })
        }
    }, [response, queryString, isPlaceholderData, page]);

    const onPrevious = () => navigate(`/cocktails/filter/${queryString}/${Math.max(page - 1, 1)}`);
    const onNext = () => {
        if (response?.meta.lastPage) {
            navigate(`/cocktails/filter/${queryString}/${page < response.meta.lastPage ? page + 1 : page}`);
        }
    }

    if (status === 'pending') {
        return <div>Loading...</div>;
    }
    else if (status === 'error') {
        return <div>Error: {error.message}</div>
    }
    return (
        <>
            <FilterBar />
            <CocktailsContainer response={response} status={status} error={error} isFetching={isFetching} isPlaceholderData={isPlaceholderData} pageNumber={page} onPrevious={onPrevious} onNext={onNext} />
        </>
    );
}

export default CocktailsFilteredPage;
