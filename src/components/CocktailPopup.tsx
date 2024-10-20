import {useQuery} from "@tanstack/react-query";
import {cocktailQuery} from "../api/queries.tsx";
import React from "react";
import {CocktailDetailed} from "../api/cocktailsAPI.tsx";


const CocktailPopup: React.FC<{id:number}> = ({id}) => {
    const { status, data: response, error} = useQuery(cocktailQuery(id));

    if (status === 'pending') {
        return <div className='h-screen fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
            <h1 className='text-4xl text-center'>Loading...</h1>
        </div>;
    }
    else if (status === 'error') {
        return <div>Error: {error.message}</div>
    }

    const cocktail: CocktailDetailed = response.data;

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center'>
            <div className='p-5 bg-background-200 text-primary-700 rounded-lg max-w-[600px] max-h-[90vh] overflow-y-auto'>
                <div className='w-full overflow-hidden rounded-lg'>
                    <img
                        src={cocktail.imageUrl}
                        alt={cocktail.name}
                        className='w-full h-auto object-contain'
                    />
                </div>
                <h1 className="text-3xl font-bold text-center mb-1">{cocktail.name}</h1>
                <h1 className='text-center mb-1'>{cocktail.alcoholic ? <b>Alcoholic</b> : "Non-alcoholic"}</h1>
                <h1 className='text-center mb-1'>{cocktail.category}</h1>
                <br/>
                <h1><b>Recipe:</b> {cocktail.instructions}</h1>
                <br/>
                <div>
                    <h1 className='text-xl text-center font-bold'>Ingredients</h1>
                    {cocktail.ingredients.map(ingredient => (
                        <li className='mx-4' key={ingredient.id}>
                            <p className='text'><strong>{ingredient.name}</strong><span>{ingredient.measure === null && <i>{" "}Warn! This ingredient database entry is not correct, fields may be missing/wrong.</i>}</span></p>
                            {(ingredient.alcohol && ingredient.percentage) &&  <p>{ingredient.percentage}% alcohol</p>}
                            <p>{ingredient.measure}</p>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CocktailPopup;
