import React from "react";
import { NavLink } from "react-router-dom";

/**
 * NavBar is always shown on top of the site and allows to quickly move between sub-pages,
 * and has a search functionality.
 * @constructor
 */
const Navbar: React.FC = () => {
    // Change styles of the active subpage
    const linkClass = ({ isActive } : { isActive: boolean }) => {
        const baseClass = 'text-primary-50 text-xl font-bold rounded-md p-3';
        const activeClass = 'bg-black';

        return isActive ? `${baseClass} ${activeClass}` : baseClass;
    }

    return (
        <nav className='bg-primary-600 flex-col p-3 border-b border-black'>
            <div className= 'mx-auto flex justify-between'>
                {/* Featured sub-pages */}
                <div className='p-4 mx-auto flex flex-shrink-0 items-center'>
                    <NavLink to='/' className={linkClass}>Home</NavLink>
                    <NavLink to='/cocktails' className={linkClass}>Cocktail List</NavLink>
                </div>
                {/*Search field*/}
                <div className='mx-auto flex items-center justify-center'>
                    <h1 className='mx-3 font-bold text-xl text-primary-50'>Search cocktails:</h1>
                    <input type='search' className='p-1 rounded-md border-primary-800 border-2'/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;