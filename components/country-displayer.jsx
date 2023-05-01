import Image from 'next/image'

import { BODY_FS } from '../constants/responsive-fonts'

const CountryDisplayer = ({ name, code }) => {
    return (
        <div className="flex items-center gap-x-3 text-form-color mr-3 w-fit bg-gray-100 px-4 py-1 rounded-md">
            <p className={`w-max ${BODY_FS}`}>
                This spot is located in <span className="font-semibold">{name}</span>
            </p>

            <div className="relative min-w-[24px] overflow-hidden w-6 h-6 rounded-sm">
                <Image
                    alt={`The flag of ${name}`}
                    layout="fill"
                    objectFit="cover"
                    className=""
                    src={`https://flagcdn.com/w320/${code.toLowerCase()}.png`}
                />
            </div>
        </div>
    )
}

export default CountryDisplayer
