import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import CurrencyAssets from './Pages/CurrencyAssets/CurrencyAssets'
import ExchangesPage from './Pages/ExchangesPage/ExchangesPage'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path= '/assets/:currency' element = {<CurrencyAssets/>}/>
        <Route path = "/exchanges" element = {<ExchangesPage/>}/>
      </Routes>
    </div>
  )
}

export default App