import Image from 'next/image'

import { BiUserCircle } from 'react-icons/bi'

const UserAvatar = ({ currentSession, onUserMenuClick }) => {
    return (
        <div onClick={onUserMenuClick}>
            {currentSession && currentSession.user.image ? (
                <Image
                    width={30}
                    height={30}
                    className="h-8 w-8 rounded-full"
                    src={currentSession.user.image}
                    alt="Profile picture"
                />
            ) : (
                <BiUserCircle className="text-3xl text-white" />
            )}
        </div>
    )
}

export default UserAvatar
