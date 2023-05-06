import Link from 'next/link'

import ErrorImage from '../public/images/error-page-image.jpg'
import ErrorIllustration from '../components/error-illustration'

import { TITLE_FS, BODY_FS } from '../constants/responsive-fonts'

import { BsCompass } from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai'

import ButtonSpotCard from '../components/design/button-spot-card'

import { PATHS } from '../constants/URLs'

const CustomErrorPage = ({ contextErrHelper }) => {
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
            <div className="flex flex-col sm:flex-row justify-between gap-x-6 gap-y-3 sm:gap-y-0 items-center relative px-8 ">
                <div className="w-fit sm:w-[30%] text-start space-y-10 order-2 sm:order-1">
                    <div className="space-y-4">
                        <h1 className={`font-bold ${TITLE_FS}`}>
                            Looks like you&apos;re lost!
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
                <div className="w-[90vw] sm:w-[60vw] 2xl:w-[80vw] relative order-1 sm:order-2">
                    <ErrorIllustration
                        img={ErrorImage}
                        altTxt={'Illustration of a 404 error.'}
                    />
                </div>
            </div>
        </>
    )
}

export default CustomErrorPage
