import { useContext } from "react";
import { currencyContext } from "../../ContextAPI/context";
import CryptoTable from "../CryptoTable/CryptoTable";
import "./Currencies.css";


const Currencies = () => {
   
    const {currencies} = useContext(currencyContext);
    if(!currencies) return;
    return (
        <div>
            <CryptoTable currenciesData = {currencies}/>
        </div>
        
  )
}

export default Currencies