import { ICON_IN_BUTTON_FS, BUTTON_FS } from '../../constants/responsive-fonts'
import { DISABLED_STYLE } from '../../constants/disabled-style'

const ButtonPrimary = ({
    icon,
    text,
    onClickHandler,
    iconFirst,
    isSubmitBtn,
    isSmaller,
    shouldBeDisabled,
    additionalCSS,
}) => {
    return (
        <>
            <button
                disabled={shouldBeDisabled ? true : false}
                type={isSubmitBtn ? 'submit' : 'button'}
                onClick={onClickHandler ? () => onClickHandler() : null}
                className={`${BUTTON_FS} ${DISABLED_STYLE} ${additionalCSS} buttonWrapper
                    transition
                    ${shouldBeDisabled ? 'active:transform-none' : ''}
                   ${
                       isSmaller
                           ? 'py-2 px-3 2xl:py-3 2xl:px-4'
                           : 'py-2 px-4 2xl:py-3 2xl:px-4'
                   } 
                    flex items-center gap-x-2 bg-primary text-white rounded-[0.3rem] w-fit font-bold`}
            >
                <span
                    className={`${ICON_IN_BUTTON_FS} ${
                        !shouldBeDisabled && 'iconToAnimate'
                    } `}
                >
                    {icon}
                </span>
                <span
                    className={`${iconFirst && 'order-first'} ${
                        isSmaller && 'text-xs md:text-base'
                    }`}
                >
                    {text}
                </span>
            </button>
        </>
    )
}

export default ButtonPrimary
