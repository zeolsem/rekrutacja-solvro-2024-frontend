import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
    const linkClass = ({ isActive } : { isActive: boolean }) => {
        const baseClass = 'text-primary-50 text-xl font-bold rounded-md p-3 hover:primary-900';
        const activeClass = 'bg-black';

        return isActive ? `${baseClass} ${activeClass}` : baseClass;
    }

    return (
        <nav className='bg-primary-300 border-b border-black'>
            <div className='p-4 m-4 flex items-center justify-between'>
                <h1>test</h1>
                <NavLink to='/' className={linkClass}>Home</NavLink>
                <NavLink to='/' className={linkClass}>Cocktail List</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;