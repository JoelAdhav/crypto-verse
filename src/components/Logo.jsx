import React from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

const Logo = () => {
    return (
        <div>
            <Link
                to='/'
                className='mt-10 [text-decoration:none] text-lg text-gray-100 
                flex flex-row items-center'
            >
                <img src={logoSvg} className='h-10 w-10' alt='' />
                <span>Crypto-Verse</span>
            </Link>
        </div>
    );
};

export default Logo;
