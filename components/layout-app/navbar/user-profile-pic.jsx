import Image from 'next/image'

import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

const UserAvatar = ({ currentSession, onUserMenuClick, isOpen }) => {
    const imageSession = currentSession?.user.image
    return (
        <button
            className={`border border-[#DDDDDD] rounded-[21px] shadow-user-menu-hov ${
                isOpen && 'shadow-user-menu'
            }`}
            onClick={onUserMenuClick}
        >
            <div className="flex items-center gap-x-2 px-2 py-[5px]  ">
                <span className="hidden md:block">
                    <GiHamburgerMenu />
                </span>
                {currentSession && imageSession?.link ? (
                    <Image
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                        src={imageSession.link}
                        alt="Profile picture"
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
