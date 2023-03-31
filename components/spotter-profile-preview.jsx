import UserImage from './user-image'
import { BODY_FS } from '../constants/responsive-fonts'

const SpotterProfilePreview = ({ authorName }) => {
    return (
        <>
            <button
                className={`${BODY_FS} group text-form-color flex justify-center items-center gap-x-3 w-fit mx-auto`}
            >
                <UserImage width={'w-14'} height={'h-14'} />
                <span className="group-hover:underline underline-offset-2">
                    Visit {authorName}&apos; s profile.
                </span>
            </button>
        </>
    )
}

export default SpotterProfilePreview
