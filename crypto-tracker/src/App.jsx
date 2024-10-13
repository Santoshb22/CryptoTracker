import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
      </Routes>
    </div>
  )
}

export default App