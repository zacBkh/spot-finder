import { HEADER_TITLE_FS } from '../../constants/responsive-fonts'

import UserImage from '../user-image'

import { AiOutlineTrophy } from 'react-icons/ai'
import { ImEye } from 'react-icons/im'
import { MdOutlineRateReview } from 'react-icons/md'

import SpotCard from '../spot-index-card'
import DividerDesign from '../design/divider'

const UserCard = ({ isLoading, userSpots, joiningDate }) => {
    const specStyle = 'flex items-center gap-x-2'
    return (
        <div className="flex flex-col-reverse lg:flex-row gap-x-14 w-[90%] xl:w-[80%] 2xl:w-[60%] mx-auto mt-10 text-form-color ">
            <div className="w-1/3 flex flex-col gap-y-6 items-center border rounded-xl border-[#DDDDDD] p-2 xl:p-4 h-fit">
                <UserImage noBorder width={'w-32'} height={'h-32'} />
                <div className="flex flex-col gap-y-4 font-semibold">
                    <div className={`${specStyle}`}>
                        <AiOutlineTrophy className={`text-2xl `} />{' '}
                        <span> 28 Spots created</span>
                    </div>
                    <div className={`${specStyle}`}>
                        <ImEye className={`text-xl`} /> <span> 59 Spots visited</span>
                    </div>
                    <div className={`${specStyle}`}>
                        <MdOutlineRateReview className={` text-xl`} />{' '}
                        <span> 39 Spots reviewed</span>
                    </div>
                </div>
                <DividerDesign margin={'mt-4'} />
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-y-10">
                <div>
                    <h1 className={`text-3xl font-bold`}>Hi, I am Nicola</h1>
                    <span className={`text-sm`}>Joined in {joiningDate}</span>
                </div>

                <div className="space-y-2">
                    <h2 className={`text-2xl font-semibold`}>About</h2>
                    <p>
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
                    <h2 className={`text-2xl font-semibold`}>Spots Nicola shared</h2>
                    <div className="flex justify-between flex-wrap gap-4">
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
