import { FORM_LABEL_FS } from '../../constants/responsive-fonts'
import { DISABLED_STYLE } from '../../constants/disabled-style'
const SpotTextualInput = ({
    identifier,
    formikWizard,
    errorStying,
    isEditMode,
    placeholder,
    isTextArea,
    shouldBeDisabled,
    onEnterKeyPress,
}) => {
    const inputClassnames = `${errorStying.border} ${DISABLED_STYLE} 
    text-sm border border-gray-300 text-gray-900 w-full p-2.5 mt-2`

    const pressEnterHandler = e => {
        console.log('e', e)
        if (e.key === 'Enter') {
            e.preventDefault()
            onEnterKeyPress('+')
        }
    }

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
                        onKeyDown={e => pressEnterHandler(e)}
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
                        onKeyDown={e => pressEnterHandler(e)}
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
