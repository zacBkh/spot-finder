import Image from 'next/image'

import { BODY_FS } from '../constants/responsive-fonts'

const CountryDisplayer = ({ name, code }) => {
    return (
        <div className="flex items-center gap-x-3 text-form-color">
            <p className={BODY_FS}>{name}</p>

            <div className="relative overflow-hidden w-6 h-6 rounded-sm">
                <Image
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
