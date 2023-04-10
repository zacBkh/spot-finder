import Image from 'next/image'

import { BiUserCircle } from 'react-icons/bi'

const UserAvatar = ({ currentSession, onUserMenuClick }) => {
    return (
        <div className="h-8" onClick={onUserMenuClick}>
            {currentSession && currentSession.user.image ? (
                <Image
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                    src={currentSession.user.image}
                    alt="Profile picture"
                />
            ) : (
                <button className="">
                    <BiUserCircle className="text-3xl text-white" />
                </button>
            )}
        </div>
    )
}

export default UserAvatar
