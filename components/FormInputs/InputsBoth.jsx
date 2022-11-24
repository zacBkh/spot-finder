

const InputsBoth = ({
    labelName, placeholder,
    formikHasFieldBeenTouched, formikError, formikName,
    wizard
}) => {


    // Logic to deicde to display erorrMsg or not (depending of if mistake and if touched before)
    const showValidErrorMsg = () => {
        if (formikError && formikHasFieldBeenTouched) {
            return <span className="text-red-600">{formikError[formikName]}</span>
        }
    }


    // Logic to deliver valid error msg or red border color
    const validStyling = () => {
        if (formikError && formikHasFieldBeenTouched) {
            return {
                border: "border-2 border-rose-500",
                message: <span className="text-red-600">{formikError[formikName]}</span>
            }

        } else { // if no error on this specific field...
            return { border: null, message: null }
        }
    }

    return (
        <>
            <div className="mb-6">
                <label
                    htmlFor={formikName}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{labelName}
                </label>



                <input
                    id={formikName}
                    className={`text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5 ${validStyling().border}`}
                    placeholder={placeholder}

                    name={formikName}

                    {...wizard(formikName)}
                />
                {
                    // showValidErrorMsg()
                    validStyling().message
                }
            </div>
        </>
    )
}

export default InputsBoth 