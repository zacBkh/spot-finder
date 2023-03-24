import { CiImageOff } from 'react-icons/ci'
import { BODY_FS } from '../constants/responsive-fonts'

import { useRouter } from 'next/router'

import { TOAST_PARAMS } from '../constants/toast-query-params'
const { KEY, VALUE_FEATURE_NOT_YET_AVAILABLE } = TOAST_PARAMS

const MissingImage = () => {
    console.log('KEY', KEY)
    console.log('VALUE_FEATURE_NOT_YET_AVAILABLE', VALUE_FEATURE_NOT_YET_AVAILABLE)
    const router = useRouter()

    const pushToaster = (KEY, VALUE) => {
        console.log('KEY', KEY)
        console.log('VALUE', VALUE)
        router.push(
            {
                query: {
                    ...router.query,
                    [KEY]: VALUE,
                },
            },
            undefined,
            { shallow: true },
        )
    }
    return (
        <>
            <div className="bg-[#E7E7E7] w-full h-full flex flex-col justify-center items-center gap-y-2">
                <CiImageOff className="w-1/2 h-1/2 text-dark-color " />
                <span className={`${BODY_FS} text-center`}>
                    No image available.{' '}
                    <button
                        className="underline"
                        onClick={() => pushToaster(KEY, VALUE_FEATURE_NOT_YET_AVAILABLE)}
                    >
                        Add yours!
                    </button>
                </span>
            </div>
        </>
    )
}

export default MissingImage
