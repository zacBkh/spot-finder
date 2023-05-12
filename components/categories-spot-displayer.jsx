import { FORM_CAT_ICON_FS } from '../constants/responsive-fonts'

const CategoriesDisplayer = ({ icon, value, errorStying }) => {
    return (
        <>
            <button type="button">
                <label
                    htmlFor={value}
                    className={`${FORM_CAT_ICON_FS} ${errorStying.border}  ${
                        shouldBeDisabled && DISABLED_STYLE_STATELESS
                    }
                        flex justify-between items-center px-4 py-3 gap-x-1 w-fit  
                        rounded-[0.5rem] border-[0.1rem] border-transparent
                        cursor-pointer
                            ${
                                catArray.includes(value)
                                    ? 'text-secondary bg-secondary-light hover:bg-secondary-hov border-secondary'
                                    : 'text-form-color bg-tertiary hover:bg-tertiary-hov border-transparent'
                            }`}
                >
                    <input
                        {...formikWizard}
                        type="checkbox"
                        id={value}
                        className={`opacity-0 w-0`}
                        name={formikName}
                        value={value}
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

export default CategoriesDisplayer
