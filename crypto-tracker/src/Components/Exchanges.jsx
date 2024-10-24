import { useContext } from "react"
import CryptoTable from "./CryptoTable/CryptoTable"
import {exchangesContext} from "../ContextAPI/context"

const Exchanges = () => {
    const {exchanges} = useContext(exchangesContext);

  return (
        <CryptoTable exchangesData = {exchanges}/>
  )
}

export default Exchanges