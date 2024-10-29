import { useContext, useEffect, useState } from "react";
import { chartLogoContext, currencyAssets, languageContext } from "../../ContextAPI/context";
import { useNavigate } from "react-router-dom";
import { useShortNumbers } from "../../CustumHooks/useShortNumbers";
import styles from "./CryptoTable.module.css";

const CryptoTable = ({currenciesData, exchangesData}) => {
    const {language} = useContext(languageContext);
    const {setChartLogo} = useContext(chartLogoContext);
    const {setCurrencyName} = useContext(currencyAssets);

    const navigate = useNavigate();

    const [currPage, setCurrPage] = useState(1);
    const [data, setData] = useState(null);
    
    const formattCurrency = useShortNumbers();

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

    const handleSetChartLogo = (currencyName) => {
        setChartLogo(`https://assets.coincap.io/assets/icons/${currencyName.toLowerCase()}@2x.png `);
    }

    const renderCurrencyTable = () => (
        <table className="min-w-full text-xs md:text-lg">
            <thead>
                <tr>
                    <th className={styles.rank}>{language === "Hin" ? "रैंक" : "Rank"}</th>
                    <th className={styles.name}>{language === "Hin" ? "नाम" : "Name"}</th>
                    <th className={styles.price}>{language === "Hin" ? "कीमत" : "Price"}</th>
                    <th className={styles.marketCap}>{language === "Hin" ? "बाज़ार पूंजीकरण" : "Market Cap"}</th>
                    <th className={styles.vwap}>{language === "Hin" ? "VWAP (24घं)" : "VWAP (24Hr)"}</th>
                    <th className={styles.supply}>{language === "Hin" ? "आपूर्ति" : "Supply"}</th>
                    <th className={styles.volume}>{language === "Hin" ? "वॉल्यूम (24घं)" : "Volume (24Hr)"}</th>
                    <th className={styles.change}>{language === "Hin" ? "बदलाव (24घं)" : "Change (24Hr)"}</th>
                </tr>
            </thead>
    
            <tbody className="text-start">
                {data.length === 0 && <tr><td colSpan={8}>No Data</td></tr>}
                {showItemsOnPage.length > 0 && (
                    showItemsOnPage.map((currency) => (
                        <tr 
                            className="px-2 hover:bg-slate-200 cursor-pointer border-b"
                            key={currency.id}
                            onClick={() => {
                                hnadleCurrencyAssets(currency.name);
                                handleSetChartLogo(currency.symbol)
                            }}
                        >
                            <td className={styles.rank}>{currency.rank}</td>
                            <td className={`${styles.name} hover:underline flex items-center gap-1`}>
                                <img src={`https://assets.coincap.io/assets/icons/${currency.symbol.toLowerCase()}@2x.png`} alt="logo" width="34px"/>
                                <div>
                                    <p>{currency.name}</p>
                                    <p className="text-gray-500 text-xs">{currency.symbol}</p>
                                </div>
                            </td>
                            <td className={styles.price}>{formattCurrency(currency.priceUsd)}</td>
                            <td className={styles.marketCap}>{formattCurrency(currency.marketCapUsd)}</td>
                            <td className={styles.vwap}>{formattCurrency(currency.vwap24Hr)}</td>
                            <td className={styles.supply}>{formattCurrency(currency.supply)}</td>
                            <td className={styles.volume}>{formattCurrency(currency.volumeUsd24Hr)}</td>
                            <td className={`${styles.change} ${currency.changePercent24Hr > 0 ? "text-green-500" : "text-red-500"}`}>
                                {formattCurrency(currency.changePercent24Hr)}%
                            </td>
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
                    <th className={styles.rank}>{language === "Hin" ? "रैंक" : "Rank"}</th>
                    <th className={styles.name}>{language === "Hin" ? "नाम" : "Name"}</th>
                    <th className={styles.tradingPairs}>{language === "Hin" ? "व्यापार जोड़े" : "Trading Pairs"}</th>
                    <th className={styles.exchangeVolume}>{language === "Hin" ? "वॉल्यूम (24घं)" : "Volume (24Hr)"}</th>
                    <th className={styles.totalPercent}>{language === "Hin" ? "कुल (%)" : "Total (%)"}</th>
                    <th className={styles.status}>{language === "Hin" ? "स्थिति" : "Status"}</th>
                </tr>
            </thead>
    
            <tbody className="text-start">
                {data.length === 0 && <tr><td colSpan={6}>No Data</td></tr>}
                {
                    showItemsOnPage.length > 0 && (
                        showItemsOnPage.map((exchange) => (
                            <tr className="hover:bg-slate-200 cursor-pointer border-b" key={exchange.exchangeId}>
                                <td className={styles.rank}>{exchange.rank}</td>
                                <td className={styles.name}>{exchange.name}</td>
                                <td className={styles.tradingPairs}>{exchange.tradingPairs}</td>
                                <td className={styles.exchangeVolume}>{formattCurrency(exchange.volumeUsd)}</td>
                                <td className={styles.totalPercent}>{exchange.percentTotalVolume ? `${Number(exchange.percentTotalVolume).toFixed(2)}%` : 'N/A'}</td>
                                <td className={`${styles.status} ${exchange.socket ? "text-green-500" : "text-red-600"}`}>o</td>
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
                    {language === "Hin" ? "और लोड करें" : "Load More"}
                </button>
            </div>
        </div>
        
  )
}

export default CryptoTable