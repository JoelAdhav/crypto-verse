import { useState, createContext, useLayoutEffect } from 'react';

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
    const [cryptoData, setCryptoData] = useState();
    const [coinData, setCoinData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinSearch, setCoinSearch] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [sortBy, setSortBy] = useState('market_cap_desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(250);
    const [perPage, setPerPage] = useState(10);

    const getCryptoData = async () => {
        setCryptoData();
        setTotalPages(12896);
        // try {
        //     const data = await fetch(
        //         `https://api.coingecko.com/api/v3/coins/list`
        //     )
        //         .then(res => res.json())
        //         .then(json => json);
        //     console.log(data.length);
        //     setTotalPages(data.length);
        // } catch (error) {
        //     console.log(error);
        // }

        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
            )
                .then(res => res.json())
                .then(json => json);
            setCryptoData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSearchResult = async query => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${query}`
            )
                .then(res => res.json())
                .then(json => json);
            setSearchData(data.coins);
        } catch (error) {
            console.log(error);
        }
    };

    const getCoinData = async coinId => {
        setCoinData();
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
            )
                .then(res => res.json())
                .then(json => json);
            setCoinData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const reset = () => {
        setPage(1);
        setCoinSearch('');
        setPerPage(10);
    };

    useLayoutEffect(() => {
        getCryptoData();
    }, [coinSearch, currency, perPage, sortBy, page]);

    return (
        <CryptoContext.Provider
            value={{
                cryptoData,
                searchData,
                getSearchResult,
                setCoinSearch,
                setSearchData,
                currency,
                setCurrency,
                setSortBy,
                sortBy,
                page,
                setPage,
                totalPages,
                reset,
                setPerPage,
                perPage,
                getCoinData,
                coinData,
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
};
