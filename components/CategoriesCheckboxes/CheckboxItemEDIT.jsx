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
            <ul className="grid gap-6 w-full md:grid-cols-3">

                <li>
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

                    <label htmlFor={value} className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 ">

                        <div className="block">
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


