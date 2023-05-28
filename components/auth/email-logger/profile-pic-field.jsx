import { useState } from 'react'

import { AiOutlineCheck } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { BsFillCameraFill } from 'react-icons/bs'

import UserImage from '../../user-image'

import DividerDesign from '../../design/divider'

const SelectProfilePic = ({ formik, onPictureSelect }) => {
    const picOptions = [
        {
            name: 'Photographer during sunset.',
            link: 'https://images.unsplash.com/photo-1506434304575-afbb92660c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        },
        {
            name: 'Photographer at the top of a summit.',
            link: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        },

        {
            name: 'Women photographer in the nature.',
            link: 'https://images.unsplash.com/photo-1500027419059-afa3360ead5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        },
        {
            name: 'Women photographer in the street.',
            link: 'https://images.unsplash.com/photo-1523359247812-29dde5ac53a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        },
    ]

    const imgSize = 'w-14 xl:w-20 h-14 xl:h-20'

    const selectPicHandler = (isCustomPicChosen, picLink) => {
        console.log('isCustomPicChosen', isCustomPicChosen)
        console.log('picLink', picLink)

        if (isCustomPicChosen === true) {
            console.log('88', 88)
            onPictureSelect(picLink)
        } else {
            onPictureSelect(picLink)
        }
    }

    const validTick = <AiOutlineCheck />

    return (
        <>
            <p className="font-semibold text-sm text-center sm:text-start">
                Upload your photo or just pick one
            </p>
            <div className="overflow-x-scroll w-full pb-4">
                <div className="mt-2 flex justify-between items-center gap-x-4 xl:gap-x-6 w-fit ">
                    <button onClick={() => selectPicHandler(true)} type="button">
                        <div title="Add your own profile picture." className="relative">
                            <FaUserCircle className={`${imgSize} text-primary`} />
                            <div
                                className="absolute left-full -ml-[32px] top-full -mt-[26px] 
                                text-lg text-white bg-secondary rounded-full p-[6px]"
                            >
                                <BsFillCameraFill />
                            </div>
                        </div>
                    </button>
                    <DividerDesign vertical />
                    {picOptions.map(pic => (
                        <button
                            key={pic.name}
                            onClick={() => selectPicHandler(false, pic.link)}
                            type="button"
                        >
                            <div className="relative">
                                <UserImage
                                    title={pic.name}
                                    width={imgSize}
                                    picLink={pic.link}
                                />
                                {formik.values.profilePic === pic.link ? (
                                    <>
                                        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full opacity-40"></div>
                                        <div className="absolute left-1/2 -ml-[18px] top-1/2 -mt-[18px]">
                                            <AiOutlineCheck className="text-primary text-4xl" />
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SelectProfilePic
