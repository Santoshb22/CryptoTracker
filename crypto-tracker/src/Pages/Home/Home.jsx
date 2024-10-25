import Currencies from "../../Components/Currencies/Currencies"
import Highlights from "../../Components/Highlights"

const Home = () => {
  return (
    <div>
      <Highlights/>

      <div className="currencies-wrapper -mt-36 bg-white  mx-12 rounded-md p-6 shadow-black shadow-sm mb-10">
        <Currencies/>
      </div>
    </div>
  )
}

export default Home