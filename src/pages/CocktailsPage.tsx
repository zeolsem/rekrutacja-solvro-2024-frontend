import {useQuery} from "@tanstack/react-query";
import {cocktailsPageQuery} from "../api/queries.tsx";
import React, {useEffect} from "react";
import {queryClient} from "../main.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {CocktailsContainer} from "../components/CocktailsContainer.tsx";
import {FilterBar} from "../components/FilterBar.tsx";

/**
 * This page shows paginated view of cocktail Cards (no filters or search, a default query).
 * @constructor
 */
const CocktailsPage: React.FC = () => {
    const { page: pageParam } = useParams();
    const navigate = useNavigate();
    const page = Number(pageParam) || 1;

    const {status, error, isFetching, isPlaceholderData, data: response}  = useQuery(cocktailsPageQuery(page));

    // Prefetch next page
    useEffect(() => {
       if (!isPlaceholderData && response?.hasMore) {
           queryClient.prefetchQuery({
               queryKey: ['cocktails', page + 1],
               queryFn: async () => cocktailsPageQuery(page + 1),
           })
       }
    }, [response, isPlaceholderData, page]);

    const onPrevious = () => navigate(`/cocktails/${Math.max(page - 1, 1)}`);
    const onNext = () => {
        if (response?.meta.lastPage) {
            navigate(`/cocktails/${page < response.meta.lastPage ? page + 1 : page}`);
        }
    }

    return (
        <>
            <FilterBar />
            <CocktailsContainer response={response} status={status} error={error} isFetching={isFetching} isPlaceholderData={isPlaceholderData} pageNumber={page} onNext={onNext} onPrevious={onPrevious} />
        </>
    );
}

export default CocktailsPage;