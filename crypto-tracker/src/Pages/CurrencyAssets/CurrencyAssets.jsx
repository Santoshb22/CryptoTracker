import { useContext, useEffect, useState } from "react"
import CustomAreaChart from "../../Components/CustomAreaChart"
import AssetsHighlights from "../../Components/AssetsHighlights"
import Exchanges from "../../Components/Exchanges"
import { crytpoHistoryContext } from "../../ContextAPI/context"

const CurrencyAssets = () => {

  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const {cryptoHistory} = useContext(crytpoHistoryContext);

  useEffect(() => {
    if(!cryptoHistory) return;
    console.log(cryptoHistory);
    function getHigh() {
      let maxPrice = -Infinity;
      for(let i = 0; i < cryptoHistory.length; i++) {
        let price = Number(cryptoHistory[i].priceUsd);
        if(price > maxPrice) {
          maxPrice = price;
        }
      }
      return maxPrice;
    }

    function getLow() {
      let minPrice = Infinity;
      for(let i = 0; i < cryptoHistory.length; i++) {
        let price = Number(cryptoHistory[i].priceUsd);
        if(price < minPrice) {
          minPrice = price;
        }
      }
      return minPrice
    }

    const totalPrice = cryptoHistory.reduce((acc, item) => acc + Number(item.priceUsd) , 0);
    const getAvgPrice = totalPrice / cryptoHistory.length;

    setAvgPrice(getAvgPrice.toFixed(2));
    setHighPrice(getHigh().toFixed(2));
    setLowPrice(getLow().toFixed(2));
  }, [cryptoHistory])
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