import { Link } from "react-router-dom"
// import logo from "../assets/crypto-logo.png";
import Dropdown from "./Dropdown";
import Search from "./Search";
const Navbar = () => {
  return (
    <nav className="flex justify-around h-20 items-center ">
        <div >
            <ul className="flex gap-4">
                <li><Link to={"/"}>Coins</Link></li>
                <li><Link to={"Exchanges"}>Exchanges</Link></li>
                <li>Contact us</li>
            </ul>
        </div>

        <div>
            <p className="font-semibold "><span className="text-green-500 ">CRYPTO</span> <span className="text-blue-500">TRACKER</span></p>
        </div>

        <div className="right-nav flex gap-4 items-center justify-center">
            <Dropdown/>
            <Dropdown/>
            <Search/>
        </div>
    </nav>
  )
}

export default Navbar