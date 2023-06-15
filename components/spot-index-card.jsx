import { useState } from 'react'
import Image from 'next/image'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { MdGrade } from 'react-icons/md'

import MissingImage from './image-off-placeholder'
import UserImage from './user-image'

import SPOT_CATEGORIES from '../constants/spot-categories'

import getAvrgGrade from '../utils/get-average-rate'

import { PATHS } from '../constants/URLs'

import getCloudiImg from '../utils/transform-cloudi-img'

import { useRouter } from 'next/router'

const SpotCard = ({
    spotData,
    width,
    height,

    isLandingPage,
    shouldNotDisplayUserPic,

    moreStyleContainer,
    spotTitleFS,
    spotOtherFS,
    userImgSize,
    isMapPopUp,
}) => {
    const router = useRouter()

    const { _id, title, categories, author, country, images, reviews } = spotData

    // Takes all reviews rate and do average (virtuals not working from client)
    const spotAverageRate = getAvrgGrade(reviews)

    const spotIcons = SPOT_CATEGORIES.filter(cat => categories.includes(cat.name))

    const displaySuspensionPoints =
        'text-ellipsis whitespace-nowrap overflow-hidden text-start'

    const [activeImg, setActiveImg] = useState(0)

    const arrowStyle =
        'bg-white bg-opacity-90 active:bg-opacity-100 text-sm p-1 md:p-2 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-[0.25s] absolute z-50 active:transform-none'

    const switchPicHandler = operator => {
        if (operator === '+' && activeImg < images.length - 1) {
            setActiveImg(prev => prev + 1)
            return
        }
        if (operator === '-' && activeImg > 0) {
            setActiveImg(prev => prev - 1)
        }
    }

    const getImgQueue = index => {
        if (index === activeImg) {
            return 'active'
        }
        if (index === activeImg - 1) {
            return 'prev'
        }

        if (index === activeImg + 1 || (activeImg === images.length - 1 && index === 0)) {
            return 'next'
        }
        return 'next'
    }

    const onSpotCardClick = evt => {
        if (isLandingPage) {
            return
        }

        const nodeName = evt.target.nodeName
        const arrayBtnClick = ['BUTTON', 'svg', 'path']
        if (arrayBtnClick.includes(nodeName)) {
            return
        }
        router.push(`${PATHS.SPOT}/${_id}`)
    }

    const preFetcher = async () => {
        try {
            await router.prefetch(`${PATHS.SPOT}/${_id}`)
        } catch (error) {
            console.log('prefetchError', error)
        }
    }

    const hoverCardHandler = () => {
        if (isLandingPage) {
            console.log('hovered spotData', spotData)
            return
        }
        preFetcher()
    }

    return (
        <div
            onMouseEnter={hoverCardHandler}
            className={`hoverCardShadow ${isLandingPage ? 'mt-4' : ''}`}
            onClick={onSpotCardClick}
        >
            <div
                className={`cursor-pointer flex 
                    ${isMapPopUp && 'relative'}
                    ${isMapPopUp ? 'flex-row items-center' : 'flex-col'}
                    ${isMapPopUp ? 'w-auto' : width} group`}
            >
                <div
                    className={`relative ${height} mx-auto 
                        ${isMapPopUp ? '' : 'rounded-lg'} 
                        ${isMapPopUp ? 'w-1/2  rounded-tl-xl rounded-bl-xl ' : ' w-full'} 
                        overflow-hidden group`}
                >
                    <button
                        onClick={() => switchPicHandler('-')}
                        className={`
                        ${activeImg === 0 && 'invisible'}
                        alignBtnCarrPopUpLeft
                        ${arrowStyle}
                        `}
                    >
                        <IoIosArrowBack />
                    </button>
                    {images[0] ? (
                        images.map((img, index) => (
                            <Image
                                key={img}
                                layout="fill"
                                objectFit="cover"
                                alt="Picture of a Spot"
                                src={getCloudiImg(undefined, img)}
                                placeholder="blur"
                                blurDataURL={getCloudiImg('q_10,w_0.5', images[0])}
                                className={`${getImgQueue(index)}
                                 transition-transform duration-[400ms] `}
                            />
                        ))
                    ) : (
                        <MissingImage />
                    )}

                    <button
                        onClick={() => switchPicHandler('+')}
                        className={`
                            ${activeImg === images.length - 1 && 'invisible'}
                            alignBtnCarrPopUpRight
                            ${arrowStyle}
                            `}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>

                <div
                    className={`flex flex-col p-2
                        ${isMapPopUp ? 'w-1/2 gap-y-4' : 'w-full gap-y-1'} 
                        ${moreStyleContainer}
                        `}
                >
                    <div
                        className={`flex justify-between
                             ${isMapPopUp ? 'items-center' : 'items-start'} 
                             text-form-color
                             ${spotTitleFS ?? 'text-[15px]'}
                             
                             w-full`}
                    >
                        <div
                            className={`${isMapPopUp ? ' w-[70%]' : ' w-[80%]'} 
                            flex flex-col`}
                        >
                            <p
                                className={`font-semibold 
                                    ${isMapPopUp ? '' : displaySuspensionPoints}
                                     `}
                            >
                                {title}
                            </p>
                            <div className="flex items-center text-greyText">
                                <MdLocationOn className="text-lg" />
                                <p
                                    className={`${spotOtherFS ?? 'text-sm'}
                                        ${displaySuspensionPoints}`}
                                >
                                    {country?.name ?? 'Country unavailable 😢'}
                                </p>
                            </div>
                        </div>

                        {spotAverageRate ? (
                            <div className="flex items-center align-top">
                                <MdGrade className="w-4 h-4" />
                                <span>{spotAverageRate}</span>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    {shouldNotDisplayUserPic ? (
                        ''
                    ) : (
                        <div className="flex gap-x-2 items-center group w-fit text-greyText">
                            <UserImage
                                noCloudi={author.provider !== 'credentials'}
                                alt={`Profile picture of ${author.name}`}
                                picLink={author?.profilePic?.link}
                                size={`${userImgSize ?? 'w-8 h-8'}`}
                            />
                            <span
                                className={`${
                                    spotOtherFS ?? 'text-sm'
                                } group-hover:underline`}
                            >
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
            </div>
        </div>
    )
}

export default SpotCard
