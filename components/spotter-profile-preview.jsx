import ClickableUserImage from './wrapper-clickable-user-image'

import { PATHS } from '../constants/URLs'

const SpotterProfilePreview = ({ author, spanTxt, w, h }) => {
    const { _id: authorID, name, profilePic, provider } = author

    const linkToUserProfile = `${PATHS.PROFILE}/${authorID}`

    const childrenSpan = (
        <span className="group-hover:underline underline-offset-2">{spanTxt}</span>
    )
    return (
        <ClickableUserImage
            noCloudi={provider !== 'credentials'}
            profilePic={profilePic}
            url={linkToUserProfile}
            width={w}
            height={h}
        >
            {childrenSpan}
        </ClickableUserImage>
    )
}

export default SpotterProfilePreview
