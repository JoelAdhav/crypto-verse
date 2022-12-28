import { useEffect } from 'react';
import { useState, createContext, useLayoutEffect, useContext } from 'react';
import { CryptoContext } from './CryptoContext';

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
    const [allCoins, setAllCoins] = useState([]);
    const [savedData, setSavedData] = useState();
    const { currency, sortBy } = useContext(CryptoContext);

    const saveCoin = coinId => {
        let oldCoins = JSON.parse(localStorage.getItem('coins'));

        if (oldCoins.includes(coinId)) {
            return null;
        } else {
            let newCoin = [...oldCoins, coinId];
            setAllCoins(newCoin);
            localStorage.setItem('coins', JSON.stringify(newCoin));
        }
    };

    const removeCoin = coinId => {
        let oldCoins = JSON.parse(localStorage.getItem('coins'));

        let newCoin = oldCoins.filter(coin => coin !== coinId);
        setAllCoins(newCoin);
        localStorage.setItem('coins', JSON.stringify(newCoin));
    };

    const getSavedData = async (totalCoins = allCoins) => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
                    ','
                )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
            )
                .then(res => res.json())
                .then(json => json);

            setSavedData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const resetSavedData = () => {
        getSavedData();
    };

    useEffect(() => {
        if (allCoins.length > 0) {
            getSavedData();
        } else {
            setSavedData();
        }
    }, [allCoins]);

    useLayoutEffect(() => {
        let isStorage = JSON.parse(localStorage.getItem('coins')) || false;

        if (!isStorage) {
            localStorage.setItem('coins', JSON.stringify([]));
        } else {
            let coins = JSON.parse(localStorage.getItem('coins'));
            setAllCoins(coins);

            if (coins.length > 0) {
                getSavedData(coins);
            }
        }
    }, []);

    return (
        <StorageContext.Provider
            value={{
                saveCoin,
                allCoins,
                removeCoin,
                savedData,
                resetSavedData,
            }}
        >
            {children}
        </StorageContext.Provider>
    );
};
