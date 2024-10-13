
const Dropdown = () => {
  return (
    <div>
        <select className="rounded-md text-sm p-1" name="currency" id="currency">
            <option value="inr">INR</option>
            <option value="usd">USD</option>
        </select>
    </div>
  )
}

export default Dropdown