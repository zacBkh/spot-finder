import { useRouter } from 'next/router'

import Image from 'next/image'

import TemporaryImgUrls from '../constants/temporary-imgs-urls'

import { MdLocationOn } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai'

import MissingImage from './image-off-placeholder'
import UserImage from './user-image'

import SPOT_CATEGORIES from '../constants/spot-categories'

const SpotCard = ({ spotData, shouldNotDisplayUserPic }) => {
    const { id, title, description, categories, author, country, images } = spotData
    const router = useRouter()

    const clickDetailsHandler = () => {
        router.push(`/spots/${id}`)
    }

    const spotIcons = SPOT_CATEGORIES.filter(cat => categories.includes(cat.name))

    const displaySuspensionPoints = 'text-ellipsis whitespace-nowrap overflow-hidden'
    return (
        <div
            onClick={clickDetailsHandler}
            className="cursor-pointer flex flex-col w-64  "
        >
            <div className="relative w-full h-64 mx-auto">
                {images[0] ? (
                    <Image
                        src={images[0]}
                        alt="Picture of a Spot on SpotFinder"
                        layout="fill"
                        className="rounded-lg object-cover"
                        quality={10}
                    />
                ) : (
                    <MissingImage />
                )}
            </div>
            <div className="flex flex-col gap-y-2 px-1">
                <div className="mt-2 flex justify-between items-start text-form-color text-[15px]">
                    <div className="max-w-[75%] flex flex-col">
                        <p className={`font-semibold ${displaySuspensionPoints}`}>
                            {title}
                        </p>
                        <div className="flex items-center text-[#707070]">
                            <MdLocationOn className="text-lg" />
                            <p className={`text-sm ${displaySuspensionPoints}`}>
                                {country.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center align-top">
                        <AiFillStar className="w-4 h-4" />
                        <span>4.77</span>
                    </div>
                </div>

                {shouldNotDisplayUserPic ? (
                    ''
                ) : (
                    <div className="flex gap-x-2 items-center group w-fit text-[#707070]">
                        <UserImage width={'w-7'} height={'h-7'} />
                        <span className="text-sm group-hover:underline ">
                            Spot by {author.name}
                        </span>
                    </div>
                )}

                <div className="flex items-center mx-auto">
                    {spotIcons.map((icon, index) => (
                        <div
                            key={icon.name}
                            title={`This spot is related to the ${icon.name} category`}
                            className=" items-center text-[#707070] w-fit inline"
                        >
                            {index === spotIcons.length - 1 ? (
                                <span className="flex items-center gap-x-2 ">
                                    {icon.icon}
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <span className="flex items-center gap-x-2 ">
                                        {icon.icon}
                                    </span>
                                    <span className="mx-2">|</span>
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SpotCard
