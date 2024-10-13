import { useEffect, useState } from "react"
import { currencyContext } from "./context"

const AppProvider = ({children}) => {
//currencies
const [currencies, setCurrencies] = useState(null)
const currencyApi = "https://api.coincap.io/v2/assets";
console.log("gfdskjbh");
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
}, [])

  return (
    <currencyContext.Provider value = {{currencies}}>
        {children}
    </currencyContext.Provider>
  )
}

export default AppProvider