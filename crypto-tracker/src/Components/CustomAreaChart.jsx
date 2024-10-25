import { useContext } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { chartLogoContext, crytpoHistoryContext, currencyAssets } from '../ContextAPI/context';
import { useShortNumbers } from '../CustumHooks/useShortNumbers';

const CustomAreaChart = ({highPrice, lowPrice, avgPrice}) => {
    const { cryptoHistory } = useContext(crytpoHistoryContext);
    const { currencyName } = useContext(currencyAssets);
    const { chartLogo } = useContext(chartLogoContext);
    const fomattNumber = useShortNumbers();

    if (!cryptoHistory) {
        return (
            <h1>
                <span>{currencyName}</span> Chart Data Not Available
            </h1>
        );
    }

    const date = new Date(cryptoHistory[0].date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedData = cryptoHistory.map((item) => ({
        time: new Date(item.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }),
        value: Number(item.priceUsd),
    }))

    const getChartHeight = () => {
        if (window.innerWidth < 768) return 300;
        if (window.innerWidth < 1024) return 400;
        return 600;
    }
    return (
        <div>
            <div className='m-2 sm:flex sm:items-center'>
                <div className='flex items-center gap-2'>
                    <div><img src={chartLogo} alt="logo" /></div>
                    <div>
                        <p className='font-bold text-md sm:text-xl'>{currencyName}</p>
                        <p className='text-sm font-semibold text-gray-900'>{date}</p>
                    </div>
                </div>

                <div className='ml-12 text-sm sm:text-lg font-semibold'>
                    <div className='flex items-center gap-4'>
                        <h2>High: <span className='text-gray-400'>${highPrice}</span></h2>
                        <h2>Low: <span className='text-gray-400'>${lowPrice}</span></h2> 
                        <h2>Average: <span className='text-gray-400'>${avgPrice}</span></h2>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={getChartHeight()}>
                <AreaChart
                    data={formattedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                    <Tooltip 
                        contentStyle={{ fontSize: window.innerWidth < 768 ? '10px' : '12px' }} 
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#00C49F"
                        fill="#00C49F"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
export default CustomAreaChart;
