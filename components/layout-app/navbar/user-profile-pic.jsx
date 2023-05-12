import Image from 'next/image'

import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

const UserAvatar = ({ currentSession, onUserMenuClick, isOpen }) => {
    console.log('isOpen', isOpen)

    return (
        <button
            className={`border border-[#DDDDDD] rounded-[21px] shadow-user-menu-hov  ${
                isOpen && 'shadow-user-menu'
            }`}
            onClick={onUserMenuClick}
        >
            <div className="flex items-center gap-x-2 px-2 py-[5px]  ">
                <GiHamburgerMenu />
                {currentSession && currentSession.user.image ? (
                    <div>
                        <Image
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                            src={currentSession.user.image}
                            alt="Profile picture"
                        />
                    </div>
                ) : (
                    <div className="">
                        <FaUserCircle
                            // stroke-width="0"
                            className="text-3xl text-primary"
                        />
                    </div>
                )}
            </div>
        </button>
    )
}

export default UserAvatar
