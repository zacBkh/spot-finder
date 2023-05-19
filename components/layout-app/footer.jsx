import { useState } from 'react'

import Link from 'next/link'

import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus, FaMedium, FaFacebookF } from 'react-icons/fa'
import { IoIosSend } from 'react-icons/io'
import { BsInstagram } from 'react-icons/bs'

import CTAButtons from '../buttons/cta-buttons'
import { PATHS } from '../../constants/URLs'
const { AUTH, HOME } = PATHS

import ScrollToTopBtn from '../design/scroll-to-top'

import { subscribeToNewsletter } from '../../services/mongo-fetchers'

const Footer = ({}) => {
    const [feedbackNewsLetter, setFeedbackNewsLetter] = useState('')
    const [visitorEmail, setVisitorEmail] = useState('')

    const submitNewsLetterHandler = async event => {
        event.preventDefault()
        if (!visitorEmail || !visitorEmail.includes('@')) {
            setFeedbackNewsLetter('Your email seems invalid.')
            return
        }

        setFeedbackNewsLetter('Thank you! Please check your junk mail folder.')

        const subscribeVisitor = await subscribeToNewsletter(visitorEmail)
        setFeedbackNewsLetter(subscribeVisitor.result)
        setVisitorEmail('')
    }

    return (
        <>
            <footer className="text-center md:text-start ">
                <div className="upperFooter bg-primary flex flex-col items-center gap-y-4 py-6 z-[1] relative px-2 mt-4 md:mt-0">
                    <h2 className="text-xl font-semibold text-white">
                        Stop wasting your time and find the best landmarks around you.
                    </h2>
                    <div className="flex items-center gap-x-4">
                        <CTAButtons
                            text={'Browse Spots'}
                            icon={<AiOutlineSearch />}
                            url={HOME}
                            isInvertedColor
                        />
                        <CTAButtons
                            text={'Register'}
                            icon={<FaUserPlus />}
                            url={AUTH}
                            isInvertedColor
                            isSecondary
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 md:gap-y-0 justify-between bg-secondary text-white px-6">
                    <div className="flex flex-col gap-y-4 py-6 items-center md:items-start">
                        <div>
                            <h2 className="text-lg font-bold">Stop missing out</h2>
                            <p className="text-base mt-6">
                                Monthly update about hottest spots and latest features.
                            </p>
                        </div>

                        <form noValidate onSubmit={submitNewsLetterHandler}>
                            <div className="newsLetter flex items-center mx-auto md:mx-0 border-b border-white text-white w-fit">
                                <input
                                    value={visitorEmail}
                                    onChange={e => setVisitorEmail(e.target.value)}
                                    className="newsLetter bg-transparent py-4 w-52"
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                />

                                <button className="text-xl cursor-pointer transition-colors hover:text-primary">
                                    <IoIosSend />
                                </button>
                            </div>
                            <p className="text-xs mt-1">{feedbackNewsLetter}</p>
                        </form>
                    </div>

                    <div className="flex flex-col gap-y-6 py-6">
                        <div>
                            <h2 className="text-lg font-bold">More from Spot Finder</h2>
                            <div className="mt-6 flex flex-col gap-y-4 hoverLink w-fit mx-auto md:mx-0">
                                <Link href={'#'}>My story</Link>
                                <Link href={'#'}>Blog</Link>
                                <Link href={'#'}>Contact Me</Link>
                                <Link href={AUTH}>Sign In</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-y-4 py-6">
                        <h2 className="text-lg font-bold">Follow us</h2>
                        <div className="flex items-center gap-x-4 text-xl cursor-pointer">
                            <Link href={'#'}>
                                <a className="h-11 w-11 rounded-full bg-primary hover:bg-primary-hov flex justify-center items-center">
                                    <FaFacebookF />
                                </a>
                            </Link>

                            <Link href={'#'}>
                                <a className="h-11 w-11 rounded-full bg-primary hover:bg-primary-hov flex justify-center items-center">
                                    <BsInstagram />
                                </a>
                            </Link>

                            <Link href={'#'}>
                                <a className="h-11 w-11 rounded-full bg-primary hover:bg-primary-hov flex justify-center items-center">
                                    <FaMedium />
                                </a>
                            </Link>
                        </div>

                        <ScrollToTopBtn
                            wrapperCSS={'self-end md:self-auto'}
                            iconSize={'text-4xl'}
                            shouldBounce
                        />
                    </div>
                </div>

                <div className="bg-tertiary flex justify-center items-center py-3">
                    <p className="font-semibold">
                        Made with <span className="text-primary">❤ </span>between Paris &
                        Dubai
                    </p>
                </div>
            </footer>
        </>
    )
}
export default Footer
