import { useContext, useState } from "react";
import "./Currencies.css";
import { currencyAssets, currencyContext } from "../../ContextAPI/context";
import { useNavigate } from "react-router-dom";
import { useShortNumbers } from "../../CustumHooks/useShortNumbers";

const Currencies = () => {
    const navigate = useNavigate();
    const [currPage, setCurrPage] = useState(1);
    const {currencies} = useContext(currencyContext);
    const {setCurrencyName} = useContext(currencyAssets);
    const formatCurrency = useShortNumbers();
    if(!currencies) return;

    const itemsPerPage = 10;
    const totalPages = Math.ceil(currencies.length / itemsPerPage);
    const indexOfLastItem = currPage * itemsPerPage 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage 
    const showCurrenciesOnPage = currencies.slice(indexOfFirstItem, indexOfLastItem)
    
    const getPaginationNumbers = () => {
        const pageNumbers = [];

        for(let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    }

    const handlePageChange = (page) => {
        if(page >= 1 && page <= totalPages) setCurrPage(page);
    }

    const paginateNumbers  = getPaginationNumbers();

    const hnadleCurrencyAssets = (currencyName) => {
        setCurrencyName(currencyName);
        navigate(`/assets/:${currencyName}`)
    }

    return (
            <div>
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
                    {showCurrenciesOnPage.length > 0 && (
                    showCurrenciesOnPage.map((currency) => (
                        <tr className="px-2 hover:bg-slate-200 cursor-pointer" key = {currency.id}>
                            <td>{currency.rank}</td>
                            <td className="flex items-center gap-1">
                                <img src={`https://assets.coincap.io/assets/icons/${currency.symbol.toLowerCase()}@2x.png`} alt="logo" width="34px"/>
                                <div>
                                    <p 
                                    className="hover:underline"
                                    onClick = {() => hnadleCurrencyAssets(currency.name)}>
                                        {currency.name}
                                    </p>
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

            <div className="pagination text-center my-2">
                <button 
                onClick={() => handlePageChange(currPage - 1)}
                disabled = {currPage === 1}
                >
                    {"<"} 
                </button>

                {
                    paginateNumbers.map((pageNumber, idx) => (
                        <button 
                        className= {currPage === pageNumber? "active-page": ""}
                        onClick={() => handlePageChange(pageNumber)}
                        key={idx}
                        disabled = {typeof pageNumber !== "number"}
                        >
                            {pageNumber}
                        </button>
                    ))
                }

                <button
                onClick={() => handlePageChange(currPage + 1)}
                disabled = {currPage === totalPages}
                >
                    {">"}
                </button>

            </div>
        </div>
        
  )
}

export default Currencies