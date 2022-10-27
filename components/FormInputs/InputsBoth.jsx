

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


    return (
        <>
            <div className="mb-6">
                <label
                    htmlFor={formikName}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{labelName}
                </label>
                {/* <Field 
                
                /> */}


                <input
                    id={formikName}
                    className="text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5"
                    placeholder={placeholder}

                    name={formikName}

                    {...wizard(formikName)}
                />
                {
                    showValidErrorMsg()
                }
            </div>
        </>
    )
}

export default InputsBoth 