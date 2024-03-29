import { useEffect } from 'react'
import Image from 'next/image'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'

import getCloudiImg from '../../utils/transform-cloudi-img'

const PicViewer = ({
    activeImg,
    isPicViewerOpen,
    images,
    onPicViewerClose,
    onImgChange,
}) => {
    const arrowStyle =
        'text-sm xl:text-xl border p-1 xl:p-3 rounded-full border-white active:bg-[#4A4A4A]'

    const switchPicHandler = operator => {
        if (!isPicViewerOpen) {
            return
        }
        if (operator === '+' && activeImg < images.length - 1) {
            onImgChange(activeImg + 1)
            return
        }
        if (operator === '-' && activeImg > 0) {
            onImgChange(activeImg - 1)
            return
        }
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'ArrowLeft') {
                switchPicHandler('-')
                return
            }

            if (event.key === 'ArrowRight') {
                switchPicHandler('+')
                return
            }
            if (event.key === 'Escape') {
                onPicViewerClose()
                return
            }
        }

        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [activeImg, isPicViewerOpen])

    return (
        <div
            id="carrouselViewer"
            className="z-50 bg-black w-full h-full absolute p-2 md:p-3 select-none text-white transition-bottom-up"
        >
            <div className="flex items-center justify-between">
                <span className="ml-[48%]">{`${activeImg + 1} / ${images.length}`}</span>

                <button
                    aria-label="Close"
                    onClick={onPicViewerClose}
                    className="flex items-center gap-x-2 hover:bg-[#4A4A4A] px-4 py-2 rounded-lg"
                >
                    <AiOutlineClose />
                    <span>Close</span>
                </button>
            </div>

            <div
                className="relative mx-auto flex gap-x-2 justify-between  items-center 
                            my-[15%] sm:my-[1.5%] md:my-[1.5%] 2xl:my-[2%]"
            >
                <button
                    aria-label="Show previous picture"
                    onClick={() => switchPicHandler('-')}
                    className={`${arrowStyle} ${activeImg === 0 && 'invisible'}`}
                >
                    <IoIosArrowBack />
                </button>
                <div className="relative w-[800px] 2xl:w-[1000px] h-[70vh]">
                    <Image
                        src={getCloudiImg('max', images[activeImg])}
                        alt="Picture"
                        layout="fill"
                        objectFit="contain"
                        key={activeImg}
                        className="object-cover rounded-lg transition-image-viewer "
                    />
                </div>
                <button
                    aria-label="Show next picture"
                    onClick={() => switchPicHandler('+')}
                    className={`
                                ${arrowStyle}
                                ${activeImg === images.length - 1 && 'invisible'}`}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}

export default PicViewer
