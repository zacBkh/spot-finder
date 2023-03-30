import { HEADER_TITLE_FS } from '../../constants/responsive-fonts'
import DividerDesign from '../design/divider'

import UserImage from '../user-image'

import SpotCard from '../spot-index-card'

const UserCard = ({ isLoading, userSpots, joiningDate }) => {
    return (
        <div className="flex flex-col-reverse md:flex-row  gap-x-10 w-[90%] mx-auto mt-10 text-form-color ">
            <div className="w-1/4 flex flex-col border rounded-xl border-[#DDDDDD] p-10 h-fit">
                <UserImage width={'w-20'} height={'h-20'} />
                <span>SuperSpotter</span>
                <span>28 Spots created</span>
                <span>59 Spots visited</span>
                <span>39 reviews posted</span>
            </div>

            <div className="w-3/4 flex flex-col gap-y-10">
                <div>
                    <h1 className={`text-3xl font-bold`}>Hi, I'm Nicola</h1>
                    <span className={`text-sm`}>Joined in {joiningDate}</span>
                </div>

                <div className="space-y-2">
                    <h2 className={`text-2xl font-semibold`}>About</h2>
                    <p>
                        Hi, I'm Nicola and I am lucky enough to live in one of the most
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
                    <h2 className={`text-2xl font-semibold`}>Nicolas' Spots</h2>
                    <div className="flex justify-between flex-wrap gap-5">
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
