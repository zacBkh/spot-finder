import Image from 'next/image'

import { BODY_FS } from '../constants/responsive-fonts'

const CountryDisplayer = ({ name, code, context }) => {
    return (
        <div
            className={`flex items-center gap-x-3 text-form-color w-fit 
         ${context === 'spotPage' ? 'mr-3 bg-gray-100 px-4 py-1 rounded-md' : ''}`}
        >
            <p className={`w-max ${BODY_FS}`}>
                {context === 'spotPage' ? 'This Spot is located in ' : 'From '}
                <span className="font-semibold">{name}</span>
            </p>

            <div
                className={`relative min-w-[24px] overflow-hidden w-6 h-5 rounded-sm ${
                    context !== 'spotPage' && 'shadow-md'
                }`}
            >
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
