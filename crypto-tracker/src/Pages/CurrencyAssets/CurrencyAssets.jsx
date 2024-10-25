import CustomAreaChart from "../../Components/AreaChart"
import AssetsHighlights from "../../Components/AssetsHighlights"
import Exchanges from "../../Components/Exchanges"

const CurrencyAssets = () => {
  return (
    <div>
      <AssetsHighlights/>

      <div className="px-20">
        <CustomAreaChart/>
      </div>
      
      <div className=" bg-white mx-20 rounded-md p-6 shadow-black shadow-lg my-10">
        <Exchanges/>
      </div>
    </div>
  )
}

export default CurrencyAssets