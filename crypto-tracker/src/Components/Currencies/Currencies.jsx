import "./Currencies.css";

const Currencies = () => {
  return (
        <table className="min-w-full table-auto ">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>price</th>
                    <th>Market Cap</th>
                    <th>Volume (24Hr)</th>
                    <th>Change (24Hr)</th>
                </tr>
            </thead>

            <tbody className="text-center">
                <tr className="hover:bg-slate-200">
                    <td>1</td>
                    <td>
                        <img src="" alt="SOL-logo" />
                        <p>SOL</p>
                    </td>
                    <td>₹432322</td>
                    <td>₹432.4T</td>
                    <td>₹432.2b</td>
                    <td>1.32%</td>
                </tr>
            </tbody>
        </table>
  )
}

export default Currencies