import Link from 'next/link'

import Image from 'next/image'

import { useState } from 'react'

import ErrorImage from '../public/images/error-page-image.jpg'

import { TITLE_FS, BODY_FS } from '../constants/responsive-fonts'

import { BsCompass } from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai'

import ButtonSpotCard from '../components/design/button-spot-card'

import { PATHS } from '../constants/URLs'

const CustomErrorPage = ({ genericText, contextErrHelper }) => {
    const contextualHelp = (
        <span>
            This might be the reason you got lost:{' '}
            <b className="font-semibold underline underline-offset-1">
                {contextErrHelper}
            </b>
        </span>
    )
    return (
        <>
            <div className="flex justify-between gap-x-6 items-center relative pl-12 pr-6">
                <div className="w-[30%] text-start ">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h1 className={`font-bold ${TITLE_FS}`}>
                                Looks like you're lost!
                            </h1>
                            <h2 className={`text-gray-500 ${BODY_FS}`}>
                                This page does not exist... <br />
                                {contextErrHelper && contextualHelp}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <Link href={PATHS.HOME}>
                                <a>
                                    <ButtonSpotCard
                                        icon={<BsCompass />}
                                        text={'Discover our Spots'}
                                    />
                                </a>
                            </Link>
                            <Link href={PATHS.AUTH}>
                                <a>
                                    <ButtonSpotCard
                                        icon={<AiOutlineUserAdd />}
                                        text={'Login or Register'}
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-[60vw] 2xl:w-[80vw] relative">
                    <Image
                        priority
                        fill="true"
                        src={ErrorImage}
                        alt="Error illustration"
                    />
                </div>
            </div>
        </>
    )
}

export default CustomErrorPage
