import Link from 'next/link'

import UserImage from './user-image'

import { BODY_FS } from '../constants/responsive-fonts'

const ClickableUserImage = ({ url, width, height, children, profilePic }) => {
    return (
        <Link href={url}>
            <a title="Visit my profile.">
                <button
                    className={`${BODY_FS} group text-form-color flex justify-center items-center gap-x-3 w-fit mx-auto`}
                >
                    <UserImage
                        picLink={profilePic?.link ?? ''}
                        size={`${width} ${height}`}
                    />

                    {children ?? ''}
                </button>
            </a>
        </Link>
    )
}

export default ClickableUserImage
