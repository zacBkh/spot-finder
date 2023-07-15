import { FORM_LABEL_FS } from '../../constants/responsive-fonts'
import { DISABLED_STYLE } from '../../constants/disabled-style'

import capitalize from '../../utils/capitalize'

import { SMALL_TEXT_FS } from '../../constants/responsive-fonts'

const SpotTextualInput = ({
    inputRef,

    identifier,
    formikWizard,
    errorStying,
    placeholder,
    isTextArea,
    shouldBeDisabled,
    onEnterKeyPress,
}) => {
    const inputClassnames = `${errorStying.border} ${DISABLED_STYLE} 
    border border-gray-300 text-gray-900 w-full p-2.5 mt-2
  `

    const pressEnterHandler = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            onEnterKeyPress('+')
        }
    }

    const { value: desc } = formikWizard

    const validCount = (
        <div className={`${SMALL_TEXT_FS} !text-primary`}>
            {errorStying.message}
            {`${
                desc?.length < 500
                    ? ', ' + (15 - desc?.length) + ' characters remaining'
                    : ''
            }`}
        </div>
    )

    return (
        <>
            <div
                title={`${shouldBeDisabled ? 'Click the back button to edit.' : ''}`}
                className={`${shouldBeDisabled ? 'previousInputOpacity' : ''}`}
            >
                <label
                    htmlFor={identifier}
                    className={`${FORM_LABEL_FS}
                    text-form-color
                    `}
                >
                    {capitalize(identifier)} *
                </label>

                {isTextArea ? (
                    <textarea
                        ref={inputRef}
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
                        ref={inputRef}
                        onKeyDown={e => pressEnterHandler(e)}
                        disabled={shouldBeDisabled}
                        {...formikWizard}
                        id={identifier}
                        className={inputClassnames}
                        placeholder={placeholder}
                        name={identifier}
                    />
                )}
                {errorStying.message ? validCount : ''}
            </div>
        </>
    )
}

export default SpotTextualInput
