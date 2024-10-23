import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import CurrencyAssets from './Pages/CurrencyAssets/CurrencyAssets'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path= '/assets/:currency' element = {<CurrencyAssets/>}/>
      </Routes>
    </div>
  )
}

export default App