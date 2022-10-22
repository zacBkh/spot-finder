import { useState } from "react"


const InputsNew = ({
    accessibility,
    labelName, placeholder,
    refWatcher
}) => {


    return (
        <>
            <div className="mb-6">
                <label
                    htmlFor={accessibility}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{labelName}
                </label>
                <input
                    ref={refWatcher}
                    type="text"
                    id={accessibility}
                    className="text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5"
                    placeholder={placeholder} required=""
                />
            </div>
        </>
    )
}

export default InputsNew 