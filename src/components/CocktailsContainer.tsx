import {Cocktail} from "../api/cocktailsAPI.tsx";
import CocktailCard from "./CocktailCard.tsx";
import React from "react";

type CocktailsContainerProps = {
    response: any,
    status: "error" | "pending" | "success",
    error: Error | null,
    isFetching: boolean,
    isPlaceholderData: boolean,
    pageNumber: number,
    onPrevious?: () => void,
    onNext?: () => void
}

/**
 * This component displays a grid of cocktails cards on every page that has them,
 * except for favorites on HomePage.
 */
export const CocktailsContainer: React.FC<CocktailsContainerProps> = ({response, status, error, isFetching, isPlaceholderData, pageNumber, onPrevious, onNext}) => {
    const cocktails: Cocktail[] = response?.data || [];

    if (status === 'pending') {
        return <div>Loading...</div>;
    }
    else if (status === 'error') {
        if (error) {
            return <div>Error: {error.message}</div>
        }
        else {
            return <div>Error: Unknown error</div>
        }
    }

    return (
        <div className='text-primary-50 flex flex-col items-center font-semibold'>
            {/* Cocktail cards grid*/}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container'>
                {cocktails.length === 0 ? (
                    <div className='text-center justify-center items-center text-2xl col-span-full'>No cocktails matching the query :(</div>
                ) : (
                    cocktails.map((cocktail: Cocktail) => (
                        <CocktailCard key={cocktail.id} cocktail={cocktail}/>
                    ))
                )}
            </div>
            {/*Cocktail pages navigation buttons*/}
            <div className='mx-auto flex flex-col justify-center items-center'>
                <h1
                    className='text-3xl font-extrabold text-secondary-800'
                >
                    Page {pageNumber}
                </h1>
                <div className='grid grid-cols-10 whitespace-nowrap'>
                    <button
                        onClick={onPrevious}
                        disabled={pageNumber === 1}
                        className={`text-xl m-3 py-2 px-4 bg-primary-800 rounded-md col-span-5 col-start-1 lg:col-span-2 lg:col-start-4 disabled:bg-disabled`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={onNext}
                        disabled={isPlaceholderData || pageNumber === response?.meta.lastPage}
                        className='text-xl m-3 py-2 px-4 bg-primary-800 rounded-md col-span-5 col-start-6 lg:col-span-2 lg:col-start-6 disabled:bg-disabled'
                    >
                        Next
                    </button>
                </div>
            </div>
            {
                isFetching ? <span> Loading...</span> : <></>
            }
        </div>
    )
}