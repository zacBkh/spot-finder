import {
    TITLE_FS,
    SMALL_TEXT_FS,
    BODY_FS,
    SMALL_TITLE_FS,
} from '../../constants/responsive-fonts'

import UserImage from '../user-image'

import SpotCard from '../spot-index-card'
import DividerDesign from '../design/divider'

import UserStats from './user-stats'
const hideOnLarge = 'lg:hidden'
const showOnLarge = 'hidden lg:flex flex-col'
const UserCard = ({ isLoading, userSpots, joiningDate }) => {
    return (
        <div className="flex flex-col-reverse lg:flex-row gap-x-14 w-[90%] xl:w-[80%] 2xl:w-[60%] mx-auto mt-3 text-form-color ">
            <div
                className={`${showOnLarge} w-1/3 flex gap-y-6 items-center border rounded-xl border-[#DDDDDD] p-2 xl:p-4 h-fit`}
            >
                <UserImage noBorder width={'w-32'} height={'h-32'} />
                <UserStats nbOwned={19} nbVisited={38} nbReviewed={28} />
                <DividerDesign margin={'mt-4'} />
            </div>

            <div className="w-full lg:w-2/3 flex flex-col gap-y-9">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`${TITLE_FS} font-bold white`}>Hi, I am Nicola</h1>
                        <span className={`${SMALL_TEXT_FS}`}>
                            Joined in {joiningDate}
                        </span>
                    </div>
                    <div className={`${hideOnLarge}`}>
                        <UserImage
                            noBorder
                            width={'w-20 sm:w-32'}
                            height={'h-20 sm:h-32'}
                        />
                    </div>
                </div>

                <div className={`${hideOnLarge} flex flex-col gap-y-4 font-semibold`}>
                    <UserStats nbOwned={19} nbVisited={38} nbReviewed={28} />
                </div>

                <div className="space-y-2">
                    <h2 className={`${SMALL_TITLE_FS} font-semibold`}>About</h2>
                    <p className={`${BODY_FS}`}>
                        Hi, I am Nicola and I am lucky enough to live in one of the most
                        beautiful areas of the Tuscan countryside near the historical town
                        of Siena .This territory is my home,my work and my passion. With
                        my wife and children I live on and work a farm producing
                        traditional organic crops and also help my family preserve the
                        beautiful castle which is our family heritage, where my Mum and
                        Aunt still make their home and where we produce great Chianti wine
                        and Tuscan olive oil. My family and I are hospitable people who
                        enjoy sharing this territory we love with our guests.
                    </p>
                </div>
                <DividerDesign />

                <div className="space-y-2">
                    <h2 className={`${SMALL_TITLE_FS} font-semibold`}>
                        Spots Nicola shared
                    </h2>
                    <div className="flex justify-center md:justify-between flex-wrap gap-5">
                        {userSpots.map(spot => (
                            <SpotCard
                                shouldNotDisplayUserPic
                                key={spot.id}
                                spotData={spot}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
