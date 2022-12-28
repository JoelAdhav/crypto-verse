import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import { CryptoProvider } from '../context/CryptoContext';
import { StorageProvider } from '../context/StorageContext';
import { TrendingProvider } from '../context/TrendingContext';

const Home = () => {
    return (
        <CryptoProvider>
            <TrendingProvider>
                <StorageProvider>
                    <main
                        className='w-full h-full first-letter flex flex-col content-center items-center 
        font-nunito text-white relative'
                    >
                        <div className='w-screen h-screen bg-gray-300 fixed -z-10' />
                        <Logo />
                        <Navbar />
                        <Outlet />
                    </main>
                </StorageProvider>
            </TrendingProvider>
        </CryptoProvider>
    );
};

export default Home;
