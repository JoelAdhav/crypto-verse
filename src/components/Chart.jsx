import React, { useLayoutEffect, useState } from 'react';
import { useContext } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { CryptoContext } from '../context/CryptoContext';

function CustomTooltip({ payload, label, active, currency }) {
    if (active) {
        return (
            <div className='custom-tooltip'>
                <p className='label text-sm text-blue'>{`${label} : ${new Intl.NumberFormat(
                    'en-IN',
                    {
                        style: 'currency',
                        currency: currency,
                        minimumFractionDigits: 5,
                    }
                ).format(payload[0].value)}`}</p>
            </div>
        );
    }
}
const ChartComponent = ({ data, currency, type }) => {
    return (
        <ResponsiveContainer height='90%'>
            <LineChart width={400} height={400} data={data}>
                <Line
                    type='monotone'
                    dataKey={type}
                    stroke='#1d9bf0'
                    strokeWidth={'1px'}
                />
                <CartesianGrid stroke='#323232' />
                <XAxis dataKey='date' hide />
                <YAxis dataKey={type} hide domain={['auto', 'auto']} />
                <Tooltip
                    content={<CustomTooltip />}
                    currency={currency}
                    cursor={false}
                    wrapperStyle={{ outline: 'none' }}
                />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    );
};

const Chart = ({ id }) => {
    const [chartData, setChartData] = useState();
    const [type, setType] = useState('prices');
    const [days, setDays] = useState(7);
    const { currency } = useContext(CryptoContext);

    useLayoutEffect(() => {
        const getChartData = async id => {
            try {
                const data = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
                )
                    .then(res => res.json())
                    .then(json => json);

                let convertedData = data[type].map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1],
                    };
                });

                setChartData(convertedData);
            } catch (error) {
                console.log(error);
            }
        };

        getChartData(id);
    }, [id, type, days]);

    return (
        <div className='w-full h-[60%]'>
            <ChartComponent data={chartData} currency={currency} type={type} />
            <div className='flex flex-wrap'>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        type === 'prices'
                            ? 'bg-blue text-blue'
                            : 'bg-gray-200 text-gray-100'
                    }`}
                    onClick={() => setType('prices')}
                >
                    Price
                </button>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        type === 'market_caps'
                            ? 'bg-blue text-blue'
                            : 'bg-gray-200 text-gray-100'
                    }`}
                    onClick={() => setType('market_caps')}
                >
                    Market Cap
                </button>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        type === 'total_volumes'
                            ? 'bg-blue text-blue'
                            : 'bg-gray-200 text-gray-100'
                    }`}
                    onClick={() => setType('total_volumes')}
                >
                    Total volumes
                </button>
                <div>
                    <button
                        className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize md:mt-0 mt-2 ${
                            days === 7
                                ? 'bg-blue text-blue'
                                : 'bg-gray-200 text-gray-100'
                        }`}
                        onClick={() => setDays(7)}
                    >
                        7d
                    </button>
                    <button
                        className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize md:mt-0 mt-2 ${
                            days === 14
                                ? 'bg-blue text-blue'
                                : 'bg-gray-200 text-gray-100'
                        }`}
                        onClick={() => setDays(14)}
                    >
                        14d
                    </button>
                    <button
                        className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize md:mt-0 mt-2 ${
                            days === 30
                                ? 'bg-blue text-blue'
                                : 'bg-gray-200 text-gray-100'
                        }`}
                        onClick={() => setDays(30)}
                    >
                        30d
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chart;
