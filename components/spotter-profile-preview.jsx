import { useState } from 'react'
import Image from 'next/image'

import { BODY_FS } from '../constants/responsive-fonts'
const dummyURL = [
    'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
]

const SpotterProfilePreview = ({ authorName, img, text }) => {
    return (
        <>
            <button
                className={`${BODY_FS} group text-form-color flex justify-center items-center gap-x-3 w-fit mx-auto`}
            >
                <div className="h-14 w-14 relative border rounded-full border-primary overflow-hidden ">
                    <Image
                        src={dummyURL[0]}
                        alt="Picture"
                        layout="fill"
                        className="object-cover group-hover:scale-110 transition-transform duration-[175ms]"
                    />
                </div>
                <span className="group-hover:underline underline-offset-2">
                    Visit {authorName}&apos; s profile.
                </span>
            </button>
        </>
    )
}

export default SpotterProfilePreview
