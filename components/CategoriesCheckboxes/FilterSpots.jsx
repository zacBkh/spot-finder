

const FilterSpots = ({
    icon,
    value,
    onClick,
    activeCategories
}) => {



    return (
        <>
            <div
                onClick={() => onClick(value)}
                className="w-20	">
               
                <label
                    htmlFor={value}
                    className=
                    {`
                            flex justify-center items-center p-2  
                            text-gray-500 hover:text-gray-600
                            bg-white  hover:bg-gray-50 
                            rounded-lg border	
                            border-gray-200 
                            cursor-pointer

                            ${activeCategories.includes(value) ? "bg-gray-50 border-blue-600 text-gray-800 " : "bg-white border-gray-200"}

                            `}
                >


                    {/* <input
                            type="checkbox"
                            id={value}
                            className="opacity-0"

                            value={value}
                            onClick={(e) => onClick(e)}
                        /> */}


                    <div
                        className="block mr-1 text-sm "> {icon}
                    </div>

                    <div
                        className=" text-xs font-semibold">{value}
                    </div>
                </label>
            </div
            >
        </>
    )
}

export default FilterSpots


