import {Cocktail} from "../api/cocktailsAPI.tsx";
import React, {useState} from "react";
import CocktailPopup from "./CocktailPopup.tsx";

const CocktailCard: React.FC<{cocktail: Cocktail}> = ({cocktail}) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const hoverStyle = "hover:bg-gradient-to-br hover:cursor-pointer hover:from-primary-700 hover:to-brown_dark"

    const openPopup = () => {
        setPopupOpen(true);
    }

    const closePopup = () => {
        setPopupOpen(false);
    }

    return (
        <>
            <div onClick={openPopup}
                 className={`rounded-md p-4 shadow-md m-3 bg-gradient-to-tl bg-no-repeat bg-cover from-primary-500 to-background-400 ${hoverStyle}`}>
                <div className='flex items-start justify-between'>
                    <div className='m-3 w-36 h-36 overflow-hidden rounded-lg'>
                        <img
                            src={cocktail.imageUrl}
                            alt={cocktail.name}
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <div className='grid grid-cols-1 text-right max-w-72'>
                        <h1 className='text-2xl lg:text-3xl font-bold my-3'>{cocktail.name}</h1>
                        <h1 className='text-xl'>{cocktail.category}</h1>
                        <h1 className='text-xl'>{cocktail.alcoholic ? "Alcoholic" : "Non-alcoholic"}</h1>
                        <h1 className=''>Served in: {cocktail.glass}</h1>
                    </div>
                </div>
            </div>
            {popupOpen && <CocktailPopup onClose={closePopup} id={cocktail.id}/>}
        </>
    )
}

export default CocktailCard;