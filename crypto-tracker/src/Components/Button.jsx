
const Button = ({text, onClick}) => {
  return (
    <button 
    className= "bg-green-400 rounded-md py-2 px-4 font-bold"
    onClick = {onClick}
    >
        {text}
    </button>
  )
}

export default Button