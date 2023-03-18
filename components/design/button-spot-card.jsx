import { ICON_IN_BUTTON_FS, BUTTON_FS } from '../../constants/responsive-fonts'
const ButtonSpotCard = ({ icon, text }) => {
    return (
        <>
            <button
                className={`${BUTTON_FS}  buttonWrapper
                transition
                flex items-center gap-x-2 bg-primary text-white py-3 px-9 rounded-[0.3rem] w-fit font-bold`}
            >
                <span className={`${ICON_IN_BUTTON_FS} iconToAnimate`}>{icon}</span>
                {text}
            </button>
        </>
    )
}

export default ButtonSpotCard
