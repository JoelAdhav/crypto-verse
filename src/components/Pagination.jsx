import React, { useRef, useContext } from 'react';
import paginationArrow from '../assets/pagination-arrow.svg';
import { CryptoContext } from '../context/CryptoContext';
import submitIcon from '../assets/submit-icon.svg';

const PerPage = () => {
    const inputRef = useRef(null);
    const { setPerPage } = useContext(CryptoContext);

    const handlePerPage = e => {
        e.preventDefault();
        let val = inputRef.current.value;
        if (val !== 0) {
            setPerPage(val);
            inputRef.current.value = val;
        }
    };

    return (
        <form
            className='relative mr-12 flex items-center font-nunito'
            onSubmit={handlePerPage}
        >
            <label
                className='flex justify-center items-center mr-2 font-bold'
                htmlFor='perpage'
            >
                per_page
            </label>
            <input
                ref={inputRef}
                type='number'
                min={1}
                max={250}
                placeholder='10'
                className='w-16 bg-gray-200 rounded pl-2 placeholder:text-gray-100 required outline-0
                        border border-transparent focus:border-cyan leading-4'
                name='perpage'
            />
            <button type='submit' className='ml-1 cursor-pointer'>
                <img src={submitIcon} className='w-full h-auto ' alt='submit' />
            </button>
        </form>
    );
};

const Pagination = () => {
    const { page, setPage, totalPages, perPage, CryptoData, cryptoData } =
        useContext(CryptoContext);

    const TotalNumber = Math.ceil(totalPages / perPage);

    const next = () => {
        if (page === TotalNumber) {
            return null;
        } else {
            setPage(page + 1);
        }
    };

    const prev = () => {
        if (page === 1) {
            return null;
        } else {
            setPage(page - 1);
        }
    };

    const multiStepNext = () => {
        if (page + 3 >= TotalNumber) {
            setPage(TotalNumber - 1);
        } else {
            setPage(page + 3);
        }
    };

    const multiStepPrev = () => {
        if (page - 3 <= 1) {
            setPage(TotalNumber + 1);
        } else {
            setPage(page - 2);
        }
    };

    if (cryptoData && cryptoData.length >= perPage) {
        return (
            <div className='flex items-center'>
                <PerPage />
                <ul className='flex items-center justify-end text-sm'>
                    <li className='flex items-center'>
                        <button
                            onClick={prev}
                            className='outline-0 hover:text-cyan w-8'
                        >
                            <img
                                className='w-full h-auto rotate-180'
                                src={paginationArrow}
                                alt='left'
                            />
                        </button>
                    </li>
                    {page + 1 === TotalNumber && page === TotalNumber ? (
                        <li>
                            <button
                                onClick={multiStepPrev}
                                className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center
                        justify-center text-lg'
                            >
                                ...
                            </button>
                        </li>
                    ) : null}

                    {page - 1 !== 0 ? (
                        <li>
                            <button
                                onClick={prev}
                                className='outline-0 bg-gray-200 mx-1.5  hover:text-cyan rounded-full w-8 h-8 flex items-center
                        justify-center'
                            >
                                {page - 1}
                            </button>
                        </li>
                    ) : null}
                    <li>
                        <button
                            disabled
                            className='outline-0 mx-1.5 bg-cyan text-gray-300 rounded-full w-8 h-8 flex items-center
                        justify-center'
                        >
                            {page}
                        </button>
                    </li>

                    {page + 1 !== TotalNumber && page !== TotalNumber ? (
                        <li>
                            <button
                                onClick={next}
                                className='outline-0 bg-gray-200 mx-1.5 hover:text-cyan rounded-full w-8 h-8 flex items-center
                        justify-center'
                            >
                                {page + 1}
                            </button>
                        </li>
                    ) : null}

                    {page + 1 !== TotalNumber && page !== TotalNumber ? (
                        <li>
                            <button
                                onClick={multiStepNext}
                                className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center
                        justify-center text-lg'
                            >
                                ...
                            </button>
                        </li>
                    ) : null}

                    {page !== TotalNumber ? (
                        <li>
                            <button
                                onClick={() => setPage(TotalNumber)}
                                className='outline-0 bg-gray-200 mx-1.5 hover:text-cyan rounded-full w-8 h-8 flex items-center
                        justify-center'
                            >
                                {TotalNumber}
                            </button>
                        </li>
                    ) : null}
                    <li>
                        <button
                            onClick={next}
                            className='outline-0 hover:text-cyan w-8'
                        >
                            <img
                                className='w-full h-auto'
                                src={paginationArrow}
                                alt='right'
                            />
                        </button>
                    </li>
                </ul>
            </div>
        );
    } else {
        return null;
    }
};

export default Pagination;
