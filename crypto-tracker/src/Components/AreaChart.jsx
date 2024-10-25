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
import { crytpoHistoryContext, currencyAssets } from '../ContextAPI/context';


const CustomAreaChart = () => {

    const {cryptoHistory} = useContext(crytpoHistoryContext);
    const {currencyName} = useContext(currencyAssets);
    if(!cryptoHistory){
        return (
            <h1> <span>{currencyName}</span>Chart Data Not Availabe</h1>
        )
    }

    const formattedData = cryptoHistory.map((item) => ({
        time: new Date(item.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric', 
            month: 'short',
            year: "numeric",
          }),
        value:  Number(item.priceUsd),
    }))

  return (
    <ResponsiveContainer width="100%" height={600}>
      <AreaChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#00C49F"
          fill="#00C49F"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
