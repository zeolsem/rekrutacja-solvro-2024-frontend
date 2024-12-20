import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import {SearchBar} from "./SearchBar.tsx";

/**
 * NavBar is always shown on top of the site and allows to quickly move between sub-pages,
 * and has a search functionality.
 * @constructor
 */
const Navbar: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    // Change styles of the active subpage
    const linkClass = ({ isActive } : { isActive: boolean }) => {
        const baseClass = 'text-primary-50 text-xl font-bold rounded-md p-3';
        const activeClass = 'bg-primary-900';

        return isActive ? `${baseClass} ${activeClass}` : baseClass;
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <nav className='bg-gradient-to-tl to-secondary-800 from-primary-600 flex-col p-3 border-b border-black'>
            {isMobile ? (
                // Mobile
                <div className='flex justify-center items-center'>
                    <div className='flex p-4 items-center'>
                        <NavLink to='/' className={linkClass}>Home</NavLink>
                        <NavLink to='/cocktails/1' className={linkClass}>Cocktails</NavLink>
                    </div>
                </div>
            ) : (
                // Desktop
                <div className='grid grid-cols-5 mx-auto items-center'>
                    {/* Featured sub-pages */}
                    <div className='col-span-1 flex justify-center p-4'>
                        <NavLink to='/' className={linkClass}>Home</NavLink>
                        <NavLink to='/cocktails/1' className={linkClass}>Cocktails</NavLink>
                    </div>
                    {/* Title */}
                    <div className='col-span-3 p-2 text-center'>
                        <h1 className='text-5xl font-bold text-primary-100'>Bar Assistant</h1>
                    </div>
                    {/* Search field */}
                    <SearchBar />
                </div>
            )}
        </nav>
    );
}

export default Navbar;