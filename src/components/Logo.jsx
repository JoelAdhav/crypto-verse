import React from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

const Logo = () => {
    return (
        <div>
            <Link
                to='/'
                className='absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-cyan 
                flex flex-row items-center'
            >
                <img src={logoSvg} className='h-10 w-10' alt='' />
                <span>Crypto-Verse</span>
            </Link>
        </div>
    );
};

export default Logo;
