import { FORM_LABEL_FS } from '../../constants/responsive-fonts'
import DISABLED_STYLE from '../../constants/disabled-style'
const SpotTextualInput = ({
    identifier,
    formikWizard,
    errorStying,
    isEditMode,
    placeholder,
    isTextArea,
    shouldBeDisabled,
}) => {
    const inputClassnames = `${errorStying.border} ${DISABLED_STYLE} 
    text-sm border border-gray-300 text-gray-900 w-full p-2.5 mt-2`

    return (
        <>
            <div>
                <label
                    htmlFor={identifier}
                    className={`${FORM_LABEL_FS} 
                    text-form-color
                    `}
                >
                    {identifier} *
                </label>

                {isTextArea ? (
                    <textarea
                        {...formikWizard}
                        id={identifier}
                        placeholder={placeholder}
                        className={inputClassnames}
                        name={identifier}
                        rows={6}
                        disabled={shouldBeDisabled}
                    />
                ) : (
                    <input
                        disabled={shouldBeDisabled}
                        {...formikWizard}
                        id={identifier}
                        className={inputClassnames}
                        placeholder={placeholder}
                        name={identifier}
                    />
                )}
                {errorStying.message}
            </div>
        </>
    )
}

export default SpotTextualInput
