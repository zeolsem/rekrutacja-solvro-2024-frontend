import React from "react";
import {Link} from "react-router-dom";
import {Hero} from "../components/Hero.tsx";
import {FavoritesContainer} from "../components/FavoritesContainer.tsx";

const HomePage: React.FC = () => {


    return (
        <div className='flex flex-col items-center justify-center'>
            <Hero />
            <FavoritesContainer />
            <Link
                to='/cocktails/1'
                className='text-primary-200 mb-4 text-3xl font-semibold bg-gradient-to-br from-primary-600 to-background-400 px-3 py-2 rounded-lg mt-4'
            >
                To cocktails search and view
            </Link>
        </div>
    )
}

export default HomePage;