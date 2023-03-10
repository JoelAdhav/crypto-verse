import React from 'react';
import { Outlet } from 'react-router-dom';
import CryptoTable from '../components/CryptoTable';
import Filter from '../components/Filter';

const Crypto = () => {
    return (
        <section className='w-[80%] h-full flex flex-col lg:mt-16 mt-8 mb-24 relative'>
            <Filter />
            <CryptoTable />
            <Outlet />
        </section>
    );
};

export default Crypto;
