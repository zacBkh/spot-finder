import Link from 'next/link'
import UserImage from './user-image'
import { PATHS } from '../constants/URLs'

const UserCardSmall = ({
    userID,
    name,
    picLink,
    country,
    joiningDate,
    description,
    nbSpotsOwned,
}) => {
    const hoverUserCardHandler = () => {
        console.log('you are viewing userID', userID)
    }

    const joiningYear = new Date(joiningDate).getFullYear()
    return (
        <Link href={`${PATHS.SPOT}/${userID}`}>
            <a onMouseEnter={hoverUserCardHandler}>
                <button
                    aria-label="See this user profile"
                    className="hoverCardShadow flex gap-x-2 items-center group mt-6 w-fit cursor-pointer text-start py-1 md:py-2"
                >
                    <UserImage
                        alt={`Profile picture of ${name}`}
                        picLink={picLink}
                        size={'!w-32 max-w-[50%] !h-32'}
                    />
                    <div className="flex flex-col gap-y-2 text-sm border-l-2 border-primary h-[75%] pl-2 max-w-[50%] lg:max-w-[70%]">
                        <div>
                            <p className="font-semibold">{`${name}, from ${country}`}</p>
                            <p className="text-greyText">
                                {`Joined in ${joiningYear} - `}
                                <span className="text-xs">{`${nbSpotsOwned} spots owned`}</span>
                            </p>
                        </div>

                        <p className="text-xs w-full ellipsis-multi-lines">
                            {description}
                        </p>
                    </div>
                </button>
            </a>
        </Link>
    )
}

export default UserCardSmall
