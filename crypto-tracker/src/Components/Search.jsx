import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="flex ">
        <input 
        className="bg-blue-100 rounded-s-md px-2 py-1 text-sm text-black" 
        type="text" name="search" placeholder='Search crypto'/>
        <button className="bg-blue-100 rounded-e-md px-3 h-8 text-sm text-black"><IoMdSearch/></button>
    </div>
  )
}

export default Search