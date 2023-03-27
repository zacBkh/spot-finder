import Image from 'next/image'

import { BODY_FS } from '../constants/responsive-fonts'
const dummyURL = [
    'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
]

const SpotterProfilePreview = ({ authorName }) => {
    return (
        <>
            <button
                className={`${BODY_FS} group text-form-color flex justify-center items-center gap-x-3 w-fit mx-auto`}
            >
                <div className="h-14 w-14  border rounded-full border-primary overflow-hidden ">
                    <Image
                        width={100}
                        height={100}
                        src={dummyURL[0]}
                        alt="Picture"
                        // layout="fill"
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
