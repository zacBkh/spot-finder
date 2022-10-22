import { useState } from "react"




const CategoryCheckBoxItemEdit = ({
    intialCheckbox,

    icon,
    value, name,
    cardTitle,
    cardDescription,

    onCheckboxChange
}) => {


    return (
        <>
            <ul className="">

                <li className="w-60">
                    <input
                        type="checkbox"
                        value={value}
                        name={name}
                        defaultChecked={intialCheckbox}
                        onChange={(evt) => onCheckboxChange(evt.target.value)}
                        id={value}
                        className="hidden peer"
                    // required=""
                    />

                    <label
                        htmlFor={value}
                        className="flex justify-center items-center p-5 w-full  
                        
                        text-gray-500 hover:text-gray-600 peer-checked:text-gray-800 
                        bg-white  hover:bg-gray-50  peer-checked:bg-gray-50
                        rounded-lg border-2
                        border-gray-200 peer-checked:border-blue-600
                        cursor-pointer">

                        <div className="block  mr-1">
                            {icon}
                            <div
                                className="w-full text-lg font-semibold">{cardTitle}
                            </div>

                            <div
                                className="w-full text-sm">{cardDescription}
                            </div>
                        </div>
                    </label>
                </li>


            </ul>
        </>
    )
}

export default CategoryCheckBoxItemEdit


