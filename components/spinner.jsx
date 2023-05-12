// color should be "border-t-[color]"
const Spinner = ({ color }) => {
    return (
        <div
            className={`${color} bg-white-700 align-middle ml-4 
            inline-block w-5 h-5 border-[2px] rounded-[50%] animate-spin ease-in-out`}
        ></div>
    )
}

export default Spinner
