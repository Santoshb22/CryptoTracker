import { useContext, useMemo,} from "react"
import CustomAreaChart from "../../Components/CustomAreaChart"
import AssetsHighlights from "../../Components/AssetsHighlights"
import Exchanges from "../../Components/Exchanges"
import { crytpoHistoryContext } from "../../ContextAPI/context"

const CurrencyAssets = () => {
  const {cryptoHistory} = useContext(crytpoHistoryContext);

  const memoizedPrices = useMemo(() => {
    if (!cryptoHistory || cryptoHistory.length === 0) {
      return { highPrice: 0, lowPrice: 0, avgPrice: 0 };
    }
  
    let maxPrice = -Infinity;
    let minPrice = Infinity;
    let totalPrice = 0;
  
    cryptoHistory.forEach((item) => {
      const price = Number(item.priceUsd); 
      if (price > maxPrice) maxPrice = price;
      if (price < minPrice) minPrice = price;
      totalPrice += price;
    })
  
    const avgPrice = totalPrice / cryptoHistory.length;
  
    return {
      highPrice: maxPrice.toFixed(2),
      lowPrice: minPrice.toFixed(2),
      avgPrice: avgPrice.toFixed(2),
    };
  }, [cryptoHistory])

  const highPrice = memoizedPrices.highPrice;
  const lowPrice = memoizedPrices.lowPrice;
  const avgPrice = memoizedPrices.avgPrice;
  return (
    <div>
      <AssetsHighlights/>

      <div className="px-2 md:px-20">
        <CustomAreaChart highPrice = {highPrice} lowPrice = {lowPrice} avgPrice = {avgPrice}/>
      </div>
      
      <div className=" bg-white mx-2 md:mx-20 rounded-md p-6 shadow-black shadow-lg my-10">
        <Exchanges/>
      </div>
    </div>
  )
}

export default CurrencyAssets