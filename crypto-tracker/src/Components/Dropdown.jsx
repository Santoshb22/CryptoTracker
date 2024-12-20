import { useCallback, useContext } from "react"
import { languageContext } from "../ContextAPI/context"

const Dropdown = () => {
  const {setLanguage} = useContext(languageContext);
  
  const handleSetLanguage = useCallback((e) => {
    setLanguage(e.target.value)
  }, [setLanguage])

  return (
    <div>
        <select 
        className="rounded-md text-sm p-1" 
        name="language" 
        id="language"
        onChange={handleSetLanguage}
        >
            <option value="Eng">English</option>
            <option value="Hin">हिंदी </option>
        </select>
    </div>
  )
}

export default Dropdown