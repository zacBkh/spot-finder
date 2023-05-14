import Link from 'next/link'

import { BUTTON_FS, ICON_IN_BUTTON_FS } from '../../constants/responsive-fonts'

const CTAButtons = ({ text, icon, isSecondary, url }) => {
    return (
        <Link href={url}>
            <a>
                <button
                    className={`${BUTTON_FS} group py-2 px-4 2xl:py-3 2xl:px-9 flex items-center justify-center gap-x-2 +
               ${
                   isSecondary
                       ? 'border border-primary text-primary'
                       : 'bg-primary text-white'
               } rounded-[0.3rem] w-fit font-bold overflow-hidden`}
                >
                    <span>{text}</span>
                    <span
                        className={`${ICON_IN_BUTTON_FS} animateElemsBtn svgCenter
                    w-0 group-hover:w-10
                    opacity-0 group-hover:opacity-100
                   -translate-y-full group-hover:translate-y-0
                    rotate-[180deg] group-hover:rotate-0
                    -translate-x-8 group-hover:translate-x-0
                    `}
                    >
                        {icon}
                    </span>
                </button>
            </a>
        </Link>
    )
}

export default CTAButtons
