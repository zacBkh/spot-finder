import Image from 'next/image'
import Link from 'next/link'

import { MdLocationOn } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai'

import MissingImage from './image-off-placeholder'
import UserImage from './user-image'

import SPOT_CATEGORIES from '../constants/spot-categories'

const SpotCard = ({ spotData, shouldNotDisplayUserPic }) => {
    const { _id, title, description, categories, author, country, images } = spotData

    const spotIcons = SPOT_CATEGORIES.filter(cat => categories.includes(cat.name))

    const displaySuspensionPoints =
        'text-ellipsis whitespace-nowrap overflow-hidden text-start'
    return (
        <Link href={`/spots/${_id}`}>
            <a>
                <button className="cursor-pointer flex flex-col w-64 group">
                    <div className="relative w-full h-64 mx-auto  rounded-lg overflow-hidden">
                        {images[0] ? (
                            <Image
                                src={images[0]}
                                alt="Picture of a Spot on SpotFinder"
                                layout="fill"
                                className=" object-cover group-hover:scale-110 transition-transform duration-[175ms] "
                                quality={10}
                            />
                        ) : (
                            <MissingImage />
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2 px-1 w-full">
                        <div className="mt-2 flex justify-between items-start text-form-color text-[15px] w-full">
                            <div className="w-[75%] flex flex-col">
                                <p
                                    className={`font-semibold ${displaySuspensionPoints} `}
                                >
                                    {title}
                                </p>
                                <div className="flex items-center text-greyText">
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
                            <div className="flex gap-x-2 items-center group w-fit text-greyText">
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
                                    className=" items-center text-greyText w-fit inline"
                                >
                                    {index === spotIcons.length - 1 ? (
                                        <span className="flex items-center gap-x-2">
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
                </button>
            </a>
        </Link>
    )
}

export default SpotCard
