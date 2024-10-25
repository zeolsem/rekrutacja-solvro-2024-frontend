import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Category =
    | 'Cocktail'
    | 'Ordinary Drink'
    | 'Punch / Party Drink'
    | 'Shake'
    | 'Other / Unknown'
    | 'Cocoa'
    | 'Shot'
    | 'Coffee / Tea'
    | 'Homemade Liqueur'
    | 'Soft Drink';

const categoryOptions: Record<Category, string> = {
    'Cocktail': 'Cocktail',
    'Ordinary Drink': 'Ordinary Drink',
    'Punch / Party Drink': 'Punch / Party Drink',
    'Shake': 'Shake',
    'Other / Unknown': 'Other / Unknown',
    'Cocoa': 'Cocoa',
    'Shot': 'Shot',
    'Coffee / Tea': 'Coffee / Tea',
    'Homemade Liqueur': 'Homemade Liqueur',
    'Soft Drink': 'Soft Drink',
};

/**
 * This component is used to filter cocktails by category and alcoholic content.
 * @constructor
 */
export const FilterBar: React.FC = () => {
    const [isAlcoholic, setIsAlcoholic] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleAlcoholicChange = (value: string) => {
        setIsAlcoholic(value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleFilter = () => {
        const filterString = `/cocktails/filter/category=${encodeURIComponent(category)}` +
            (isAlcoholic.length != 0 ? `&alcoholic=${isAlcoholic}` : '') + `/1`;
        navigate(filterString);
    };

    return (
        <div className='flex font-semibold text-primary-50 bg-background-700 justify-center gap-4 py-1 px-4 flex-wrap'>
            <div className='flex gap-1 items-center'>
                <button
                    className={`px-3 rounded-md ${isAlcoholic === 'true' ? 'bg-primary-300 text-background-800' : 'bg-gray-500 text-white'}`}
                    onClick={() => handleAlcoholicChange('true')}
                >
                    Alco
                </button>
                <button
                    className={`px-3 rounded-md ${isAlcoholic === 'false' ? 'bg-primary-300 text-background-800' : 'bg-gray-500 text-white'}`}
                    onClick={() => handleAlcoholicChange('false')}
                >
                    Non-Alco
                </button>
            </div>
            <select className='bg-background-500 rounded-md p-2' value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {Object.entries(categoryOptions).map(([key]) => (
                    <option key={key} value={key}>{categoryOptions[key as Category]}</option>
                ))}
            </select>
            <button className='bg-primary-300 px-3 rounded-md text-background-800' onClick={handleFilter}>Filter
            </button>
            <button
                className={`px-3 rounded-md bg-gray-300 text-background-900`}
                onClick={() => {
                    setIsAlcoholic('');
                    setCategory('');
                }}
            >
                Clear filters
            </button>
        </div>
    );
};
