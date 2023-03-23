import { useRouter } from 'next/router'

import Image from 'next/image'

import TemporaryImgUrls from '../constants/temporary-imgs-urls'

const SpotCard = ({ rate, title, id, categories, author }) => {
    const router = useRouter()

    const clickDetailsHandler = () => {
        router.push(`/spots/${id}`)
    }

    return (
        <>
            <div onClick={clickDetailsHandler} className="cursor-pointer text-center">
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-64 lg:h-64 xl:w-80 xl:h-[19rem] 2xl:w-[19rem] 2xl:h-80 mx-auto">
                    <Image
                        src={TemporaryImgUrls[0]}
                        alt="Picture"
                        layout="fill"
                        className="rounded-lg object-cover"
                        quality={10}
                    />
                </div>

                <div>
                    <p className="font-semibold">{title}</p>
                    <p className="font-light">Shared by {author}</p>
                    <p className="font-light">Grade: {rate}</p>
                    <p className="font-light">{categories.join(', ')}</p>
                </div>
            </div>
        </>
    )
}

export default SpotCard
