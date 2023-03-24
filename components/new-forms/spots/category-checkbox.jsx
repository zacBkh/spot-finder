import { FORM_CAT_ICON_FS } from '../../../constants/responsive-fonts'

const SpotCategory = ({
    value,
    icon,
    catArray,
    errorStying,
    formikWizard,
    formikName,
    shouldBeDisabled,

    isInputEditable,

    onChangeCat,
}) => {
    const shouldCheckboxBeDefaultChecked = catArray.includes(value)

    const styleWithoutSelection = 'text-form-color bg-tertiary hover:!bg-tertiary-hov'
    const styleSelected =
        'text-secondary bg-secondary-light hover:bg-secondary-hov border-secondary'

    // Logic to decide checkbox style (bg, font color, hover)
    let checkboxStyle
    // if we are on spot show page
    if (isInputEditable) {
        checkboxStyle = 'bg-transparent !cursor-default'
        if (isInputEditable[formikName]) {
            checkboxStyle = styleWithoutSelection
        }

        if (catArray.includes(value) && isInputEditable[formikName]) {
            checkboxStyle = styleSelected
        }
    } else {
        // if we are on new spot context
        if (catArray.includes(value)) {
            checkboxStyle = styleSelected
        } else {
            checkboxStyle = styleWithoutSelection
        }
    }

    return (
        <>
            <button
                disabled={shouldBeDisabled}
                type="button"
                onClick={() => onChangeCat()}
            >
                <label
                    htmlFor={value}
                    className={`${FORM_CAT_ICON_FS} ${errorStying.border} 
                        flex justify-between items-center px-4 py-3 gap-x-1 w-fit  
                        rounded-[0.5rem] border-[0.1rem] border-transparent
                       ${
                           !isInputEditable && shouldBeDisabled
                               ? 'cursor-not-allowed'
                               : 'cursor-pointer'
                       }  
                        ${checkboxStyle}
                        `}
                >
                    <input
                        disabled={shouldBeDisabled}
                        {...formikWizard}
                        type="checkbox"
                        id={value}
                        className={`opacity-0 w-0`}
                        name={formikName}
                        value={value}
                        defaultChecked={shouldCheckboxBeDefaultChecked}
                    />

                    <div className="block mr-1">{icon}</div>

                    <div
                        className={`${FORM_CAT_ICON_FS} text-md font-semibold w-fit h-fit`}
                    >
                        {value}
                    </div>
                </label>
            </button>
        </>
    )
}

export default SpotCategory
