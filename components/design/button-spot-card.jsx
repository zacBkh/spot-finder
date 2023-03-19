import { ICON_IN_BUTTON_FS, BUTTON_FS } from '../../constants/responsive-fonts'
const ButtonSpotCard = ({ icon, text }) => {
    return (
        <>
            <button
                className={`${BUTTON_FS}  buttonWrapper
                transition
                py-2 px-4 2xl:py-3 2xl:px-9
                flex items-center gap-x-2 bg-primary text-white rounded-[0.3rem] w-fit font-bold`}
            >
                <span className={`${ICON_IN_BUTTON_FS} iconToAnimate`}>{icon}</span>
                {text}
            </button>
        </>
    )
}

export default ButtonSpotCard