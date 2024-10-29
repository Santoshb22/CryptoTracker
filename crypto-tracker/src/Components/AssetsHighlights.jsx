import { useContext } from "react"
import Button from "./Button"
import { currencyAssets, languageContext } from "../ContextAPI/context"
import { useShortNumbers } from "../CustumHooks/useShortNumbers"

const AssetsHighlights = () => {
    const formatCurrency = useShortNumbers();
    const {assets} = useContext(currencyAssets)
    const {language} = useContext(languageContext);
    if(!assets) return;

    const handleExplorer = () => {
        window.open(assets.data.explorer);
    }
    
  return (
    <div className="bg-blue-500 p-2 sm:h-40 text-white text-xs md:text-md flex sm:grid sm:grid-cols-3 gap-4 items-center justify-evenly">

        <div className="currency-rank-and-price flex justify-evenly items-center sm:w-72 sm:ml-4 gap-2">
            <div className="rank flex flex-col items-center">
                <div className="bg-green-400 h-2 w-14 md:w-16 rounded-md"></div>
                <div className="bg-green-400 text-center w-10 md:w-12 h-12 md:h-20 rounded-ee-2xl rounded-es-2xl">
                    <span className=" text-sm md:text-4xl">{assets.data.rank}</span>
                    <br />
                    <span className="text-xs">{language === "Hin" ? "रैंक" : "Rank"}</span>
                </div>
            </div>

            <div className="crypto-coin ">
                <p className=" text-lg sm:text-4xl">{assets.data.name} <span className="text-sm sm:text-lg">({assets.data.symbol})</span></p>
                <p className="sm:text-lg">{formatCurrency(assets.data.priceUsd)}</p>
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 sm:ml-12 w-[400px]  md:w-[600px] gap-2">
            <div>
                <p className="text-sm  sm:text-lg">{language === "Hin" ? "वॉल्यूम (24घं)" : "Volume (24Hr)"}</p>
                <p className="text-lg sm:text-2xl">${formatCurrency(assets.data.volumeUsd24Hr)}</p>
            </div>

            <div>
                <p className="text-sm sm:text-lg">{language === "Hin" ? "बाज़ार पूंजीकरण" : "MARKET CAP"}</p>
                <p className="text-lg sm:text-2xl">${formatCurrency(assets.data.marketCapUsd)}</p>
            </div>

            <div>
                <p className="text-sm sm:text-lg">{language === "Hin" ? "आपूर्ति" : "Supply"}</p>
                <p className="text-lg sm:text-2xl">${formatCurrency(assets.data.maxSupply)}</p>
            </div>

            <div>
                <Button text = "Explorer" onClick = {handleExplorer}/>
            </div>
        </div>
    </div>    
  )
}

export default AssetsHighlights