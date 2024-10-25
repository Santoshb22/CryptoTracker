import Highlights from "../../Components/Highlights"
import Exchanges from "../../Components/Exchanges"
const ExchangesPage = () => {
  return (
    <div>
      <Highlights/>
      <div className="-mt-36 bg-white  mx-12 rounded-md p-6 shadow-black shadow-sm mb-10">
        <Exchanges/>
      </div>
    </div>
  )
}

export default ExchangesPage