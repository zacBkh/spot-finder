import Link from 'next/link'

import ClickableUserImage from './wrapper-clickable-user-image'

import UserImage from './user-image'
import { BODY_FS } from '../constants/responsive-fonts'

import { PATHS } from '../constants/URLs'

const SpotterProfilePreview = ({ author }) => {
    const { _id: authorID, name } = author

    const linkToUserProfile = `${PATHS.PROFILE}/${authorID}`

    const childrenSpan = (
        <span className="group-hover:underline underline-offset-2">
            Visit {name}&apos;s profile.
        </span>
    )
    return (
        <ClickableUserImage
            url={linkToUserProfile}
            width={'w-14'}
            height={'h-14'}
            children={childrenSpan}
        />
    )
}

export default SpotterProfilePreview
