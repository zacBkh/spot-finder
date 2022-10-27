

const FilterTry = ({
    icon,
    value,
    onClick,
    activeCategories
}) => {






    return (
        <>
            <ul className="">
                <li className="w-60">
                    <label
                        htmlFor={value}
                        className=
                        {`
                            flex justify-center items-center p-5 w-full  
                            text-gray-500 hover:text-gray-600
                            bg-white  hover:bg-gray-50 
                            rounded-lg border-2
                            border-gray-200 
                            cursor-pointer

                            ${activeCategories.includes(value) ? "bg-gray-50 border-blue-600 text-gray-800 " : "bg-white border-gray-200"}

                            `}
                    >


                        <input
                            type="checkbox"
                            id={value}
                            className="opacity-0"

                            value={value}
                            onClick={(e) => onClick(e)}
                        />


                        <div
                            className="block mr-1"> {icon}
                        </div>

                        <div
                            className="w-full text-lg font-semibold">{value}
                        </div>

                        <div
                            className="w-full text-sm">{value}
                        </div>
                    </label>
                </li>
            </ul>
        </>
    )
}

export default FilterTry


