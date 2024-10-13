import Currencies from "../../Components/Currencies/Currencies"
import Highlights from "../../Components/Highlights"

const Home = () => {
  return (
    <div className="">
      <Highlights/>
      <div className="currencies-wrapper -mt-36 bg-white  mx-12 rounded-md p-6 shadow-black shadow-sm">
        <Currencies/>
      </div>
    </div>
  )
}

export default Home