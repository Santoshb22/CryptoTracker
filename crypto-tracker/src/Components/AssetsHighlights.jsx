import { useContext } from "react"
import Button from "./Button"
import { currencyAssets } from "../ContextAPI/context"
import { useShortNumbers } from "../CustumHooks/useShortNumbers"

const AssetsHighlights = () => {
    const formatCurrency = useShortNumbers();
    const {assets} = useContext(currencyAssets)
    if(!assets) return;

    const handleExplorer = () => {
        window.open(assets.data.explorer);
    }
  return (
    <div className="bg-blue-500 h-40 text-white grid grid-cols-3 items-center justify-evenly">
        <div className="currency-rank-and-price flex justify-center items-center gap-2">
            <div className="rank flex flex-col items-center">
            <div className="bg-green-400 h-2 w-16 rounded-md"></div>
            <div className="bg-green-400 text-center w-12 h-20 rounded-ee-2xl rounded-es-2xl">
                <span className="text-4xl">{assets.data.rank}</span>
                <br />
                <span className="text-xs">Rank</span>
            </div>
            </div>

            <div className="crypto-coin">
            <p className="text-4xl">{assets.data.name} <span className="text-lg">({assets.data.symbol})</span></p>
            <p>{formatCurrency(assets.data.priceUsd)}</p>
            </div>
        </div>

        <div className="grid grid-cols-3">
            <div>
                <p className="text-lg">Volume (24Hr)</p>
                <p className="text-2xl">${formatCurrency(assets.data.volumeUsd24Hr)}</p>
            </div>

            <div>
                <p className="text-lg">Market Cap</p>
                <p className="text-2xl">${formatCurrency(assets.data.marketCapUsd)}</p>
            </div>

            <div>
                <p className="text-lg">Supply</p>
                <p className="text-2xl">${formatCurrency(assets.data.maxSupply)}</p>
            </div>
        </div>

        <div>
            <Button text = "Explorer" onClick = {handleExplorer}/>
        </div>
    </div>    
  )
}

export default AssetsHighlights