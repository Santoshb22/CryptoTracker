import { useContext, useEffect, useState } from "react";
import { currencyAssets } from "../../ContextAPI/context";
import { useNavigate } from "react-router-dom";
import { useShortNumbers } from "../../CustumHooks/useShortNumbers";
import "./CryptoTable.css";

const CryptoTable = ({currenciesData, exchangesData}) => {
    const navigate = useNavigate();
    const [currPage, setCurrPage] = useState(1);
    const {setCurrencyName} = useContext(currencyAssets);
    const [data, setData] = useState(null);
    const formatCurrency = useShortNumbers();
    
    const formatNumbers = useShortNumbers();

    useEffect(() => {
        if (currenciesData || exchangesData) {
            setData(currenciesData || exchangesData);
        } 
    }, [currenciesData, exchangesData]);

    if(!data) return;

    const itemsPerPage = 20;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currPage * itemsPerPage 
    const showItemsOnPage = data.slice(0, indexOfLastItem)


    const handlePageChange = (page) => {
        if( page <= totalPages) setCurrPage(page);
    }


    const hnadleCurrencyAssets = (currencyName) => {
        setCurrencyName(currencyName);
        navigate(`/assets/:${currencyName}`)
    }

    const renderCurrencyTable = () => (
        <table className="min-w-full">
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

        <tbody className="text-start">
            {data.length === 0 && <tr><td>No Data</td></tr>}
            {showItemsOnPage.length > 0 && (
            showItemsOnPage.map((currency) => (
                <tr 
                 className="px-2 hover:bg-slate-200 cursor-pointer"
                 key = {currency.id}
                 onClick = {() => hnadleCurrencyAssets(currency.name)}
                 >
                    <td>{currency.rank}</td>
                    <td className=" hover:underline flex items-center gap-1">
                        <img src={`https://assets.coincap.io/assets/icons/${currency.symbol.toLowerCase()}@2x.png`} alt="logo" width="34px"/>
                        <div>
                            <p>
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
    )

    const renderExchnageTable = () => (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Trading Pairs</th>
                    <th>Volume (24Hr)</th>
                    <th>Total (%)</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody className="text-start">
                {data.length === 0 && <tr><td>No Data</td></tr>}
                {
                    showItemsOnPage.length > 0 && (
                        showItemsOnPage.map((exchange) => (
                            <tr className="hover:bg-slate-200 cursor-pointer border-b " key={exchange.exchangeId}>
                                <td>{exchange.rank}</td>
                                <td>{exchange.name}</td>
                                <td>{exchange.tradingPairs}</td>
                                <td>{formatNumbers(exchange.volumeUsd)}</td>
                                <td>{exchange.percentTotalVolume ? `${Number(exchange.percentTotalVolume).toFixed(2)}%` : 'N/A'}</td>
                                <td className={exchange.socket ? "text-green-500" : "text-red-600"}>o</td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
    return (
        <div>
           
           {
            currenciesData? renderCurrencyTable() : renderExchnageTable()
           }

            <div className="pagination text-center my-2">
                <button
                className="bg-blue-500 px-4 py-2 rounded-md"
                onClick={() => handlePageChange(currPage + 1)}
                disabled = {currPage === totalPages}
                >
                    Load More
                </button>
            </div>
        </div>
        
  )
}

export default CryptoTable