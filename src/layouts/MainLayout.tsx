import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import React from "react";

/**
 * Layout that encapsulates every other component. It passes some styles and features the navigation bar.
 * @constructor
 */
const MainLayout: React.FC = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-grow bg-gradient-to-br bg-no-repeat bg-cover from-primary-300 to-background-300'>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
