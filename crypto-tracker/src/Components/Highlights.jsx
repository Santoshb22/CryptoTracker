import { useContext, useEffect, useState } from "react"
import { currencyContext, languageContext } from "../ContextAPI/context"
import { useShortNumbers } from "../CustumHooks/useShortNumbers";

const Highlights = () => {
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [totalExchangeVolume, setTotalExchangeVolume] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const {currencies} = useContext(currencyContext);
  const formatValue = useShortNumbers();
  const {language} = useContext(languageContext);
  useEffect(() => {
    if(!currencies) return;
       
    const { totalMarketCap, totalExchangeVolume, totalPercent } = currencies.reduce(
      (acc, currency) => {
        acc.totalMarketCap += Number(currency.marketCapUsd) || 0;
        acc.totalExchangeVolume += Number(currency.volumeUsd24Hr) || 0;
        acc.totalPercent += Number(currency.changePercent24Hr) || 0;
        return acc; 
      },
      { totalMarketCap: 0, totalExchangeVolume: 0, totalPercent: 0} 
    )

    setTotalMarketCap(totalMarketCap);
    setTotalExchangeVolume(totalExchangeVolume);
    setTotalPercent(totalPercent);
  }, [currencies])
  
  return (
    <div className="text-xs md:text-lg grid grid-cols-3 lg:grid-cols-6 pt-4 text-center gap-8 text-white font-bold font-mono pb-48 text-xl bg-blue-500 ">
         <p>
        {language === "Hin" ? "बाज़ार पूंजीकरण" : "MARKET CAP"} <br />
        ${formatValue(totalMarketCap)}
      </p>
      <p>
        {language === "Hin" ? "विनिमय मात्रा" : "EXCHANGE VOL"}<br />
        {formatValue(totalExchangeVolume)}
      </p>
      <p>
        {language === "Hin" ? "संपत्तियां" : "ASSETS"} <br />
        2,300
      </p>
      <p>
        {language === "Hin" ? "विनिमय" : "EXCHANGE"} <br />
        117
      </p>
      <p>
        {language === "Hin" ? "बाज़ार" : "MARKETS"} <br />
        5,906
      </p>
      <p>
        {language === "Hin" ? "बीटीसी डोम इंडेक्स" : "BTC DOM INDEX"} <br />
        {formatValue(totalPercent)}%
      </p>

    </div>
  )
}

export default Highlights