import { Link } from "react-router-dom"
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom"; 
import { useContext } from "react";
import { languageContext } from "../ContextAPI/context";
const Navbar = () => {

    const navigate = useNavigate();
    const {language} = useContext(languageContext);
  return (
    <nav className="flex justify-around h-20 items-center text-xs md:text-lg">
        <div>
    <ul className="flex gap-4">
        <li><Link to={"/"}>{language === "Hin" ? "कॉइन्स" : "Coins"}</Link></li>
        <li><Link to={"Exchanges"}>{language === "Hin" ? "एक्सचेंज" : "Exchanges"}</Link></li>
    </ul>
</div>

<div onClick={() => navigate("/")} className="cursor-pointer">
    <p className="font-semibold">
        <span className="text-green-500">{language === "Hin" ? "क्रिप्टो" : "CRYPTO"}</span>{" "}
        <span className="text-blue-500">{language === "Hin" ? "ट्रैकर" : "TRACKER"}</span>
    </p>
</div>

        <div className="right-nav flex gap-4 items-center justify-center">
            <Dropdown/>
        </div>
    </nav>
  )
}

export default Navbar