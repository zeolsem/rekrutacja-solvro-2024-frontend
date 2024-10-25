import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {cocktailsNameQuery} from "../api/queries.tsx";
import {queryClient} from "../main.tsx";
import {CocktailsContainer} from "../components/CocktailsContainer.tsx";

/**
 * This page is for displaying search results for cocktails
 */
const CocktailsSearchPage: React.FC = () => {
    const { query: queryString, page: pageParam } = useParams();
    const navigate = useNavigate();
    const page = Number(pageParam) || 1;

    const {status, error, isFetching, isPlaceholderData, data: response}  = useQuery(cocktailsNameQuery(queryString ? queryString : '', page));

    // Prefetch next page
    useEffect(() => {
        if (!isPlaceholderData && response?.hasMore) {
            queryClient.prefetchQuery({
                queryKey: ['cocktails', queryString, page + 1],
                queryFn: async () => cocktailsNameQuery(queryString ? queryString : '', page + 1),
            })
        }
    }, [response, queryString, isPlaceholderData, page]);

    const onPrevious = () => navigate(`/cocktails/search/${queryString}/${Math.max(page - 1, 1)}`);
    const onNext = () => {
        if (response?.meta.lastPage) {
            navigate(`/cocktails/search/${queryString}/${page < response.meta.lastPage ? page + 1 : page}`);
        }
    }

    return (
        <CocktailsContainer response={response} status={status} error={error} isFetching={isFetching} isPlaceholderData={isPlaceholderData} pageNumber={page} onPrevious={onPrevious} onNext={onNext} />
    );
}

export default CocktailsSearchPage;
