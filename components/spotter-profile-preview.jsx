import Link from 'next/link'

import UserImage from './user-image'
import { BODY_FS } from '../constants/responsive-fonts'

import { PATHS } from '../constants/URLs'

const SpotterProfilePreview = ({ author }) => {
    const { _id: authorID, name } = author

    const linkToUserProfile = `${PATHS.PROFILE}/${authorID}`
    return (
        <Link href={linkToUserProfile}>
            <a>
                <button
                    className={`${BODY_FS} group text-form-color flex justify-center items-center gap-x-3 w-fit mx-auto`}
                >
                    <UserImage width={'w-14'} height={'h-14'} />

                    <span className="group-hover:underline underline-offset-2">
                        Visit {name}&apos; s profile.
                    </span>
                </button>
            </a>
        </Link>
    )
}

export default SpotterProfilePreview
