import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

/**
 *  This allows to search for cocktails by name (supports like - partial matches)
 */
export const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/cocktails/search/${query}/1`);
    };

    return (
        <form onSubmit={handleSubmit} className='col-span-1 flex items-center justify-center p-4'>
            <h1 className='mx-3 font-bold text-xl text-primary-50'>Search cocktails:</h1>
            <input
                type='search'
                className='p-1 mr-24 rounded-md border-primary-800 border-2'
                defaultValue=''
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}