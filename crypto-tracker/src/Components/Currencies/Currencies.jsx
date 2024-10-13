import { useContext } from "react";
import "./Currencies.css";
import { currencyContext } from "../../ContextAPI/context";

const Currencies = () => {

    const {currencies} = useContext(currencyContext)
    if(!currencies) return;

    const formatCurrency = (value) => {
        const number = Number(value);
        if (number >= 1e12) return (number / 1e12).toFixed(2) + "T"; // Trillion
        if (number >= 1e9) return (number / 1e9).toFixed(2) + "B"; // Billion
        if (number >= 1e6) return (number / 1e6).toFixed(2) + "M"; // Million
        if (number >= 1e3) return (number / 1e3).toFixed(2) + "K"; // Thousand
        return number.toFixed(2); // Return as is if less than 1000
    }
    

    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>price</th>
                    <th>Market Cap</th>
                    <th>VWAP (24Hr)</th>
                    <th>Supply</th>
                    <th>Volume (24Hr)</th>
                    <th>Change (24Hr)</th>
                </tr>
            </thead>

            <tbody className="text-center">
                {currencies.length === 0 && <tr><td>No Data</td></tr>}
                {currencies.length > 0 && (
                currencies.map((currency) => (
                    <tr className="hover:bg-slate-200" key = {currency.id}>
                        <td>{currency.rank}</td>
                        <td className="flex items-center gap-1">
                            <img src={`https://assets.coincap.io/assets/icons/${currency.symbol.toLowerCase()}@2x.png`} alt="logo" width="34px"/>
                            <div>
                                <p>{currency.name}</p>
                                <p className="text-gray-500 text-xs">{currency.symbol}</p>
                            </div>
                        </td>
                        <td>{formatCurrency(currency.priceUsd)}</td>
                        <td>{formatCurrency(currency.marketCapUsd)}</td>
                        <td>{formatCurrency(currency.vwap24Hr)}</td>
                        <td>{currency.supply}</td>
                        <td>{formatCurrency(currency.volumeUsd24Hr)}</td>
                        <td>{currency.changePercent24Hr}%</td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
  )
}

export default Currencies