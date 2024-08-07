import Image from 'next/image'

import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

import UserImage from '../../user-image'
const UserAvatar = ({ currentSession, onUserMenuClick, isOpen }) => {
    const imageSession = currentSession?.user.image

    return (
        <button
            aria-label="Show profile menu"
            className={`border border-[#DDDDDD] shadow-user-menu-hov rounded-full ${
                isOpen && 'shadow-user-menu'
            }`}
            onClick={onUserMenuClick}
        >
            <div className="flex items-center gap-x-2 p-1">
                <span className="hidden md:block">
                    <GiHamburgerMenu />
                </span>
                {currentSession && imageSession?.link ? (
                    <UserImage
                        noCloudi={currentSession.user.provider !== 'credentials'}
                        noBorder
                        picLink={imageSession.link}
                        size={'w-8 h-8'}
                    />
                ) : (
                    <div>
                        <FaUserCircle className="text-3xl text-primary" />
                    </div>
                )}
            </div>
        </button>
    )
}

export default UserAvatar
