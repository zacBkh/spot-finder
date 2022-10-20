import { useState } from "react"
import { useRouter } from 'next/router';


import Image from 'next/image'
import imageTesting from "../public/imageTesting.jpg"


const SpotsList = ({ title, description, id }) => {
    const router = useRouter()




    const clickDetailsHandler = () => {
        console.log("ID", id)
        router.push(`/spots/${id}`)
    }


    return (
        <>
            <div onClick={clickDetailsHandler} className=" mb-6">

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
                    <p className="font-light">Shared by John Doe</p>
                    <p className="font-light">Sunset, cityscape</p>
                </div>
            </div>
        </>
    )
}

export default SpotsList 