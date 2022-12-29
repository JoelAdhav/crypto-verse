import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='lg:w-[40%] sm:w-[80%] w-[90%] mt-7 flex justify-around align-middle border border-solid border-blue rounded-md sm:rounded-lg'>
            <NavLink
                to='/'
                end
                className={({ isActive }) => {
                    return `w-full text-sm md:text-base text-center sm:my-auto font-nunito m-1.5 sm:m-2.5 
                    ${
                        isActive
                            ? 'bg-blue text-gray-300'
                            : 'bg-gray-200 text-gray-100 hover:text-blue active:bg-blue active:text-gray-300'
                    }
                 border-0 cursor-pointer rounded capitalize font-semibold`;
                }}
            >
                Crypto
            </NavLink>
            <NavLink
                to='/trending'
                className={({ isActive }) => {
                    return `w-full text-sm md:text-base text-center font-nunito m-1.5 sm:m-2.5 
                    ${
                        isActive
                            ? 'bg-blue text-gray-300'
                            : 'bg-gray-200 text-gray-100 hover:text-blue active:bg-blue active:text-gray-300'
                    }
                 border-0 cursor-pointer rounded capitalize
                 font-semibold`;
                }}
            >
                Trending
            </NavLink>
            <NavLink
                to='/saved'
                className={({ isActive }) => {
                    return `w-full text-sm md:text-base text-center font-nunito m-1.5 sm:m-2.5 
                    ${
                        isActive
                            ? 'bg-blue text-gray-300'
                            : 'bg-gray-200 text-gray-100 hover:text-blue active:bg-blue active:text-gray-300'
                    }
                 border-0 cursor-pointer rounded capitalize
                 font-semibold`;
                }}
            >
                Saved
            </NavLink>
        </nav>
    );
};

export default Navbar;
