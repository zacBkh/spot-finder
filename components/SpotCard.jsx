import { useState } from "react"
import { useRouter } from 'next/router';


import Image from 'next/image'
import imageTesting from "../public/imageTesting.jpg"


const SpotCard = ({ title, description, id, categories, author }) => {
    const router = useRouter()




    const clickDetailsHandler = () => {
        router.push(`/spots/${id}`)
    }


    return (
        <>
            <div
                onClick={clickDetailsHandler}
                className="mb-6 cursor-pointer">

                <div className=
                    "max-w-sm		">
                    <Image
                        src={imageTesting}
                        alt="Picture"
                        placeholder="blur"
                        className=" rounded-lg"
                    />
                </div>

                <div>
                    <p className="font-semibold">{title}</p>
                    <p className="font-light">{description}</p>
                    <p className="font-light">Shared by {author}</p>
                    <p className="font-light">{categories.join(", ")}</p>
                </div>
            </div>
        </>
    )
}

export default SpotCard 