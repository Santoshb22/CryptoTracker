import { useEffect, useState } from "react"
import { currencyContext, currencyAssets, exchangesContext, crytpoHistoryContext } from "./context"

const AppProvider = ({children}) => {

const [currencies, setCurrencies] = useState(null);
const [assets, setAssets] = useState(null);
const [currencyName, setCurrencyName] = useState("");
const [exchanges, setEchanges] = useState(null);
const [cryptoHistory, setCryptoHistory] = useState(null);

const currencyApi = "https://api.coincap.io/v2/assets";
const currencyAssetsApi = `https://api.coincap.io/v2/assets/${currencyName.toLowerCase()}`;
const exchangesApi = "https://api.coincap.io/v2/exchanges";
const cryptoHistoryApi = `https://api.coincap.io/v2/assets/${currencyName.toLowerCase()}/history?interval=d1`

useEffect(() =>{
    (async function fetchCurrency(){
        try {
            const res = await fetch(currencyApi);
            const data = await res.json();
            setCurrencies(data.data);
        } catch (error) {
            console.error("Failed to fetch currencies:", error);
        }
    })()
}, []);

useEffect(() => {
    if(!currencyName) return;

    (async function  fetchCurrencyAssets() {
        try {
            const res = await fetch(currencyAssetsApi);
            const data = await res.json();
            setAssets(data);
        } catch (error) {
            console.error("Failed to fetch currency assets:", error);
        }
    })();

}, [currencyName]);

useEffect(() => {
    (async function fetchExchanges() {
        try {
            const res = await fetch(exchangesApi);
            const data = await res.json();
            setEchanges(data.data);
        } catch (error) {
            console.error("Failed to fetch exchanges:", error);
        }
    })()
}, [])

useEffect(() => {
    if(!currencyName) return ;

    (async function fetchCryptoHistory() {
        try {
            const res = await fetch(cryptoHistoryApi);
            const data = await res.json();
            console.log(data.data);
            setCryptoHistory(data.data)
        } catch (error) {
            console.error("Failed to fetch crypto history:", error);
        }
    })()
}, [currencyName])

  return (
    <crytpoHistoryContext.Provider value = {{cryptoHistory}}>
    <exchangesContext.Provider value = {{exchanges}}>
    <currencyAssets.Provider value = {{assets, setCurrencyName, currencyName}}>
    <currencyContext.Provider value = {{currencies}}>
        {children}
    </currencyContext.Provider>
    </currencyAssets.Provider>
    </exchangesContext.Provider>
    </crytpoHistoryContext.Provider>
  )
}

export default AppProvider